// src/core/chatBot.js

import { copyCodeToClipboard, createCopyButton } from '../utils/copyUtil.js';

let cachedPDFData = null;
let apiErrorCount = 0;
window.chatHistory = [];

export function initChat() {
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const resetChatBtn = document.getElementById('reset-chat-btn');
    const downloadChatBtn = document.getElementById('download-chat-btn');

    if (!chatMessages) return;

    if (chatMessages.children.length === 0) {
        addBotMessage('안녕하세요! UDL 및 웹 접근성 관련 질문이 있으시면 편하게 물어보세요.');
    }

    chatSendBtn?.addEventListener('click', sendChatMessage);
    chatInput?.addEventListener('keydown', e => e.key === 'Enter' && sendChatMessage());
    resetChatBtn?.addEventListener('click', resetChat);
    downloadChatBtn?.addEventListener('click', downloadChat);
    window.addEventListener('resize', () => scrollToBottom(chatMessages));

    observeChatChanges(chatMessages);

    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.tab === 'tab-content-chat') {
                setTimeout(() => scrollToBottom(chatMessages), 100);
            }
        });
    });

    console.log('✅ 채팅 초기화 완료');
}

function observeChatChanges(chatMessages) {
    const observer = new MutationObserver((mutations) => {
        // 코드 복사 버튼 클릭으로 인한 변경은 무시
        const isCopyButtonClick = mutations.some(mutation => 
            mutation.target.classList.contains('chat-code-copy') ||
            mutation.target.closest('.chat-code-copy')
        );
        
        if (!isCopyButtonClick) {
            setTimeout(() => scrollToBottom(chatMessages), 50);
        }
    });
    observer.observe(chatMessages, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-copying']
    });
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

function resetChat() {
    if (!confirm('현재 대화 내용을 지우고 새 대화를 시작하시겠습니까?')) return;
    window.chatHistory = [];
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';
    addBotMessage('안녕하세요! UDL 및 웹 접근성 관련 질문이 있으시면 편하게 물어보세요.');
}

function downloadChat() {
    if (!window.chatHistory.length) {
        alert('다운로드할 대화 내용이 없습니다.');
        return;
    }
    const chatText = window.chatHistory.map(msg =>
        `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`
    ).join('\n\n');

    const date = new Date();
    const fileName = `UDL-Chat-${date.toISOString().slice(0, 16).replace(/[-T:]/g, '')}.txt`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(chatText));
    element.setAttribute('download', fileName);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input-field');
    const chatMessages = document.querySelector('.chat-messages');
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addUserMessage(userMessage);
    chatInput.value = '';

    if (!isAccessibilityQuestion(userMessage)) {
        addBotMessage('CP님, 이 도구는 웹 접근성 관련 질문에 특화되어 있습니다. KWCAG 2.2 기준으로 문의 부탁드립니다.');
        return;
    }

    window.chatHistory.push({ role: 'user', content: userMessage });

    if (window.chatHistory.length > 10) {
        window.chatHistory = window.chatHistory.slice(-10);
    }

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    chatMessages.appendChild(loadingDiv);
    scrollToBottom(chatMessages);

    const prompt = buildPrompt(userMessage);

    const userApiKey = sessionStorage.getItem('udl_api_key');
    if (!userApiKey) {
        alert('API KEY가 없습니다. 새로 고침하고 다시 시도해주세요.');
        return;
    }

    const timeoutId = setTimeout(() => {
        loadingDiv.remove();
        addBotMessage('CP님, AI 응답이 지연되고 있습니다. 나중에 다시 시도해 주세요.');
    }, 20000);

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${userApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    })
        .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            loadingDiv.remove();
            const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '답변을 생성할 수 없습니다.';
            addBotMessage(aiText);
            apiErrorCount = 0;
        })
        .catch(error => {
            clearTimeout(timeoutId);
            loadingDiv.remove();
            apiErrorCount++;
            console.error('API 오류:', error);
            if (apiErrorCount > 2) {
                addBotMessage('CP님, API 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            }
        });
}

function addUserMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-message chat-user-message';
    div.textContent = message;
    chatMessages.appendChild(div);
    scrollToBottom(chatMessages);
}

function addBotMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-message chat-bot-message';
    div.innerHTML = formatAIResponse(message);
    chatMessages.appendChild(div);
    scrollToBottom(chatMessages);
    window.chatHistory.push({ role: 'bot', content: message });

    if (window.chatHistory.length > 10) {
        window.chatHistory = window.chatHistory.slice(-10);
    }
}

function buildPrompt(userMessage) {
    return `
웹 접근성 전문가로서 답변해주세요.

페이지 정보: ${document.title} (${window.location.href})
사용자 질문: ${userMessage}

KWCAG 2.2 기준에 맞추어 다음 형식으로 작성:
---
**[관련 KWCAG 항목]**
* **오류:**
* **문제점:**
* **해결방법:**
* **코드 예시:** (필요 시)
---

사용자는 "CP님"으로 호칭하고, 간결하게 답변할 것.
  `.trim();
}

function isAccessibilityQuestion(message) {
    const keywords = [
        '접근성', '웹접근성', 'KWCAG', '대체텍스트', '스크린리더', '명도', '대비', '색상',
        '자막', '표', '구조', '레이아웃', '마크업', 'ARIA', '지침', '운용', '콘텐츠',
        '대체', '텍스트', '링크', '버튼', '서식', '오류', 'alt', 'label', 'WAI', 'WCAG',
        '장애', '시각', '청각', '인지', '마우스', '포커스', '네비게이션'
    ];
    return keywords.some(kw => message.toLowerCase().includes(kw.toLowerCase()));
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function highlightSyntax(code, language) {
    // 기본 HTML 하이라이팅
    if (language === 'html' || !language) {
        // 먼저 주석 처리
        code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="code-comment">$1</span>');
        
        // 태그 처리 (자체 닫힘 태그 포함)
        code = code.replace(/(&lt;\/?[a-z][^&]*?(&gt;|\/&gt;))/gi, (match) => {
            // 태그 이름 추출
            const tagName = match.match(/&lt;\/?([a-z][a-z0-9-]*)/i)?.[1] || '';
            // 속성 처리
            const processedTag = match.replace(/([a-z-]+)=/gi, '<span class="code-attr">$1</span>=')
                                   .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>')
                                   .replace(/'([^']*)'/g, '<span class="code-string">\'$1\'</span>');
            return `<span class="code-tag">${processedTag}</span>`;
        });
        
        return code;
    }
    // CSS 하이라이팅
    else if (language === 'css') {
        return code
            .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="code-attr">$1</span>')
            .replace(/(:.*?;)/g, '<span class="code-value">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
    }
    // JavaScript 하이라이팅
    else if (language === 'javascript' || language === 'js') {
        return code
            .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export)\b/g, '<span class="code-keyword">$1</span>')
            .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>')
            .replace(/'([^']*)'/g, '<span class="code-string">\'$1\'</span>')
            .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="code-comment">$1</span>');
    }
    return escapeHtml(code);
}

export function formatAIResponse(text) {
    if (!text) return '';

    let formatted = text
        // 코드 블록 처리
        .replace(/```(\w*)\n([\s\S]*?)```/g, (_, language, code) => {
            const trimmedCode = code.trim();
            const highlightedCode = highlightSyntax(escapeHtml(trimmedCode), language);
            return `
                <div class="chat-code-example">
                    <div class="chat-code-description">코드 예시${language ? ` (${language})` : ''}</div>
                    <div class="chat-code-content">
                        <pre><code class="chat-inline-code" data-language="${language || 'html'}">${highlightedCode}</code></pre>
                        <button class="chat-code-copy" type="button" aria-label="코드 복사">복사</button>
                    </div>
                </div>`;
        })
        // 인라인 코드 처리 - HTML 태그가 포함된 경우 코드 블록으로 변환
        .replace(/`([^`]+)`/g, (_, code) => {
            // HTML 태그가 포함되어 있는지 확인 (더 정확한 정규식 사용)
            if (/<[a-z][^>]*>/i.test(code)) {
                const highlightedCode = highlightSyntax(escapeHtml(code), 'html');
                return `
                    <div class="chat-code-example">
                        <div class="chat-code-description">코드 예시 (html)</div>
                        <div class="chat-code-content">
                            <pre><code class="chat-inline-code" data-language="html">${highlightedCode}</code></pre>
                            <button class="chat-code-copy" type="button" aria-label="코드 복사">복사</button>
                        </div>
                    </div>`;
            }
            // 일반 인라인 코드는 기존대로 처리
            return `<code class="chat-inline-code">${escapeHtml(code)}</code>`;
        })
        // 마크다운 포맷팅
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    // 복사 버튼 이벤트 리스너 추가
    setTimeout(() => {
        document.querySelectorAll('.chat-code-copy').forEach(button => {
            if (!button.hasAttribute('data-initialized')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // 버튼의 형제 요소인 pre > code를 찾아서 복사
                    const codeElement = button.closest('.chat-code-content')?.querySelector('code');
                    if (codeElement) {
                        copyCodeToClipboard(button, codeElement);
                    } else {
                        console.error('코드 요소를 찾을 수 없습니다:', button);
                    }
                });
                button.setAttribute('data-initialized', 'true');
            }
        });
    }, 0);

    return formatted;
}
// src/core/chatBot.js

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
    const observer = new MutationObserver(() => {
        setTimeout(() => scrollToBottom(chatMessages), 50);
    });
    observer.observe(chatMessages, { childList: true, subtree: true });
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
    div.className = 'chat-message chat-user';
    div.textContent = message;
    chatMessages.appendChild(div);
    scrollToBottom(chatMessages);
}

function addBotMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-message chat-bot';
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

export function formatAIResponse(text) {
    if (!text) return '';

    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')   // **볼드**
        .replace(/\*(.+?)\*/g, '<em>$1</em>')               // *이탤릭*
        .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>') // `코드`
        .replace(/\n/g, '<br>');                            // 줄바꿈
}
// core/messageHandler.js

import { scrollToBottom } from '../utils/scroll.js';

/**
 * 사용자 메시지를 채팅창에 추가
 * @param {string} message
 */
export function addUserMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message chat-user';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);

    // 스크롤 처리
    scrollToBottom(chatMessages);
    setTimeout(() => scrollToBottom(chatMessages), 100);
    setTimeout(() => {
        const isAtBottom = chatMessages.scrollHeight - chatMessages.clientHeight - chatMessages.scrollTop < 30;
        if (!isAtBottom) scrollToBottom(chatMessages);
    }, 300);

    // 대화 기록 저장
    if (!window.chatHistory) window.chatHistory = [];
    window.chatHistory.push({ role: 'user', content: message });
    if (window.chatHistory.length > 10) {
        window.chatHistory = window.chatHistory.slice(-10);
    }
}

/**
 * AI 메시지를 채팅창에 추가
 * @param {string} message
 */
export function addBotMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message chat-bot';
    messageDiv.innerHTML = formatAIResponse(message); // 사용자 정의 포맷 함수

    chatMessages.appendChild(messageDiv);
    scrollToBottom(chatMessages);
    setTimeout(() => scrollToBottom(chatMessages), 100);
    setTimeout(() => scrollToBottom(chatMessages), 500);
    setTimeout(() => scrollToBottom(chatMessages), 1000);

    if (!window.chatHistory) window.chatHistory = [];
    window.chatHistory.push({ role: 'bot', content: message });
    if (window.chatHistory.length > 10) {
        window.chatHistory = window.chatHistory.slice(-10);
    }

    // 이미지 로드 후에도 스크롤
    const allImages = messageDiv.querySelectorAll('img');
    allImages.forEach(img => {
        img.onload = () => scrollToBottom(chatMessages);
    });

    // 스크롤 디버깅용 로그
    chatMessages.onscroll = () => {
        const nearBottom = chatMessages.scrollHeight - chatMessages.clientHeight - chatMessages.scrollTop < 30;
        console.log('스크롤 상태:', nearBottom ? '맨 아래' : '스크롤 중');
    };
}

/**
 * AI 응답 텍스트를 HTML로 포맷
 * @param {string} text
 * @returns {string} HTML
 */
export function formatAIResponse(text) {
    let formattedText = text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/```([\s\S]*?)```/g, '<pre class="code-block">$1</pre>')
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/^---$/gm, '<hr>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^(\s*)[-*+] (.*)$/gm, '<li>$2</li>')
        .replace(/\n\n/g, '</p><p>');

    if (formattedText.includes('<li>')) {
        formattedText = '<ul>' + formattedText + '</ul>';
        formattedText = formattedText.replace(/<\/ul>\s*<ul>/g, '');
    }

    return `<div class="ai-analysis-content"><p>${formattedText}</p></div>`;
}

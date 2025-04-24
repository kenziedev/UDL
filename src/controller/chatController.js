import { scrollToBottom } from '../utils/scroll.js';
import { addUserMessage, addBotMessage } from '../core/messageHandler.js';
import { runAxeScan } from '../core/axeAnalysis.js';

export function runMessageFlow(userMessage) {
    if (!userMessage || userMessage.trim() === '') return;

    addUserMessage(userMessage);
    scrollToBottom();

    // 이후 실제 로직 분기 예시
    if (userMessage.includes('접근성')) {
        runAxeScan(); // 임시 로직
        addBotMessage('접근성 분석을 시작합니다...');
    } else {
        addBotMessage('접근성 관련 질문만 처리할 수 있어요.');
    }

    scrollToBottom();
}
export function initChat() {
    console.log('💬 Chat 패널 초기화');
}
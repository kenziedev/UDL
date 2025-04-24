// core/api.js
import { addBotMessage } from './messageHandler.js';

const API_KEY = 'YOUR_API_KEY'; // 보안상 서버에서 처리하는 게 이상적이지만, 북마클릿에서는 클라이언트 노출 감안

let apiErrorCount = 0;

export async function callAccessibilityAI(userMessage) {
    const promptText = `
웹 접근성 전문가로서 아래 질문에 답변해주세요:

사용자 질문: ${userMessage}

KWCAG 2.2 기준에 따라 간결하게 설명하고, 가능한 경우 코드 예시도 제공해주세요.
  `.trim();

    const requestData = {
        contents: [{ parts: [{ text: promptText }] }],
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            apiErrorCount++;
            throw new Error(`API 응답 오류: ${response.status}`);
        }

        const data = await response.json();
        apiErrorCount = 0;

        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'AI 응답을 해석할 수 없습니다.';
        addBotMessage(aiResponse);
    } catch (error) {
        console.error('AI 호출 오류:', error);
        apiErrorCount++;

        const fallbackResponse = apiErrorCount > 2
            ? 'CP님, API 서비스에 일시적인 문제가 발생했습니다. 나중에 다시 시도해주세요.'
            : 'AI 응답 생성 중 문제가 발생했습니다. 다시 시도해주세요.';

        addBotMessage(fallbackResponse);
    }
}

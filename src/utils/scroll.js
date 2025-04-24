// 항상 맨 아래로 스크롤
export function scrollToBottom(container = document.querySelector('.chat-messages')) {
    if (!container) return;

    try {
        container.scrollTop = container.scrollHeight;
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    } catch (err) {
        console.error('📉 스크롤 처리 오류:', err);
    }
}
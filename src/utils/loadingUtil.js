/**
 * 로딩 상태 관리를 위한 유틸리티 함수들
 */
export const LoadingManager = {
    /**
     * 로딩 상태 표시
     * @param {string} elementId - 로딩을 표시할 요소의 ID
     * @param {string} message - 표시할 로딩 메시지
     */
    show: (elementId, message = '로딩 중...') => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="loading" data-message="${message}">
                    ${message}
                    ${message.includes('AI') ? '<br><small>잠시만 기다려주세요.</small>' : ''}
                </div>
            `;
        }
    },

    /**
     * 로딩 상태 숨기기
     * @param {string} elementId - 로딩을 숨길 요소의 ID
     */
    hide: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            const loadingElement = element.querySelector('.loading');
            if (loadingElement) {
                loadingElement.remove();
            }
        }
    },

    /**
     * 로딩 메시지 업데이트
     * @param {string} elementId - 메시지를 업데이트할 요소의 ID
     * @param {string} message - 새로운 로딩 메시지
     */
    updateMessage: (elementId, message) => {
        const element = document.getElementById(elementId);
        if (element) {
            const loadingElement = element.querySelector('.loading');
            if (loadingElement) {
                loadingElement.setAttribute('data-message', message);
                loadingElement.textContent = message;
            }
        }
    }
}; 
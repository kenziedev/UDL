/**
 * 코드 복사 관련 유틸리티 함수
 */

/**
 * 코드 블록에서 실제 텍스트 내용을 추출합니다.
 * @param {HTMLElement} codeBlock - 코드 블록 요소
 * @returns {string} 추출된 텍스트
 */
function extractCodeText(codeBlock) {
    if (!codeBlock) {
        console.error('코드 블록이 없습니다.');
        return '';
    }

    // codeBlock이 pre > code 구조인 경우 code 요소를 찾습니다
    const codeElement = codeBlock.tagName === 'CODE' ? codeBlock : codeBlock.querySelector('code');
    if (!codeElement) {
        console.error('code 요소를 찾을 수 없습니다:', codeBlock);
        return '';
    }

    // HTML 태그를 제거하고 텍스트만 추출
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codeElement.innerHTML;
    
    // 모든 span 태그의 내용을 원래 텍스트로 복원
    const spans = tempDiv.getElementsByTagName('span');
    for (let span of spans) {
        if (span.classList.contains('code-tag')) {
            // HTML 태그 복원
            span.textContent = span.textContent
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
        } else if (span.classList.contains('code-string')) {
            // 따옴표 복원
            const text = span.textContent;
            if (text.startsWith('"') && text.endsWith('"')) {
                span.textContent = text;
            } else if (text.startsWith("'") && text.endsWith("'")) {
                span.textContent = text;
            }
        }
    }

    // 텍스트 추출 및 정리
    let extractedText = tempDiv.textContent
        .replace(/\u00A0/g, ' ') // non-breaking space를 일반 공백으로 변환
        .replace(/\r\n/g, '\n')  // Windows 줄바꿈 정규화
        .replace(/\r/g, '\n')    // Mac 줄바꿈 정규화
        .trim();                 // 앞뒤 공백 제거

    console.log('추출된 텍스트:', extractedText); // 디버깅용

    if (!extractedText) {
        console.error('추출된 텍스트가 비어있습니다:', {
            originalHTML: codeElement.innerHTML,
            processedHTML: tempDiv.innerHTML
        });
    }

    return extractedText;
}

/**
 * 코드를 클립보드에 복사하고 시각적 피드백을 제공합니다.
 * @param {HTMLElement} button - 복사 버튼 요소
 * @param {HTMLElement} codeElement - 복사할 코드 요소
 * @param {string} [successMessage='복사됨!'] - 복사 성공 시 표시할 메시지
 * @param {string} [errorMessage='복사 실패'] - 복사 실패 시 표시할 메시지
 * @returns {Promise<void>}
 */
export async function copyCodeToClipboard(button, codeElement, successMessage = '복사됨!', errorMessage = '복사 실패') {
    if (!button) {
        console.error('복사 버튼을 찾을 수 없습니다.');
        return;
    }

    if (!codeElement) {
        console.error('코드 요소를 찾을 수 없습니다.');
        return;
    }

    // 이미 복사 중인 경우 중복 실행 방지
    if (button.dataset.copying === 'true') {
        console.log('이미 복사 중입니다.');
        return;
    }
    button.dataset.copying = 'true';

    const originalText = button.textContent;
    const originalAriaLabel = button.getAttribute('aria-label');
    let timeoutId = null;

    try {
        // 코드 블록의 텍스트 내용 가져오기
        const text = extractCodeText(codeElement);
        console.log('복사할 텍스트:', text); // 디버깅용

        if (!text) {
            throw new Error('복사할 텍스트가 없습니다.');
        }
        
        // 클립보드에 복사
        await navigator.clipboard.writeText(text);
        console.log('클립보드에 복사 성공'); // 디버깅용
        
        // 성공 피드백
        button.textContent = successMessage;
        button.setAttribute('aria-label', '코드가 복사되었습니다');
        button.classList.add('copy-success');
        button.classList.remove('copy-error');
        
        // 2초 후 원래 상태로 복구
        timeoutId = setTimeout(() => {
            button.textContent = originalText;
            button.setAttribute('aria-label', originalAriaLabel);
            button.classList.remove('copy-success');
            button.dataset.copying = 'false';
        }, 2000);

    } catch (err) {
        console.error('코드 복사 실패:', err);
        
        // 실패 피드백
        button.textContent = errorMessage;
        button.setAttribute('aria-label', '코드 복사 실패');
        button.classList.add('copy-error');
        button.classList.remove('copy-success');
        
        // 2초 후 원래 상태로 복구
        timeoutId = setTimeout(() => {
            button.textContent = originalText;
            button.setAttribute('aria-label', originalAriaLabel);
            button.classList.remove('copy-error');
            button.dataset.copying = 'false';
        }, 2000);
    }

    // 버튼에 timeoutId 저장 (나중에 필요시 취소할 수 있도록)
    button.dataset.timeoutId = timeoutId;
}

/**
 * 코드 복사 버튼을 생성합니다.
 * @param {HTMLElement} container - 버튼을 추가할 컨테이너 요소
 * @returns {HTMLButtonElement} 생성된 복사 버튼
 */
export function createCopyButton(container) {
    const button = document.createElement('button');
    button.className = 'code-copy';
    button.textContent = '복사';
    button.setAttribute('aria-label', '코드 복사');
    button.setAttribute('type', 'button');
    button.dataset.copying = 'false';
    
    // 클릭 이벤트 리스너 추가
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        copyCodeToClipboard(button);
    });
    
    // 마우스 이벤트 처리
    button.addEventListener('mouseenter', () => {
        // 복사 중이 아닐 때만 호버 효과 적용
        if (button.dataset.copying === 'false') {
            button.style.opacity = '1';
        }
    });

    button.addEventListener('mouseleave', () => {
        // 복사 중이 아닐 때만 호버 효과 제거
        if (button.dataset.copying === 'false') {
            button.style.opacity = '0';
        }
    });
    
    // 컨테이너에 버튼 추가
    if (container) {
        container.appendChild(button);
    }
    
    return button;
}

/**
 * 모든 코드 블록에 복사 버튼을 추가합니다.
 * @param {string} [selector='.code-example'] - 코드 블록 컨테이너 선택자
 */
export function initializeCopyButtons(selector = '.code-example') {
    document.querySelectorAll(selector).forEach(container => {
        // 이미 복사 버튼이 있는지 확인
        if (!container.querySelector('.code-copy')) {
            createCopyButton(container);
        }
    });
} 
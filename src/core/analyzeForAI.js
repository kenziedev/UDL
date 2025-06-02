// src/core/analyzeForAI.js

// API 엔드포인트 설정 - Google의 Gemini AI 모델 사용
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1초

// 본문 요약 추출 함수 (중요 영역 우선, 불필요 텍스트 제거, 1200자 이내)
function extractMainContent() {
    // 1. main, article, section, .content, .post 등 우선 추출
    const main = document.querySelector('main, article, section, .content, .post');
    let text = '';
    if (main) {
        text = main.innerText;
    } else {
        // 없으면 body 전체에서 메뉴/푸터/광고 등 제외
        const body = document.body.cloneNode(true);
        ['nav', 'footer', 'aside', '.menu', '.footer', '.sidebar', '.ad', '.ads'].forEach(sel => {
            body.querySelectorAll(sel).forEach(el => el.remove());
        });
        text = body.innerText;
    }
    // 2. 중복/불필요 텍스트 제거
    text = text.replace(/(로그인|회원가입|더보기|TOP|이전|다음|검색)/g, '');
    // 3. 연속 공백 정리
    text = text.replace(/\s+/g, ' ').trim();
    // 4. 1200자 이내로 자르기
    return text.slice(0, 1200);
}

// 메인 분석 함수: 웹페이지 분석을 시작하고 UI를 관리
export function analyzeForAI() {
    // UDL 탭 컨텐츠 영역 선택 및 로딩 표시
    const udlContent = document.getElementById('tab-content-udl');
    udlContent.innerHTML = '<div class="loading">AI 분석 중...<br><small>잠시만 기다려주세요.</small></div>';

    // 현재 페이지 데이터 수집
    const pageData = {
        html: document.documentElement.outerHTML,    // 전체 HTML
        title: document.title || 'Untitled',         // 페이지 제목
        bodyText: extractMainContent(), // 본문 텍스트 (1200자 이내, 중요영역 우선)
        url: window.location.href                    // 현재 페이지 URL
    };

    // API 키 확인
    const userApiKey = sessionStorage.getItem('udl_api_key');
    if (!userApiKey) {
        udlContent.innerHTML = `
            <div class="error">
                <p>API KEY가 없습니다.</p>
                <button onclick="sessionStorage.removeItem('udl_api_key'); location.reload();" class="retry-btn">
                    API KEY 다시 입력하기
                </button>
            </div>
        `;
        return;
    }

    // AI 분석 요청 및 결과 처리
    requestAIAnalysisWithRetry(pageData, userApiKey)
        .then(response => {
            if (!response || typeof response !== 'string') {
                throw new Error('AI 응답이 올바르지 않습니다.');
            }
            udlContent.innerHTML = '';
            const result = document.createElement('div');
            result.className = 'ai-analysis-result';
            result.innerHTML = cleanAIHtml(formatAIResponse(response));
            udlContent.appendChild(result);
        })
        .catch(error => {
            console.error('AI 분석 오류:', error);
            udlContent.innerHTML = `
                <div class="error">
                    <p>AI 분석 실패: ${error.message}</p>
                    <button onclick="analyzeForAI()" class="retry-btn">
                        다시 시도하기
                    </button>
                </div>
            `;
        });
}

// 재시도 로직이 포함된 AI 분석 요청 함수
async function requestAIAnalysisWithRetry(pageData, apiKey, retryCount = 0) {
    try {
        return await requestAIAnalysis(pageData, apiKey);
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            console.log(`AI 분석 재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
            return requestAIAnalysisWithRetry(pageData, apiKey, retryCount + 1);
        }
        throw error;
    }
}

// AI 분석 요청 함수: Gemini API와 통신
async function requestAIAnalysis({ html, title, bodyText, url }, apiKey) {
    // API 키 유효성 검사
    if (!apiKey || apiKey.length < 10) {
        throw new Error('유효하지 않은 API 키입니다.');
    }

    // 페이지 내용 요약 생성
    const contentSummary = `
페이지 정보:
- 제목: ${title}
- URL: ${url}
- 본문 요약:
${bodyText.slice(0, 1000)}...
    `.trim();

    // API 요청 본문 구성
    const requestBody = {
        contents: [{
            parts: [{
                text: `
너는 웹 접근성 및 UDL 전문가야.

아래 웹페이지 정보를 분석해서, 반드시 아래 예시와 같은 구조로 답변해줘.

---
# [AI 제안]
# 1. 색상 대비 및 텍스트 가독성
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)

# 2. 키보드 접근성
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)

# 3. 스크린 리더 대응
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)

# 4. 명확한 네비게이션
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)

# 5. 멀티미디어 대안 제공
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)

# 6. UDL 원칙 적용
## 주요 문제점
- (문제1)
- (문제2)
## 개선 방안
- (방안1)
- (방안2)
---

- 정보가 부족하더라도, 반드시 구체적인 예시와 실질적인 개선 가이드, 일반적인 웹사이트에서 자주 발생하는 문제를 근거로 작성할 것
- "확인할 수 없다", "알 수 없다", "정보가 부족하다" 등의 표현은 절대 사용하지 말 것
- 실제로 있을 법한 문제와 개선방안을 구체적으로 작성할 것
- 실제 코드/텍스트/구조에서 유추할 수 있는 문제점과 개선방안을 최대한 구체적으로 작성할 것
- 정보가 부족한 경우에도, 일반적인 웹 접근성/UDL 관점에서 예상되는 문제와 개선 가이드를 제시할 것
- 각 항목은 반드시 위와 같은 순서와 마크다운 구조로 작성할 것
- 불필요한 HTML 태그, 스타일, 이모지, 인삿말, 요약 등은 절대 넣지 말 것
- 각 항목별로 "주요 문제점"과 "개선 방안" 소제목을 반드시 포함할 것
- 마크다운만 사용

분석할 페이지:
---
${contentSummary}
---
                `.trim()
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    };

    // API 요청 실행
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
        const res = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error?.message || 
                `HTTP 오류 발생: ${res.status}`
            );
        }

        const data = await res.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            throw new Error('AI 응답이 비어있습니다.');
        }

        return aiText;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('AI 분석 시간이 초과되었습니다. 다시 시도해주세요.');
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

// AI 응답을 HTML로 변환하는 함수
export function formatAIResponse(text) {
    if (!text) return '';

    // 마크다운을 HTML로 변환
    let formatted = text
        // 제목 변환
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (\d+\. .*)$/gm, '<section class="ai-section"><h2>$1</h2>') // 큰 질문 단락 시작
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        // 코드 블록 변환
        .replace(/```([\s\S]*?)```/g, (_, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        })
        // 인라인 코드, 강조, 링크 등 변환
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // <code> 태그 내에 <, >가 있으면 &lt;, &gt;로 변환 (디자인 깨짐 방지)
    formatted = formatted.replace(
      /<code class="inline-code">([\s\S]*?)<\/code>/g,
      (_, code) => `<code class="inline-code">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`
    );

    // 리스트 처리
    formatted = formatted.replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>');
    if (/<li>/.test(formatted)) {
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        formatted = formatted.replace(/<\/ul>\s*<ul>/g, '');
    }

    // 문단 처리
    formatted = formatted.replace(/\n{2,}/g, '</p><p>');
    formatted = `<p>${formatted}</p>`;

    // 각 큰 질문 단락(section) 닫기
    formatted = formatted.replace(/(<section class="ai-section">[\s\S]*?)(?=<section class="ai-section">|$)/g, '$1</section>');

    return `
    <div class="ai-analysis-cards">
      ${formatted}
    </div>
  `;
}

// HTML 정리 함수: 불필요한 태그와 중복 제거
export function cleanAIHtml(html) {
    if (!html) return '';

    return html
        // 빈 문단 제거
        .replace(/<p>\s*<\/p>/g, '')
        // 중첩된 태그 정리
        .replace(/<h(\d)><p>(.*?)<\/p><\/h\1>/g, '<h$1>$2</h$1>')
        // pre 태그 내부 정리
        .replace(/<pre><p>(.*?)<\/p><\/pre>/gs, '<pre><code>$1</code></pre>')
        // 코드 블록 공백 정리
        .replace(/<pre><code>\s*/g, '<pre><code>')
        .replace(/\s*<\/code><\/pre>/g, '</code></pre>')
        // 잘못된 태그 구조 수정
        .replace(/<\/h\d>\s*<\/p>/g, '</h$1>')
        .trim();
}





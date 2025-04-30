// src/core/analyzeForAI.js

// API 엔드포인트 설정 - Google의 Gemini AI 모델 사용
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

// 메인 분석 함수: 웹페이지 분석을 시작하고 UI를 관리
export function analyzeForAI() {
    // UDL 탭 컨텐츠 영역 선택 및 로딩 표시
    const udlContent = document.getElementById('tab-content-udl');
    udlContent.innerHTML = '<div class="loading">AI 분석 중...</div>';

    // 현재 페이지 데이터 수집
    const pageData = {
        html: document.documentElement.outerHTML,    // 전체 HTML
        title: document.title || 'Untitled',         // 페이지 제목
        bodyText: document.body.innerText.slice(0, 3000) // 본문 텍스트 (3000자 제한)
    };

    // API 키 확인
    const userApiKey = sessionStorage.getItem('udl_api_key');
    if (!userApiKey) {
        // API 키가 없을 경우 에러 메시지 표시
        udlContent.innerHTML = `
      <div class="error">
        <p>API KEY가 없습니다. 새로 고침하고 다시 시도해주세요.</p>
      </div>
    `;
        return;
    }

    // AI 분석 요청 및 결과 처리
    requestAIAnalysis(pageData, userApiKey)
        .then(response => {
            // 성공 시 결과 표시
            udlContent.innerHTML = '';
            const result = document.createElement('div');
            result.className = 'ai-analysis-result';
            result.innerHTML = cleanAIHtml(formatAIResponse(response));
            udlContent.appendChild(result);
        })
        .catch(error => {
            // 에러 발생 시 에러 메시지 표시
            udlContent.innerHTML = `
        <div class="error">
          <p>AI 분석 실패: ${error.message}</p>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      `;
            console.error('AI 분석 오류:', error);
        });
}

// AI 분석 요청 함수: Gemini API와 통신
async function requestAIAnalysis({ html, title, bodyText }, apiKey) {
    // 페이지 내용 요약 생성
    const contentSummary = `
페이지 제목: ${title}
본문 요약:
${bodyText.slice(0, 1000)}...
    `.trim();

    // API 요청 본문 구성
    const requestBody = {
        contents: [{
            parts: [{
                text: `
너는 웹 접근성과 UDL(보편적 학습 설계) 전문가야.

아래 페이지 정보를 분석해서:
- 주요 접근성 문제점 5~7개 식별
- 각 문제에 대해 구체적이고 실용적인 개선 방안 제안

다음 항목에 집중해서 평가해:
- 색상 대비, 텍스트 크기, 레이아웃
- 키보드 접근성
- 스크린 리더 대응
- 명확한 네비게이션
- 멀티미디어 대안 제공

**응답은 반드시 순수 Markdown 포맷으로 작성해. HTML 태그는 절대 사용하지 마.**
- 제목은 #, ##, ###로
- 목록은 -, *로
- 코드 예시는 \`\`\` 코드 블록으로

분석할 페이지:
---
${contentSummary}
---
                `.trim()
            }]
        }]
    };

    // API 요청 실행
    const res = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    // 응답 처리
    if (!res.ok) {
        throw new Error(`HTTP 오류 발생: ${res.status}`);
    }

    const data = await res.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
        throw new Error('AI 응답이 비어있음');
    }

    return aiText;
}

// AI 응답을 HTML로 변환하는 함수
export function formatAIResponse(text) {
    if (!text) return '';

    // 마크다운을 HTML로 변환
    let formatted = text
        // 제목 변환
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
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

    // 리스트 처리
    formatted = formatted.replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>');
    if (/<li>/.test(formatted)) {
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        formatted = formatted.replace(/<\/ul>\s*<ul>/g, '');
    }

    // 문단 처리
    formatted = formatted.replace(/\n{2,}/g, '</p><p>');
    formatted = `<p>${formatted}</p>`;

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





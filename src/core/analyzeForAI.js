// src/core/analyzeForAI.js

const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

export function analyzeForAI() {
    const udlContent = document.getElementById('tab-content-udl');
    udlContent.innerHTML = '<div class="loading">AI 분석 중...</div>';

    const pageData = {
        html: document.documentElement.outerHTML,
        title: document.title || 'Untitled',
        bodyText: document.body.innerText.slice(0, 3000)
    };

    const userApiKey = sessionStorage.getItem('udl_api_key');
    if (!userApiKey) {
        udlContent.innerHTML = `
      <div class="error">
        <p>API KEY가 없습니다. 새로 고침하고 다시 시도해주세요.</p>
      </div>
    `;
        return;
    }

    requestAIAnalysis(pageData, userApiKey)
        .then(response => {
            udlContent.innerHTML = '';
            const result = document.createElement('div');
            result.className = 'ai-analysis-result';
            result.innerHTML = cleanAIHtml(formatAIResponse(response));
            udlContent.appendChild(result);
        })
        .catch(error => {
            udlContent.innerHTML = `
        <div class="error">
          <p>AI 분석 실패: ${error.message}</p>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      `;
            console.error('AI 분석 오류:', error);
        });
}

async function requestAIAnalysis({ html, title, bodyText }, apiKey) {
    const contentSummary = `
페이지 제목: ${title}
본문 요약:
${bodyText.slice(0, 1000)}...
    `.trim(); // bodyText는 1000자 정도로 제한해 안정성 확보

    const requestBody = {
        contents: [
            {
                parts: [
                    {
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
                    }
                ]
            }
        ]
    };

    const res = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

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

export function formatAIResponse(text) {
    if (!text) return '';

    // 기본 마크다운 변환
    let formatted = text
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/```([\s\S]*?)```/g, (_, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        })
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // 리스트 항목 변환
    formatted = formatted.replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>');

    // 리스트가 있다면 <ul>로 감싸기
    if (/<li>/.test(formatted)) {
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        formatted = formatted.replace(/<\/ul>\s*<ul>/g, ''); // 중복된 <ul> 제거
    }

    // 문단 처리 (빈 줄 기준)
    formatted = formatted.replace(/\n{2,}/g, '</p><p>');
    formatted = `<p>${formatted}</p>`;

    return `
    <div class="ai-analysis-cards">
      ${formatted}
    </div>
  `;
}


export function cleanAIHtml(html) {
    if (!html) return '';

    return html
        // 빈 <p></p> 삭제
        .replace(/<p>\s*<\/p>/g, '')
        // <h1><p> 이런 이상한 구조 정리
        .replace(/<h(\d)><p>(.*?)<\/p><\/h\1>/g, '<h$1>$2</h$1>')
        // <pre> 안에 <p> 같은 거 들어가있으면 정리
        .replace(/<pre><p>(.*?)<\/p><\/pre>/gs, '<pre><code>$1</code></pre>')
        // 코드를 조금 더 이쁘게
        .replace(/<pre><code>\s*/g, '<pre><code>')
        .replace(/\s*<\/code><\/pre>/g, '</code></pre>')
        // 이상한 닫히지 않은 태그 제거 (아주 가볍게)
        .replace(/<\/h\d>\s*<\/p>/g, '</h$1>') // 닫힌 h 태그 다음 p 제거
        .trim();
}





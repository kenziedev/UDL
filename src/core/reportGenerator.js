// src/core/reportGenerator.js
import { KWCAG22 } from '../constants/KWCAG22.js';
import { UDL_PRINCIPLES } from '../constants/UDL_PRINCIPLES.js';
export function downloadReport() {
    const reportTitle = document.title || 'Untitled Page';
    const timestamp = new Date().toLocaleString();

    let reportHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${reportTitle} - 웹 접근성 및 UDL 분석 보고서</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
        header { margin-bottom: 30px; }
        h1 { color: #2c5282; }
        h2 { color: #3a7bd5; margin-top: 30px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px; }
        h3 { margin-top: 20px; }
        .report-section { margin-bottom: 20px; }
        .summary-box { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .fail-item { background: rgba(250, 82, 82, 0.05); padding: 10px; margin: 10px 0; border-left: 3px solid #fa5252; }
        .pass-item { background: rgba(64, 192, 87, 0.05); padding: 10px; margin: 10px 0; border-left: 3px solid #40c057; }
        footer { margin-top: 50px; font-size: 12px; color: #6c757d; }
      </style>
    </head>
    <body>
      <header>
        <h1>${reportTitle} - 색상 대비 분석 보고서</h1>
        <p>생성일시: ${timestamp}</p>
        <p>URL: ${window.location.href}</p>
      </header>
      
      <div class="report-section">
        <h2>요약</h2>
        <div class="summary-box">
          <p>이 보고서는 WCAG 2.2 지침의 색상 대비 요구사항에 따라 웹 페이지를 분석한 결과입니다.</p>
  `;

    // --- 색상 대비 분석 요약 ---
    const contrastFails = document.querySelectorAll('.contrast-item.contrast-fail').length;
    const contrastTotal = document.querySelectorAll('.contrast-item').length;
    const contrastPassRate = contrastTotal ? Math.round((contrastTotal - contrastFails) / contrastTotal * 100) : 0;

    reportHtml += `
        <p><strong>색상 대비:</strong> ${contrastTotal}개 중 ${contrastTotal - contrastFails}개 통과 (${contrastPassRate}%)</p>
        </div>
      </div>

      <div class="report-section">
        <h2>색상 대비 분석</h2>
  `;

    // --- 실패 항목 ---
    if (contrastFails > 0) {
        reportHtml += `<h3>색상 대비 부적합 항목 (${contrastFails}개)</h3>`;

        document.querySelectorAll('.contrast-item.contrast-fail').forEach(item => {
            const itemText = item.querySelector('.item-text')?.textContent || '항목 없음';
            const ratio = item.querySelector('.ratio-value strong')?.textContent.replace(':1', '') || '?';
            const textColor = item.querySelector('.color-chip:first-child .color-code')?.textContent || '#000000';
            const bgColor = item.querySelector('.color-chip:last-child .color-code')?.textContent || '#FFFFFF';

            reportHtml += `
        <div class="fail-item">
          <p>텍스트: "${itemText}"</p>
          <p>대비율: ${ratio}:1</p>
          <p>텍스트 색상: ${textColor}, 배경 색상: ${bgColor}</p>
        </div>
      `;
        });
    }

    // --- 성공 항목 ---
    const contrastPasses = contrastTotal - contrastFails;
    if (contrastPasses > 0) {
        reportHtml += `<h3>색상 대비 적합 항목 (${contrastPasses}개)</h3>`;

        document.querySelectorAll('.contrast-item.contrast-pass').forEach(item => {
            const itemText = item.querySelector('.item-text')?.textContent || '항목 없음';
            const ratio = item.querySelector('.ratio-value strong')?.textContent.replace(':1', '') || '?';
            const textColor = item.querySelector('.color-chip:first-child .color-code')?.textContent || '#000000';
            const bgColor = item.querySelector('.color-chip:last-child .color-code')?.textContent || '#FFFFFF';

            reportHtml += `
        <div class="pass-item">
          <p>텍스트: "${itemText}"</p>
          <p>대비율: ${ratio}:1</p>
          <p>텍스트 색상: ${textColor}, 배경 색상: ${bgColor}</p>
        </div>
      `;
        });
    }

    // --- WCAG 분석 ---
    reportHtml += `
      </div>
      <div class="report-section">
        <h2>웹 접근성 분석</h2>
        <div class="summary-box">
          <p>이 보고서는 한국형 웹 콘텐츠 접근성 지침 2.2를 기준으로 페이지를 분석한 결과입니다.</p>
        </div>
  `;

    for (const [key, category] of Object.entries(KWCAG22)) {
        reportHtml += `<h3>${category.name}</h3>`;

        const items = Array.from(document.querySelectorAll(`#tab-content-wcag .guideline-item[data-category="${key}"]`));
        if (items.length === 0) continue;

        items.forEach(item => {
            const title = item.querySelector('h4')?.textContent.trim() || '';
            const desc = item.querySelector('p')?.textContent.trim() || '';
            const status = item.classList.contains('pass') ? 'pass' :
                item.classList.contains('fail') ? 'fail' : 'review';
            const message = item.querySelector('p:nth-child(3)')?.textContent.trim() || '';

            reportHtml += `
        <div class="${status}-item">
          <p><strong>${title}</strong></p>
          <p>${desc}</p>
          ${message ? `<p>${message}</p>` : ''}
        </div>
      `;
        });
    }

    // --- UDL 분석 ---
    reportHtml += `
      </div>
      <div class="report-section">
        <h2>UDL 원칙 분석</h2>
        <div class="summary-box">
          <p>UDL(보편적 학습 설계) 원칙에 따른 웹 페이지 분석 결과입니다.</p>
        </div>
  `;

    for (const [key, principle] of Object.entries(UDL_PRINCIPLES)) {
        reportHtml += `
      <h3>${principle.name}</h3>
      <p>${principle.desc}</p>
      <ul>
    `;
        principle.suggestions.forEach(suggestion => {
            reportHtml += `<li>${suggestion}</li>`;
        });
        reportHtml += `</ul>`;
    }

    // --- AI 분석 결과 ---
    const aiResponseDiv = document.querySelector('#tab-content-udl .ai-response');
    if (aiResponseDiv) {
        reportHtml += `
      <h3>AI 분석 결과</h3>
      <div class="summary-box">
        ${aiResponseDiv.innerHTML}
      </div>
    `;
    }

    reportHtml += `
      </div>
      <footer>
        <p>이 보고서는 UDL 분석 도구에 의해 자동 생성되었습니다.</p>
        <p>axe-core 버전: ${window.axeResults?.testEngine?.version || '정보 없음'}</p>
        <p>생성일시: ${timestamp}</p>
      </footer>
    </body>
    </html>
  `;

    // --- 파일 다운로드 처리 ---
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportTitle.replace(/\s+/g, '-')}-접근성-보고서-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

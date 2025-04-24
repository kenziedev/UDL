// src/core/reportGenerator.js
export function generateReport({ contrastData, wcagData, udlData, aiSummary }) {
    const timestamp = new Date().toLocaleString();
    const title = document.title || 'Untitled Page';
    const url = window.location.href;

    const reportHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>${title} - 웹 접근성 보고서</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        h1 { color: #1a73e8; }
        h2 { margin-top: 30px; color: #333; border-bottom: 1px solid #eee; }
        .section { margin-bottom: 20px; }
        .item { padding: 8px; border-left: 4px solid #ccc; margin: 8px 0; }
        .fail { border-color: #e53935; background: #fdecea; }
        .pass { border-color: #43a047; background: #e8f5e9; }
      </style>
    </head>
    <body>
      <h1>${title} - 웹 접근성 분석 보고서</h1>
      <p><strong>URL:</strong> ${url}</p>
      <p><strong>생성일:</strong> ${timestamp}</p>

      <div class="section">
        <h2>색상 대비 분석</h2>
        ${contrastData.map(item => `
          <div class="item ${item.status}">
            <p><strong>${item.text}</strong></p>
            <p>대비율: ${item.contrast}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>WCAG 분석</h2>
        ${wcagData.map(item => `
          <div class="item ${item.status}">
            <p><strong>${item.id}: ${item.title}</strong></p>
            <p>${item.message}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>UDL 분석</h2>
        <ul>
          ${udlData.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      ${aiSummary ? `
        <div class="section">
          <h2>AI 분석 요약</h2>
          <div>${aiSummary}</div>
        </div>` : ''}

    </body>
    </html>
  `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const urlObj = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlObj;
    a.download = `${title.replace(/\s+/g, '-')}-접근성-보고서.html`;
    a.click();
    URL.revokeObjectURL(urlObj);
}
export const downloadReport = generateReport;
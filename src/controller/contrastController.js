import { parseColor, calculateContrast, rgbToHex } from '../utils/contrastUtil.js';
import { removeHighlights } from '../utils/contrastUtil.js'; // highlight 지울 때

export function checkColorContrast() {
    const contrastContent = document.getElementById('tab-content-contrast');
    contrastContent.innerHTML = '<div class="loading">색상 대비 검사 중...</div>';

    setTimeout(() => {
        const els = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li, td, th, div, label, button'))
            .filter(el => {
                if (el.closest('#udl-accessibility-panel')) return false;
                const txt = el.textContent.trim();
                if (!txt) return false;
                const s = window.getComputedStyle(el);
                return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0' && el.offsetParent !== null;
            });

        const results = els.map(el => {
            const s = window.getComputedStyle(el);
            let bg = s.backgroundColor;
            let bgElement = el;

            if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
                let p = el.parentElement;
                while (p) {
                    const ps = window.getComputedStyle(p);
                    const pb = ps.backgroundColor;
                    if (pb !== 'transparent' && pb !== 'rgba(0, 0, 0, 0)') {
                        bg = pb;
                        bgElement = p;
                        break;
                    }
                    p = p.parentElement;
                }
            }

            if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
                const docStyle = window.getComputedStyle(document.body);
                bg = docStyle.backgroundColor || 'rgb(255,255,255)';
                bgElement = document.body;
            }

            const tc = parseColor(s.color);
            const bc = parseColor(bg);
            const cr = calculateContrast(tc, bc);

            const fs = parseFloat(s.fontSize);
            const fw = s.fontWeight;
            const isLargeText = fs >= 18 || (fs >= 14 && (parseInt(fw) >= 700 || fw === 'bold'));

            return {
                el,
                bgElement,
                text: el.textContent.trim().slice(0, 30) + (el.textContent.length > 30 ? '...' : ''),
                contrast: cr,
                aa: isLargeText ? cr >= 3 : cr >= 4.5,
                aaa: isLargeText ? cr >= 4.5 : cr >= 7,
                fs,
                fw,
                textColor: s.color,
                textColorHex: rgbToHex(tc.r, tc.g, tc.b),
                bgColor: bg,
                bgColorHex: rgbToHex(bc.r, bc.g, bc.b),
                elementHTML: el.outerHTML.split('>')[0] + '>',
                bgElementHTML: bgElement !== el ? bgElement.outerHTML.split('>')[0] + '>' : ''
            };
        });

        displayContrastResults(results);
    }, 500);
}

export function displayContrastResults(results) {
    const c = document.getElementById('tab-content-contrast');
    c.innerHTML = '';

    const fails = results.filter(r => !r.aa);
    const passes = results.filter(r => r.aa);
    const total = results.length;
    const pct = total ? Math.round(passes.length / total * 100) : 0;

    // 색상 대비 평가 기준 설명 추가
    const contrastGuide = document.createElement('div');
    contrastGuide.className = 'contrast-guide';
    contrastGuide.innerHTML = `
        <div class="contrast-guide-header">
          <h3>색상 대비 평가 기준 <span class="info-icon" id="contrast-info-icon">ⓘ</span></h3>
          <div class="contrast-tooltip" id="contrast-tooltip">
            <div class="tooltip-content">
              <div class="tooltip-header">텍스트 콘텐츠의 명도 대비 기준</div>
              <div class="tooltip-item"><span class="tooltip-label">일반 텍스트:</span> 명도 대비 <strong>4.5:1</strong> 이상</div>
              <div class="tooltip-item"><span class="tooltip-label">큰 텍스트(18pt 이상 또는 14pt 이상 굵은 글꼴):</span> 명도 대비 <strong>3:1</strong> 이상</div>
              <div class="tooltip-item"><span class="tooltip-label">화면 확대 가능 콘텐츠:</span> 명도 대비 <strong>3:1</strong> 이상</div>
              <div class="tooltip-item"><span class="tooltip-label">예외:</span> 로고, 장식 목적의 콘텐츠, 마우스/키보드 포커스 시 명도 대비가 커지는 콘텐츠 등</div>
            </div>
          </div>
        </div>
      `;
    c.appendChild(contrastGuide);

    // 툴팁 동작 설정
    setTimeout(() => {
        const infoIcon = document.getElementById('contrast-info-icon');
        const tooltip = document.getElementById('contrast-tooltip');
        if (infoIcon && tooltip) {
            infoIcon.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });
            infoIcon.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
            infoIcon.addEventListener('focus', () => {
                tooltip.style.display = 'block';
            });
            infoIcon.addEventListener('blur', () => {
                tooltip.style.display = 'none';
            });
            // 접근성을 위한 키보드 이벤트 추가
            infoIcon.tabIndex = 0;
            infoIcon.setAttribute('role', 'button');
            infoIcon.setAttribute('aria-label', '색상 대비 평가 기준 정보');
        }
    }, 100);

    // 요약 정보 (간소화)
    const sum = document.createElement('div');
    sum.className = 'contrast-summary';
    sum.innerHTML = `
        <div class="contrast-summary-content">
          <div class="summary-stats">
            <div class="stats-row">
              <span>검사된 요소: <strong>${total}개</strong></span>
              <span class="pass-stat"><span class="dot pass-dot"></span> 통과: <strong>${passes.length}개</strong> (${pct}%)</span>
              <span class="fail-stat"><span class="dot fail-dot"></span> 실패: <strong>${fails.length}개</strong> (${100 - pct}%)</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width:${pct}%"></div>
            </div>
          </div>
        </div>
      `;
    c.appendChild(sum);

    // 탭 컨테이너 생성
    const tabContainer = document.createElement('div');
    tabContainer.className = 'contrast-tabs';
    tabContainer.innerHTML = `
        <div class="contrast-tab-header">
          <div class="contrast-tab-header-content">
            <div class="tab-buttons">
              <button id="tab-fail" class="contrast-tab-btn active" data-tab="fail">
                <span class="tab-icon fail-icon">⚠</span> 부적합 항목 (${fails.length})
              </button>
              <button id="tab-pass" class="contrast-tab-btn" data-tab="pass">
                <span class="tab-icon pass-icon">✓</span> 적합 항목 (${passes.length})
              </button>
              <button id="tab-manual" class="contrast-tab-btn" data-tab="manual">
                <span class="tab-icon manual-icon">⚙</span> 수동 검사
              </button>
            </div>
          </div>
        </div>
        <div id="contrast-tab-content" class="contrast-tab-content">
          <div id="contrast-tab-fail" class="contrast-tab-pane active"></div>
          <div id="contrast-tab-pass" class="contrast-tab-pane"></div>
          <div id="contrast-tab-manual" class="contrast-tab-pane"></div>
        </div>
      `;
    c.appendChild(tabContainer);

    // 탭 이벤트 설정 후에 수동 컬러 피커 도구 추가
    setTimeout(() => {
        // 기존 탭 설정 코드
        const tabButtons = document.querySelectorAll('.contrast-tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 모든 탭 비활성화
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.contrast-tab-pane').forEach(pane => pane.classList.remove('active'));

                // 클릭된 탭 활성화
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`contrast-tab-${tabId}`).classList.add('active');
            });
        });

        // 수동 컬러 피커 도구 추가
        const manualPickerTool = document.createElement('div');
        manualPickerTool.className = 'manual-color-picker-tool';
        manualPickerTool.innerHTML = `
          <div class="color-picker-info">
            <span class="info-text">웹 페이지에서 추출하기 어려운 색상이나 그라디언트, 이미지 등의 배경 위 텍스트 색상 대비를 수동으로 확인할 수 있습니다.</span>
          </div>
          <div class="color-picker-container">
            <div class="color-picker-row">
              <div class="color-input-group">
                <label for="text-color-picker">텍스트 색상:</label>
                <button id="text-color-button" class="color-button">
                  <span class="color-preview-btn" style="background-color:#000000"></span>
                  <input type="color" id="text-color-picker" value="#000000">
                </button>
                <input type="text" id="text-color-hex" value="#000000" placeholder="#000000">
              </div>
              <div class="color-input-group">
                <label for="bg-color-picker">배경 색상:</label>
                <button id="bg-color-button" class="color-button">
                  <span class="color-preview-btn" style="background-color:#FFFFFF"></span>
                  <input type="color" id="bg-color-picker" value="#FFFFFF">
                </button>
                <input type="text" id="bg-color-hex" value="#FFFFFF" placeholder="#FFFFFF">
              </div>
            </div>
            <div class="color-preview-area">
              <div id="manual-color-sample" class="manual-color-sample" style="color: #000000; background-color: #FFFFFF;">
                샘플 텍스트
              </div>
              <div class="manual-contrast-result">
                <div class="contrast-result-text">대비율: <strong id="manual-contrast-ratio">21.00:1</strong> - <span id="manual-contrast-status" class="manual-contrast-status pass">WCAG AA/AAA 통과</span></div>
              </div>
            </div>
          </div>
        `;

        const manualPane = document.getElementById('contrast-tab-manual');
        manualPane.appendChild(manualPickerTool);

        // 수동 색상 피커 이벤트 설정
        const textColorPicker = document.getElementById('text-color-picker');
        const textColorHex = document.getElementById('text-color-hex');
        const bgColorPicker = document.getElementById('bg-color-picker');
        const bgColorHex = document.getElementById('bg-color-hex');
        const colorSample = document.getElementById('manual-color-sample');
        const contrastRatio = document.getElementById('manual-contrast-ratio');
        const contrastStatus = document.getElementById('manual-contrast-status');
        const textColorBtn = document.getElementById('text-color-button');
        const bgColorBtn = document.getElementById('bg-color-button');

        // 색상 버튼 클릭 시 피커 활성화
        textColorBtn.addEventListener('click', () => {
            textColorPicker.click();
        });

        bgColorBtn.addEventListener('click', () => {
            bgColorPicker.click();
        });

        // 색상 입력값 변경 시 대비율 계산 함수
        function updateManualContrast() {
            try {
                const textColor = parseColor(textColorPicker.value);
                const bgColor = parseColor(bgColorPicker.value);
                const ratio = calculateContrast(textColor, bgColor);

                colorSample.style.color = textColorPicker.value;
                colorSample.style.backgroundColor = bgColorPicker.value;
                document.querySelector('#text-color-button .color-preview-btn').style.backgroundColor = textColorPicker.value;
                document.querySelector('#bg-color-button .color-preview-btn').style.backgroundColor = bgColorPicker.value;

                contrastRatio.textContent = `${ratio.toFixed(2)}:1`;

                // 평가 기준 적용
                if (ratio >= 7) {
                    contrastStatus.className = 'manual-contrast-status pass';
                    contrastStatus.textContent = 'WCAG AA/AAA 통과';
                } else if (ratio >= 4.5) {
                    contrastStatus.className = 'manual-contrast-status pass';
                    contrastStatus.textContent = 'WCAG AA 통과 (AAA 실패)';
                } else if (ratio >= 3) {
                    contrastStatus.className = 'manual-contrast-status partial';
                    contrastStatus.textContent = '큰 텍스트만 WCAG AA 통과';
                } else {
                    contrastStatus.className = 'manual-contrast-status fail';
                    contrastStatus.textContent = 'WCAG 기준 실패';
                }
            } catch (e) {
                console.error('대비율 계산 오류:', e);
            }
        }

        // 색상 입력 필드 이벤트 연결
        textColorPicker.addEventListener('input', () => {
            textColorHex.value = textColorPicker.value.toUpperCase();
            updateManualContrast();
        });

        textColorHex.addEventListener('input', () => {
            if (/^#[0-9A-F]{6}$/i.test(textColorHex.value)) {
                textColorPicker.value = textColorHex.value;
                updateManualContrast();
            }
        });

        bgColorPicker.addEventListener('input', () => {
            bgColorHex.value = bgColorPicker.value.toUpperCase();
            updateManualContrast();
        });

        bgColorHex.addEventListener('input', () => {
            if (/^#[0-9A-F]{6}$/i.test(bgColorHex.value)) {
                bgColorPicker.value = bgColorHex.value;
                updateManualContrast();
            }
        });

        // 초기 대비율 계산
        updateManualContrast();
    }, 100);

    // 실패 항목 내용 생성
    const failPane = document.getElementById('contrast-tab-fail');
    if (fails.length) {
        const failItems = document.createElement('div');
        failItems.className = 'contrast-items';

        fails.forEach(r => {
            const item = document.createElement('div');
            item.className = 'contrast-item contrast-fail';

            // 기준에 대한 설명 툴팁 추가
            const criteriaText = r.fs >= 18 || (r.fs >= 14 && parseInt(r.fw) >= 700) ?
                '큰 텍스트 (3:1)' : '일반 텍스트 (4.5:1)';

            item.innerHTML = `
            <div class="item-header">
              <span class="label label-fail">실패</span>
              <span class="item-text">"${r.text}"</span>
            </div>
            <div class="item-details">
              <div class="contrast-info-row">
                <div class="color-sample-box" style="color: ${r.textColorHex}; background-color: ${r.bgColorHex}">Abc</div>
                <div class="contrast-ratio">
                  <div class="ratio-value low-ratio">${criteriaText} - 대비율: <strong>${r.contrast.toFixed(2)}:1</strong></div>
                  <div class="color-info">
                    <span class="color-chip">
                      <span class="color-preview" style="background-color:${r.textColorHex}"></span>
                      <span class="color-code">${r.textColorHex}</span>
                    </span>
                    <span class="color-chip">
                      <span class="color-preview" style="background-color:${r.bgColorHex}"></span>
                      <span class="color-code">${r.bgColorHex}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="element-code-preview">
                <button class="code-toggle">코드 보기</button>
                <div class="code-content">
                  <code class="element-html">텍스트 요소: ${escapeHTML(r.elementHTML)}</code>
                  ${r.bgElementHTML ? `<code class="bg-element-html">배경 요소: ${escapeHTML(r.bgElementHTML)}</code>` : ''}
                </div>
              </div>
            </div>
          `;

            item.onclick = (e) => {
                // 코드 토글 버튼 클릭 시 이벤트 처리
                if (e.target.classList.contains('code-toggle') || e.target.closest('.code-toggle')) {
                    const toggleBtn = e.target.classList.contains('code-toggle') ? e.target : e.target.closest('.code-toggle');
                    const codeContent = toggleBtn.nextElementSibling;
                    codeContent.classList.toggle('show');
                    toggleBtn.classList.toggle('active');
                    toggleBtn.textContent = codeContent.classList.contains('show') ? '코드 접기' : '코드 보기';
                    e.stopPropagation();
                    return;
                }

                // 코드 영역 클릭 시 이벤트 전파 중지
                if (e.target.closest('.code-content')) {
                    e.stopPropagation();
                    return;
                }

                removeHighlights();
                r.el.classList.add('item-highlight');
                r.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };

            failItems.appendChild(item);
        });

        failPane.appendChild(failItems);
    } else {
        failPane.innerHTML = '<div class="empty-message">부적합 항목이 없습니다.</div>';
    }

    // 통과 항목 내용 생성
    const passPane = document.getElementById('contrast-tab-pass');
    if (passes.length) {
        const passItems = document.createElement('div');
        passItems.className = 'contrast-items';

        passes.forEach(r => {
            const item = document.createElement('div');
            item.className = 'contrast-item contrast-pass';

            const labels = [];
            if (r.aa) labels.push(`<span class="label label-aa" title="WCAG 2.0 AA 기준 통과">AA</span>`);
            if (r.aaa) labels.push(`<span class="label label-aaa" title="WCAG 2.0 AAA 기준 통과">AAA</span>`);

            // 기준에 대한 설명 툴팁 추가
            const criteriaText = r.fs >= 18 || (r.fs >= 14 && parseInt(r.fw) >= 700) ?
                '큰 텍스트 (3:1)' : '일반 텍스트 (4.5:1)';

            item.innerHTML = `
            <div class="item-header">
              ${labels.join(' ')}
              <span class="item-text">"${r.text}"</span>
            </div>
            <div class="item-details">
              <div class="contrast-info-row">
                <div class="color-sample-box" style="color: ${r.textColorHex}; background-color: ${r.bgColorHex}">Abc</div>
                <div class="contrast-ratio">
                  <div class="ratio-value high-ratio">${criteriaText} - 대비율: <strong>${r.contrast.toFixed(2)}:1</strong></div>
                  <div class="color-info">
                    <span class="color-chip">
                      <span class="color-preview" style="background-color:${r.textColorHex}"></span>
                      <span class="color-code">${r.textColorHex}</span>
                    </span>
                    <span class="color-chip">
                      <span class="color-preview" style="background-color:${r.bgColorHex}"></span>
                      <span class="color-code">${r.bgColorHex}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="element-code-preview">
                <button class="code-toggle">코드 보기</button>
                <div class="code-content">
                  <code class="element-html">텍스트 요소: ${escapeHTML(r.elementHTML)}</code>
                  ${r.bgElementHTML ? `<code class="bg-element-html">배경 요소: ${escapeHTML(r.bgElementHTML)}</code>` : ''}
                </div>
              </div>
            </div>
          `;

            item.onclick = (e) => {
                // 코드 토글 버튼 클릭 시 이벤트 처리
                if (e.target.classList.contains('code-toggle') || e.target.closest('.code-toggle')) {
                    const toggleBtn = e.target.classList.contains('code-toggle') ? e.target : e.target.closest('.code-toggle');
                    const codeContent = toggleBtn.nextElementSibling;
                    codeContent.classList.toggle('show');
                    toggleBtn.classList.toggle('active');
                    toggleBtn.textContent = codeContent.classList.contains('show') ? '코드 접기' : '코드 보기';
                    e.stopPropagation();
                    return;
                }

                // 코드 영역 클릭 시 이벤트 전파 중지
                if (e.target.closest('.code-content')) {
                    e.stopPropagation();
                    return;
                }

                removeHighlights();
                r.el.classList.add('item-highlight');
                r.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };

            passItems.appendChild(item);
        });

        passPane.appendChild(passItems);
    } else {
        passPane.innerHTML = '<div class="empty-message">적합 항목이 없습니다.</div>';
    }

    // HTML 문자열 이스케이프 함수
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // CSS 스타일 추가
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .contrast-guide {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 10px;
          margin: 0 12px 12px 12px;
          border-left: 3px solid #4285f4;
        }
        
        .contrast-guide-header {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .contrast-guide-header h3 {
          margin: 0;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        
        .info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4285f4;
          color: white;
          font-size: 11px;
          margin-left: 6px;
          cursor: pointer;
        }
        
        .contrast-tooltip {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ddd;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 10px;
          z-index: 1000;
          width: 300px;
          margin-top: 8px;
        }
        
        .tooltip-content h4 {
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .tooltip-content p {
          margin: 6px 0;
          font-size: 13px;
          line-height: 1.4;
        }
        
        /* 요약 정보 간소화 */
        .contrast-summary {
          background-color: white;
          border-radius: 8px;
          padding: 10px;
          margin: 0 12px 12px 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .contrast-summary-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .summary-stats {
          font-size: 13px;
        }
        
        .summary-stats p {
          margin: 0;
        }
        
        .progress-container {
          width: 100%;
        }
        
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }
        
        .pass-dot {
          background-color: #34a853;
        }
        
        .fail-dot {
          background-color: #ea4335;
        }
        
        .pass-stat {
          color: #34a853;
        }
        
        .fail-stat {
          color: #ea4335;
        }
        
        .progress-bar {
          height: 6px;
          background-color: #f2f2f2;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: #34a853;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        /* 탭 스타일 개선 */
        .contrast-tabs {
          margin: 0 12px;
        }
        
        .contrast-tab-header {
          margin-bottom: 10px;
        }
        
        .contrast-tab-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .tab-buttons {
          display: flex;
          gap: 4px;
        }
        
        .contrast-tab-btn {
          padding: 8px 12px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          color: #666;
          transition: all 0.2s;
        }
        
        .contrast-tab-btn:hover {
          background-color: #f5f5f5;
        }
        
        .contrast-tab-btn.active {
          border-bottom-color: #4285f4;
          color: #4285f4;
        }
        
        .tab-icon {
          margin-right: 6px;
        }
        
        .fail-icon {
          color: #ea4335;
        }
        
        .pass-icon {
          color: #34a853;
        }
        
        .manual-icon {
          color: #4285f4;
        }
        
        .contrast-tab-pane {
          display: none;
        }
        
        .contrast-tab-pane.active {
          display: block;
        }
        
        /* 카드 아이템 스타일 */
        .contrast-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
          padding-bottom: 16px;
        }
        
        .contrast-item {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          overflow: hidden;
          border: 1px solid #eee;
          transition: all 0.2s;
        }
        
        .contrast-item:hover {
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .item-header {
          padding: 10px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        
        .item-text {
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .item-details {
          padding: 10px;
        }
        
        .contrast-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .color-sample-box {
          width: 55px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #eee;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          flex-shrink: 0;
          text-align: center;
        }
        
        .contrast-ratio {
          flex: 1;
          text-align: left;
        }
        
        .ratio-value {
          font-size: 13px;
          margin-bottom: 5px;
          text-align: left;
        }
        
        .low-ratio {
          color: #ea4335;
        }
        
        .high-ratio {
          color: #34a853;
        }
        
        .color-info {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          text-align: left;
        }
        
        .color-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 6px;
          background-color: #f8f9fa;
          border: 1px solid #eee;
          border-radius: 4px;
          font-size: 11px;
          text-align: left;
        }
        
        .color-preview {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        
        .color-code {
          font-family: monospace;
          color: #444;
          text-align: left;
        }
        
        .element-code-preview {
          margin-top: 8px;
          border-top: 1px solid #eee;
          padding-top: 8px;
          text-align: left;
        }
        
        .code-toggle {
          font-size: 12px;
          color: #4285f4;
          cursor: pointer;
          padding: 3px 6px;
          background: none;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 3px;
          margin: 0;
          text-align: left;
        }
        
        .code-toggle:hover {
          color: #2b71d9;
          background-color: #f5f5f5;
        }
        
        .code-toggle::before {
          content: '▶';
          font-size: 9px;
          transition: transform 0.2s ease;
        }
        
        .code-toggle.active::before {
          transform: rotate(90deg);
        }
        
        .code-content {
          display: none;
          background-color: #f8f9fa;
          border-radius: 4px;
          margin-top: 6px;
          overflow: hidden;
        }
        
        .code-content.show {
          display: block;
        }
        
        .element-html, .bg-element-html {
          display: block;
          font-family: monospace;
          font-size: 11px;
          padding: 8px;
          overflow-x: auto;
          white-space: pre-wrap;
          color: #444;
          line-height: 1.4;
          text-align: left;
        }
        
        .bg-element-html {
          border-top: 1px dashed #ddd;
          background-color: #f1f3f5;
        }
        
        .label {
          display: inline-flex;
          align-items: center;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          line-height: 1;
        }
        
        .label-fail {
          background-color: #ffebee;
          color: #d32f2f;
        }
        
        .label-aa {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .label-aaa {
          background-color: #e3f2fd;
          color: #1565c0;
        }
        
        .empty-message {
          text-align: center;
          padding: 20px;
          color: #888;
          font-style: italic;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        
        /* 수동 검사 도구 */
        .manual-color-picker-tool {
          padding: 16px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          margin-bottom: 16px;
        }
        
        .color-picker-info {
          margin-bottom: 16px;
        }
        
        .info-text {
          font-size: 13px;
          color: #666;
        }
        
        .color-picker-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .color-picker-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .color-input-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .color-input-group label {
          font-size: 13px;
          font-weight: 500;
        }
        
        .color-button {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid #ddd;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          background: none;
        }
        
        .color-preview-btn {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        input[type="color"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        input[type="text"] {
          padding: 8px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: monospace;
          font-size: 13px;
          width: 80px;
        }
        
        .color-preview-area {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .manual-color-sample {
          padding: 16px;
          text-align: center;
          font-size: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }
        
        .manual-contrast-result {
          background-color: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }
        
        .contrast-result-text {
          font-size: 14px;
        }
        
        .manual-contrast-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          margin-left: 4px;
          font-size: 12px;
        }
        
        .manual-contrast-status.pass {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .manual-contrast-status.partial {
          background-color: #fff8e1;
          color: #ff8f00;
        }
        
        .manual-contrast-status.fail {
          background-color: #ffebee;
          color: #d32f2f;
        }
        
        /* 강조 효과 */
        .item-highlight {
          outline: 3px solid #4285f4 !important;
          outline-offset: 2px !important;
        }
      `;
    c.appendChild(styleEl);
}

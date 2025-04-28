import { KWCAG22 } from '../constants/KWCAG22.js';

// axe-core 스크립트 로드 (최초 1회)
export function loadAxeCore() {
    return new Promise((resolve, reject) => {
        if (window.axe) {
            return resolve(window.axe);
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js';
        script.onload = () => resolve(window.axe);
        script.onerror = () => reject(new Error('axe-core 로드 실패'));
        document.head.appendChild(script);
    });
}

// WCAG 규칙과 axe-core 규칙 매핑
function mapWCAGToAxeRules(wcagId) {
    const wcagToAxeMap = {
        '1.1.1': ['image-alt', 'input-image-alt', 'area-alt', 'svg-img-alt'],
        '1.2.1': ['audio-caption', 'video-caption'],
        '1.3.1': ['table-fake-caption', 'td-has-header', 'th-has-data-cells'],
        '1.3.2': ['logical-tab-order', 'heading-order'],
        '1.3.3': ['label', 'input-button-name', 'form-field-multiple-labels'],
        '1.4.1': ['link-in-text-block', 'color-contrast'],
        '1.4.3': ['color-contrast'],
        '2.1.1': ['accesskeys', 'focusable-no-name', 'area-alt'],
        '2.4.1': ['bypass', 'region'],
        '2.4.2': ['document-title', 'frame-title'],
        '2.4.3': ['link-name', 'button-name'],
        '3.1.1': ['html-lang-valid', 'html-has-lang'],
        '3.3.1': ['aria-input-field-name', 'label'],
        '3.3.2': ['label', 'input-button-name'],
        '4.1.1': ['duplicate-id-active', 'duplicate-id'],
        '4.1.2': ['aria-roles', 'aria-valid-attr', 'aria-required-attr']
    };
    return wcagToAxeMap[wcagId] || [];
}

// axe-core 결과에서 특정 규칙 관련 결과 추출
function getAxeResultsForRules(axeResults, ruleIds) {
    const violations = axeResults.violations.filter(v => ruleIds.includes(v.id));
    const incomplete = axeResults.incomplete.filter(v => ruleIds.includes(v.id));
    const passes = axeResults.passes.filter(v => ruleIds.includes(v.id));

    if (violations.length > 0) {
        const mostSevere = violations.sort((a, b) => {
            const impactOrder = { critical: 4, serious: 3, moderate: 2, minor: 1 };
            return impactOrder[b.impact] - impactOrder[a.impact];
        })[0];

        return {
            status: 'fail',
            message: `${mostSevere.help} (${mostSevere.nodes.length}개 요소)`,
            elements: mostSevere.nodes.slice(0, 3).map(node => {
                try {
                    return document.querySelector(node.target[0]);
                } catch {
                    return null;
                }
            }).filter(Boolean)
        };
    }

    if (incomplete.length > 0) {
        return {
            status: 'review',
            message: `수동 검토 필요: ${incomplete[0].help}`,
            elements: []
        };
    }

    if (passes.length > 0) {
        return {
            status: 'pass',
            message: `검사 통과 (${passes.reduce((sum, rule) => sum + rule.nodes.length, 0)}개 요소)`,
            elements: []
        };
    }

    return {
        status: 'inapplicable',
        message: '해당 없음',
        elements: []
    };
}

// WCAG 전체 분석 함수
export async function analyzeWCAG() {
    const wcagContent = document.getElementById('tab-content-wcag');
    wcagContent.innerHTML = '<div class="loading">접근성 분석 중...</div>';

    try {
        const axe = await loadAxeCore();
        const results = await axe.run(document, {
            resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable'],
            selectors: true
        });

        wcagContent.innerHTML = '';

        for (const [key, category] of Object.entries(KWCAG22)) {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<h3>${category.name}</h3>`;

            category.items.forEach(item => {
                const ruleIds = mapWCAGToAxeRules(item.id);
                const result = ruleIds.length ? getAxeResultsForRules(results, ruleIds) : {
                    status: 'review',
                    message: '수동 검토 필요',
                    elements: []
                };

                const itemDiv = document.createElement('div');
                itemDiv.className = `guideline-item ${result.status}`;
                itemDiv.setAttribute('data-guideline', item.id);
                itemDiv.setAttribute('data-category', key);

                let statusText = '';
                if (result.status === 'pass') statusText = '✓ 양호: ';
                if (result.status === 'fail') statusText = '✗ 문제점: ';
                if (result.status === 'review') statusText = '? 검토 필요: ';

                itemDiv.innerHTML = `
          <h4>${item.id} ${item.name}</h4>
          <p>${item.desc}</p>
          <p>${statusText}${result.message}</p>
        `;

                if (result.elements.length > 0) {
                    const btn = document.createElement('button');
                    btn.className = 'show-element-btn';
                    btn.textContent = '위반 요소 보기';
                    btn.onclick = () => {
                        const highlighted = document.querySelectorAll('.item-highlight');
                        highlighted.forEach(el => el.classList.remove('item-highlight'));
                        result.elements.forEach(el => {
                            el.classList.add('item-highlight');
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        });
                    };
                    itemDiv.appendChild(btn);
                }

                section.appendChild(itemDiv);
            });

            wcagContent.appendChild(section);
        }
    } catch (error) {
        console.error('WCAG 분석 오류:', error);
        wcagContent.innerHTML = '<div class="error">접근성 분석 중 오류가 발생했습니다.</div>';
    }
}

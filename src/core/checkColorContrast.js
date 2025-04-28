import { parseColor, calculateContrast, rgbToHex } from '../utils/contrastUtil.js';
import { displayContrastResults } from '../controller/contrastController.js';

export function checkColorContrast() {
    const contrastContent = document.getElementById('tab-content-contrast');
    contrastContent.innerHTML = '<div class="loading">색상 대비 검사 중...</div>';

    setTimeout(() => {
        // 검사할 요소 수집
        const els = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li, td, th, div, label, button'))
            .filter(el => {
                if (el.closest('#udl-accessibility-panel')) return false;
                const txt = el.textContent.trim();
                if (!txt) return false;

                const s = window.getComputedStyle(el);
                return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0' && el.offsetParent !== null;
            });

        // 검사 결과 계산
        const results = els.map(el => {
            const s = window.getComputedStyle(el);
            let bg = s.backgroundColor;
            let bgElement = el;

            // 부모를 타고 올라가며 실제 배경색 찾기
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

            // 최종 fallback (body 배경색 → 흰색)
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

        // 결과 표시
        displayContrastResults(results);
    }, 500);
}

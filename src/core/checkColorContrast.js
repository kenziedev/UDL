import { parseColor, calculateContrast, rgbToHex } from '../utils/contrastUtil.js';
import { displayContrastResults } from '../controller/contrastController.js';

/**
 * 색상 대비 검사를 위한 요소 수집 및 분석
 * @returns {Promise<Array>} 검사 결과 배열
 */
export async function analyzeColorContrast() {
    // 검사할 요소 수집
    const elements = collectTextElements();
    
    // 각 요소의 색상 대비 분석 (Promise.all로 병렬 처리)
    const results = await Promise.all(
        elements.map(element => analyzeElementContrast(element))
    );
    
    return results;
}

/**
 * 텍스트 요소 수집
 * @returns {Array} 검사 대상 요소들
 */
function collectTextElements() {
    const selectors = 'p, h1, h2, h3, h4, h5, h6, a, span, li, td, th, div, label, button';
    const elements = Array.from(document.querySelectorAll(selectors));
    const processedElements = new Set();
    const results = [];
    
    // 요소를 DOM 트리 순서대로 정렬
    elements.sort((a, b) => {
        const pos = a.compareDocumentPosition(b);
        return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    
    for (const el of elements) {
        // 이미 처리된 요소의 자식이면 건너뛰기
        if (Array.from(processedElements).some(processed => processed.contains(el))) {
            continue;
        }
        
        // 패널 내부 요소 제외
        if (el.closest('#udl-accessibility-panel')) {
            continue;
        }
        
        // 텍스트가 없거나 공백만 있는 경우 제외
        const text = el.textContent.trim();
        if (!text) {
            continue;
        }
        
        // 요소가 보이는지 확인
        const style = window.getComputedStyle(el);
        if (!isElementVisible(style, el)) {
            continue;
        }
        
        // 실제 텍스트 노드를 직접 포함하는 요소만 선택
        const hasDirectText = Array.from(el.childNodes).some(node => 
            node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );
        
        if (hasDirectText) {
            results.push(el);
            processedElements.add(el);
        }
    }
    
    return results;
}

/**
 * 요소 가시성 체크
 * @param {CSSStyleDeclaration} style 
 * @param {Element} element 
 * @returns {boolean}
 */
function isElementVisible(style, element) {
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' && 
           element.offsetParent !== null;
}

/**
 * 개별 요소의 색상 대비 분석
 * @param {Element} element 
 * @returns {Promise<Object>} 분석 결과
 */
async function analyzeElementContrast(element) {
    const style = window.getComputedStyle(element);
    const { backgroundColor, backgroundElement } = await findBackgroundColor(element, style);
    
    const textColor = parseColor(style.color);
    const bgColor = parseColor(backgroundColor);
    
    // 배경색이 제대로 파싱되지 않은 경우 기본값 사용
    if (!bgColor || (bgColor.r === 0 && bgColor.g === 0 && bgColor.b === 0)) {
        const fallbackBg = parseColor('rgb(255, 255, 255)');
        Object.assign(bgColor, fallbackBg);
    }
    
    const contrastRatio = calculateContrast(textColor, bgColor);
    
    // 폰트 크기 계산 개선
    let fontSize = parseFloat(style.fontSize);
    let fontWeight = style.fontWeight;
    
    // Bootstrap display 클래스 처리
    if (element.classList.contains('display-1')) fontSize = 96;
    else if (element.classList.contains('display-2')) fontSize = 88;
    else if (element.classList.contains('display-3')) fontSize = 80;
    else if (element.classList.contains('display-4')) fontSize = 72;
    else if (element.classList.contains('display-5')) fontSize = 64;
    else if (element.classList.contains('display-6')) fontSize = 56;
    
    // Bootstrap fw-* 클래스 처리
    if (element.classList.contains('fw-bold')) fontWeight = '700';
    else if (element.classList.contains('fw-bolder')) fontWeight = '800';
    else if (element.classList.contains('fw-semibold')) fontWeight = '600';
    else if (element.classList.contains('fw-medium')) fontWeight = '500';
    else if (element.classList.contains('fw-normal')) fontWeight = '400';
    else if (element.classList.contains('fw-light')) fontWeight = '300';
    else if (element.classList.contains('fw-lighter')) fontWeight = '200';
    
    const isLargeText = isLargeTextSize(fontSize, fontWeight);
    
    // 대비율 기준값 설정 (엄격한 기준 적용)
    const aaThreshold = isLargeText ? 3.0 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7.0;
    
    // 대비율을 소수점 둘째 자리까지 반올림
    const roundedContrast = Math.round(contrastRatio * 100) / 100;
    
    // 엄격한 비교를 위해 반올림된 값을 사용
    const isAAPass = roundedContrast > aaThreshold;
    const isAAAPass = roundedContrast > aaaThreshold;
    
    // 상태 메시지 생성
    let status = '실패';
    if (isAAAPass) {
        status = 'AAA';
    } else if (isAAPass) {
        status = 'AA';
    }
    
    // 텍스트 크기 상태 메시지 생성
    const sizeStatus = isLargeText ? 
        `큰 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1` : 
        `일반 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1`;
    
    // 디버깅을 위한 상세 정보
    const textSizeInfo = {
        fontSize,
        fontWeight,
        isLargeText,
        criteria: isLargeText ? 
            `18px 이상 또는 14px 이상 + bold (700+)` : 
            `18px 미만 또는 14px 미만 또는 bold 아님`,
        classes: Array.from(element.classList).join(', ')
    };
    
    return {
        element,
        backgroundElement,
        text: truncateText(element.textContent.trim(), 30),
        contrast: roundedContrast,
        aa: isAAPass,
        aaa: isAAAPass,
        status,
        fontSize,
        fontWeight,
        isLargeText,
        sizeStatus,
        textSizeInfo,
        textColor: style.color,
        textColorHex: rgbToHex(textColor.r, textColor.g, textColor.b),
        backgroundColor,
        backgroundColorHex: rgbToHex(bgColor.r, bgColor.g, bgColor.b),
        elementHTML: element.outerHTML.split('>')[0] + '>',
        backgroundElementHTML: backgroundElement !== element ? 
            backgroundElement.outerHTML.split('>')[0] + '>' : '',
        requiredContrast: aaThreshold,
        requiredContrastLarge: 3.0,
        requiredContrastNormal: 4.5
    };
}

/**
 * 배경색 찾기 (부모 요소 탐색 포함)
 * @param {Element} element 
 * @param {CSSStyleDeclaration} style 
 * @returns {Promise<Object>} {backgroundColor, backgroundElement}
 */
async function findBackgroundColor(element, style) {
    // 1. 특정 클래스를 가진 요소의 경우 특별 처리
    if (element.classList.contains('bookmarklet-guide') || 
        element.classList.contains('step-item') ||
        element.closest('.bookmarklet-guide') ||
        element.closest('.step-item')) {
        // 히어로 섹션 찾기
        const heroSection = element.closest('.hero-section');
        if (heroSection) {
            const heroStyle = window.getComputedStyle(heroSection);
            const heroBgImage = heroStyle.backgroundImage;
            if (heroBgImage && heroBgImage !== 'none') {
                if (heroBgImage.includes('linear-gradient') || heroBgImage.includes('radial-gradient')) {
                    const gradientColors = extractGradientColors(heroBgImage);
                    if (gradientColors.length > 0) {
                        const avgColor = averageGradientColors(gradientColors);
                        return {
                            backgroundColor: avgColor,
                            backgroundElement: heroSection
                        };
                    }
                }
            }
        }
    }

    // 2. 현재 요소의 배경색이 반투명한 경우, 부모 요소의 배경을 먼저 확인
    let backgroundColor = style.backgroundColor;
    if (backgroundColor && backgroundColor.startsWith('rgba')) {
        const rgbaMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
            const alpha = parseFloat(rgbaMatch[4] || '1');
            // 반투명도가 0.5 이하인 경우 부모 배경을 우선 사용
            if (alpha <= 0.5) {
                // 히어로 섹션 확인
                const heroSection = element.closest('.hero-section');
                if (heroSection) {
                    const heroStyle = window.getComputedStyle(heroSection);
                    const heroBgImage = heroStyle.backgroundImage;
                    if (heroBgImage && heroBgImage !== 'none') {
                        if (heroBgImage.includes('linear-gradient') || heroBgImage.includes('radial-gradient')) {
                            const gradientColors = extractGradientColors(heroBgImage);
                            if (gradientColors.length > 0) {
                                const avgColor = averageGradientColors(gradientColors);
                                return {
                                    backgroundColor: avgColor,
                                    backgroundElement: heroSection
                                };
                            }
                        }
                    }
                }
                
                const parentBg = await findParentBackgroundColor(element, true);
                if (parentBg) {
                    return parentBg;
                }
            }
        }
    }

    // 3. 현재 요소의 배경 이미지 확인 (그라데이션)
    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== 'none') {
        if (bgImage.includes('linear-gradient') || bgImage.includes('radial-gradient')) {
            const gradientColors = extractGradientColors(bgImage);
            if (gradientColors.length > 0) {
                const avgColor = averageGradientColors(gradientColors);
                return {
                    backgroundColor: avgColor,
                    backgroundElement: element
                };
            }
        }
    }
    
    // 4. 현재 요소의 배경색 확인
    if (backgroundColor) {
        // rgba 색상 처리
        if (backgroundColor.startsWith('rgba')) {
            const rgbaMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbaMatch) {
                const [_, r, g, b, a] = rgbaMatch;
                const alpha = parseFloat(a || '1');
                
                // 반투명 배경인 경우 부모 요소의 배경색과 혼합
                if (alpha < 1) {
                    // 히어로 섹션 확인
                    const heroSection = element.closest('.hero-section');
                    if (heroSection) {
                        const heroStyle = window.getComputedStyle(heroSection);
                        const heroBgImage = heroStyle.backgroundImage;
                        if (heroBgImage && heroBgImage !== 'none') {
                            if (heroBgImage.includes('linear-gradient') || heroBgImage.includes('radial-gradient')) {
                                const gradientColors = extractGradientColors(heroBgImage);
                                if (gradientColors.length > 0) {
                                    const avgColor = averageGradientColors(gradientColors);
                                    const mixedColor = blendColors(
                                        `rgb(${r}, ${g}, ${b})`,
                                        avgColor,
                                        alpha
                                    );
                                    return {
                                        backgroundColor: mixedColor,
                                        backgroundElement: element
                                    };
                                }
                            }
                        }
                    }
                    
                    const parentBg = await findParentBackgroundColor(element, true);
                    if (parentBg) {
                        const mixedColor = blendColors(
                            `rgb(${r}, ${g}, ${b})`,
                            parentBg.backgroundColor,
                            alpha
                        );
                        return {
                            backgroundColor: mixedColor,
                            backgroundElement: element
                        };
                    }
                }
                
                // 완전 불투명한 경우 rgb로 변환
                return {
                    backgroundColor: `rgb(${r}, ${g}, ${b})`,
                    backgroundElement: element
                };
            }
        }
        
        if (!isTransparent(backgroundColor)) {
            return { backgroundColor, backgroundElement: element };
        }
    }
    
    // 5. 부모 요소 탐색
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 5;
    
    while (parent && depth < maxDepth) {
        // 히어로 섹션 확인
        if (parent.classList.contains('hero-section')) {
            const parentStyle = window.getComputedStyle(parent);
            const parentBgImage = parentStyle.backgroundImage;
            if (parentBgImage && parentBgImage !== 'none') {
                if (parentBgImage.includes('linear-gradient') || parentBgImage.includes('radial-gradient')) {
                    const gradientColors = extractGradientColors(parentBgImage);
                    if (gradientColors.length > 0) {
                        const avgColor = averageGradientColors(gradientColors);
                        return {
                            backgroundColor: avgColor,
                            backgroundElement: parent
                        };
                    }
                }
            }
        }
        
        const parentStyle = window.getComputedStyle(parent);
        
        // 부모 요소의 배경 이미지 확인
        const parentBgImage = parentStyle.backgroundImage;
        if (parentBgImage && parentBgImage !== 'none') {
            if (parentBgImage.includes('linear-gradient') || parentBgImage.includes('radial-gradient')) {
                const gradientColors = extractGradientColors(parentBgImage);
                if (gradientColors.length > 0) {
                    const avgColor = averageGradientColors(gradientColors);
                    return {
                        backgroundColor: avgColor,
                        backgroundElement: parent
                    };
                }
            }
        }
        
        // 부모 요소의 배경색 확인
        const parentBg = parentStyle.backgroundColor;
        if (parentBg) {
            // rgba 색상 처리
            if (parentBg.startsWith('rgba')) {
                const rgbaMatch = parentBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (rgbaMatch) {
                    const [_, r, g, b, a] = rgbaMatch;
                    const alpha = parseFloat(a || '1');
                    
                    // 반투명 배경인 경우 상위 부모 요소의 배경색과 혼합
                    if (alpha < 1) {
                        const grandParentBg = await findParentBackgroundColor(parent, true);
                        if (grandParentBg) {
                            const mixedColor = blendColors(
                                `rgb(${r}, ${g}, ${b})`,
                                grandParentBg.backgroundColor,
                                alpha
                            );
                            return {
                                backgroundColor: mixedColor,
                                backgroundElement: parent
                            };
                        }
                    }
                    
                    // 완전 불투명한 경우 rgb로 변환
                    return {
                        backgroundColor: `rgb(${r}, ${g}, ${b})`,
                        backgroundElement: parent
                    };
                }
            }
            
            if (!isTransparent(parentBg)) {
                return { backgroundColor: parentBg, backgroundElement: parent };
            }
        }
        
        parent = parent.parentElement;
        depth++;
    }
    
    // 6. body 배경 확인
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyBgImage = bodyStyle.backgroundImage;
    
    if (bodyBgImage && bodyBgImage !== 'none') {
        if (bodyBgImage.includes('linear-gradient') || bodyBgImage.includes('radial-gradient')) {
            const gradientColors = extractGradientColors(bodyBgImage);
            if (gradientColors.length > 0) {
                const avgColor = averageGradientColors(gradientColors);
                return {
                    backgroundColor: avgColor,
                    backgroundElement: document.body
                };
            }
        }
    }
    
    const bodyBg = bodyStyle.backgroundColor;
    if (!isTransparent(bodyBg)) {
        return { backgroundColor: bodyBg, backgroundElement: document.body };
    }
    
    // 7. 기본값 사용
    return {
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundElement: document.body
    };
}

/**
 * 그라데이션에서 색상 추출
 * @param {string} gradientString 
 * @returns {string[]} 색상 배열
 */
function extractGradientColors(gradientString) {
    const colors = [];
    
    // linear-gradient와 radial-gradient 모두 처리
    const colorMatches = gradientString.match(/(?:rgb|rgba|#)[\w\d\s,()%.]+/g);
    if (colorMatches) {
        colors.push(...colorMatches.map(color => {
            // rgba를 rgb로 변환
            if (color.startsWith('rgba')) {
                const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (rgbMatch) {
                    return `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`;
                }
            }
            return color;
        }));
    }
    
    return colors;
}

/**
 * 색상이 투명한지 확인
 * @param {string} color 
 * @returns {boolean}
 */
function isTransparent(color) {
    if (!color) return true;
    if (color === 'transparent') return true;
    if (color === 'rgba(0, 0, 0, 0)') return true;
    
    // rgba 형식에서 알파값이 0인 경우
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch && rgbaMatch[4] === '0') return true;
    
    return false;
}

/**
 * 큰 텍스트 여부 확인
 * @param {number} fontSize 
 * @param {string} fontWeight 
 * @returns {boolean}
 */
function isLargeTextSize(fontSize, fontWeight) {
    // font-weight를 숫자로 변환
    let weight = fontWeight;
    if (typeof fontWeight === 'string') {
        switch (fontWeight.toLowerCase()) {
            case 'normal': weight = 400; break;
            case 'bold': weight = 700; break;
            case 'bolder': weight = 800; break;
            case 'lighter': weight = 300; break;
            default: weight = parseInt(fontWeight) || 400;
        }
    }
    
    // WCAG 2.1 기준:
    // 1. 18pt (18px) 이상의 텍스트
    // 2. 14pt (14px) 이상이면서 bold (700 이상)인 텍스트
    const isLarge = fontSize >= 18 || (fontSize >= 14 && weight >= 700);
    
    return isLarge;
}

/**
 * 텍스트 길이 제한
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

/**
 * 두 색상을 알파값에 따라 혼합
 * @param {string} color1 - 전경색 (rgba)
 * @param {string} color2 - 배경색 (rgb)
 * @param {number} alpha - 알파값
 * @returns {string} 혼합된 rgb 색상
 */
function blendColors(color1, color2, alpha) {
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    
    const r = Math.round(c1.r * alpha + c2.r * (1 - alpha));
    const g = Math.round(c1.g * alpha + c2.g * (1 - alpha));
    const b = Math.round(c1.b * alpha + c2.b * (1 - alpha));
    
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 부모 요소의 배경색 찾기
 * @param {Element} element 
 * @param {boolean} checkGradient - 그라데이션 배경을 우선적으로 확인할지 여부
 * @returns {Promise<Object|null>} {backgroundColor, backgroundElement} 또는 null
 */
async function findParentBackgroundColor(element, checkGradient = false) {
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 5;
    
    while (parent && depth < maxDepth) {
        const parentStyle = window.getComputedStyle(parent);
        
        // 그라데이션 배경 우선 확인
        if (checkGradient) {
            const parentBgImage = parentStyle.backgroundImage;
            if (parentBgImage && parentBgImage !== 'none') {
                if (parentBgImage.includes('linear-gradient') || parentBgImage.includes('radial-gradient')) {
                    const gradientColors = extractGradientColors(parentBgImage);
                    if (gradientColors.length > 0) {
                        const avgColor = averageGradientColors(gradientColors);
                        return {
                            backgroundColor: avgColor,
                            backgroundElement: parent
                        };
                    }
                }
            }
        }
        
        const parentBg = parentStyle.backgroundColor;
        if (!isTransparent(parentBg)) {
            return { backgroundColor: parentBg, backgroundElement: parent };
        }
        
        parent = parent.parentElement;
        depth++;
    }
    
    const bodyStyle = window.getComputedStyle(document.body);
    if (checkGradient) {
        const bodyBgImage = bodyStyle.backgroundImage;
        if (bodyBgImage && bodyBgImage !== 'none') {
            if (bodyBgImage.includes('linear-gradient') || bodyBgImage.includes('radial-gradient')) {
                const gradientColors = extractGradientColors(bodyBgImage);
                if (gradientColors.length > 0) {
                    const avgColor = averageGradientColors(gradientColors);
                    return {
                        backgroundColor: avgColor,
                        backgroundElement: document.body
                    };
                }
            }
        }
    }
    
    const bodyBg = bodyStyle.backgroundColor;
    if (!isTransparent(bodyBg)) {
        return { backgroundColor: bodyBg, backgroundElement: document.body };
    }
    
    return null;
}

/**
 * 그라데이션 색상들의 평균값 계산
 * @param {string[]} colors 
 * @returns {string} 평균 rgb 색상
 */
function averageGradientColors(colors) {
    if (colors.length === 0) return 'rgb(255, 255, 255)';
    if (colors.length === 1) return colors[0];
    
    const colorValues = colors.map(color => parseColor(color));
    const avg = colorValues.reduce((acc, color) => ({
        r: acc.r + color.r,
        g: acc.g + color.g,
        b: acc.b + color.b
    }), { r: 0, g: 0, b: 0 });
    
    return `rgb(${Math.round(avg.r / colors.length)}, ${Math.round(avg.g / colors.length)}, ${Math.round(avg.b / colors.length)})`;
}

import { parseColor, calculateContrast, rgbToHex } from '../utils/contrastUtil.js';
import { displayContrastResults } from '../controller/contrastController.js';

/**
 * 색상 대비 검사를 위한 요소 수집 및 분석
 * @returns {Promise<Array>} 검사 결과 배열
 */
export async function analyzeColorContrast() {
    try {
        // 검사할 요소 수집
        const elements = collectTextElements();
        if (!elements || elements.length === 0) {
            console.warn('No text elements found for contrast analysis');
            return [];
        }
        
        // 각 요소의 색상 대비 분석 (Promise.all로 병렬 처리)
        const results = await Promise.all(
            elements.map(async element => {
                try {
                    if (!element || !element.isConnected) {
                        return null;
                    }
                    return await analyzeElementContrast(element);
                } catch (elementError) {
                    console.warn('Error analyzing element contrast:', elementError);
                    return null;
                }
            })
        );
        
        // null 값 필터링
        return results.filter(result => result !== null);
    } catch (error) {
        console.error('Error in color contrast analysis:', error);
        throw new Error('명도 대비 검사 중 오류가 발생했습니다. 페이지를 새로고침하고 다시 시도해주세요.');
    }
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
    try {
        if (!element || !element.isConnected) {
            return null;
        }

        const style = window.getComputedStyle(element);
        if (!style) {
            return null;
        }

        // 배경색 찾기
        const { backgroundColor, backgroundElement, hasOverlappingElement } = await findBackgroundColor(element, style);
        if (!backgroundColor) {
            return null;
        }

        // 텍스트 색상 파싱
        const textColor = parseColor(style.color);
        if (!textColor) {
            return null;
        }

        // 배경색 파싱
        const bgColor = parseColor(backgroundColor);
        if (!bgColor) {
            return null;
        }

        // 배경색이 제대로 파싱되지 않은 경우 기본값 사용
        if (bgColor.r === 0 && bgColor.g === 0 && bgColor.b === 0) {
            const fallbackBg = parseColor('rgb(255, 255, 255)');
            if (fallbackBg) {
                Object.assign(bgColor, fallbackBg);
            } else {
                return null;
            }
        }

        // 대비율 계산
        const contrastRatio = calculateContrast(textColor, bgColor);
        if (typeof contrastRatio !== 'number' || isNaN(contrastRatio)) {
            return null;
        }

        // 폰트 크기 계산
        let fontSize = parseFloat(style.fontSize);
        if (isNaN(fontSize)) {
            fontSize = 16; // 기본값
        }

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
        
        // 대비율 기준값 설정
        const aaThreshold = isLargeText ? 3.0 : 4.5;
        const aaaThreshold = isLargeText ? 4.5 : 7.0;
        
        // 대비율을 소수점 둘째 자리까지 반올림
        const roundedContrast = Math.round(contrastRatio * 100) / 100;
        
        // 엄격한 비교를 위해 반올림된 값을 사용
        const isAAPass = roundedContrast > aaThreshold;
        const isAAAPass = roundedContrast > aaaThreshold;
        
        // 상태 메시지 생성
        let status = isAAAPass ? 'AAA' : (isAAPass ? 'AA' : '실패');
        
        // 텍스트 크기 상태 메시지 생성
        const sizeStatus = isLargeText ? 
            `큰 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1` : 
            `일반 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1`;
        
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
            textSizeInfo: {
                fontSize,
                fontWeight,
                isLargeText,
                criteria: isLargeText ? 
                    `18px 이상 또는 14px 이상 + bold (700+)` : 
                    `18px 미만 또는 14px 미만 또는 bold 아님`,
                classes: Array.from(element.classList).join(', ')
            },
            textColor: style.color,
            textColorHex: rgbToHex(textColor.r, textColor.g, textColor.b),
            backgroundColor,
            backgroundColorHex: rgbToHex(bgColor.r, bgColor.g, bgColor.b),
            elementHTML: element.outerHTML.split('>')[0] + '>',
            backgroundElementHTML: backgroundElement !== element ? 
                backgroundElement.outerHTML.split('>')[0] + '>' : '',
            requiredContrast: aaThreshold,
            requiredContrastLarge: 3.0,
            requiredContrastNormal: 4.5,
            hasOverlappingElement
        };
    } catch (error) {
        console.warn('Error in element contrast analysis:', error);
        return null;
    }
}

/**
 * CSS 변수 값을 실제 색상으로 변환
 * @param {string} value 
 * @returns {string}
 */
function resolveCSSVariable(value) {
    if (!value || !value.startsWith('var(--')) return value;
    
    const varName = value.match(/var\(--([^)]+)\)/)[1];
    const computedValue = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${varName}`).trim();
    
    return computedValue || value;
}

/**
 * 색상 문자열을 RGB 객체로 변환 (알파값 포함)
 * @param {string} color 
 * @returns {{r: number, g: number, b: number, a: number}}
 */
function parseColorWithAlpha(color) {
    if (!color) return { r: 0, g: 0, b: 0, a: 0 };
    
    // CSS 변수 처리
    color = resolveCSSVariable(color);
    
    // 투명 처리
    if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return { r: 0, g: 0, b: 0, a: 0 };
    }
    
    // rgba 형식
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
        
        // 유효한 색상값인지 확인
        if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
            return { r: 0, g: 0, b: 0, a: 0 };
        }
        
        return { r, g, b, a };
    }
    
    // hex 형식
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i);
    if (hexMatch) {
        const r = parseInt(hexMatch[1], 16);
        const g = parseInt(hexMatch[2], 16);
        const b = parseInt(hexMatch[3], 16);
        const a = hexMatch[4] ? parseInt(hexMatch[4], 16) / 255 : 1;
        
        return { r, g, b, a };
    }
    
    // 기본값
    return { r: 0, g: 0, b: 0, a: 0 };
}

/**
 * 요소의 배경색 정보 수집
 * @param {Element} el 
 * @returns {Object|null} 배경색 정보
 */
function collectBackgroundInfo(el) {
    if (!el) return null;

    try {
        const computedStyle = window.getComputedStyle(el);
        let bgColor = computedStyle.backgroundColor;
        const bgImage = computedStyle.backgroundImage;
        const opacity = parseFloat(computedStyle.opacity) || 1;

        // CSS 변수 처리
        bgColor = resolveCSSVariable(bgColor);

        // 클래스 기반 배경색 처리
        if (el.classList) {
            // Bootstrap 배경색 클래스 처리
            const bgClasses = Array.from(el.classList).filter(cls => 
                cls.startsWith('bg-') || 
                cls.startsWith('bg-primary') || 
                cls.startsWith('bg-secondary') || 
                cls.startsWith('bg-success') || 
                cls.startsWith('bg-info') || 
                cls.startsWith('bg-warning') || 
                cls.startsWith('bg-danger') || 
                cls.startsWith('bg-light') || 
                cls.startsWith('bg-dark')
            );

            if (bgClasses.length > 0) {
                // 클래스에 정의된 배경색 우선 사용
                const classBgColor = computedStyle.getPropertyValue('--bs-bg-opacity') ? 
                    computedStyle.backgroundColor : // Bootstrap 5
                    computedStyle.getPropertyValue('background-color'); // 기타 클래스
                
                if (classBgColor && classBgColor !== 'transparent' && classBgColor !== 'rgba(0, 0, 0, 0)') {
                    bgColor = classBgColor;
                }
            }
        }

        // 투명 처리
        if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
            // 부모 요소의 배경색 확인
            let parent = el.parentElement;
            while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                const parentBgColor = parentStyle.backgroundColor;
                if (parentBgColor !== 'transparent' && parentBgColor !== 'rgba(0, 0, 0, 0)') {
                    bgColor = parentBgColor;
                    break;
                }
                parent = parent.parentElement;
            }
        }

        // 그라데이션 배경 처리
        if (bgImage && bgImage !== 'none' && 
            (bgImage.includes('linear-gradient') || bgImage.includes('radial-gradient'))) {
            try {
                const gradientColors = extractGradientColors(bgImage);
                if (gradientColors.length > 0) {
                    const avgColor = averageGradientColors(gradientColors);
                    const colorWithAlpha = parseColorWithAlpha(avgColor);
                    const finalAlpha = colorWithAlpha.a * opacity;
                    
                    if (finalAlpha === 0) return null;
                    
                    return {
                        color: avgColor,
                        element: el,
                        isOpaque: finalAlpha === 1,
                        alpha: finalAlpha,
                        zIndex: parseInt(computedStyle.zIndex) || 0
                    };
                }
            } catch (e) {
                console.warn('Gradient color extraction failed:', e);
            }
        }

        // 일반 배경색 처리
        try {
            const colorWithAlpha = parseColorWithAlpha(bgColor);
            const finalAlpha = colorWithAlpha.a * opacity;
            
            if (finalAlpha === 0) return null;
            
            return {
                color: bgColor,
                element: el,
                isOpaque: finalAlpha === 1,
                alpha: finalAlpha,
                zIndex: parseInt(computedStyle.zIndex) || 0
            };
        } catch (e) {
            console.warn('Color parsing failed:', e);
            return null;
        }
    } catch (e) {
        console.warn('Background info collection failed:', e);
        return null;
    }
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

async function findBackgroundColor(element, style) {
    let backgroundLayers = [];
    let lastElement = null;

    // 버튼 요소의 배경색 확인 (반투명 포함)
    const buttonElement = element.closest('button');
    if (buttonElement) {
        const buttonStyle = window.getComputedStyle(buttonElement);
        const buttonBgColor = buttonStyle.backgroundColor;
        const buttonOpacity = parseFloat(buttonStyle.opacity) || 1;
        
        // 버튼의 배경색이 있는 경우 (투명이 아닌 경우)
        if (buttonBgColor !== 'transparent' && buttonBgColor !== 'rgba(0, 0, 0, 0)') {
            const colorWithAlpha = parseColorWithAlpha(buttonBgColor);
            const finalAlpha = colorWithAlpha.a * buttonOpacity;
            
            // 최종 알파값이 0이면 무시
            if (finalAlpha > 0) {
                // 버튼이 반투명한 경우, 실제 배경색을 찾아서 블렌딩
                if (finalAlpha < 1) {
                    // 1. 버튼 아래의 실제 배경색 찾기
                    const buttonPos = getElementPosition(buttonElement);
                    const centerX = Math.round((buttonPos.left + buttonPos.right) / 2);
                    const centerY = Math.round((buttonPos.top + buttonPos.bottom) / 2);
                    
                    // 버튼 아래의 요소들 찾기
                    const elementsBelow = Array.from(document.elementsFromPoint(centerX, centerY))
                        .slice(document.elementsFromPoint(centerX, centerY).indexOf(buttonElement) + 1)
                        .filter(e => e !== element);
                    
                    // 실제 배경색 레이어 수집
                    const actualBgLayers = [];
                    for (const belowEl of elementsBelow) {
                        const bgInfo = collectBackgroundInfo(belowEl);
                        if (bgInfo) {
                            actualBgLayers.push(bgInfo);
                            if (bgInfo.isOpaque) break;
                        }
                    }
                    
                    // 실제 배경색이 있으면 블렌딩
                    if (actualBgLayers.length > 0) {
                        // 실제 배경색 블렌딩
                        let actualBgColor = blendMultipleLayers(actualBgLayers);
                        
                        // 버튼 배경색과 실제 배경색 블렌딩
                        const blendedColor = blendColorsWithAlpha(buttonBgColor, actualBgColor);
                        
                        backgroundLayers.push({
                            color: blendedColor,
                            element: buttonElement,
                            isOpaque: true, // 블렌딩된 색상은 불투명으로 처리
                            alpha: 1,
                            zIndex: parseInt(buttonStyle.zIndex) || 0,
                            isOverlapping: true
                        });
                    } else {
                        // 실제 배경색이 없는 경우 버튼 배경색만 사용
                        backgroundLayers.push({
                            color: buttonBgColor,
                            element: buttonElement,
                            isOpaque: finalAlpha === 1,
                            alpha: finalAlpha,
                            zIndex: parseInt(buttonStyle.zIndex) || 0,
                            isOverlapping: true
                        });
                    }
                } else {
                    // 완전 불투명한 버튼 배경색
                    backgroundLayers.push({
                        color: buttonBgColor,
                        element: buttonElement,
                        isOpaque: true,
                        alpha: 1,
                        zIndex: parseInt(buttonStyle.zIndex) || 0,
                        isOverlapping: true
                    });
                }
                lastElement = buttonElement;
            }
        }
    }

    // 1. 요소 자체의 배경색 확인
    const selfBgInfo = collectBackgroundInfo(element);
    if (selfBgInfo) {
        if (selfBgInfo.isOpaque) {
            return {
                backgroundColor: selfBgInfo.color,
                backgroundElement: element,
                hasOverlappingElement: false
            };
        }
        backgroundLayers.push(selfBgInfo);
    }

    // 2. 샘플링 방식으로 배경색 찾기
    const sampledLayers = findSampledBackground(element);
    if (sampledLayers.length > 0) {
        // 샘플링된 레이어가 있으면 그것을 우선 사용
        backgroundLayers.push(...sampledLayers);
        
        // 불투명한 배경을 찾으면 그 위의 레이어는 무시
        const opaqueLayer = sampledLayers.find(layer => layer.isOpaque);
        if (opaqueLayer) {
            return {
                backgroundColor: opaqueLayer.color,
                backgroundElement: opaqueLayer.element,
                hasOverlappingElement: false
            };
        }
    }

    // 3. 시각적 방식으로 배경색 찾기
    const visualLayers = findVisualBackground(element);
    if (visualLayers.length > 0) {
        // 시각적 레이어 추가 (중복 제거)
        for (const layer of visualLayers) {
            if (!backgroundLayers.some(existing => existing.element === layer.element)) {
                backgroundLayers.push(layer);
            }
        }
    }

    // 4. 부모 요소 탐색
    let el = element.parentElement;
    while (el) {
        const bgInfo = collectBackgroundInfo(el);
        if (bgInfo) {
            if (!backgroundLayers.some(existing => existing.element === el)) {
                backgroundLayers.push(bgInfo);
            }
            if (bgInfo.isOpaque) {
                break;
            }
        }
        lastElement = el;
        el = el.parentElement;
    }

    // 5. body 배경색 처리
    const bodyBgInfo = collectBackgroundInfo(document.body);
    if (bodyBgInfo && !backgroundLayers.some(existing => existing.element === document.body)) {
        backgroundLayers.push(bodyBgInfo);
    }

    // 6. 요소 위에 있는 버튼이나 클릭 가능한 요소 찾기
    const overlappingElements = findOverlappingElements(element);
    let hasOverlappingElement = false;
    for (const overlappingEl of overlappingElements) {
        const bgInfo = collectBackgroundInfo(overlappingEl);
        if (bgInfo && !backgroundLayers.some(existing => existing.element === overlappingEl)) {
            backgroundLayers.push({
                ...bgInfo,
                isOverlapping: true
            });
            hasOverlappingElement = true;
            lastElement = overlappingEl;
        }
    }

    // 7. 레이어 정렬 및 블렌딩
    backgroundLayers.sort((a, b) => {
        // 버튼 요소 우선
        const aIsButton = a.element.tagName === 'BUTTON';
        const bIsButton = b.element.tagName === 'BUTTON';
        if (aIsButton !== bIsButton) {
            return aIsButton ? -1 : 1;
        }
        // 그 다음 중첩 여부
        if (a.isOverlapping !== b.isOverlapping) {
            return a.isOverlapping ? -1 : 1;
        }
        // 마지막으로 z-index
        return b.zIndex - a.zIndex;
    });

    // 최종 배경색 계산
    if (backgroundLayers.length > 0) {
        const finalColor = blendMultipleLayers(backgroundLayers);
        return {
            backgroundColor: finalColor,
            backgroundElement: lastElement || document.body,
            hasOverlappingElement
        };
    }

    // 폴백: 기본 흰색 배경
    return {
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundElement: document.body,
        hasOverlappingElement
    };
}

/**
 * 요소의 시각적 위치 정보 가져오기
 * @param {Element} el 
 * @returns {Object} 위치 정보
 */
function getElementPosition(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        zIndex: parseInt(window.getComputedStyle(el).zIndex) || 0
    };
}

/**
 * 요소가 다른 요소 위에 있는지 확인
 * @param {Element} el1 
 * @param {Element} el2 
 * @returns {boolean}
 */
function isElementOverlapping(el1, el2) {
    const pos1 = getElementPosition(el1);
    const pos2 = getElementPosition(el2);
    
    return !(pos1.bottom < pos2.top || 
            pos1.top > pos2.bottom || 
            pos1.right < pos2.left || 
            pos1.left > pos2.right);
}

/**
 * 요소 위에 있는 버튼이나 클릭 가능한 요소 찾기
 * @param {Element} el 
 * @returns {Array} 클릭 가능한 요소 배열
 */
function findOverlappingElements(el) {
    const pos = getElementPosition(el);
    const centerX = Math.round((pos.left + pos.right) / 2);
    const centerY = Math.round((pos.top + pos.bottom) / 2);

    // 요소의 모든 모서리와 중앙점 샘플링
    const samplePoints = [
        { x: Math.round(pos.left + 5), y: Math.round(pos.top + 5) },  // 좌상단
        { x: Math.round(pos.right - 5), y: Math.round(pos.top + 5) }, // 우상단
        { x: centerX, y: centerY },                                    // 중앙
        { x: Math.round(pos.left + 5), y: Math.round(pos.bottom - 5) },// 좌하단
        { x: Math.round(pos.right - 5), y: Math.round(pos.bottom - 5) }// 우하단
    ];

    const overlappingElements = new Set();
    const pointResults = new Map(); // point -> Set(elements)

    for (const point of samplePoints) {
        const elementsAtPoint = document.elementsFromPoint(point.x, point.y);
        // 현재 요소 위에 있는 요소들만 선택
        const elementsAbove = elementsAtPoint.slice(0, elementsAtPoint.indexOf(el));
        pointResults.set(point, new Set(elementsAbove));
        
        for (const aboveEl of elementsAbove) {
            // 버튼이나 클릭 가능한 요소만 선택
            if (aboveEl.tagName === 'BUTTON' || 
                aboveEl.tagName === 'A' || 
                aboveEl.tagName === 'INPUT' ||
                aboveEl.getAttribute('role') === 'button' ||
                aboveEl.onclick ||
                aboveEl.getAttribute('onclick') ||
                aboveEl.classList.contains('btn') ||
                window.getComputedStyle(aboveEl).cursor === 'pointer') {
                overlappingElements.add(aboveEl);
            }
        }
    }

    // 모든 샘플링 포인트에서 공통으로 발견된 요소만 사용
    return Array.from(overlappingElements)
        .filter(el => {
            return samplePoints.every(point => {
                const elementsAtPoint = pointResults.get(point);
                return elementsAtPoint && elementsAtPoint.has(el);
            });
        })
        .sort((a, b) => {
            const posA = getElementPosition(a);
            const posB = getElementPosition(b);
            return posA.zIndex - posB.zIndex; // z-index가 낮은 순서대로 정렬
        });
}

/**
 * 요소의 실제 배경색 찾기 (샘플링 방식)
 * @param {Element} el 
 * @returns {Array} 배경 레이어 배열
 */
function findSampledBackground(el) {
    const pos = getElementPosition(el);
    const centerX = Math.round((pos.left + pos.right) / 2);
    const centerY = Math.round((pos.top + pos.bottom) / 2);

    // 요소의 모든 모서리와 중앙점 샘플링
    const samplePoints = [
        { x: Math.round(pos.left + 5), y: Math.round(pos.top + 5) },      // 좌상단
        { x: Math.round(pos.right - 5), y: Math.round(pos.top + 5) },     // 우상단
        { x: centerX, y: centerY },                                        // 중앙
        { x: Math.round(pos.left + 5), y: Math.round(pos.bottom - 5) },   // 좌하단
        { x: Math.round(pos.right - 5), y: Math.round(pos.bottom - 5) }   // 우하단
    ];

    // 각 샘플링 포인트에서 배경 레이어 수집
    const sampledLayers = new Map(); // element -> {color, alpha, zIndex} 매핑
    const pointResults = new Map(); // point -> Set(elements)

    for (const point of samplePoints) {
        const elementsAtPoint = document.elementsFromPoint(point.x, point.y);
        // 현재 요소 아래에 있는 모든 요소들 선택
        const elementsBelow = elementsAtPoint.slice(elementsAtPoint.indexOf(el) + 1);
        pointResults.set(point, new Set(elementsBelow));
        
        for (const belowEl of elementsBelow) {
            // 부모 요소들도 포함하여 검사
            let currentEl = belowEl;
            while (currentEl && currentEl !== document.body) {
                const bgInfo = collectBackgroundInfo(currentEl);
                if (bgInfo) {
                    // 이미 있는 레이어면 알파값 업데이트
                    if (sampledLayers.has(currentEl)) {
                        const existing = sampledLayers.get(currentEl);
                        existing.alpha = Math.max(existing.alpha, bgInfo.alpha);
                    } else {
                        sampledLayers.set(currentEl, {
                            color: bgInfo.color,
                            element: currentEl,
                            isOpaque: bgInfo.isOpaque,
                            alpha: bgInfo.alpha,
                            zIndex: bgInfo.zIndex
                        });
                    }
                    if (bgInfo.isOpaque) break;
                }
                currentEl = currentEl.parentElement;
            }
        }
    }

    // 모든 샘플링 포인트에서 발견된 배경 레이어 필터링
    const commonLayers = Array.from(sampledLayers.entries())
        .filter(([el, info]) => {
            // 최소 2개 이상의 포인트에서 발견된 레이어만 사용
            const pointCount = samplePoints.filter(point => {
                const elementsAtPoint = pointResults.get(point);
                return elementsAtPoint && elementsAtPoint.has(el);
            }).length;
            return pointCount >= 2;
        })
        .map(([el, info]) => info)
        .sort((a, b) => b.zIndex - a.zIndex);

    return commonLayers;
}

/**
 * 요소의 실제 배경색 찾기 (시각적 방식)
 * @param {Element} el 
 * @returns {Array} 배경 레이어 배열
 */
function findVisualBackground(el) {
    const pos = getElementPosition(el);
    const centerX = (pos.left + pos.right) / 2;
    const centerY = (pos.top + pos.bottom) / 2;

    // 요소 아래에 있는 모든 요소들 찾기
    const elementsBelow = Array.from(document.elementsFromPoint(centerX, centerY))
        .filter(e => e !== el && isElementOverlapping(el, e))
        .sort((a, b) => {
            const posA = getElementPosition(a);
            const posB = getElementPosition(b);
            return posB.zIndex - posA.zIndex;
        });

    const layers = [];
    const processedElements = new Set();

    for (const belowEl of elementsBelow) {
        if (processedElements.has(belowEl)) continue;
        
        const bgInfo = collectBackgroundInfo(belowEl);
        if (bgInfo) {
            layers.push(bgInfo);
            processedElements.add(belowEl);
            
            // 불투명한 배경을 찾으면 그 위의 레이어는 무시
            if (bgInfo.isOpaque) break;
        }
    }

    return layers;
}

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
    const { backgroundColor, backgroundElement, isUncertain } = await findBackgroundColor(element, style);
    
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
    if (isUncertain) {
        status = '판단불가';
    } else if (isAAAPass) {
        status = 'AAA';
    } else if (isAAPass) {
        status = 'AA';
    }
    
    // 텍스트 크기 상태 메시지 생성
    const sizeStatus = isUncertain ? 
        '배경색 판단 불가' : 
        (isLargeText ? 
            `큰 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1` : 
            `일반 텍스트 (${aaThreshold}:1) - 대비율:${roundedContrast}:1`);
    
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
        isUncertain,
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
 * 색상 문자열을 RGB 객체로 변환
 * @param {string} color 
 * @returns {{r: number, g: number, b: number, a: number}}
 */
function parseColorWithAlpha(color) {
    if (!color) return { r: 0, g: 0, b: 0, a: 0 };
    
    // CSS 변수 처리
    color = resolveCSSVariable(color);
    
    // rgba 형식
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
        return {
            r: parseInt(rgbaMatch[1]),
            g: parseInt(rgbaMatch[2]),
            b: parseInt(rgbaMatch[3]),
            a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
        };
    }
    
    // hex 형식
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16),
            a: 1
        };
    }
    
    // 기본값
    return { r: 0, g: 0, b: 0, a: 0 };
}

/**
 * 두 색상을 알파 블렌딩
 * @param {string} topColor - 위쪽 색상 (rgba)
 * @param {string} bottomColor - 아래쪽 색상 (rgb)
 * @returns {string} 혼합된 rgb 색상
 */
function blendColorsWithAlpha(topColor, bottomColor) {
    const top = parseColorWithAlpha(topColor);
    const bottom = parseColorWithAlpha(bottomColor);
    
    // 알파값이 0이면 아래쪽 색상 반환
    if (top.a === 0) return bottomColor;
    
    // 알파값이 1이면 위쪽 색상 반환
    if (top.a === 1) return topColor;
    
    // 알파 블렌딩
    const r = Math.round(top.r * top.a + bottom.r * (1 - top.a));
    const g = Math.round(top.g * top.a + bottom.g * (1 - top.a));
    const b = Math.round(top.b * top.a + bottom.b * (1 - top.a));
    
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 여러 레이어의 반투명 배경색 혼합
 * @param {Array<{color: string, element: Element}>} layers - 배경 레이어 배열 (아래에서 위로)
 * @returns {string} 최종 배경색
 */
function blendMultipleLayers(layers) {
    if (!layers || layers.length === 0) return 'rgb(255, 255, 255)';
    
    // 기본 배경색 (흰색)
    let result = 'rgb(255, 255, 255)';
    
    // 아래 레이어부터 순서대로 혼합
    for (const layer of layers) {
        result = blendColorsWithAlpha(layer.color, result);
    }
    
    return result;
}

/**
 * 배경색 찾기 (부모 요소 탐색 포함)
 * @param {Element} element 
 * @param {CSSStyleDeclaration} style 
 * @returns {Promise<Object>} {backgroundColor, backgroundElement, isUncertain}
 */
async function findBackgroundColor(element, style) {
    let backgroundLayers = [];
    let lastElement = null;
    let isUncertain = false;

    // 요소의 시각적 위치 정보 가져오기
    const getElementPosition = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            zIndex: parseInt(window.getComputedStyle(el).zIndex) || 0
        };
    };

    // 요소가 다른 요소 위에 있는지 확인
    const isElementOverlapping = (el1, el2) => {
        const pos1 = getElementPosition(el1);
        const pos2 = getElementPosition(el2);
        
        return !(pos1.bottom < pos2.top || 
                pos1.top > pos2.bottom || 
                pos1.right < pos2.left || 
                pos1.left > pos2.right);
    };

    // 요소의 배경색 정보 수집
    const collectBackgroundInfo = (el) => {
        const computedStyle = window.getComputedStyle(el);
        let bgColor = computedStyle.backgroundColor;
        const bgImage = computedStyle.backgroundImage;

        // CSS 변수 처리
        bgColor = resolveCSSVariable(bgColor);

        // 그라데이션 배경 처리
        if (bgImage && bgImage !== 'none' && 
            (bgImage.includes('linear-gradient') || bgImage.includes('radial-gradient'))) {
            const gradientColors = extractGradientColors(bgImage);
            if (gradientColors.length > 0) {
                const avgColor = averageGradientColors(gradientColors);
                const colorWithAlpha = parseColorWithAlpha(avgColor);
                return {
                    color: avgColor,
                    element: el,
                    isOpaque: colorWithAlpha.a === 1,
                    alpha: colorWithAlpha.a
                };
            }
        }

        // 일반 배경색 처리
        if (bgColor && !isTransparent(bgColor)) {
            const colorWithAlpha = parseColorWithAlpha(bgColor);
            return {
                color: bgColor,
                element: el,
                isOpaque: colorWithAlpha.a === 1,
                alpha: colorWithAlpha.a
            };
        }

        return null;
    };

    // 요소의 실제 배경색 찾기 (샘플링 방식)
    const findSampledBackground = (el) => {
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

        // 각 샘플링 포인트에서 배경 레이어 수집
        const sampledLayers = new Map(); // element -> {color, alpha} 매핑
        const pointResults = new Map(); // point -> Set(elements)

        for (const point of samplePoints) {
            const elementsAtPoint = document.elementsFromPoint(point.x, point.y);
            const elementsBelow = elementsAtPoint.slice(elementsAtPoint.indexOf(el) + 1);
            pointResults.set(point, new Set(elementsBelow));
            
            for (const belowEl of elementsBelow) {
                const bgInfo = collectBackgroundInfo(belowEl);
                if (bgInfo) {
                    sampledLayers.set(belowEl, {
                        color: bgInfo.color,
                        alpha: bgInfo.alpha
                    });
                }
            }
        }

        // 모든 샘플링 포인트에서 공통으로 발견된 배경 레이어만 사용
        const commonLayers = Array.from(sampledLayers.entries())
            .filter(([el, info]) => {
                return samplePoints.every(point => {
                    const elementsAtPoint = pointResults.get(point);
                    return elementsAtPoint && elementsAtPoint.has(el);
                });
            })
            .sort((a, b) => {
                const zIndexA = parseInt(window.getComputedStyle(a[0]).zIndex) || 0;
                const zIndexB = parseInt(window.getComputedStyle(b[0]).zIndex) || 0;
                return zIndexB - zIndexA;
            });

        // 샘플링 포인트 간 결과가 크게 다른 경우 불확실로 표시
        const layerCounts = Array.from(pointResults.values()).map(set => set.size);
        const avgLayerCount = layerCounts.reduce((a, b) => a + b, 0) / layerCounts.length;
        const maxDeviation = Math.max(...layerCounts.map(count => Math.abs(count - avgLayerCount)));
        
        if (maxDeviation > 2) { // 레이어 수의 차이가 2개 이상 나는 경우
            isUncertain = true;
        }

        return commonLayers;
    };

    // 요소의 실제 배경색 찾기 (기존 방식)
    const findVisualBackground = (el) => {
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
        for (const belowEl of elementsBelow) {
            const bgInfo = collectBackgroundInfo(belowEl);
            if (bgInfo) {
                layers.push(bgInfo);
                if (bgInfo.isOpaque) {
                    break;
                }
            }
        }
        return layers;
    };

    // 1. 요소 자체의 배경색 확인
    const selfBgInfo = collectBackgroundInfo(element);
    if (selfBgInfo) {
        if (selfBgInfo.isOpaque) {
            return {
                backgroundColor: selfBgInfo.color,
                backgroundElement: element,
                isUncertain: false
            };
        }
        backgroundLayers.push(selfBgInfo);
    }

    // 2. 샘플링 방식으로 배경색 찾기
    const sampledLayers = findSampledBackground(element);
    if (sampledLayers.length > 0) {
        let finalColor = 'rgb(255, 255, 255)';
        let lastElement = document.body;

        for (const [el, info] of sampledLayers) {
            finalColor = blendColorsWithAlpha(info.color, finalColor);
            lastElement = el;
            if (info.alpha === 1) {
                break;
            }
        }

        return {
            backgroundColor: finalColor,
            backgroundElement: lastElement,
            isUncertain: false
        };
    }

    // 3. 기존 방식으로 배경색 찾기
    const visualLayers = findVisualBackground(element);
    if (visualLayers.length > 0) {
        backgroundLayers.push(...visualLayers);
    }

    // 4. 부모 요소 탐색
    let el = element.parentElement;
    while (el) {
        const bgInfo = collectBackgroundInfo(el);
        if (bgInfo) {
            backgroundLayers.push(bgInfo);
            if (bgInfo.isOpaque) {
                break;
            }
        }
        lastElement = el;
        el = el.parentElement;
    }

    // 5. body 배경색 처리
    const bodyBgInfo = collectBackgroundInfo(document.body);
    if (bodyBgInfo && bodyBgInfo.color !== 'rgb(255, 255, 255)') {
        backgroundLayers.push(bodyBgInfo);
    }

    // 최종 배경색 계산
    if (backgroundLayers.length > 0) {
        const finalColor = blendMultipleLayers(backgroundLayers);
        return {
            backgroundColor: finalColor,
            backgroundElement: lastElement || document.body,
            isUncertain: false
        };
    }

    // 폴백: 기본 흰색 배경
    return {
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundElement: document.body,
        isUncertain: true // 배경색을 찾지 못한 경우도 불확실로 표시
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

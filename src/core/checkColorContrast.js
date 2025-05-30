import { parseColor, calculateContrast, rgbToHex } from '../utils/contrastUtil.js';
import { displayContrastResults } from '../controller/contrastController.js';

/**
 * 색상 대비 검사를 위한 요소 수집 및 분석
 * @returns {Array} 검사 결과 배열
 */
export function analyzeColorContrast() {
    // 검사할 요소 수집
    const elements = collectTextElements();
    
    // 각 요소의 색상 대비 분석
    const results = elements.map(element => analyzeElementContrast(element));
    
    return results;
}

/**
 * 텍스트 요소 수집
 * @returns {Array} 검사 대상 요소들
 */
function collectTextElements() {
    const selectors = 'p, h1, h2, h3, h4, h5, h6, a, span, li, td, th, div, label, button';
    return Array.from(document.querySelectorAll(selectors))
        .filter(el => {
            if (el.closest('#udl-accessibility-panel')) return false;
            if (!el.textContent.trim()) return false;
            
            const style = window.getComputedStyle(el);
            return isElementVisible(style, el);
        });
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
 * @returns {Object} 분석 결과
 */
function analyzeElementContrast(element) {
    const style = window.getComputedStyle(element);
    const { backgroundColor, backgroundElement } = findBackgroundColor(element, style);
    
    // 디버깅을 위한 로그 추가
    console.log('Element:', element);
    console.log('Original backgroundColor:', style.backgroundColor);
    console.log('Processed backgroundColor:', backgroundColor);
    console.log('Background element:', backgroundElement);
    
    const textColor = parseColor(style.color);
    const bgColor = parseColor(backgroundColor);
    
    // 배경색이 제대로 파싱되지 않은 경우 기본값 사용
    if (!bgColor || (bgColor.r === 0 && bgColor.g === 0 && bgColor.b === 0)) {
        console.warn('Invalid background color detected, using fallback:', backgroundColor);
        const fallbackBg = parseColor('rgb(255, 255, 255)');
        Object.assign(bgColor, fallbackBg);
    }
    
    const contrastRatio = calculateContrast(textColor, bgColor);
    
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = style.fontWeight;
    const isLargeText = isLargeTextSize(fontSize, fontWeight);
    
    const result = {
        element,
        backgroundElement,
        text: truncateText(element.textContent.trim(), 30),
        contrast: contrastRatio,
        aa: isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5,
        aaa: isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7,
        fontSize,
        fontWeight,
        isLargeText,
        textColor: style.color,
        textColorHex: rgbToHex(textColor.r, textColor.g, textColor.b),
        backgroundColor,
        backgroundColorHex: rgbToHex(bgColor.r, bgColor.g, bgColor.b),
        elementHTML: element.outerHTML.split('>')[0] + '>',
        backgroundElementHTML: backgroundElement !== element ? 
            backgroundElement.outerHTML.split('>')[0] + '>' : ''
    };
    
    // 결과 검증
    console.log('Final result:', result);
    return result;
}

/**
 * 배경색 찾기 (부모 요소 탐색 포함)
 * @param {Element} element 
 * @param {CSSStyleDeclaration} style 
 * @returns {Object} {backgroundColor, backgroundElement}
 */
function findBackgroundColor(element, style) {
    let backgroundColor = style.backgroundColor;
    let backgroundElement = element;
    
    // 디버깅을 위한 로그
    console.log('Finding background color for:', element);
    console.log('Initial backgroundColor:', backgroundColor);
    
    // 투명한 배경색인 경우 부모 요소 탐색
    if (isTransparent(backgroundColor)) {
        console.log('Transparent background detected, searching parent elements');
        const result = findParentBackgroundColor(element);
        backgroundColor = result.backgroundColor;
        backgroundElement = result.backgroundElement;
        console.log('Found parent background:', backgroundColor);
    }

    // 색상 형식 정규화
    if (backgroundColor) {
        // rgba 형식의 색상을 rgb로 변환
        if (backgroundColor.startsWith('rgba')) {
            const rgbMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (rgbMatch) {
                backgroundColor = `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`;
            }
        }
        
        // 색상이 유효하지 않은 경우 기본값 사용
        if (!backgroundColor.match(/^(rgb|rgba|#)/)) {
            console.warn('Invalid color format:', backgroundColor);
            backgroundColor = 'rgb(255, 255, 255)';
        }
    } else {
        console.warn('No background color found, using default');
        backgroundColor = 'rgb(255, 255, 255)';
    }
    
    console.log('Final processed backgroundColor:', backgroundColor);
    return { backgroundColor, backgroundElement };
}

/**
 * 부모 요소에서 배경색 찾기
 * @param {Element} element 
 * @returns {Object}
 */
function findParentBackgroundColor(element) {
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 10; // 최대 탐색 깊이 제한
    
    while (parent && depth < maxDepth) {
        const parentStyle = window.getComputedStyle(parent);
        const parentBg = parentStyle.backgroundColor;
        
        console.log(`Checking parent at depth ${depth}:`, parent);
        console.log('Parent background:', parentBg);
        
        if (!isTransparent(parentBg)) {
            console.log('Found non-transparent background:', parentBg);
            return { backgroundColor: parentBg, backgroundElement: parent };
        }
        
        parent = parent.parentElement;
        depth++;
    }
    
    // 기본값: body 배경색 또는 흰색
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyBg = bodyStyle.backgroundColor;
    
    console.log('Using body background or fallback:', bodyBg);
    return {
        backgroundColor: isTransparent(bodyBg) ? 'rgb(255, 255, 255)' : bodyBg,
        backgroundElement: document.body
    };
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
    return fontSize >= 18 || (fontSize >= 14 && (parseInt(fontWeight) >= 700 || fontWeight === 'bold'));
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

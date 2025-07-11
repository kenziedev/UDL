export function removeHighlights() {
    const highlighted = document.querySelectorAll('.item-highlight');
    highlighted.forEach(el => el.classList.remove('item-highlight'));
}
export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase();
}

export function parseColor(c) {
    const rgbMatch = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbMatch) {
        return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
    }

    if (c.startsWith('#')) {
        let hex = c.substring(1);
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }

    return { r: 0, g: 0, b: 0 };
}

export function calculateLuminance({ r, g, b }) {
    [r, g, b] = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrast(a, b) {
    const L1 = calculateLuminance(a);
    const L2 = calculateLuminance(b);
    return Math.round(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)) * 100) / 100;
}

/**
 * WCAG 대비 기준 평가
 * @param {number} ratio 대비율
 * @param {boolean} isLargeText 큰 텍스트 여부
 * @returns {Object} {aa, aaa} 평가 결과
 */
export function evaluateWCAGCompliance(ratio, isLargeText) {
    const aaThreshold = isLargeText ? 3 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7;
    
    return {
        aa: ratio >= aaThreshold,
        aaa: ratio >= aaaThreshold
    };
}

/**
 * 대비율에 따른 상태 텍스트 반환
 * @param {number} ratio 
 * @returns {Object} {status, className}
 */
export function getContrastStatus(ratio) {
    if (ratio >= 7) {
        return { status: 'WCAG AA/AAA 통과', className: 'pass' };
    } else if (ratio >= 4.5) {
        return { status: 'WCAG AA 통과 (AAA 실패)', className: 'pass' };
    } else if (ratio >= 3) {
        return { status: '큰 텍스트만 WCAG AA 통과', className: 'partial' };
    } else {
        return { status: 'WCAG 기준 실패', className: 'fail' };
    }
}

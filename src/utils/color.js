// utils/color.js

/**
 * HEX 색상을 RGB 객체로 변환
 * @param {string} hex - #RRGGBB 형식
 * @returns {{r: number, g: number, b: number}}
 */
export function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

/**
 * RGB 값을 HEX 코드로 변환
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string} - #RRGGBB 형식
 */
export function rgbToHex(r, g, b) {
    return (
        '#' +
        [r, g, b]
            .map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
            .join('')
    );
}

/**
 * 주어진 색상에 대비되는 텍스트 색상 결정 (흰색 또는 검은색)
 * @param {string} hexColor - #RRGGBB
 * @returns {string} - 'black' or 'white'
 */
export function getContrastTextColor(hexColor) {
    const { r, g, b } = hexToRgb(hexColor);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'black' : 'white';
}

/**
 * 색맹 시뮬레이션용 색상 매트릭스 적용
 * @param {string} hex - 원본 색상
 * @param {Array<number>} matrix - 4x5 형식의 색맹 변환 매트릭스
 * @returns {string} - 변환된 HEX 색상
 */
export function applyColorMatrix(hex, matrix) {
    const { r, g, b } = hexToRgb(hex);

    const newR = r * matrix[0] + g * matrix[1] + b * matrix[2];
    const newG = r * matrix[5] + g * matrix[6] + b * matrix[7];
    const newB = r * matrix[10] + g * matrix[11] + b * matrix[12];

    return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

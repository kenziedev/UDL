// src/utils/contrastUtil.js

export function removeHighlights() {
    const highlighted = document.querySelectorAll('.item-highlight');
    highlighted.forEach((el) => el.classList.remove('item-highlight'));
}

// 향후 대비 계산이나 공통 유틸 함수 추가 가능
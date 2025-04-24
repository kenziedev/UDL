import './styles/panel.css';
import './styles/ai-analysis.css';

import { initPanel } from './core/initPanel.js';

//핵심 모듈
import './core/messageHandler.js';
import './core/axeAnalysis.js';

// 상수
import { KWCAG22 } from './constants/KWCAG22.js';
import { UDL_PRINCIPLES } from './constants/UDL_PRINCIPLES.js';

// 유틸
import { hexToRgb, getContrastTextColor } from './utils/color.js';

// 컨트롤러
import { runMessageFlow } from './controller/chatController.js';

console.log('✅시작됨');
initPanel();

// 예시: 콘솔에서 테스트만 할 경우 필요
// console.log(hexToRgb('#FF0000'));             // { r: 255, g: 0, b: 0 }
// console.log(getContrastTextColor('#000000')); // white
// console.log(KWCAG22["1"].name);               // "인지 가능"
// console.log(UDL_PRINCIPLES.representation.name); // "표현 방식의 다양화"

//버튼 이벤트 바인딩 (예: 테스트용)
const btn = document.querySelector('#sendBtn');
const input = document.querySelector('#chatInput');

if (btn && input) {
    btn.addEventListener('click', () => {
        runMessageFlow(input.value);
        input.value = '';
    });
}

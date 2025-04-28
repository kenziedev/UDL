// 📄 스타일
import './styles/panel.css';
import './styles/ai-analysis.css';

// 🧩 핵심 기능
import { initPanel } from './core/initPanel.js';
import { analyzeWCAG } from './core/analyzeWCAG.js';
import { analyzeForUDL } from './core/analyzeForAI.js';
import { initChat } from './core/chatBot.js';

// 📚 상수 데이터
import { KWCAG22 } from './constants/KWCAG22.js';
import { UDL_PRINCIPLES } from './constants/UDL_PRINCIPLES.js';

// 🛠️ 유틸리티
import { hexToRgb, getContrastTextColor } from './utils/color.js';

console.log('✅ UDL 웹 접근성 도구 초기화 시작');

// 패널 및 주요 기능 초기화
initPanel();
initChat();

// (선택) 분석 기능도 초기화할 것인지? (버튼 이벤트나 상황에 따라 다르게 처리할 수도 있음)
// analyzeWCAG();
// analyzeForUDL();

// 🧪 임시 테스트용 코드 (추후 삭제 예정)
const testBtn = document.getElementById('sendBtn');
const testInput = document.getElementById('chatInput');

if (testBtn && testInput) {
    testBtn.addEventListener('click', () => {
        const text = testInput.value.trim();
        if (text) {
            // 여기는 기존의 runMessageFlow 같은 함수가 있어야 동작해
            console.log('테스트 전송:', text);
            // runMessageFlow(text);  // 이거 네 프로젝트에 있으면 연결
            testInput.value = '';
        }
    });
}

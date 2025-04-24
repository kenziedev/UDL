// src/core/initPanel.js

import { checkColorContrast } from './checkColorContrast.js';
import { analyzeWCAG } from './axeAnalysis.js';
import { analyzeForUDL } from './udlAnalysis.js';
import { checkColorBlindness } from './colorBlindness.js';
import { initChat } from '../controller/chatController.js';
import { downloadReport } from './reportGenerator.js';
import { removeHighlights } from '../utils/contrastUtil.js';
import '../styles/panel.css';

export function initPanel() {
    if (document.getElementById('udl-accessibility-panel')) {
        document.getElementById('udl-accessibility-panel').remove();
        removeHighlights();
        return;
    }

    let userApiKey = sessionStorage.getItem('udl_api_key');
    if (!userApiKey) {
        userApiKey = prompt('UDL 분석을 위한 API KEY를 입력해주세요.');
        if (!userApiKey) {
            alert('API KEY가 입력되지 않았습니다.');
            return;
        }
        sessionStorage.setItem('udl_api_key', userApiKey);
    }

    const panel = document.createElement('div');
    panel.id = 'udl-accessibility-panel';
    panel.innerHTML = `
    <div class="panel-header">
      <h2 class="panel-title">접근성 검사</h2>
      <div class="panel-controls">
        <button class="panel-btn" id="minimize-panel" title="최소화">–</button>
        <button class="panel-btn" id="close-panel" title="닫기">×</button>
      </div>
    </div>
    <div class="panel-tabs">
      <button id="tab-contrast" class="tab-active">명도 대비</button>
      <button id="tab-wcag">웹 접근성 항목</button>
      <button id="tab-udl">AI 제안</button>
      <button id="tab-colorblind">색맹 시뮬레이션</button>
      <button id="tab-chat">AI 챗봇</button>
    </div>
    <div id="tab-content-contrast" class="tab-content">검사 중...</div>
    <div id="tab-content-wcag" class="tab-content" style="display:none;">검사 중...</div>
    <div id="tab-content-udl" class="tab-content" style="display:none;">분석 중...</div>
    <div id="tab-content-colorblind" class="tab-content" style="display:none;">색맹 시뮬레이션 로딩 중...</div>
    <div id="tab-content-chat" class="tab-content" style="display:none;">챗봇 로딩 중...</div>
    <div class="panel-footer">
      <button id="download-results" class="button secondary-btn">보고서 다운로드</button>
      <button id="run-full-scan" class="button primary-btn">전체 검사 실행</button>
    </div>
  `;
    document.body.appendChild(panel);

    // 탭 전환 이벤트
    const tabs = ['contrast', 'wcag', 'udl', 'colorblind', 'chat'];
    tabs.forEach(tab => {
        document.getElementById(`tab-${tab}`).onclick = () => activateTab(tab);
    });

    document.getElementById('download-results').onclick = () => downloadReport();
    document.getElementById('run-full-scan').onclick = () => {
        checkColorContrast();
        analyzeWCAG();
        analyzeForUDL();
        checkColorBlindness();
    };

    document.getElementById('close-panel').onclick = () => {
        panel.remove();
        removeHighlights();
    };

    function activateTab(tabId) {
        tabs.forEach(tab => {
            document.getElementById(`tab-content-${tab}`).style.display = 'none';
            document.getElementById(`tab-${tab}`).classList.remove('tab-active');
        });
        document.getElementById(`tab-content-${tabId}`).style.display = 'block';
        document.getElementById(`tab-${tabId}`).classList.add('tab-active');

        switch(tabId) {
            case 'contrast': checkColorContrast(); break;
            case 'wcag': analyzeWCAG(); break;
            case 'udl': analyzeForUDL(); break;
            case 'colorblind': checkColorBlindness(); break;
            case 'chat': initChat(); break;
        }
    }

    activateTab('contrast');
}

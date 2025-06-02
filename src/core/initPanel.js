// src/core/initPanel.js

import { checkColorContrast } from '../controller/contrastController.js';
import { analyzeWCAG } from './analyzeWCAG.js';
import { analyzeForAI } from './analyzeForAI.js';
import { checkColorBlindness } from './colorBlindness.js';
import { initChat } from './chatBot.js';
import { downloadReport } from './reportGenerator.js';
import { removeHighlights } from '../utils/contrastUtil.js';
import { makePanelDraggable } from '../utils/draggable.js';
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
          <button class="panel-btn" id="minimize-panel" title="최소화">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button class="panel-btn" id="close-panel" title="닫기">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="panel-tabs">
        <button id="tab-contrast" class="tab-active">명도 대비</button>
        <button id="tab-wcag">웹 접근성 항목</button>
        <button id="tab-udl">AI 제안</button>
        <button id="tab-colorblind">색맹 시뮬레이션</button>
        <button id="tab-chat">AI 챗봇</button>
      </div>
      <div id="tab-content-contrast" class="tab-content">
        <div class="loading" data-message="색상 대비 검사 중...">색상 대비 검사 중...</div>
      </div>
      <div id="tab-content-wcag" class="tab-content" style="display:none;">
        <div class="loading" data-message="검사 중...">검사 중...</div>
      </div>
      <div id="tab-content-udl" class="tab-content" style="display:none;">
        <div class="loading" data-message="분석 중...">분석 중...</div>
      </div>
      <div id="tab-content-colorblind" class="tab-content" style="display:none;">
        <div class="loading" data-message="색맹 시뮬레이션 도구 로딩 중...">색맹 시뮬레이션 도구 로딩 중...</div>
      </div>
      <div id="tab-content-chat" class="tab-content" style="display:none;">
        <div class="chat-header">
          <h3>UDL 및 웹 접근성 문의</h3>
          <button id="reset-chat-btn" class="chat-action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            새 대화 시작
          </button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
          <input type="text" id="chat-input-field" class="chat-input-field" placeholder="웹 접근성에 대해 물어보세요" />
          <button id="chat-send-btn" class="chat-send-btn">전송</button>
        </div>
      </div>
      <div class="panel-footer">
        <div class="left-buttons">
          <!-- 채팅 관련 버튼은 여기에 동적으로 추가됩니다 -->
          <button id="download-chat-btn" class="button secondary-btn chat-control-btn" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            대화 내용 다운로드
          </button>
          <button id="download-results" class="button secondary-btn contrast-only-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            보고서 다운로드
          </button>
        </div>
        <div class="right-buttons">
          <button class="button primary-btn" id="run-full-scan">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            검사 새로고침
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    makePanelDraggable(panel);

    // 탭 전환 이벤트
    const tabs = ['contrast', 'wcag', 'udl', 'colorblind', 'chat'];
    tabs.forEach(tab => {
        document.getElementById(`tab-${tab}`).onclick = () => activateTab(tab);
    });

    document.getElementById('download-results').onclick = () => downloadReport();
    document.getElementById('run-full-scan').onclick = () => {
        checkColorContrast();
        analyzeWCAG();
        analyzeForAI();
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
            case 'udl': analyzeForAI(); break;
            case 'colorblind': checkColorBlindness(); break;
            case 'chat': initChat(); break;
        }
    }

    activateTab('contrast');
}

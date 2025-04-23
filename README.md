
## 구조 설계

📁 src/  
│  
├── 📁 core/                         
│   ├── axeAnalysis.js             ← axe-core 분석 로직 및 접근성 스캔 함수  
│   ├── messageHandler.js          ← 사용자/봇 메시지 렌더링 및 스크롤 처리  
│   ├── api.js                     ← 프롬프트 구성 및 AI API 요청 처리  
│   ├── reportGenerator.js         ← HTML 보고서 생성 및 다운로드  
│   └── colorBlindness.js         ← 색맹 시뮬레이션 UI + 로직 처리  
│    
├── 📁 constants/                  ← 정적인 데이터 (DB)  
│   ├── KWCAG22.js                 ← KWCAG 2.2 기준 요약 정보  
│   └── UDL_PRINCIPLES.js         ← UDL 원칙 요약 정보  
│  
├── 📁 utils/                   
│   └── color.js                  ← hexToRgb, rgbToHex, applyColorMatrix 등 색상 유틸  
│  
├── main.js                        ← 초기화, 이벤트 바인딩, 모듈 연결  



## 디렉토리 설명

| 디렉토리/파일             | 설명 |
|---------------------------|------|
| `core/`                   | 접근성 분석, API 연동, 메시지 처리 등 핵심 기능 모듈 |
| `constants/`              | KWCAG, UDL 기준 등 정적 데이터 |
| `utils/`                  | 색상 변환 등 공통 유틸 함수 |
| `main.js`                 | 앱 초기화 및 이벤트 바인딩, 전체 기능 통합 |

## 주요 기능

- **axe-core 기반 웹 접근성 자동 점검**
- **KWCAG 2.2 기준 항목별 분석 및 시각화**
- **색맹 시뮬레이션 도구** (Protanopia, Deuteranopia, Tritanopia, Achromatopsia)
- **AI 기반 웹 접근성 Q&A 챗봇** (Gemini API 연동)
- **HTML 보고서 다운로드 기능**

---

# UDL (Universal Design for Learning) 웹 접근성 도구

## 주요 기능

### 1. 웹 접근성 자동 분석
- axe-core 기반 자동 점검
- KWCAG 2.2 기준 항목별 분석
- 시각적 분석 결과 제공

### 2. 색맹 시뮬레이션
- Protanopia (적색맹)
- Deuteranopia (녹색맹)
- Tritanopia (청색맹)
- Achromatopsia (전색맹)

### 3. AI 기반 접근성 Q&A
- Gemini API 연동
- 실시간 웹 접근성 상담
- 맞춤형 해결책 제시

### 4. 보고서 생성
- HTML 형식 보고서
- 분석 결과 다운로드
- 상세 진단 정보 포함

## 프로젝트 구조

```
📁 프로젝트 루트/
│
├── 📁 src/                         
│   ├── 📁 core/                   # 핵심 기능 모듈
│   ├── 📁 constants/              # 정적 데이터
│   ├── 📁 controller/             # 컨트롤러
│   ├── 📁 styles/                 # 스타일 파일
│   ├── 📁 utils/                  # 유틸리티 함수
│   ├── main.js                    # 메인 애플리케이션
│
├── webpack.config.js              # 웹팩 설정
├── package.json                   # 프로젝트 의존성
├── .babelrc                      # 바벨 설정
└── .gitignore                    # Git 제외 파일
```

## 기술 스택

### 프레임워크 및 라이브러리
- **접근성 분석**: axe-core
- **AI 엔진**: Google Gemini API
- **색상 처리**: Color Matrix Simulation

### 개발 환경
- **언어**: JavaScript (ES6+)
- **모듈 번들러**: Webpack 5
  - CSS 로더
  - Babel 트랜스파일러
  - 소스맵 지원
  - HMR(Hot Module Replacement) 지원

### 개발 도구
- **버전 관리**: Git
- **패키지 관리**: npm
- **코드 변환**: Babel 7
  - @babel/core
  - @babel/preset-env

### 배포
- **호스팅**: GitHub Pages
- **자동화**: GitHub Actions (예정)

## 설치 및 실행

### 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/kenziedev/UDL.git
cd UDL
```

2. 의존성 패키지 설치
```bash
npm install
```

### 실행 방법

#### 개발 모드
개발 서버를 실행하여 실시간으로 변경사항을 확인할 수 있습니다.
```bash
npm run dev
# 또는
npm start
```
- 기본적으로 http://localhost:8080 에서 실행됩니다
- Hot Module Replacement (HMR)가 활성화되어 있어 코드 변경 시 자동으로 새로고침됩니다

#### 프로덕션 빌드
배포를 위한 최적화된 빌드를 생성합니다.
```bash
npm run build
```
- 빌드된 파일은 `dist` 디렉토리에 생성됩니다
- 소스맵이 포함된 최적화된 번들이 생성됩니다

#### GitHub Pages 배포
프로젝트를 GitHub Pages에 배포합니다.
```bash
npm run deploy
```
- 자동으로 빌드 후 gh-pages 브랜치에 배포됩니다
- 배포 후 https://kenziedev.github.io/UDL/ 에서 확인할 수 있습니다

#### 북마클릿 설치 방법

##### 로컬 개발 환경에서 사용
1. 브라우저의 북마크바 표시 (Chrome: Ctrl + Shift + B)
2. 아래 코드를 새 북마크로 추가:
```javascript
javascript:(function(){
    var script=document.createElement('script');
    script.src='http://localhost:8080/main.bundle.js';
    document.body.appendChild(script);
})();
```
3. 북마크 이름을 "UDL 접근성 검사 (개발)" 등으로 설정

##### GitHub Pages 배포 버전 사용
1. 브라우저의 북마크바 표시
2. 아래 코드를 새 북마크로 추가:
```javascript
javascript:(function(){
    var script=document.createElement('script');
    script.src='https://kenziedev.github.io/UDL/main.bundle.js';
    document.body.appendChild(script);
})();
```
3. 북마크 이름을 "UDL 접근성 검사" 등으로 설정

#### 북마클릿 사용 방법
1. 분석하고자 하는 웹페이지 방문
2. 북마크바에서 설치한 "UDL 접근성 검사" 클릭
3. 자동으로 분석 도구가 실행됨

> **주의사항**: 일부 웹사이트에서는 보안 정책(CSP)으로 인해 북마클릿이 실행되지 않을 수 있습니다.

### 주의사항
- 개발 모드에서는 환경 변수 `NODE_ENV`가 'development'로 설정됩니다
- 프로덕션 빌드 시에는 환경 변수 `NODE_ENV`가 'production'으로 설정됩니다
- GitHub Pages 배포 시 `package.json`의 "homepage" 필드가 올바르게 설정되어 있는지 확인하세요

## 사용 방법

### 1. 웹 접근성 자동 분석

#### 페이지 분석하기
1. 분석하고자 하는 웹 페이지 URL을 입력창에 붙여넣기
2. "분석 시작" 버튼 클릭
3. 분석 결과가 카테고리별로 표시됨
   - 오류 (Error): 즉시 수정이 필요한 항목
   - 경고 (Warning): 검토가 필요한 항목
   - 통과 (Pass): 접근성 기준을 만족하는 항목

#### KWCAG 2.2 기준 체크리스트
- 각 검사 항목별 준수 여부 확인
- 위반 사항에 대한 상세 설명 제공
- 개선 방법 가이드 제공

### 2. 색맹 시뮬레이션 도구

#### 시뮬레이션 실행
1. 상단 메뉴에서 "색맹 시뮬레이션" 선택
2. 테스트할 색맹 유형 선택:
   - 적색맹 (Protanopia)
   - 녹색맹 (Deuteranopia)
   - 청색맹 (Tritanopia)
   - 전색맹 (Achromatopsia)
3. 실시간으로 페이지가 선택한 색맹 유형으로 변환됨

### 3. AI 기반 접근성 Q&A

#### 챗봇 사용하기
1. 접근성 관련 질문 입력
2. AI가 다음과 같은 도움을 제공:
   - KWCAG 2.2 기준 설명
   - 접근성 문제 해결 방안
   - 코드 수정 예시
   - 모범 사례 추천

### 4. 보고서 생성

#### HTML 보고서 생성
1. 분석 완료 후 "보고서 생성" 버튼 클릭
2. 보고서에 포함되는 항목:
   - 전체 페이지 분석 결과
   - 위반 사항 목록
   - 개선 권장사항
   - 색맹 시뮬레이션 결과
3. HTML 형식으로 저장

### 문제 해결
- 분석이 진행되지 않을 경우 페이지 새로고침
- 챗봇 응답이 느릴 경우 네트워크 연결 확인

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 아래를 참고하세요:

```text
MIT License

Copyright (c) 2024 kenziedev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
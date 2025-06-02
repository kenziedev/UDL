// src/core/colorBlindness.js
import '../styles/colorBlindness.css';

const originalColors = [
    { hex: '#E53935', name: '빨강' },
    { hex: '#43A047', name: '녹색' },
    { hex: '#1E88E5', name: '파랑' },
    { hex: '#FDD835', name: '노랑' },
    { hex: '#8E24AA', name: '보라' },
    { hex: '#00ACC1', name: '청록' },
    { hex: '#FF9800', name: '주황' },
    { hex: '#6D4C41', name: '갈색' }
];

const matrices = {
    normal: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    protanopia: [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0],
    deuteranopia: [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0],
    tritanopia: [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0],
    achromatopsia: [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0]
};

export function checkColorBlindness() {
    const colorblindContent = document.getElementById('tab-content-colorblind');
    if (!colorblindContent) return;

    colorblindContent.innerHTML = `
        <div class="colorblind-section">
            <h3>색맹 시뮬레이션</h3>
            <p>이미지나 현재 페이지를 색맹 시뮬레이션으로 확인할 수 있습니다.</p>
            
            <div class="colorblind-controls">
                <div class="control-group">
                    <label for="colorblind-type">색맹 유형</label>
                    <select id="colorblind-type" class="select-control">
                        <option value="normal">일반 시력</option>
                        <option value="protanopia" selected>적색맹 (Protanopia)</option>
                        <option value="deuteranopia">녹색맹 (Deuteranopia)</option>
                        <option value="tritanopia">청색맹 (Tritanopia)</option>
                        <option value="achromatopsia">완전색맹 (Achromatopsia)</option>
                    </select>
                </div>

                <div class="control-group">
                    <label for="colorblind-strength">강도</label>
                    <input type="range" id="colorblind-strength" min="0" max="100" value="100" class="range-control">
                    <span id="strength-value">100%</span>
                </div>
            </div>

            <div class="colorblind-preview">
                <div class="preview-container">
                    <h4>원본 색상 샘플</h4>
                    <div class="color-samples original-samples">
                        <div class="color-sample" style="background-color: #E53935;">#E53935 (빨강)</div>
                        <div class="color-sample" style="background-color: #43A047;">#43A047 (녹색)</div>
                        <div class="color-sample" style="background-color: #1E88E5;">#1E88E5 (파랑)</div>
                        <div class="color-sample" style="background-color: #FDD835;">#FDD835 (노랑)</div>
                        <div class="color-sample" style="background-color: #8E24AA;">#8E24AA (보라)</div>
                        <div class="color-sample" style="background-color: #00ACC1;">#00ACC1 (청록)</div>
                        <div class="color-sample" style="background-color: #FF9800;">#FF9800 (주황)</div>
                        <div class="color-sample" style="background-color: #6D4C41;">#6D4C41 (갈색)</div>
                    </div>
                </div>

                <div class="preview-container">
                    <h4>시뮬레이션 결과</h4>
                    <div class="color-samples" id="colorblind-samples"></div>
                </div>
            </div>
            
            <div class="colorblind-current-page">
                <h4>현재 페이지 색맹 시뮬레이션</h4>
                <p>현재 보고 있는 페이지를 색맹 시뮬레이션으로 확인할 수 있습니다:</p>
                <button id="capture-page-btn" class="action-button">현재 페이지 캡처 및 시뮬레이션</button>
                <div class="image-preview-container">
                    <div class="image-preview">
                        <div class="preview-original">
                            <h5>원본 페이지</h5>
                            <div id="page-original-preview"></div>
                        </div>
                        <div class="preview-simulation">
                            <h5>시뮬레이션 결과</h5>
                            <canvas id="page-simulation-canvas"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="colorblind-image-upload">
                <h4>이미지 색맹 시뮬레이션</h4>
                <p>이미지 파일을 업로드하여 색맹 시뮬레이션을 확인할 수 있습니다:</p>
                <input type="file" id="image-upload" accept="image/*" class="file-input" />
                <div class="image-preview-container">
                    <div class="image-preview">
                        <div class="preview-original">
                            <h5>원본 이미지</h5>
                            <img id="original-preview" alt="원본 이미지 미리보기" />
                        </div>
                        <div class="preview-simulation">
                            <h5>시뮬레이션 결과</h5>
                            <canvas id="simulation-canvas"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="colorblind-info">
                <h4>색맹에 대한 이해</h4>
                <ul>
                    <li><strong>적색맹 (Protanopia)</strong>: 빨강 인식 어려움</li>
                    <li><strong>녹색맹 (Deuteranopia)</strong>: 녹색 인식 어려움</li>
                    <li><strong>청색맹 (Tritanopia)</strong>: 파랑 인식 어려움</li>
                    <li><strong>완전색맹 (Achromatopsia)</strong>: 모든 색을 흑백으로 인식</li>
                </ul>
                <h4>접근성 디자인 팁</h4>
                <ul>
                    <li>색상 외에도 텍스트, 아이콘, 패턴 등을 함께 사용하세요.</li>
                    <li>빨강-녹색 조합 사용을 피하고 대비를 충분히 확보하세요.</li>
                    <li>중요한 정보를 단일 색상으로 표현하지 마세요.</li>
                </ul>
            </div>
        </div>
    `;

    // 컨트롤 요소
    const typeSelect = document.getElementById('colorblind-type');
    const strengthSlider = document.getElementById('colorblind-strength');
    const strengthValue = document.getElementById('strength-value');

    // 이미지 업로드 관련 요소
    const imageUpload = document.getElementById('image-upload');
    const originalPreview = document.getElementById('original-preview');
    const simulationCanvas = document.getElementById('simulation-canvas');
    
    // 현재 페이지 캡처 관련 요소
    const capturePageBtn = document.getElementById('capture-page-btn');
    const pageOriginalPreview = document.getElementById('page-original-preview');
    const pageSimulationCanvas = document.getElementById('page-simulation-canvas');

    // 색상 샘플 업데이트 함수
    function updateColorSamples() {
        const type = typeSelect.value;
        const strength = parseFloat(strengthSlider.value) / 100;
        const samplesContainer = document.getElementById('colorblind-samples');

        if (!samplesContainer) return;

        samplesContainer.innerHTML = '';

        originalColors.forEach(color => {
            const sample = document.createElement('div');
            sample.className = 'color-sample';
            sample.textContent = `${color.hex} (${color.name})`;

            const transformedColor = applyColorMatrix(color.hex, type, strength);
            sample.style.backgroundColor = transformedColor;

            const rgb = hexToRgb(transformedColor);
            const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            sample.style.color = brightness > 125 ? 'black' : 'white';
            sample.style.textShadow = brightness > 125 ? '0 0 2px rgba(255,255,255,0.7)' : '0 0 2px rgba(0,0,0,0.7)';

            samplesContainer.appendChild(sample);
        });
    }

    // 컨트롤 이벤트 리스너
    function updateSimulation() {
        const type = typeSelect.value;
        const strength = parseFloat(strengthSlider.value) / 100;

        // 색상 샘플 업데이트
        updateColorSamples();

        // 이미지 업로드 미리보기 업데이트
        const uploadedImg = originalPreview.src ? new Image() : null;
        if (uploadedImg) {
            uploadedImg.onload = () => applyColorBlindFilter(uploadedImg, simulationCanvas, type, strength);
            uploadedImg.src = originalPreview.src;
        }

        // 페이지 캡처 미리보기 업데이트
        const pageImg = pageOriginalPreview.querySelector('img');
        if (pageImg) {
            const img = new Image();
            img.onload = () => applyColorBlindFilter(img, pageSimulationCanvas, type, strength);
            img.src = pageImg.src;
        }
    }

    // 초기 색상 샘플 업데이트 (적색맹으로 설정)
    updateColorSamples();

    // 컨트롤 이벤트 리스너 등록
    typeSelect.addEventListener('change', updateSimulation);
    strengthSlider.addEventListener('input', () => {
        strengthValue.textContent = strengthSlider.value + '%';
        updateSimulation();
    });

    // 이미지 업로드 이벤트 리스너
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                originalPreview.src = event.target.result;
                applyColorBlindFilter(img, simulationCanvas, typeSelect.value, parseFloat(strengthSlider.value) / 100);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    // 현재 페이지 캡처 버튼 이벤트 리스너
    capturePageBtn.addEventListener('click', async function() {
        try {
            console.log('캡처 시작...');
            
            // 버튼 상태 업데이트
            capturePageBtn.disabled = true;
            capturePageBtn.textContent = '페이지 캡처 중...';
            
            // 패널을 임시로 숨기기 (캡처에 포함되지 않도록)
            const panel = document.getElementById('udl-accessibility-panel');
            if (!panel) {
                throw new Error('패널을 찾을 수 없습니다.');
            }
            const originalDisplay = panel.style.display;
            panel.style.display = 'none';
            
            console.log('html2canvas 로드 시도...');
            // html2canvas 라이브러리 동적 로드
            const html2canvas = await loadHtml2Canvas();
            console.log('html2canvas 로드 성공');
            
            // 컨테이너 크기 계산
            const container = pageOriginalPreview;
            if (!container) {
                throw new Error('미리보기 컨테이너를 찾을 수 없습니다.');
            }
            
            // 부모 컨테이너의 실제 크기를 계산
            const parentContainer = container.closest('.image-preview-container');
            if (!parentContainer) {
                throw new Error('부모 컨테이너를 찾을 수 없습니다.');
            }
            
            // 화면 크기에 맞춰 최대 크기 계산
            const maxWidth = Math.min(parentContainer.clientWidth, window.innerWidth * 0.9);
            const maxHeight = Math.min(window.innerHeight * 0.8, 800); // 화면 높이의 80% 또는 최대 800px
            
            console.log('컨테이너 크기:', { maxWidth, maxHeight });
            
            console.log('캡처 영역 계산 중...');
            // 캡처할 영역 계산
            const body = document.body;
            const html = document.documentElement;
            const width = Math.max(
                body.scrollWidth, body.offsetWidth,
                html.clientWidth, html.scrollWidth, html.offsetWidth
            );
            const height = Math.max(
                body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight
            );
            
            console.log('캡처 영역 크기:', { width, height });

            // 캡처할 요소 선택 (패널을 제외한 전체 페이지)
            const captureElement = document.documentElement;
            
            console.log('페이지 캡처 시도...');
            // 페이지 캡처 시도
            let canvas;
            try {
                canvas = await html2canvas(captureElement, {
                    logging: true,
                    allowTaint: true,
                    useCORS: true,
                    scale: 1,
                    backgroundColor: '#ffffff',
                    width: width,
                    height: height,
                    windowWidth: width,
                    windowHeight: height,
                    scrollX: 0,
                    scrollY: 0,
                    onclone: (clonedDoc) => {
                        console.log('문서 복제 중...');
                        // 복제된 문서에서 패널 제거
                        const clonedPanel = clonedDoc.getElementById('udl-accessibility-panel');
                        if (clonedPanel) {
                            clonedPanel.remove();
                        }
                        // 스크롤 위치 초기화
                        clonedDoc.documentElement.scrollTop = 0;
                        clonedDoc.documentElement.scrollLeft = 0;
                        console.log('문서 복제 완료');
                    }
                });
                console.log('캡처 완료, 캔버스 크기:', { width: canvas.width, height: canvas.height });
            } catch (captureError) {
                console.error('html2canvas 캡처 실패:', captureError);
                throw new Error('페이지 캡처에 실패했습니다: ' + captureError.message);
            }

            // 패널 다시 표시
            panel.style.display = originalDisplay;

            if (!canvas || canvas.width === 0 || canvas.height === 0) {
                throw new Error('캡처된 이미지가 유효하지 않습니다.');
            }

            console.log('이미지 변환 시작...');
            // 캡처 결과를 Blob으로 변환
            const blob = await new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        console.log('Blob 생성 성공, 크기:', blob.size);
                        resolve(blob);
                    } else {
                        reject(new Error('Blob 생성 실패'));
                    }
                }, 'image/png', 1.0);
            });

            // Blob을 URL로 변환
            const imageUrl = URL.createObjectURL(blob);
            console.log('이미지 URL 생성 완료');
            
            // 캡처 결과 표시
            const img = new Image();
            img.onload = async function() {
                console.log('이미지 로드 완료, 크기:', { 
                    naturalWidth: img.naturalWidth, 
                    naturalHeight: img.naturalHeight 
                });
                try {
                    // 이미지 크기 조정
                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                    let newWidth = img.naturalWidth;
                    let newHeight = img.naturalHeight;
                    
                    console.log('초기 크기:', { newWidth, newHeight, maxWidth, maxHeight });
                    
                    // 너비가 최대 너비를 초과하는 경우
                    if (newWidth > maxWidth) {
                        newWidth = maxWidth;
                        newHeight = Math.round(newWidth / aspectRatio);
                    }
                    
                    // 높이가 최대 높이를 초과하는 경우
                    if (newHeight > maxHeight) {
                        newHeight = maxHeight;
                        newWidth = Math.round(newHeight * aspectRatio);
                    }
                    
                    // 최소 크기 보장 (화면 크기의 30% 이상)
                    const minWidth = Math.max(100, window.innerWidth * 0.3);
                    const minHeight = Math.max(100, window.innerHeight * 0.3);
                    newWidth = Math.max(newWidth, minWidth);
                    newHeight = Math.max(newHeight, minHeight);
                    
                    console.log('조정된 이미지 크기:', { newWidth, newHeight });
                    
                    // 고해상도 캔버스 생성 (2배 크기로)
                    const scale = 2; // 선명도를 위해 2배 크기로 생성
                    const resizedCanvas = document.createElement('canvas');
                    resizedCanvas.width = newWidth * scale;
                    resizedCanvas.height = newHeight * scale;
                    const ctx = resizedCanvas.getContext('2d', { 
                        willReadFrequently: true,
                        alpha: true,
                        imageSmoothingEnabled: true,
                        imageSmoothingQuality: 'high'
                    });
                    
                    // 이미지 그리기 (고해상도)
                    ctx.drawImage(img, 0, 0, newWidth * scale, newHeight * scale);
                    
                    // 이미지 데이터 생성
                    let resizedImageData;
                    try {
                        resizedImageData = resizedCanvas.toDataURL('image/png', 1.0);
                        console.log('이미지 데이터 생성 완료, 크기:', resizedImageData.length);
                        if (!resizedImageData || resizedImageData === 'data:,' || resizedImageData.length < 100) {
                            throw new Error('이미지 데이터가 유효하지 않습니다.');
                        }
                    } catch (dataError) {
                        console.error('이미지 데이터 생성 실패:', dataError);
                        throw new Error('이미지 데이터 생성에 실패했습니다: ' + dataError.message);
                    }
                    
                    // 원본 미리보기에 이미지 추가
                    pageOriginalPreview.innerHTML = '';
                    const previewImg = document.createElement('img');
                    previewImg.style.width = '100%'; // 컨테이너 너비에 맞춤
                    previewImg.style.height = 'auto';
                    previewImg.style.display = 'block';
                    previewImg.style.margin = '0 auto';
                    previewImg.style.objectFit = 'contain'; // 비율 유지하면서 컨테이너에 맞춤
                    
                    // 이미지 로드 Promise 생성
                    const imageLoadPromise = new Promise((resolve, reject) => {
                        previewImg.onload = () => {
                            console.log('미리보기 이미지 로드 완료');
                            resolve(previewImg);
                        };
                        previewImg.onerror = (error) => {
                            console.error('미리보기 이미지 로드 실패:', error);
                            reject(new Error('미리보기 이미지 로드에 실패했습니다.'));
                        };
                    });
                    
                    // 이미지 데이터 설정
                    previewImg.src = resizedImageData;
                    
                    // 이미지를 컨테이너에 추가
                    pageOriginalPreview.appendChild(previewImg);
                    console.log('미리보기 이미지 DOM에 추가됨');
                    
                    try {
                        // 이미지 로드 완료 대기
                        const loadedImage = await imageLoadPromise;
                        
                        // 시뮬레이션 캔버스 크기 설정
                        pageSimulationCanvas.width = loadedImage.naturalWidth;
                        pageSimulationCanvas.height = loadedImage.naturalHeight;
                        
                        console.log('시뮬레이션 캔버스 크기 설정:', {
                            width: pageSimulationCanvas.width,
                            height: pageSimulationCanvas.height
                        });
                        
                        // 색맹 시뮬레이션 적용
                        applyColorBlindFilter(loadedImage, pageSimulationCanvas, typeSelect.value, parseFloat(strengthSlider.value) / 100);
                        
                        // URL 해제
                        URL.revokeObjectURL(imageUrl);
                        
                        console.log('이미지 처리 완료');
                        
                        // 버튼 상태 복원
                        capturePageBtn.disabled = false;
                        capturePageBtn.textContent = '현재 페이지 캡처 및 시뮬레이션';
                    } catch (loadError) {
                        throw new Error('이미지 처리 중 오류 발생: ' + loadError.message);
                    }
                } catch (error) {
                    console.error('이미지 처리 중 오류 발생:', error);
                    URL.revokeObjectURL(imageUrl);
                    throw error;
                }
            };
            
            img.onerror = function(error) {
                console.error('이미지 로드 중 오류 발생:', error);
                URL.revokeObjectURL(imageUrl);
                throw new Error('이미지 로드 실패: ' + (error.message || '알 수 없는 오류'));
            };
            
            console.log('이미지 로드 시작...');
            img.src = imageUrl;
        } catch (error) {
            console.error('페이지 캡처 오류:', error);
            const panel = document.getElementById('udl-accessibility-panel');
            if (panel) {
                panel.style.display = 'block';
            }
            capturePageBtn.disabled = false;
            capturePageBtn.textContent = '페이지 캡처 실패 (다시 시도)';
            
            // 오류 메시지 표시
            if (pageOriginalPreview) {
                pageOriginalPreview.innerHTML = `
                    <div class="error-message">
                        페이지 캡처 중 오류가 발생했습니다: ${error.message}
                        <br>
                        <small>브라우저 콘솔에서 자세한 오류 내용을 확인할 수 있습니다.</small>
                    </div>`;
            }
        }
    });
}

// html2canvas 라이브러리 동적 로드 함수
async function loadHtml2Canvas() {
    if (window.html2canvas) {
        console.log('html2canvas가 이미 로드되어 있습니다.');
        return window.html2canvas;
    }
    
    console.log('html2canvas 로드 시작...');
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => {
            console.log('html2canvas 로드 완료');
            if (window.html2canvas) {
                resolve(window.html2canvas);
            } else {
                reject(new Error('html2canvas가 로드되었지만 전역 객체를 찾을 수 없습니다.'));
            }
        };
        script.onerror = (error) => {
            console.error('html2canvas 로드 실패:', error);
            reject(new Error('html2canvas 로드 실패: ' + error.message));
        };
        document.head.appendChild(script);
    });
}

function initColorBlindTester() {
    const typeSelect = document.getElementById('colorblind-type');
    const strengthSlider = document.getElementById('colorblind-strength');
    const strengthValue = document.getElementById('strength-value');
    const samplesContainer = document.getElementById('colorblind-samples');
    const imageUpload = document.getElementById('image-upload');
    const originalPreview = document.getElementById('original-image-preview');
    const simulationCanvas = document.getElementById('simulation-canvas');

    updateColorSamples();

    typeSelect.addEventListener('change', updateColorSamples);
    strengthSlider.addEventListener('input', () => {
        strengthValue.textContent = strengthSlider.value + '%';
        updateColorSamples();
    });

    imageUpload.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = event => {
                const img = new Image();
                img.onload = () => {
                    originalPreview.innerHTML = '';
                    originalPreview.appendChild(img.cloneNode());
                    applyColorBlindFilter(img, true); // 업로드 때는 isFirstLoad = true
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

function applyColorMatrix(hexColor, type, strength) {
    const rgb = hexToRgb(hexColor);
    const matrix = matrices[type] || matrices.normal;

    const blendedMatrix = matrix.map((value, i) =>
        matrices.normal[i] * (1 - strength) + value * strength
    );

    const r = rgb.r * blendedMatrix[0] + rgb.g * blendedMatrix[1] + rgb.b * blendedMatrix[2];
    const g = rgb.r * blendedMatrix[5] + rgb.g * blendedMatrix[6] + rgb.b * blendedMatrix[7];
    const b = rgb.r * blendedMatrix[10] + rgb.g * blendedMatrix[11] + rgb.b * blendedMatrix[12];

    return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
}

function applyColorBlindFilter(img, targetCanvas, type = 'protanopia', strength = 1) {
    if (!img || !targetCanvas || !img.complete || img.naturalWidth === 0) {
        console.warn('이미지가 아직 로드되지 않았거나 유효하지 않습니다.');
        return;
    }

    const canvas = targetCanvas;
    const ctx = canvas.getContext('2d');

    // 캔버스 크기를 이미지 크기와 동일하게 설정
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    // 이미지가 로드되었는지 한 번 더 확인
    if (canvas.width === 0 || canvas.height === 0) {
        console.warn('캔버스 크기가 유효하지 않습니다.');
        return;
    }

    // 이미지 그리기
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 색맹 시뮬레이션 적용
    if (type !== 'normal') {
        try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const blendedMatrix = matrices[type].map((v, i) =>
                matrices.normal[i] * (1 - strength) + v * strength
            );

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                data[i] = r * blendedMatrix[0] + g * blendedMatrix[1] + b * blendedMatrix[2];
                data[i + 1] = r * blendedMatrix[5] + g * blendedMatrix[6] + b * blendedMatrix[7];
                data[i + 2] = r * blendedMatrix[10] + g * blendedMatrix[11] + b * blendedMatrix[12];
            }

            ctx.putImageData(imageData, 0, 0);
        } catch (error) {
            console.error('이미지 처리 중 오류 발생:', error);
        }
    }
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

export function getColorBlindnessHTML() {
    return `
    <div class="colorblind-tester">
      <div class="contrast-summary">
        <h3>색맹 시뮬레이션 도구</h3>
        <p>웹 페이지 색상을 색맹 사용자 입장에서 시뮬레이션합니다.</p>
        <p>시뮬레이션할 색맹 유형과 강도를 선택하세요:</p>
      </div>

      <div class="colorblind-controls">
        <div class="control-group">
          <label for="colorblind-type">색맹 유형</label>
          <select id="colorblind-type" class="select-control">
            <option value="normal">일반 시력</option>
            <option value="protanopia">적색맹 (Protanopia)</option>
            <option value="deuteranopia">녹색맹 (Deuteranopia)</option>
            <option value="tritanopia">청색맹 (Tritanopia)</option>
            <option value="achromatopsia">완전색맹 (Achromatopsia)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="colorblind-strength">강도</label>
          <input type="range" id="colorblind-strength" min="0" max="100" value="100" class="range-control">
          <span id="strength-value">100%</span>
        </div>
      </div>

      <div class="colorblind-preview">
        <div class="preview-container">
          <h4>원본 색상 샘플</h4>
          <div class="color-samples original-samples">
            <div class="color-sample" style="background-color: #E53935;">#E53935 (빨강)</div>
            <div class="color-sample" style="background-color: #43A047;">#43A047 (녹색)</div>
            <div class="color-sample" style="background-color: #1E88E5;">#1E88E5 (파랑)</div>
            <div class="color-sample" style="background-color: #FDD835;">#FDD835 (노랑)</div>
            <div class="color-sample" style="background-color: #8E24AA;">#8E24AA (보라)</div>
            <div class="color-sample" style="background-color: #00ACC1;">#00ACC1 (청록)</div>
            <div class="color-sample" style="background-color: #FF9800;">#FF9800 (주황)</div>
            <div class="color-sample" style="background-color: #6D4C41;">#6D4C41 (갈색)</div>
          </div>
        </div>

        <div class="preview-container">
          <h4>시뮬레이션 결과</h4>
          <div class="color-samples" id="colorblind-samples"></div>
        </div>
      </div>

      <div class="colorblind-upload">
        <h4>이미지 색맹 시뮬레이션</h4>
        <p>이미지를 업로드하여 색맹 시뮬레이션 결과를 확인하세요:</p>
        <input type="file" id="image-upload" accept="image/*" class="file-input">

        <div class="image-preview">
          <div class="preview-original">
            <h5>원본 이미지</h5>
            <div id="original-image-preview"></div>
          </div>
          <div class="preview-simulation">
            <h5>시뮬레이션 결과</h5>
            <canvas id="simulation-canvas"></canvas>
          </div>
        </div>
      </div>

      <div class="colorblind-info">
        <h4>색맹에 대한 이해</h4>
        <ul>
          <li><strong>적색맹 (Protanopia)</strong>: 빨강 인식 어려움</li>
          <li><strong>녹색맹 (Deuteranopia)</strong>: 녹색 인식 어려움</li>
          <li><strong>청색맹 (Tritanopia)</strong>: 파랑 인식 어려움</li>
          <li><strong>완전색맹 (Achromatopsia)</strong>: 모든 색을 흑백으로 인식</li>
        </ul>
        <h4>접근성 디자인 팁</h4>
        <ul>
          <li>색상 외에도 텍스트, 아이콘, 패턴 등을 함께 사용하세요.</li>
          <li>빨강-녹색 조합 사용을 피하고 대비를 충분히 확보하세요.</li>
          <li>중요한 정보를 단일 색상으로 표현하지 마세요.</li>
        </ul>
      </div>
    </div>
  `;
}


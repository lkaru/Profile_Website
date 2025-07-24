document.addEventListener('DOMContentLoaded', function () {

    // --- Slider Configuration ---
    const slideData = [
        { title: "Project Alpha", description: "", image: "../images/test.png" },
        { title: "Project Beta", description: "", image: "../images/beta.png" },
        { title: "Project Zeta", description: "", image: "../images/zeta.webp" }
    ];

    let slides = [];
    let currentSlide = 0;
    let slideInterval; // 슬라이드 자동 전환을 위한 Interval ID 저장 변수
    let initialDelayTimeout;
    
    const sliderContainer = document.querySelector('.project_thumbnail .slider-container');
    const btnLeft = document.querySelector('.project_thumbnail .btn-left');
    const btnRight = document.querySelector('.project_thumbnail .btn-right');


    // --- Slider Functions and Event Listeners ---

    // 슬라이더 초기화: slideData를 기반으로 HTML 요소 생성
    function initSlider() {
        if (!sliderContainer) {
            console.error("슬라이더 컨테이너를 찾을 수 없습니다!");
            return;
        }

        sliderContainer.innerHTML = '';

        slideData.forEach((data, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('transition_box');
            slideDiv.setAttribute('data-index', index);
            slideDiv.transition = 'opacity 0.6s ease-in-out';

            const h3 = document.createElement('h3');
            h3.textContent = data.title;
            h3.style.zIndex = '20';
            h3.style.position = 'relative'; // z-index가 작동하려면 position 속성이 필요합니다.
            h3.style.fontSize = '30px';
            h3.style.webkitTextStroke = '1px black'; // 1px 두께의 검은색 윤곽선
            h3.style.color = 'white'; // 텍스트 내부 색상 (stroke와 대비되게)
            slideDiv.appendChild(h3);

            const p = document.createElement('p');
            p.textContent = data.description;
            p.style.zIndex = '10';
            p.style.position = 'relative'; // z-index가 작동하려면 position 속성이 필요합니다.
            slideDiv.appendChild(p);

            if (data.image) {
                const img = document.createElement('img');
                img.src = data.image;
                img.alt = data.title;

                img.style.position = 'absolute';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.zIndex = '1';

                slideDiv.appendChild(img);
            }

            sliderContainer.appendChild(slideDiv);
        });

        // 요소 생성 후, `slides` NodeList를 다시 선택
        slides = document.querySelectorAll('.project_thumbnail .transition_box');

        if (slides.length > 0) {
            showSlide(currentSlide); // 초기 슬라이드 표시
        }
    }

    // initSlider를 호출하여 슬라이드 빌드
    initSlider();

    // 슬라이드 표시 및 3D 효과 함수
    function showSlide(index) {
        if (!slides.length) return;

        const numSlides = slides.length;
        const anglePerSlide = 360 / numSlides; // 각 슬라이드당 회전 각도

        // 각 슬라이드의 너비를 기준으로 회전 반경 계산
        const slideWidthValue = slides[0].offsetWidth; // 슬라이드의 실제 너비 (픽셀)
        // 안전을 위해 slideWidthValue가 0이 아닌지 확인 (초기 로딩 시 0일 수 있음)
        const radius = (slideWidthValue > 0) ? (slideWidthValue / 2) / Math.tan(Math.PI / numSlides) : 0; // 다각형의 반지름 계산

        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // 모든 active 클래스 제거

            const rotationY = anglePerSlide * (i - index);

            // z-index 초기화 (기본적으로 낮은 값)
            slide.style.zIndex = 1;

            if (i === index) {
                // 현재 활성화된 슬라이드
                slide.classList.add('active');
                slide.style.zIndex = 100; // 가장 앞으로
                slide.style.opacity = 1;
                slide.style.visibility = 'visible';
                slide.style.pointerEvents = 'auto'; // 클릭 가능하게
                // 중앙에 위치시키고 정면을 바라보도록 함
                slide.style.transform = `
                    translate(-50%, -50%) /* 중앙 정렬 */
                    rotateY(${rotationY}deg) /* 현재 슬라이드 위치 */
                    translateZ(${radius}px) /* 원의 바깥쪽으로 이동 */
                    scale(1)
                `;
            } else {
                // 비활성화된 슬라이드들
                slide.style.pointerEvents = 'none'; // 클릭 불가능하게

                // 활성화된 슬라이드로부터의 거리 계산 (최단 경로)
                let diff = i - index;
                if (diff > numSlides / 2) {
                    diff -= numSlides;
                } else if (diff < -numSlides / 2) {
                    diff += numSlides;
                }

                const opacity = 1 - (Math.abs(diff) * 0.3); // 거리에 따라 투명도 조절
                const scale = 1 - (Math.abs(diff) * 0.1); // 거리에 따라 크기 조절

                // z-index는 카메라에 가까울수록 높게 설정
                slide.style.zIndex = 50 - Math.abs(diff);


                if (Math.abs(diff) <= Math.floor(numSlides / 2)) { // 화면에 보이는 슬라이드만 처리
                    slide.style.opacity = Math.max(0.1, opacity); // 최소 투명도 0.1
                    slide.style.visibility = 'visible';
                    slide.style.transform = `
                        translate(-50%, -50%) /* 중앙 정렬 */
                        rotateY(${rotationY}deg) /* 현재 슬라이드 위치 */
                        translateZ(${radius}px) /* 원의 바깥쪽으로 이동 */
                        scale(${scale}) /* 거리에 따른 크기 조절 */
                    `;
                } else {
                    // 화면에 보이지 않는 슬라이드는 완전히 숨김
                    slide.style.opacity = 0;
                    slide.style.visibility = 'hidden';
                    slide.style.pointerEvents = 'none';
                    // 초기 위치로 재설정하여 다음 등장 시 깜빡임 방지
                    slide.style.transform = `translate(-50%, -50%) scale(0.7)`;
                }
            }
        });
    }
    

    // --- 슬라이더 버튼 이벤트 리스너 (수정됨) ---
    if (btnRight) {
        btnRight.addEventListener('mouseenter', () => {
            // 기존 초기 딜레이 타이머 및 인터벌 정리
            if (initialDelayTimeout) clearTimeout(initialDelayTimeout);
            if (slideInterval) clearInterval(slideInterval);

            // 0.25초 후부터 인터벌 시작
            initialDelayTimeout = setTimeout(() => {
                // 첫 번째 슬라이드 전환 (0.25초 후)
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);

                // 이후 0.75초마다 슬라이드 넘기기 반복
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 750); // 0.75초 = 750밀리초
            }, 250); // 0.25초 = 250밀리초 지연
        });

        btnRight.addEventListener('mouseleave', () => {
            // 마우스 벗어날 시 초기 딜레이 타이머 및 자동 전환 중지
            if (initialDelayTimeout) clearTimeout(initialDelayTimeout);
            if (slideInterval) clearInterval(slideInterval);
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener('mouseenter', () => {
            // 기존 초기 딜레이 타이머 및 인터벌 정리
            if (initialDelayTimeout) clearTimeout(initialDelayTimeout);
            if (slideInterval) clearInterval(slideInterval);

            // 0.25초 후부터 인터벌 시작
            initialDelayTimeout = setTimeout(() => {
                // 첫 번째 슬라이드 전환 (0.25초 후)
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);

                // 이후 0.75초마다 슬라이드 넘기기 반복
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                }, 750); // 0.75초 = 750밀리초
            }, 250); // 0.25초 = 250밀리초 지연
        });

        btnLeft.addEventListener('mouseleave', () => {
            // 마우스 벗어날 시 초기 딜레이 타이머 및 자동 전환 중지
            if (initialDelayTimeout) clearTimeout(initialDelayTimeout);
            if (slideInterval) clearInterval(slideInterval);
        });
    }

});
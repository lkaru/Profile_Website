document.addEventListener('DOMContentLoaded', function() {

    // --- Sidebar Elements ---
    const sideMenu = document.getElementById('side_menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarWidth = '250px';

    // --- Slider Configuration ---
    const slideData = [
        { title: "Project Alpha", description: "AI와 머신러닝 탐구." },
        { title: "Project Beta", description: "반응형 웹 애플리케이션 개발." },
        { title: "Project Gamma", description: "데이터 시각화 기술 연구." },
        { title: "Project Delta", description: "게임 개발의 새로운 모험." },
        { title: "Project Epsilon", description: "모바일 앱 UX/UI 디자인." },
        { title: "Project Zeta", description: "클라우드 기반 시스템 구축." }
        // 필요에 따라 더 많은 슬라이드 데이터를 추가하세요!
        // 슬라이드 개수는 최소 3개 이상이 좋습니다.
    ];

    let slides = []; // 이 변수는 동적으로 채워집니다.
    let currentSlide = 0;

    const sliderContainer = document.querySelector('.project_thumbnail .slider-container');
    const btnLeft = document.querySelector('.project_thumbnail .btn-left');
    const btnRight = document.querySelector('.project_thumbnail .btn-right');


    // --- Sidebar Functions and Event Listeners ---

    function openSidebar() {
        if (!sidebar) return;
        if (sidebar.style.width === sidebarWidth) {
            return;
        }
        sidebar.style.width = sidebarWidth;
        document.body.classList.add('sidebar-open');
        if (sideMenu) {
            sideMenu.classList.add('shifted');
        }
    }

    function closeSidebar() {
        if (!sidebar) return;
        if (sidebar.style.width === '0px' || sidebar.style.width === '') {
            return;
        }
        sidebar.style.width = '0';
        document.body.classList.remove('sidebar-open');
        if (sideMenu) {
            sideMenu.classList.remove('shifted');
        }
    }

    if (sideMenu) {
        sideMenu.addEventListener('mouseenter', openSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener('mouseleave', closeSidebar);
    }

    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.style.width === sidebarWidth) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnSideMenu = sideMenu && sideMenu.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnSideMenu) {
                closeSidebar();
            }
        }
    });

    // --- Slider Functions and Event Listeners ---

    // 슬라이더 초기화: slideData를 기반으로 HTML 요소 생성
    function initSlider() {
        if (!sliderContainer) {
            console.error("슬라이더 컨테이너를 찾을 수 없습니다!");
            return;
        }

        sliderContainer.innerHTML = ''; // 기존 내용 지우기

        slideData.forEach((data, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('transition_box');
            slideDiv.setAttribute('data-index', index);

            const h3 = document.createElement('h3');
            h3.textContent = data.title;
            slideDiv.appendChild(h3);

            const p = document.createElement('p');
            p.textContent = data.description;
            slideDiv.appendChild(p);

            // 이미지 추가 (선택 사항)
            // if (data.image) {
            //     const img = document.createElement('img');
            //     img.src = data.image;
            //     img.alt = data.title;
            //     slideDiv.appendChild(img);
            // }

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
        // 슬라이드의 `width` 속성(예: 60%)을 고려해야 합니다.
        // 여기서는 슬라이더 컨테이너 너비의 절반(center to edge)을 기준으로 계산합니다.
        // 더 정확한 계산을 위해선 슬라이드 너비와 회전 각도를 사용한 삼각법이 필요합니다.
        // 예를 들어, `r = (slideWidth / 2) / Math.tan(Math.PI / numSlides)`
        // 현재는 슬라이드 너비의 0.5배를 기준으로 대략적인 값을 사용합니다.
        const slideWidthValue = slides[0].offsetWidth; // 슬라이드의 실제 너비 (픽셀)
        const radius = (slideWidthValue / 2) / Math.tan(Math.PI / numSlides); // 다각형의 반지름 계산

        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // 모든 active 클래스 제거

            const rotationY = anglePerSlide * (i - index); // 현재 슬라이드 기준 회전 각도
            
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

    // 슬라이더 버튼 이벤트 리스너
    if (btnRight) {
        btnRight.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

});
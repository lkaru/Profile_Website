document.addEventListener('DOMContentLoaded', function() {
    // 사이드바 관련 요소들
    const sideMenu = document.getElementById('side_menu');
    const sidebar = document.getElementById('sidebar');
    
    const sideMenuIcon = sideMenu; 
    
    const sidebarWidth = '250px';

    // 슬라이더 관련 요소들
    const slides = document.querySelectorAll('.project_thumbnail .transition_box');
    const btnLeft = document.querySelector('.project_thumbnail .btn-left');
    const btnRight = document.querySelector('.project_thumbnail .btn-right');

    let currentSlide = 0; // 현재 활성화된 슬라이드 인덱스

    // 슬라이드 표시 및 3D 효과 함수
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2'); // 기존 클래스 제거

            if (i === index) {
                // 현재 활성화된 슬라이드
                slide.classList.add('active');
                slide.style.zIndex = 10;
                slide.style.transform = 'translate(-50%, -50%) scale(1)';
                slide.style.opacity = 1;
                slide.style.visibility = 'visible';
                slide.style.pointerEvents = 'auto'; // 클릭 가능하게
            } else {
                // 비활성화된 슬라이드들
                slide.style.pointerEvents = 'none'; // 클릭 불가능하게

                // 현재 슬라이드를 기준으로 이전/다음 슬라이드 위치 및 z-index, transform 조정
                let diff = i - index;
                // 슬라이더가 루프되도록 diff 값 조정
                if (diff > slides.length / 2) {
                    diff -= slides.length;
                } else if (diff < -slides.length / 2) {
                    diff += slides.length;
                }

                if (diff === 1) { // 현재 슬라이드 바로 다음 (오른쪽)
                    slide.classList.add('next-1');
                    slide.style.zIndex = 9;
                    slide.style.transform = 'translate(-40%, -50%) scale(0.9)';
                    slide.style.opacity = 0.7;
                    slide.style.visibility = 'visible';
                } else if (diff === 2) { // 두 번째 다음 (오른쪽)
                    slide.classList.add('next-2');
                    slide.style.zIndex = 8;
                    slide.style.transform = 'translate(-30%, -50%) scale(0.8)';
                    slide.style.opacity = 0.4;
                    slide.style.visibility = 'visible';
                } else if (diff === -1) { // 현재 슬라이드 바로 이전 (왼쪽)
                    slide.classList.add('prev-1');
                    slide.style.zIndex = 9;
                    slide.style.transform = 'translate(-60%, -50%) scale(0.9)';
                    slide.style.opacity = 0.7;
                    slide.style.visibility = 'visible';
                } else if (diff === -2) { // 두 번째 이전 (왼쪽)
                    slide.classList.add('prev-2');
                    slide.style.zIndex = 8;
                    slide.style.transform = 'translate(-70%, -50%) scale(0.8)';
                    slide.style.opacity = 0.4;
                    slide.style.visibility = 'visible';
                } else { // 그 외의 슬라이드 (더 멀리 떨어져 있는)
                    slide.style.opacity = 0;
                    slide.style.visibility = 'hidden';
                    slide.style.zIndex = 1;
                    slide.style.transform = 'translate(-50%, -50%) scale(0.7)'; // 기본 위치로 재설정
                }
            }
        });
    }

    // 초기 슬라이드 표시
    if (slides.length > 0) {
        showSlide(currentSlide);
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

    // 사이드바 열기 함수
    function openSidebar() {
        if (!sidebar) return;
        if (sidebar.style.width === sidebarWidth) {
            return;
        }
        sidebar.style.width = sidebarWidth;
        document.body.classList.add('sidebar-open');
        
        if (sideMenuIcon) {
            sideMenuIcon.classList.add('shifted');
        }
    }

    // 사이드바 닫기 함수
    function closeSidebar() {
        if (!sidebar) return;
        if (sidebar.style.width === '0px' || sidebar.style.width === '') {
            return;
        }
        sidebar.style.width = '0';
        document.body.classList.remove('sidebar-open');
        
        if (sideMenuIcon) {
            sideMenuIcon.classList.remove('shifted');
        }
    }
    
    // 사이드바 이벤트 리스너
    if (sideMenu) {
        sideMenu.addEventListener('mouseenter', openSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener('mouseleave', closeSidebar);
    }
    
    if (sideMenu) {
        sideMenu.addEventListener('mouseleave', function(event) {
            if (sidebar && sidebar.style.width === sidebarWidth && !sidebar.contains(event.relatedTarget)) {
                closeSidebar();
            }
        });
    }
});
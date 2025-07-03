// script.js

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mySidebar = document.getElementById('mySidebar');
    const closeBtn = mySidebar.querySelector('.close-btn'); // 사이드바 내의 닫기 버튼
    const mainContent = document.getElementById('main-content');

    // 햄버거 메뉴 아이콘 클릭 시 사이드바 열기
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            if (mySidebar) {
                mySidebar.style.width = '250px'; // 사이드바 너비를 250px로 설정
                if (mainContent) {
                    mainContent.style.marginRight = '250px'; // 메인 콘텐츠를 왼쪽으로 250px 밀기
                }
            }
        });
    }

    // 닫기 버튼 클릭 시 사이드바 닫기
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (mySidebar) {
                mySidebar.style.width = '0'; // 사이드바 너비를 0으로 설정하여 숨김
                if (mainContent) {
                    mainContent.style.marginRight = '0'; // 메인 콘텐츠를 원래 위치로 되돌림
                }
            }
        });
    }

    //외부 영역 클릭 시 사이드바 닫기 (선택 사항)
    document.addEventListener('click', function(event) {
        // 햄버거 메뉴, 사이드바 내부를 클릭한 경우가 아니면 닫기
        if (mySidebar && mySidebar.style.width === '250px' &&
            !mySidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mySidebar.style.width = '0';
            if (mainContent) {
                mainContent.style.marginRight = '0';
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const sideMenu = document.getElementById('side_menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarWidth = '250px';

    if (!sideMenu || !sidebar) {
        console.error("사이드바 아이콘 또는 사이드바 요소를 찾을 수 없습니다!");
        return;
    }

    function openSidebar() {
        if (sidebar.style.width === sidebarWidth) {
            return; // 이미 열려있으면 아무것도 하지 않음
        }
        sidebar.style.width = sidebarWidth;
        document.body.classList.add('sidebar-open'); // body 스크롤 방지 CSS 클래스 추가
        sideMenu.classList.add('shifted'); // 사이드 메뉴 아이콘 이동
    }

    function closeSidebar() {
        if (sidebar.style.width === '0px' || sidebar.style.width === '') {
            return; // 이미 닫혀있으면 아무것도 하지 않음
        }
        sidebar.style.width = '0';
        document.body.classList.remove('sidebar-open'); // body 스크롤 방지 CSS 클래스 제거
        sideMenu.classList.remove('shifted'); // 사이드 메뉴 아이콘 원래 위치로
    }

    // 사이드 메뉴 아이콘에 마우스를 올렸을 때 사이드바 열기
    sideMenu.addEventListener('mouseenter', openSidebar);

    // 사이드바에서 마우스가 벗어났을 때 사이드바 닫기
    sidebar.addEventListener('mouseleave', closeSidebar);

    // 사이드바 외부를 클릭했을 때 사이드바 닫기
    document.addEventListener('click', function(event) {
        // 사이드바가 열려있고, 클릭된 요소가 사이드바 내부도 아니고, 사이드 메뉴 아이콘도 아니라면 닫기
        if (sidebar.style.width === sidebarWidth && !sidebar.contains(event.target) && !sideMenu.contains(event.target)) {
            closeSidebar();
        }
    });

    // 참고: 모바일 환경에서는 'mouseenter'/'mouseleave'보다 클릭 이벤트가 더 적합할 수 있습니다.
    // 필요에 따라 'click' 이벤트로 전환하거나 추가적인 터치 이벤트를 고려해 보세요.
});
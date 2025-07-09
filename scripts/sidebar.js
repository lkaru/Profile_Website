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
            return;
        }
        sidebar.style.width = sidebarWidth;
        document.body.classList.add('sidebar-open');
        sideMenu.classList.add('shifted');
    }

    function closeSidebar() {
        if (sidebar.style.width === '0px' || sidebar.style.width === '') {
            return;
        }
        sidebar.style.width = '0';
        document.body.classList.remove('sidebar-open');
        sideMenu.classList.remove('shifted');
    }

    // 아이콘에 마우스를 올렸을 때 사이드바 열기
    sideMenu.addEventListener('mouseenter', openSidebar);

    // 사이드바에서 마우스가 벗어났을 때 사이드바 닫기
    sidebar.addEventListener('mouseleave', closeSidebar);

    // 선택 사항: 사이드바 외부를 클릭했을 때 사이드바 닫기
    document.addEventListener('click', function(event) {
        if (sidebar.style.width === sidebarWidth && !sidebar.contains(event.target) && !sideMenu.contains(event.target)) {
            closeSidebar();
        }
    });
});
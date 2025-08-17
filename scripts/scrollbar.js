window.addEventListener('DOMContentLoaded', () => {

    const menuBar = document.querySelector('.menuBar');
    const outlineWrapper = document.querySelector('.menu-outline-progress');
    
    // 스크롤 이벤트 처리 함수
    const handleScroll = () => {
        // 1. shrink 클래스 제어 (예: 100px 이상 스크롤되면 shrink)
        if (window.scrollY > 100) {
            menuBar.classList.add('shrink');
        } else {
            menuBar.classList.remove('shrink');
        }

        // 2. 스크롤 진행도 계산
        // 현재 스크롤 위치
        const scrollTop = window.scrollY;
        // 전체 문서의 높이
        const docHeight = document.documentElement.scrollHeight;
        // 브라우저 창의 높이
        const clientHeight = document.documentElement.clientHeight;
        
        // 스크롤 가능한 전체 높이
        const scrollableHeight = docHeight - clientHeight;
        
        // 진행도 계산 (0 ~ 1 사이의 값)
        // scrollableHeight가 0일 경우(스크롤바가 없을 때) 0으로 처리
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

        // 3. 계산된 진행도를 CSS 변수에 업데이트
        menuBar.style.setProperty('--scroll-progress', `${progress.toFixed(2)}%`);
    };

    // 스크롤 이벤트에 함수 연결
    window.addEventListener('scroll', handleScroll);

    // 페이지 로드 시 초기 상태를 한 번 실행
    handleScroll();
});
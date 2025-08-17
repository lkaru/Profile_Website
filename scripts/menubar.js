window.addEventListener('DOMContentLoaded', () => {
    
    // 제어할 요소들을 선택합니다.
    const menuBar = document.getElementById('menuBar');
    const outlineWrapper = document.querySelector('.menu-outline-progress');

    if (!menuBar || !outlineWrapper) {
        console.error('필요한 요소를 찾을 수 없습니다.');
        return;
    }

    const handleScroll = () => {
        // 1. shrink와 visible 클래스 제어
        if (window.scrollY > 50) {
            menuBar.classList.add('shrink');
            outlineWrapper.classList.add('visible'); // 부모 요소를 보이게 함
        } else {
            menuBar.classList.remove('shrink');
            outlineWrapper.classList.remove('visible'); // 부모 요소를 숨김
        }

        // 2. 스크롤 진행도 계산 (이전과 동일)
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollableHeight = docHeight - clientHeight;
        const progressPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

        // 3. CSS 변수 업데이트 대상을 outlineWrapper로 변경
        outlineWrapper.style.setProperty('--scroll-progress', `${progressPercent.toFixed(2)}%`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
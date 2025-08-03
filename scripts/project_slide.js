// project-slider.js - 3D 프로젝트 슬라이더 관리 (완성된 버전)

class ProjectSlider {
    constructor(containerSelector = '.slider-container') {
        this.containerSelector = containerSelector;
        this.sliderContainer = document.querySelector(containerSelector);
        this.slides = [];
        this.currentSlide = 0;
        this.slideInterval = null;
        this.initialDelayTimeout = null;
        this.isAnimating = false;
        this.autoSlideEnabled = false;

        this.config = {
            autoSlideDelay: 250,
            autoSlideInterval: 750,
            transitionDuration: 600,
            swipeThreshold: 50,
            keyboardEnabled: true,
            touchEnabled: true
        };

        this.slideData = [
            { title: "Project Alpha", description: "혁신적인 웹 애플리케이션 개발 프로젝트", image: "", link: "#", tags: ["React", "Node.js", "MongoDB"] },
            { title: "Project Beta", description: "모바일 친화적 반응형 플랫폼 구축", image: "", link: "#", tags: ["Vue.js", "Express", "MySQL"] },
            { title: "Project Gamma", description: "AI 기반 데이터 분석 솔루션 개발", image: "", link: "#", tags: ["Python", "TensorFlow", "AWS"] },
            { title: "Project Delta", description: "실시간 협업 도구 및 대시보드 제작", image: "", link: "#", tags: ["Socket.io", "Redux", "PostgreSQL"] }
        ];

        this.init();
    }

    init() {
        if (!this.sliderContainer) return console.error('슬라이더 컨테이너가 없습니다:', this.containerSelector);
        this.createSlides();
        this.setupEventListeners();
        this.showSlide(this.currentSlide);
    }

    createSlides() {
        this.sliderContainer.innerHTML = '';
        this.slideData.forEach((data, index) => {
            const slide = this.createSlideElement(data, index);
            this.sliderContainer.appendChild(slide);
        });
        this.slides = document.querySelectorAll('.transition_box');
    }

    createSlideElement(data, index) {
        const slide = document.createElement('div');
        slide.className = 'transition_box';
        slide.dataset.index = index;

        const title = document.createElement('h3');
        title.textContent = data.title;
        title.style.cssText = 'z-index:20; position:relative';
        slide.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = data.description;
        desc.style.cssText = 'z-index:10; position:relative';
        slide.appendChild(desc);

        if (data.tags) slide.appendChild(this.createTagsContainer(data.tags));
        if (data.link && data.link !== '#') slide.appendChild(this.createLinkButton(data.link, data.title));

        if (data.image) {
            const img = document.createElement('img');
            img.src = data.image;
            img.alt = data.title;
            img.loading = 'lazy';
            img.style.cssText = `position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; border-radius:20px; z-index:-1; filter:brightness(0.4) saturate(1.3) blur(1px); transition:filter 0.6s ease;`;
            img.onerror = () => img.style.display = 'none';
            slide.appendChild(img);
        }

        return slide;
    }

    createTagsContainer(tags) {
        const container = document.createElement('div');
        container.className = 'slide-tags';
        container.style.cssText = 'position:relative; z-index:15; display:flex; flex-wrap:wrap; gap:8px; margin-top:15px; justify-content:center;';
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagEl.style.cssText = 'background:rgba(255,255,255,0.2); border:1px solid rgba(255,255,255,0.3); border-radius:12px; padding:4px 12px; font-size:0.85rem; color:white; backdrop-filter:blur(5px);';
            container.appendChild(tagEl);
        });
        return container;
    }

    createLinkButton(link, title) {
        const btn = document.createElement('a');
        btn.href = link;
        btn.textContent = '자세히 보기';
        btn.setAttribute('aria-label', `${title} 프로젝트 자세히 보기`);
        btn.style.cssText = 'position:relative; z-index:25; display:inline-block; margin-top:20px; padding:10px 20px; background:rgba(158,59,219,0.8); color:white; text-decoration:none; border-radius:20px; border:1px solid rgba(255,255,255,0.3); transition:all 0.3s ease; backdrop-filter:blur(5px);';
        btn.onmouseenter = () => {
            btn.style.background = 'rgba(215,153,249,0.9)';
            btn.style.transform = 'translateY(-2px)';
        };
        btn.onmouseleave = () => {
            btn.style.background = 'rgba(158,59,219,0.8)';
            btn.style.transform = 'translateY(0)';
        };
        return btn;
    }

    showSlide(index) {
        if (!this.slides.length || this.isAnimating) return;
        this.isAnimating = true;
        this.currentSlide = index;

        const total = this.slides.length;
        const angle = 360 / total;
        const width = this.slides[0].offsetWidth;
        const radius = width > 0 ? (width / 2) / Math.tan(Math.PI / total) : 0;

        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            const rotationY = angle * (i - index);
            slide.style.zIndex = 1;

            if (i === index) {
                slide.classList.add('active');
                slide.style.zIndex = 100;
                slide.style.opacity = 1;
                slide.style.visibility = 'visible';
                slide.style.pointerEvents = 'auto';
                slide.style.transform = `translate(-50%, -50%) rotateY(${rotationY}deg) translateZ(${radius}px) scale(1)`;
            } else {
                let diff = i - index;
                if (diff > total / 2) diff -= total;
                else if (diff < -total / 2) diff += total;

                const opacity = 1 - (Math.abs(diff) * 0.3);
                const scale = 1 - (Math.abs(diff) * 0.1);

                if (Math.abs(diff) <= Math.floor(total / 2)) {
                    slide.style.opacity = Math.max(0.1, opacity);
                    slide.style.visibility = 'visible';
                    slide.style.pointerEvents = 'none';
                    slide.style.transform = `translate(-50%, -50%) rotateY(${rotationY}deg) translateZ(${radius}px) scale(${scale})`;
                } else {
                    slide.style.opacity = 0;
                    slide.style.visibility = 'hidden';
                    slide.style.pointerEvents = 'none';
                    slide.style.transform = 'translate(-50%, -50%) scale(0.7)';
                }
            }
        });

        setTimeout(() => { this.isAnimating = false; }, this.config.transitionDuration);
    }

    setupEventListeners() {
        const leftBtn = document.querySelector('.btn-left');
        const rightBtn = document.querySelector('.btn-right');

        if (rightBtn) {
            rightBtn.addEventListener('mouseenter', () => this.startAutoSlide(1));
            rightBtn.addEventListener('mouseleave', () => this.stopAutoSlide());
        }
        if (leftBtn) {
            leftBtn.addEventListener('mouseenter', () => this.startAutoSlide(-1));
            leftBtn.addEventListener('mouseleave', () => this.stopAutoSlide());
        }
    }

    startAutoSlide(direction = 1) {
        if (this.initialDelayTimeout) clearTimeout(this.initialDelayTimeout);
        if (this.slideInterval) clearInterval(this.slideInterval);

        this.initialDelayTimeout = setTimeout(() => {
            this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
            this.showSlide(this.currentSlide);
            this.slideInterval = setInterval(() => {
                this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
                this.showSlide(this.currentSlide);
            }, this.config.autoSlideInterval);
        }, this.config.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.initialDelayTimeout) clearTimeout(this.initialDelayTimeout);
        if (this.slideInterval) clearInterval(this.slideInterval);
    }
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
});

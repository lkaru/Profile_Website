class ProjectSlider {
    constructor() {
        this.slidesContainer = document.getElementById('slides-container');

        this.slideData = [
            {
                title: "Project Alpha",
                summary: "혁신적인 웹 애플리케이션 개발 프로젝트",
                image: "images/Test.png",
                tags: ["React", "Node.js", "MongoDB"],
                link: "#",
                description: "최신 웹 기술을 활용한 풀스택 개발 프로젝트 입니다. 사용자 경험을 최우선으로 고려하여 설계되었습니다. 다양한 기능을 제공하며, 반응형 디자인을 지원합니다."
            },
            {
                title: "Project Beta",
                summary: "모바일 친화적 반응형 플랫폼 구축",
                image: "images/Test.png",
                tags: ["Vue.js", "Express", "MySQL"],
                link: "#",
                description: "모바일 UX 최적화는 단순히 예쁜 화면을 만드는 것을 넘어, 사용자의 '경험'을 디자인하는 과정입니다. 이는 마치 잘 설계된 건물처럼, 처음 문을 열고 들어가는 순간부터 모든 공간을 지나 출구로 나설 때까지 불편함이 없도록 만드는 것과 같습니다. 예를 들어, 한 손으로 스마트폰을 잡고 엄지손가락으로 조작하기 편리하도록 중요한 버튼들을 화면 하단에 배치하는 것, 혹은 네트워크가 불안정한 지하철에서도 콘텐츠가 빠르게 표시되도록 이미지를 미리 압축해두는 섬세함이 모두 여기에 포함됩니다."
            },
            {
                title: "Project Gamma",
                summary: "AI 기반 데이터 분석 솔루션 개발",
                tags: ["Python", "TensorFlow", "AWS"],
                image: "images/Test.png",
                link: "#",
                description: "AI를 활용한 데이터 분석 시스템 구축"
            }
        ];
        this.currentSlide = Math.floor(this.slideData.length / 2);
        this.init();
    }

    init() {
        if (!this.slidesContainer) return console.error('slides-container 없음');
        this.createSlides();
        this.updateSlideClasses();
    }

    createSlides() {
        this.slides = [];

        this.slideData.forEach((data, index) => {
            const slide = this.createSlideElement(data, index);
            this.slidesContainer.appendChild(slide);
            this.slides.push(slide);
        });
    }

    createSlideElement(data, index) {
        // slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.index = index;

        // slide inner
        const inner = document.createElement('div');
        inner.className = 'slide-inner';

        //front
        const front = document.createElement('div');
        front.className = 'slide-front';


        // front image
        if (data.image) {
            const img = document.createElement('img');
            img.className = 'image';
            img.src = data.image;
            img.alt = data.title;
            front.appendChild(img);
        }

        // front title
        const frontTitle = document.createElement('h3');
        frontTitle.className = 'title';
        frontTitle.textContent = data.title;
        front.appendChild(frontTitle);

        // front summary
        const summary = document.createElement('p');
        summary.className = 'summary';
        summary.textContent = data.summary;
        front.appendChild(summary);

        //front tags
        const tagBox = document.createElement('div');
        tagBox.className = 'tag-box';
        data.tags.forEach(tagText => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tagText;
            tagBox.appendChild(tag);
        });
        front.appendChild(tagBox);

        // back
        const back = document.createElement('div');
        back.className = 'slide-back';

        //back title
        const backTitle = document.createElement('h3');
        backTitle.className = 'title';
        backTitle.textContent = data.title;
        back.appendChild(backTitle);

        //back description
        const desc = document.createElement('p');
        desc.className = 'description';
        desc.textContent = data.description;
        back.appendChild(desc);

        //back link
        const link = document.createElement('a');
        link.className = 'link';
        link.href = data.link;
        link.textContent = '자세히 보기';
        back.appendChild(link);


        inner.appendChild(front);
        inner.appendChild(back);
        slide.appendChild(inner);

        // when slide is clicked, toggle the flipped class
        slide.addEventListener('click', () => {
            if (index === this.currentSlide) {
                slide.classList.toggle('flipped');
            }
            else {
                this.currentSlide = index;
                this.updateSlideClasses();
            }
        });

        return slide;
    }

    updateSlideClasses() {
        this.slides.forEach((slide, index) => {
            if (slide.classList.contains('flipped')) {
                slide.classList.toggle('flipped');
            }
            if (index === this.currentSlide) {
                slide.style.opacity = '1';
                slide.style.transform = 'translate(-50%, -50%) scale(1)';
                slide.style.zIndex = '100';
                slide.style.pointerEvents = 'auto';
                slide.style.filter = 'blur(0px)';


            } else {
                const diff = index - this.currentSlide;
                const opacity = 0.7 - Math.abs(diff) * 0.1;
                const scale = 1 - Math.abs(diff) * 0.15;
                const offset = -50 + diff * 50;
                const blurValue = Math.abs(diff) * 1.5;


                slide.style.zIndex = `${100 - Math.abs(diff)}`;
                slide.style.opacity = `${opacity}`;
                slide.style.transform = `translate(calc(${offset}%), -50%) scale(${scale})`;
                slide.style.filter = `blur(${blurValue}px)`;

            }
        });
    }

}

window.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
});

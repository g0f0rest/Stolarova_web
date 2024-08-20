document.addEventListener("DOMContentLoaded", () => {
    const initSlider = (sliderSelector, prevSelector, nextSelector, intervalTime) => {
        const slides = document.querySelectorAll(`${sliderSelector} .slide, ${sliderSelector} .slide_otziv`);
        let currentIndex = 0;

        const showSlides = (index) => {
            const slider = document.querySelector(`${sliderSelector} .slides`);
            const slideWidth = slides[0].clientWidth;
            slider.style.transform = `translateX(${-index * slideWidth}px)`;
        };

        const changeSlide = (direction) => {
            currentIndex += direction;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            showSlides(currentIndex);
        };

        document.querySelector(prevSelector).addEventListener("click", () => changeSlide(-1));
        document.querySelector(nextSelector).addEventListener("click", () => changeSlide(1));

        if (intervalTime) {
            setInterval(() => {
                changeSlide(1);
            }, intervalTime);
        }
    };
    // Инициализация слайдеров
    initSlider(".slider", ".slider .prev", ".slider .next", 15000);
    initSlider("#slider-testimonials", "#slider-testimonials .prev", "#slider-testimonials .next");

    // Анимация при прокрутке
    const sections = document.querySelectorAll(".section");

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });

    };
    // Получаем модальное окно и его элементы
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close');

    // Для всех изображений на странице добавляем обработчик клика
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    // Закрываем модальное окно при клике на крестик
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Закрываем модальное окно при клике вне изображения
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    // Обработка формы отзывов
    const testimonialForm = document.getElementById("testimonial-form");
    const testimonialList = document.getElementById("testimonial-list");

    if (testimonialForm && testimonialList) {
        testimonialForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("testimonial-name").value;
            const testimonial = document.getElementById("testimonial").value;

            const testimonialItem = document.createElement("div");
            testimonialItem.classList.add("testimonial-item");
            testimonialItem.innerHTML = `<p><strong>${name}</strong></p><p>${testimonial}</p>`;
            testimonialList.appendChild(testimonialItem);

            testimonialForm.reset();
        });
    }

});

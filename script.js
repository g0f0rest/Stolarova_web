document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    const showSlides = (index) => {
        const slider = document.querySelector(".slides");
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(${-index * slideWidth}px)`;
    };

    const changeSlide = (direction) => {
        currentIndex += direction;
        if (currentIndex >= slides.length - 2) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 3;
        showSlides(currentIndex);
    };

    document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
    document.querySelector(".next").addEventListener("click", () => changeSlide(1));

    setInterval(() => {
        changeSlide(1);
    }, 15000);

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

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    const testimonialForm = document.getElementById("testimonial-form");
    const testimonialList = document.getElementById("testimonial-list");

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
});

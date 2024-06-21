document.addEventListener("DOMContentLoaded", function() {
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const visibleSlides = 3;
    const slideWidth = 100 / visibleSlides;

    document.querySelector(".next").addEventListener("click", function() {
        changeSlide(1);
    });

    document.querySelector(".prev").addEventListener("click", function() {
        changeSlide(-1);
    });

    function changeSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        const slider = document.querySelector(".slides");
        slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }

    // Auto slide change every 15 seconds
    setInterval(() => {
        changeSlide(1);
    }, 15000);

    // Section visibility on scroll
    const sections = document.querySelectorAll(".section");

    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Initial check
});

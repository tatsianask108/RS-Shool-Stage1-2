let sliderLine = document.querySelector('.slider-line'),
    prevButton = document.getElementById('btn-left'),
    nextButton = document.getElementById('btn-right'),

    sliderItems = sliderLine.querySelectorAll('img'),
    slidesCount = sliderItems.length,

    currentSlide = 0;


// let timerId = setInterval(() => setActiveSlide, 2000);
function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide)
    prevButton.addEventListener('click', prevSlide)

    setActiveSlide(0);
}

function nextSlide() {
    setActiveSlide(currentSlide === slidesCount - 1 ? currentSlide : currentSlide + 1);
}
function prevSlide() {
    setActiveSlide(currentSlide === 0 ? 0 : currentSlide - 1);
}

function setActiveSlide(index = 0) {
    index = +index;

    let position = 480 * index;
    sliderLine.style.left = -position + 'px';
    currentSlide = index;
}
initSlider()
let sliderLine = document.querySelector('.slider-line'),
    sliderContent = document.querySelectorAll('.slider__content'),
    prevButton = document.getElementById('btn-left'),
    nextButton = document.getElementById('btn-right'),

    sliderItems = sliderLine.querySelectorAll('img'),
    slidesCount = sliderItems.length,

    controlsContainer = document.querySelector('.favorite-coffee__controls'),

    currentSlide = 0,
    isPaused = false;


//automatic change
let timerId;


function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);




    setActiveSlide(0);
}

function nextSlide() {
    clearInterval(timerId);
    setActiveSlide(currentSlide === slidesCount - 1 ? 0 : currentSlide + 1);
    // isPaused = false;

}
function prevSlide() {
    clearInterval(timerId);
    setActiveSlide(currentSlide === 0 ? slidesCount - 1 : currentSlide - 1);
    // isPaused = false;
}

function setActiveSlide(index = 0) {
    index = +index;

    let position = 100 * index;
    sliderLine.style.left = -position + '%';
    currentSlide = index;

    timerId = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 3000);

    // console.log(timerId)

    for (let [key, control] of Object.entries(controlsContainer.children)) {

        if (key == index) {
            control.classList.add('control-active')
        } else {
            control.classList.remove('control-active');
        }
    }
    pauseInterval()

}

function pauseInterval() {

    sliderContent.forEach((item) => item.onmouseenter = () => {
        isPaused = true;
        console.log('pause')
    })

    sliderContent.forEach((item) => item.onmouseleave = () => {
        isPaused = false;
        console.log('play')
    })

    // sliderContent.forEach((item) => item.addEventListener('touchstart', () => {
    //     isPaused = true;
    //     console.log('touchstart')
    // }))
    // sliderContent.forEach((item) => item.addEventListener('touchend', () => {
    //     isPaused = false;
    //     console.log('touchend')
    // }))

}


initSlider()
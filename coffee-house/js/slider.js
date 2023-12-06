const
    sliderLine = document.getElementById('slider-line'),
    slides = sliderLine.querySelectorAll('.slider__content'),
    slidesCount = slides.length,
    prevButton = document.getElementById('btn-left'),
    nextButton = document.getElementById('btn-right'),
    sliderControls = document.getElementById('slider-controls');

let
    currentSlide = 0,
    isPaused = false,
    sliderInterval;



function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    setActiveSlide(0);
    initPausesAndSwipes();

}


function nextSlide() {
    clearInterval(sliderInterval);
    setActiveSlide(currentSlide === slidesCount - 1 ? 0 : currentSlide + 1);
}


function prevSlide() {
    clearInterval(sliderInterval);
    setActiveSlide(currentSlide === 0 ? slidesCount - 1 : currentSlide - 1);
}


function setActiveSlide(index = 0) {
    index = +index;

    let position = 100 * index;
    sliderLine.style.left = -position + '%';
    currentSlide = index;

    // set active control
    for (let [key, control] of Object.entries(sliderControls.children)) {
        if (key == index) {
            // move(control.firstElementChild)
            control.classList.add('control-active')
        } else {
            control.classList.remove('control-active')
        }
    }

    setSliderInterval();
}


function setSliderInterval() {
    sliderInterval = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 4000);
}


// function move(element) {
//     let width = 0;
//     let id = setInterval(frame, 30);
//     function frame() {
//         if (width == 100) {
//             element.style.width = 0;
//             clearInterval(id);
//         } else if (!isPaused) {
//             width++;
//             element.style.width = width + '%';
//         }
//     }
// }


function initPausesAndSwipes() {
    let mediaQuery = window.matchMedia("(hover: hover)");

    function handleDeviceTypeChange(mediaQuery) {
        if (mediaQuery.matches) {
            pauseOnDesktop()
        } else {
            pauseAndSwipeOnMobile()
        }
    }

    handleDeviceTypeChange(mediaQuery)

    mediaQuery.addEventListener('change', () => {
        handleDeviceTypeChange(mediaQuery)
    })
}

function pauseOnDesktop() {
    slides.forEach((item) => item.onmouseenter = () => {
        isPaused = true;
        console.log('pause')
    })

    slides.forEach((item) => item.onmouseleave = () => {
        isPaused = false;
        console.log('play')
    })
}


function pauseAndSwipeOnMobile() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
        if (touchendX < touchstartX) {
            console.log('next')
            nextSlide()
        }
        if (touchendX > touchstartX) {
            console.log('prev')
            prevSlide()
        }
    }

    slides.forEach(slide => slide.addEventListener("touchstart", (e) => {
        isPaused = true;
        console.log('touchstart')
        touchstartX = e.changedTouches[0].screenX;
    }))


    slides.forEach(slide => slide.addEventListener("touchend", (e) => {
        isPaused = false;
        console.log('touchend')
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    }))

}


initSlider()






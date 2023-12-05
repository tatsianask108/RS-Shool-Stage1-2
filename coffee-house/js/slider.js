let sliderLine = document.querySelector('.slider-line'),
    sliderContent = document.querySelectorAll('.slider__content'),
    prevButton = document.getElementById('btn-left'),
    nextButton = document.getElementById('btn-right'),

    sliderItems = sliderLine.querySelectorAll('img'),
    slidesCount = sliderItems.length,

    controlsContainer = document.querySelector('.favorite-coffee__controls'),

    currentSlide = 0,
    isPaused = false,
    sliderInterval;



function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    setActiveSlide(0);
    pauseSlider();
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


    sliderInterval = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 3000);


    // for (let [key, control] of Object.entries(controlsContainer.children)) {

    //     if (key == index) {
    //         control.firstElementChild.style.width = 0;
    //         move(control.firstElementChild)
    //     }
    // }


}

function pauseSlider() {
    let mediaQuery = window.matchMedia("(hover: none)");

    function handleTabletChange(mediaQuery) {

        if (mediaQuery.matches) {
            sliderContent.forEach((item) => item.addEventListener('touchstart', () => {
                isPaused = true;
                console.log('touchstart')
            }))
            sliderContent.forEach((item) => item.addEventListener('touchend', () => {
                isPaused = false;
                console.log('touchend')
            }))
        } else {
            sliderContent.forEach((item) => item.onmouseenter = () => {
                isPaused = true;
                console.log('pause')
            })

            sliderContent.forEach((item) => item.onmouseleave = () => {
                isPaused = false;
                console.log('play')
            })
        }

    }

    handleTabletChange(mediaQuery)

    mediaQuery.addEventListener('change', () => {
        handleTabletChange(mediaQuery)
    })
}

initSlider()


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



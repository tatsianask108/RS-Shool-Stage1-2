const
    sliderLine = document.getElementById('slider-line'),
    slides = sliderLine.querySelectorAll('.slider__content'),
    slidesCount = slides.length,
    prevButton = document.getElementById('btn-left'),
    nextButton = document.getElementById('btn-right'),
    sliderControls = document.getElementById('slider-controls');

let
    currentSlide = 0,
    sliderInterval,
    slider_interval_time = 0, // храниться время, когда начался интервал
    slider_interval_paused_at = 0; // во сколько остановился интервал



function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    setActiveSlide(0);
    initPausesAndSwipes();
}

function setPauseState(state) {
    console.log("Is paused: " + state);
    let control = Array.from(sliderControls.children).find((el) => el.classList.contains('control-active'));
    if(control) {
        if(state) { // если пауза
            control.classList.add('paused');
            slider_interval_paused_at = stopSliderInterval(); // останавливаем интервал и получаем значение, на котором он остановился (например 2 секунды до ховера)
        } else { // если отмена паузы
            control.classList.remove('paused');
            setSliderInterval(slider_interval_paused_at); // возобновляем интервал с пропуском времени (например 2 секунды, следовательно этот интервал будет 4 - 2 секунды)
        }
    }
}

function nextSlide() {
    setActiveSlide(currentSlide === slidesCount - 1 ? 0 : currentSlide + 1);
}


function prevSlide() {
    setActiveSlide(currentSlide === 0 ? slidesCount - 1 : currentSlide - 1);
}


function setActiveSlide(index = 0) {
    index = +index;

    let position = 100 * index;
    sliderLine.style.left = -position + '%';
    currentSlide = index;

    stopSliderInterval();
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


function setSliderInterval(start_time = 0) {
    slider_interval_time = performance.now() - start_time; // время начала интервала (текущее время) минус секунды, после паузы
    console.log(start_time, slider_interval_time);
    sliderInterval = setInterval(() => {
        nextSlide();
    }, 4000 - start_time); // текущий интервал равен 4 секунды минус время после паузы
}

function stopSliderInterval()
{
    clearInterval(sliderInterval);
    return performance.now() - slider_interval_time; // возвращает разницу текущего времени и времени, когда был запущен интервал
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
    initPauseOnDesktop()
    initPauseAndSwipeOnMobile()
}

function initPauseOnDesktop() {
    slides.forEach((item) => item.onmouseenter = () => {
        setPauseState(true);
    })

    slides.forEach((item) => item.onmouseleave = () => {
        setPauseState(false);
    })
}

function initPauseAndSwipeOnMobile() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
        if(Math.abs(touchstartX - touchendX) < 25) {
            return;
        }

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
        setPauseState(true);
        console.log('touchstart')
        touchstartX = e.changedTouches[0].screenX;
        e.preventDefault();
    }))


    slides.forEach(slide => slide.addEventListener("touchend", (e) => {
        setPauseState(false);
        console.log('touchend')
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    }))

}


initSlider()






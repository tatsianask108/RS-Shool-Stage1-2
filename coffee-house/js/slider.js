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
    sliderIntervalTime = 0, // хранится время, когда начался интервал
    sliderIntervalPausedAt = 0; // во сколько остановился интервал



function initSlider() {
    // init actions
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    setActiveSlide(0);
    initPausesAndSwipes();
}

function setPauseState(state) {
    // console.log("Is paused: " + state);
    let control = Array.from(sliderControls.children).find((el) => el.classList.contains('control-active'));
    if (control) {
        if (state) { // если пауза
            control.classList.add('paused');
            sliderIntervalPausedAt = stopSliderInterval(); // останавливаем интервал и получаем значение, на котором он остановился (например 2 секунды до ховера)
        } else { // если отмена паузы
            control.classList.remove('paused');
            setSliderInterval(sliderIntervalPausedAt); // возобновляем интервал с пропуском времени (например 2 секунды, следовательно этот интервал будет 4 - 2 секунды)
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
            control.classList.add('control-active')
        } else {
            control.classList.remove('control-active')
        }
    }
    setSliderInterval();
}


function setSliderInterval(startTime = 0) {
    sliderIntervalTime = performance.now() - startTime; // время начала интервала (текущее время) минус секунды, после паузы
    // console.log(start_time, slider_interval_time);
    sliderInterval = setInterval(() => {
        nextSlide();
    }, 5000 - startTime); // текущий интервал равен 4 секунды минус время после паузы
}

function stopSliderInterval() {
    clearInterval(sliderInterval);
    return performance.now() - sliderIntervalTime; // возвращает разницу текущего времени и времени, когда был запущен интервал
}


function initPausesAndSwipes() {
    initPauseOnDesktop()
    initPauseAndSwipeOnMobile()
}

function initPauseOnDesktop() {
    slides.forEach((item) => item.onmouseover = () => {
        setPauseState(true);
    })

    slides.forEach((item) => item.onmouseout = () => {
        setPauseState(false);
    })
}

function initPauseAndSwipeOnMobile() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
        if (Math.abs(touchstartX - touchendX) < 25) {
            return;
        }

        if (touchendX < touchstartX) {
            // console.log('next')
            nextSlide()
        }
        if (touchendX > touchstartX) {
            // console.log('prev')
            prevSlide()
        }
    }

    slides.forEach(slide => slide.addEventListener("touchstart", (e) => {
        setPauseState(true);
        // console.log('touchstart')
        touchstartX = e.changedTouches[0].screenX;
        e.preventDefault();
    }, { passive: false }))


    slides.forEach(slide => slide.addEventListener("touchend", (e) => {
        setPauseState(false);
        // console.log('touchend')
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    }))

}


initSlider()
export { renderModal };

const renderModal = (content) => {
    const body = document.body,
        modal = document.createElement('div'),
        overlay = document.createElement('div');

    overlay.className = 'overlay';

    modal.className = 'modal';
    modal.append(content);

    overlay.append(modal);

    body.append(overlay);
    body.classList.add('stop-scroll');
}


const closeModal = () => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay') || e.target.classList.contains('form-btn')) {
            document.body.classList.remove('stop-scroll');

            //плавное закрытие модального окна
            let overlay = document.querySelector('.overlay');
            overlay.classList.remove('smooth');
            setTimeout(() => {
                overlay.remove();
            }, 400);

        }
    })
}
closeModal();
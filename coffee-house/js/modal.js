export {renderModal};

const renderModal = (content) => {
    const body = document.body,
    modal = document.createElement('div'),
    overlay = document.createElement('div');

    overlay.className = 'overlay';

    modal.className = 'modal';
    modal.append(content);

    overlay.append(modal);

    body.append(overlay);
}


const closeModal = (e) => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay')) {
            document.querySelector('.overlay').remove();
        }
    })
}
closeModal();

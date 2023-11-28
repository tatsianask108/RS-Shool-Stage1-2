function burgerFunction() {
    const burgerBtn = document.getElementById("burger-btn");
    const nav = document.getElementById("nav");
    const navItems = nav?.querySelectorAll("a");

    burgerBtn.addEventListener("click", () => {
        nav.classList.toggle("nav--visible");
        burgerBtn.classList.toggle("burger--active");

        navItems.forEach(el => {
            el.addEventListener('click', () => {
                burgerBtn?.classList.remove('burger--active');
                nav?.classList.remove('nav--visible');
            });
        });
    })
}

burgerFunction();


const switchTags = () => {
    const tagsContainer = document.querySelector('[data-tags]');
    const tags = tagsContainer.querySelectorAll('div')
    tagsContainer.addEventListener('click', (e) => {
        if (e.target.closest("div")) {
            const clickedTag = e.target.closest("div");
            tags.forEach(tag => {
                tag.classList.remove('tag__selected');
            })
            clickedTag.classList.add('tag__selected');
        }
    })
}

switchTags();

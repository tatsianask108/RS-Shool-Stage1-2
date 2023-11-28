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
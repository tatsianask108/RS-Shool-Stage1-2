export { burgerFunction }

const burgerFunction = () => {
    const burgerBtn = document.getElementById("burger-btn");
    const nav = document.getElementById("nav");
    const navItems = nav?.querySelectorAll("a");
    const body = document.body;

    burgerBtn.addEventListener("click", () => {
        nav.classList.toggle("nav--visible");
        body.classList.toggle('stop-scroll');
        burgerBtn.classList.toggle("burger--active");

        navItems.forEach(el => {
            el.addEventListener('click', () => {
                burgerBtn?.classList.remove('burger--active');
                nav?.classList.remove('nav--visible');
                body.classList.remove('stop-scroll');
            });
        });
    })

}
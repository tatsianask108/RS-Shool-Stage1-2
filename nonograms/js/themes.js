const setTheme = () => {
  const currTheme = localStorage.getItem("tatskTheme");
  document.body.classList.add(`${currTheme}-theme`);

};


const changeTheme = () => {
  const currTheme = localStorage.getItem("tatskTheme");
  if (currTheme === "light") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("tatskTheme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("tatskTheme", "light");

  }
};


// const themeHandler = () => {
//   const themeState = document.getElementById("theme-state");
//   const themeIcon = document.getElementById("theme-icon");
//   themeState.addEventListener("change", (e) => {
//     if (e.target.checked) {
//       themeIcon.className = "icon icon-sound-off";
//       setSoundsVolume(0);
//     } else {
//       soundIcon.className = "icon icon-sound-on";
//       setSoundsVolume(1);
//     }
//   });
// };
export { setTheme, changeTheme };

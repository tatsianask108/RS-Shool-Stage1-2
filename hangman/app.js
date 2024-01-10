const engKeyboard = [
  113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122,
  120, 99, 118, 98, 110, 109,
];
const initKeyboard = () => {
  let keyboard = "";
  for (let i = 0; i < engKeyboard.length; i++) {
    if (i === 10 || i === 19) {
      keyboard += '<div class="new-line"></div>';
    }
    keyboard += `<div class="keyboard__btn">${String.fromCharCode(engKeyboard[i])}</div>`;
  }
  document.getElementById("keyboard").innerHTML = keyboard;
};

initKeyboard();

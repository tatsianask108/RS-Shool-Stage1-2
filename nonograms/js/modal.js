const renderModal = (gameTime, callbackOnClose) => {
  const overlay = document.createElement("div");
  const modal = document.createElement("div");
  const text = document.createElement("p");
  const button = document.createElement("button");

  overlay.className = "overlay";
  overlay.id = "overlay";
  modal.className = "modal";

  text.innerHTML = `Great! You have solved the nonogram in ${gameTime} seconds!`;
  button.className = "modal__btn";
  button.innerText = "OK";
  button.id = "play-again-button";

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);

  button.addEventListener("click", () => {
    if(callbackOnClose) {
      callbackOnClose();
    }
    const overlay = document.getElementById('overlay');
    overlay.remove();
  });
};

export default renderModal;

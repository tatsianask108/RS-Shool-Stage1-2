const renderModal = (gameTime) => {
  const overlay = document.createElement("div");
  const modal = document.createElement("div");
  const text = document.createElement("p");
  const button = document.createElement("button");

  overlay.className = "overlay";
  overlay.id = "overlay";
  modal.className = "modal";

  text.innerHTML = `Great! You have solved the nonogram in ${gameTime} seconds!`;
  button.className = "btn modal__btn";
  button.innerText = "OK";

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);
};

export default renderModal;

const renderModal = () => {
  const overlay = document.createElement("div");
  const modal = document.createElement("div");
  const text = document.createElement("p");
  const button = document.createElement("button");

  overlay.className = "overlay";
  overlay.id = "overlay";
  modal.className = "modal";

  text.innerHTML = "Great! You have solved the nonogram!";
  button.className = "modal__btn";
  button.innerText = "Play again";
  button.id = "play-again-button";

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);

  button.addEventListener("click", remove);
};
const remove = () => {
  const overlay = document.getElementById('overlay');
  overlay.remove();
}
export default renderModal;

const renderScoreModal = () => {
  const overlay = document.createElement("div");
  const modal = document.createElement("div");
  const content = document.createElement("div");
  const button = document.createElement("button");

  overlay.className = "overlay";
  overlay.id = "overlay";
  modal.className = "modal";
  content.className = "modal__content";
  button.className = "modal__btn";
  button.textContent = "close";
  button.id = "close_modal";

  modal.append(content, button);
  overlay.append(modal);
  document.body.append(overlay);

  const isScoreExist = JSON.parse(localStorage.getItem("tatskScoreList")).length;

  if (!isScoreExist) {
    content.textContent = "No played games yet";
  } else {
    const pictureNameContainer = document.createElement("div");
    pictureNameContainer.className = "score_column";
    pictureNameContainer.textContent = "nonogram";

    const levelContainer = document.createElement("div");
    levelContainer.className = "score_column";
    levelContainer.textContent = "level";

    const timeContainer = document.createElement("div");
    timeContainer.className = "score_column";
    timeContainer.textContent = "time";

    const scoreData = JSON.parse(localStorage.getItem("tatskScoreList")).sort((a, b) => {
      console.log("test");
      return Math.random() > 0.5 ? -1 : 1;
    });

    scoreData.forEach((item) => {
      const pictureNameElement = document.createElement("p");
      pictureNameElement.textContent = item.picture;

      const levelElement = document.createElement("p");
      levelElement.textContent = item.level;

      const timeElement = document.createElement("p");
      timeElement.textContent = item.time;

      pictureNameContainer.append(pictureNameElement);
      levelContainer.append(levelElement);
      timeContainer.append(timeElement);
    });

    content.append(pictureNameContainer);
    content.append(levelContainer);
    content.append(timeContainer);
  }
};

const closeModal = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay") || e.target.classList.contains("modal__btn")) {
      const overlay = document.getElementById("overlay");
      overlay.remove();
    }
  });
};

closeModal();

export default renderScoreModal;

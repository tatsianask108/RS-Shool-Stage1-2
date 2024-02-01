const blockAdditionalButtons = () => {
  const additionalButtons = document.getElementById("additional-buttons");
  additionalButtons.querySelectorAll("button").forEach((btn) => btn.classList.add("btn-disabled"));
};

const setWinToLocalStorage = (gameTimer, curLevel, curPicture) => {
  const scoreList = JSON.parse(localStorage.getItem("tatskScoreList"));
  if (scoreList.length > 4) {
    scoreList.shift();
  }
  scoreList.push({ time: gameTimer, level: curLevel, picture: curPicture });

  localStorage.setItem("tatskScoreList", JSON.stringify(scoreList));
};

export { blockAdditionalButtons, setWinToLocalStorage };

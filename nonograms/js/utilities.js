const disableButtons = () => {
  const additionalButtons = document.getElementById("additional-buttons");
  additionalButtons.querySelectorAll("button").forEach((btn) => btn.classList.add("btn-disabled"));
};
const unDisableButtons = () => {
  const additionalButtons = document.getElementById("additional-buttons");
  additionalButtons.querySelectorAll("button").forEach((btn) => btn.classList.remove("btn-disabled"));
};




const setWinToLocalStorage = (gameTimer, curLevel, curPicture) => {
  const scoreList = JSON.parse(localStorage.getItem("tatskScoreList"));
  if (scoreList.length > 4) {
    scoreList.shift();
  }
  scoreList.push({ time: gameTimer, level: curLevel, picture: curPicture });

  localStorage.setItem("tatskScoreList", JSON.stringify(scoreList));
};

const formatTimeToSeconds = (time) => {
  let formattedTime = time.split(":");
  return (formattedTime = Number(formattedTime[0]) * 60 + Number(formattedTime[1]));
};

const formatTimeToMinutes = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = seconds - min * 60;

  min = String(min).padStart(2, "0");
  sec = String(sec).padStart(2, "0");

  return `${min}:${sec}`;
};

export { disableButtons, unDisableButtons, setWinToLocalStorage, formatTimeToSeconds, formatTimeToMinutes };

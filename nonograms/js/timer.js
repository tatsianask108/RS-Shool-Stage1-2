let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let interval = null;

const startTimer = () => {
  if (interval !== null) {
    clearInterval(interval);
  }
  interval = setInterval(updateTimer, 10);
};

const updateTimer = () => {
  const gameTimer = document.getElementById("game-timer");

  milliseconds += 10;
  seconds = milliseconds == 1000 ? (seconds + 1) % 60 : seconds;
  minutes = seconds == 0 && milliseconds == 0 ? (minutes + 1) % 60 : minutes;
  hours = minutes == 0 && seconds == 0 && milliseconds == 0 ? hours + 1 : hours;
  milliseconds = milliseconds == 1000 ? 0 : milliseconds;

  let m = String(minutes).padStart(2, "0");
  let s = String(seconds).padStart(2, "0");

  gameTimer.innerHTML = `${m} : ${s}`;
};

const resetTimer = () => {
  clearInterval(interval);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  document.getElementById("game-timer").innerText = "00 : 00";
};

export { startTimer, resetTimer };

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
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;

      // if (minutes === 60) {
      //   minutes = 0;
      //   hours++; || alert('game over')
      // }
    }
  }

  let min = String(minutes).padStart(2, "0");
  let sec = String(seconds).padStart(2, "0");

  gameTimer.textContent = `${min} : ${sec}`;
};

const resetTimer = () => {
  clearInterval(interval);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  document.getElementById("game-timer").textContent = "00 : 00";
};

 // TBD const stopTimer = () => {}
export { startTimer, resetTimer };

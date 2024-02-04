const sounds = {
  audioMarkCell: new Audio("/assets/sounds/mark-cell.wav"),
  audioCrossCell: new Audio("/assets/sounds/cross.wav"),
  audioErase: new Audio("/assets/sounds/rub-scratch-sound.mp3"),
  audioWinGame: new Audio("/assets/sounds/win-game.wav"),
};
const setSoundsVolume = (volume) => {
  Object.keys(sounds).map((key) => {
    sounds[key] && (sounds[key].volume = volume);
  });
};

const soundsHandler = () => {
  const soundsState = document.getElementById("sounds-state");
  const soundIcon = document.getElementById("sound-icon");
  soundsState.addEventListener("change", (e) => {
    if (e.target.checked) {
      soundIcon.className = "icon icon-sound-off";
      setSoundsVolume(0);
    } else {
      soundIcon.className = "icon icon-sound-on";
      setSoundsVolume(1);
    }
  });
};

export { sounds, soundsHandler };

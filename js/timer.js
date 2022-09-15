const timer = document.querySelector(".timer");
const fine = 10;

const updateTimer = (seconds) => {
  timer.textContent = `${Math.floor(seconds / 60)}:${Math.floor(
    (seconds % 60) / 10
  )}${Math.floor((seconds % 60) % 10)}`;
};

const clearTimer = () => {
  timer.textContent = "";
};

const startTimer = async (delay) => {
  updateTimer(delay);
  return new Promise((resolve) => {
    const timerFunc = setInterval(() => {
      updateTimer(--delay);
      if (delay <= 0) {
        clearInterval(timerFunc);
        clearTimer();
        resolve();
      }
    }, 1000);
  });
};

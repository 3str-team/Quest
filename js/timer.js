class TimerController {
  constructor() {
    this.fine = 10;
    this.timerIndicator = document.querySelector(".timer");
  }
  #updateTimer(seconds) {
    this.timerIndicator.textContent = `${Math.floor(seconds / 60)}:${Math.floor(
      (seconds % 60) / 10
    )}${Math.floor((seconds % 60) % 10)}`;
  }
  #clearTimer() {
    this.timerIndicator.textContent = "";
  }
  async createTimer(seconds) {
    this.#updateTimer(seconds);
    return new Promise((resolve) => {
      const timerFunc = setInterval(() => {
        this.#updateTimer(--seconds);
        if (seconds <= 0) {
          clearInterval(timerFunc);
          this.#clearTimer();
          resolve();
        }
      }, 1000);
    });
  }
}

let Timer = new TimerController();

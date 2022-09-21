class TimerController {
  constructor() {
    this.fine = 10;
    this.timerWrapper = document.querySelector(".timerWrapper");
    this.timerIndicator = document.querySelector(".timerWrapper .timerCounter");
  }
  #updateTimer(seconds) {
    this.timerIndicator.textContent = `${Math.floor(seconds / 60)}:${Math.floor(
      (seconds % 60) / 10
    )}${Math.floor((seconds % 60) % 10)}`;
  }
  #showTimerIndicator() {
    this.timerWrapper.classList.add("active");
  }
  #hideTimerIndicator() {
    this.timerWrapper.classList.remove("active");
  }
  async createTimer(seconds) {
    this.#showTimerIndicator();
    this.#updateTimer(seconds);
    return new Promise((resolve) => {
      const timerFunc = setInterval(() => {
        this.#updateTimer(--seconds);
        if (seconds <= 0) {
          clearInterval(timerFunc);
          this.#hideTimerIndicator();
          resolve();
        }
      }, 1000);
    });
  }
}

let Timer = new TimerController();

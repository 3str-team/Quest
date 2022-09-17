class ChancesController {
  constructor() {
    this.startChances = 5;
    this.chances = this.startChances;
    this.indicator = document.querySelector(".chancesIndicator");
  }
  init() {
    let initValue =
      localStorage["chances"] == NaN
        ? this.startChances
        : localStorage["chances"];
    this.setChances(initValue);
  }
  saveChancesValue() {
    localStorage["chances"] = this.chances;
  }
  updateChancesValue() {
    this.chances = +localStorage["chances"];
  }
  async setChances(num = 0) {
    this.chances = num;
    this.saveChancesValue(num);
    this.updateChancesValue();
    this.#updateIndicator();
    if (num == 0) {
      await Timer.createTimer(10);
      this.setChances(this.startChances);
    }
  }
  #updateIndicator() {
    this.indicator.innerHTML = "";
    let elements = [];
    for (let i = 0; i < this.startChances; ++i) {
      let elem = document.createElement("span");
      elements.push(elem);
    }
    for (let i = this.chances; i < this.startChances; ++i) {
      elements[i].classList.add("disable");
    }
    elements.map((elem) => {
      this.indicator.appendChild(elem);
    });
  }
  decrimentChances() {
    this.setChances(this.chances - 1);
  }
}

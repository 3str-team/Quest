class CodeController {
  constructor() {
    this.cellsField = document.querySelector(".code");
    this.cells = document.querySelectorAll(".code input[type='text']");
    this.hiddenInput = document.querySelector(".hidden");
    this.valueLength = this.hiddenInput.value.length;
    this.answer = "8731";
    this.ChancesIndicator = new ChancesController();
  }
  init() {
    this.ChancesIndicator.init();
    this.hiddenInput.addEventListener("focus", () => this.#focusHiddenInput());
    this.hiddenInput.addEventListener("blur", () => this.#blurHiddenInput());
    this.hiddenInput.addEventListener("input", () => this.#inputValues());
    this.cells.forEach((cell) => {
      cell.addEventListener("focus", () => {
        this.hiddenInput.focus();
      });
    });
  }
  #updateValueLength() {
    this.valueLength = this.hiddenInput.value.length;
  }
  #clearCells() {
    this.cells.forEach((cell) => {
      cell.value = "";
    });
  }
  #unselectCells() {
    this.cells.forEach((cell) => {
      if (cell.classList.contains("active")) {
        cell.classList.remove("active");
      }
    });
  }
  #selectCell() {
    this.#unselectCells();
    this.cells[
      Math.min(this.valueLength, this.answer.length - 1)
    ].classList.add("active");
  }
  #focusHiddenInput() {
    this.#selectCell();
  }
  #blurHiddenInput() {
    this.#unselectCells();
  }
  #inputValues() {
    this.#clearCells();
    this.#updateValueLength();
    if (this.ChancesIndicator.chances == 0) {
      this.hiddenInput.value = "";
      this.#updateValueLength();
      this.#selectCell();
      return;
    }
    for (let i = 0; i < this.valueLength; ++i) {
      this.cells[i].value = this.hiddenInput.value[i];
    }
    this.#selectCell();
    if (this.answer.length == this.valueLength) {
      this.#checkAnswer();
    }
  }
  #checkAnswer() {
    console.log(this.ChancesIndicator.chances);
    if (this.ChancesIndicator.chances > 0) {
      setTimeout(() => {
        if (this.answer == this.hiddenInput.value) {
          this.#correctAnswerHandler();
        } else {
          this.#incorrectAnswerHandler();
        }
      }, 100);
    }
  }
  #setValue(value) {
    this.hiddenInput.value = value;
    this.#inputValues();
  }
  #incorrectAnswerHandler() {
    this.cells.forEach((cell) => {
      cell.classList.add("incorrect");
      setTimeout(() => {
        cell.classList.remove("incorrect");
        this.#setValue("");
      }, 700);
    });
    this.ChancesIndicator.decrimentChances();
    console.log(this.ChancesIndicator.chances);
  }
  #correctAnswerHandler() {
    this.cellsField.classList.add("correct");
    setTimeout(() => {
      this.cellsField.classList.remove("correct");
      this.#setValue("");
    }, 2000);
  }
}

let QuestCode = new CodeController();
QuestCode.init();

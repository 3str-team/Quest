const answer = "8731";

const code = document.querySelector(".code");
const cells = document.querySelectorAll(".code input[type='text']");
const hidden = document.querySelector(".hidden");

const unselectCells = () => {
  cells.forEach((elem) => {
    if (elem.classList.contains("active")) {
      elem.classList.remove("active");
    }
  });
};

const selectCell = () => {
  unselectCells();
  cells[Math.min(hidden.value.length, cells.length - 1)].classList.add(
    "active"
  );
};

const focusInput = () => {
  selectCell();
};

const blurInput = () => {
  unselectCells();
};

const inputValues = () => {
  cells.forEach((elem) => {
    elem.value = "";
  });
  if (+localStorage["chances"] == 0) {
    hidden.value = "";
    selectCell();
    return;
  }
  for (let i = 0; i < hidden.value.length; ++i) {
    cells[i].value = hidden.value[i];
  }
  selectCell();
  //   some animation
  if (hidden.value.length == answer.length) {
    checkAnswer();
  }
};

const checkAnswer = () => {
  if (+localStorage["chances"] > 0) {
    setTimeout(() => {
      if (answer == hidden.value) {
        alert(1);
      } else {
        incorrectAnswer();
        decrimentChances();
      }
    }, 100);
  }
};

const setValue = (value) => {
  hidden.value = value;
  inputValues();
};

const incorrectAnswer = () => {
  cells.forEach((elem) => {
    elem.classList.add("incorrect");
    setTimeout(() => {
      elem.classList.remove("incorrect");
      setValue("");
    }, 1000);
  });
};

cells.forEach((elem) => {
  elem.addEventListener("focus", () => {
    hidden.focus();
  });
  hidden.addEventListener("focus", focusInput);
  hidden.addEventListener("blur", blurInput);
  hidden.addEventListener("input", inputValues);
});

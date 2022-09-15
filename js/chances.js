const startChances = 5;

const indicator = document.querySelector(".chancesIndicator");

const updateIndicator = () => {
  indicator.innerHTML = "";
  let elements = [];
  for (let i = 0; i < +localStorage["chances"]; ++i) {
    let elem = document.createElement("span");
    if (i == 0) elem.classList.add("left");
    elements.push(elem);
  }
  for (let i = +localStorage["chances"]; i < startChances; ++i) {
    let elem = document.createElement("span");
    if (i == 0) elem.classList.add("left");
    elem.classList.add("disable");
    elements.push(elem);
  }
  elements.at(-1).classList.add("right");
  elements.map((elem) => {
    indicator.appendChild(elem);
  });
};

const setChances = async (num) => {
  localStorage["chances"] = num;
  updateIndicator();
  if (num == 0) {
    await startTimer(fine);
    setChances(startChances);
  }
};

const startValue = localStorage["chances"] || startChances;

setChances(startValue);

const decrimentChances = () => {
  let chancesNum = +localStorage["chances"];
  setChances(Math.max(--chancesNum, 0));
};

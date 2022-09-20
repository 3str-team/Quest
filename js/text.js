class TextController {
  constructor(text = "") {
    this.text = text;
    this.textField = document.querySelector(".taskWrapper .text");
    this.typingDelay = 70
  }
  init(text) {
    this.setText(text || this.text);
  }
  async #typingTextAnimation() {
    return new Promise((resolve) => {
      let stringNow = "";
      let typingSymbolIndex = 0;
      const typingFunc = setInterval(() => {
          if (stringNow.length == this.text.length) {
            this.textField.textContent = stringNow ;
            clearInterval(typingFunc);
            resolve();
          } else {
            stringNow += this.text[typingSymbolIndex++];
            this.textField.textContent = stringNow + "|";
          }
      }, this.typingDelay);
    });
  }
  async #updateTextField() {
    await this.#typingTextAnimation();
  }
  setText(text) {
    this.text = text;
    this.#updateTextField();
  }
}

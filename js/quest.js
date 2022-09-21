class QuestController extends EventTarget {
  constructor(questsArray) {
    super();
    this.questsArray = questsArray;
    this.questIndex = 0;
    this.Code = new CodeController();
  }
  init() {
    if (this.questsArray.length == 0)
      return console.error(new Error("Массив задач не может быть пустым"));
    this.Code.init(this.questsArray[this.questIndex]);
    this.Code.addEventListener("inputCorrectAnswer", () => {
      this.#nextQuest();
    });
  }
  #nextQuest() {
    this.questIndex = Math.min(this.questsArray.length, this.questIndex + 1);
    if (this.questIndex == this.questsArray.length)
      return this.#endQuestHandler();
    
    this.Code.setNewTerms(this.questsArray[this.questIndex]);
  }
  #endQuestHandler() {
    alert("Всё, победа");
  }
}

const Quest = new QuestController([
  {
    text: "Задача 1",
    answer: "1111",
  },
  {
    text: "Задача 2",
    answer: "2222",
  },
  {
    text: "Задача 3",
    answer: "3333",
  },
  {
    text: "Задача 4",
    answer: "4444",
  },
]);

Quest.init();

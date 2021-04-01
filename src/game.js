import Field from './field';

export default class Game {
  constructor() {
    this.$gameControlButton = document.querySelector(".game-control__button");
    this.$gameControlButton.addEventListener("click", () => {
      this.start();
    })
    this.column = 4;
    this.row = 4;
    this.isFirstTurn = true;
    this.correctCnt = 0;
    this.correctLength = this.row * this.column / 2;
    this.gameArray = [];
    this.gameField = new Field(this.column,this.row,this.gameArray);
    this.gameField.setClickListener(this.onClickItem);
    this.$gameControlButton.hasChildNodes
  }

  start() {
    this.initGame();
  }

  initGame() {
    this.gameField.init();
    this.correctCnt = 0;
  }

  onClickItem = (eventTarget,item) => {
    eventTarget.classList.add(`${item}--click`);
    if (this.isFirstTurn) {
      this.clickedItem = item;
      this.firstClickTarget = eventTarget;
      this.isFirstTurn = false;
    } else {
      this.isFirstTurn = true;
      if (this.clickedItem === item) {
        this.correctCnt++;

        if (this.correctCnt === this.correctLength) {
          this.initGame();
        }
      } else {
        this.gameField.isClicked = true;
        this.sleep(1000).then(() => {
          eventTarget.classList.remove(`${item}--click`);
          this.firstClickTarget.classList.remove(`${this.clickedItem}--click`);
          this.gameField.isClicked = false;
        });
      }
    }
  }

  sleep(t) {
    return new Promise(resolve => setTimeout(resolve, t));
  }
}
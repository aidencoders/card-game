
export default class Field {
  constructor(column, row, gameArray) {
    this.column = column;
    this.row = row;
    this.gameArray = gameArray;
    this.itemArray = ["red","green","blue","yellow","teal","tomato","wheat","palegreen"];
    this.cardIdx = 0;
    this.isClicked = false;
    this.$cardContainer = document.querySelector(".card__container");
    this.$cardContainer.addEventListener("click", (ev) => this.onClick(ev));
  }

  init() {
    this.cardIdx = 0;
    this._addItem();
  }

  _addItem() {
    for(let i = 0; i < this.row ; i++) {
      this.rowDiv = document.createElement("div");
      this.rowDiv.classList.add("row");
      this.$cardContainer.appendChild(this.rowDiv);
      for (let j = 0; j < this.column ; j++) {
        this.drewColor = this.drawColor();
        this.columnDiv = document.createElement("div");
        this.columnDiv.classList.add("column");
        this.columnDiv.classList.add(this.drewColor);
        this.rowDiv.appendChild(this.columnDiv);
      }
    }
  }

  drawColor() {
    let color = "";
    let randomIdx = 0;
    for(;;) {
      randomIdx = Math.random();
      randomIdx = Math.floor(randomIdx * 8);
      const validationArray = this.gameArray.filter( x => {
        return x === this.itemArray[randomIdx];
      })
      if (validationArray.length < 2) {
        this.gameArray.push(this.itemArray[randomIdx]);
        break;
      }
    }
    color = this.itemArray[randomIdx];
    return color;
  }

  onClick(ev) {
    if (!ev.target.hasChildNodes()) {
      let clickColor = "";
      if(!this.isClicked) {
        this.itemArray.forEach( itemColor => {
          if(ev.target.matches(`.${itemColor}`)) {
            clickColor = itemColor;
          }
        })
        this.onItemClick && this.onItemClick(ev.target,clickColor);
      }
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
}
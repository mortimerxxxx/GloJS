function DomElement(
  selector,
  height,
  width,
  bg,
  position,
  top,
  bottom,
  right,
  left
) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.position = position;
  this.top = top;
  this.bottom = bottom;
  this.right = right;
  this.left = left;
}

DomElement.prototype.godHand = function () {
  if (this.selector.substring(0, 1) === ".") {
    let newDiv = document.createElement("div");
    newDiv.classList.add(this.selector.substring(1));
    newDiv.style.width = this.width + "px";
    newDiv.style.height = this.height + "px";
    newDiv.style.background = this.bg;
    newDiv.style.position = this.position;
    newDiv.style.top = this.top + 'px';
    newDiv.style.bottom = this.bottom + 'px';
    newDiv.style.right = this.right + 'px';
    newDiv.style.left = this.left + 'px';
    document.body.append(newDiv);
  }
};

const blockElement = new DomElement(
  ".square",
  100,
  100,
  "gold",
  "absolute",
  50,
  0,
  0,
  0
);
document.addEventListener("DOMContentLoaded", blockElement.godHand());


const sq = document.querySelector(".square");
let nrValueTop = blockElement.top;
let nrValueLeft = blockElement.left;

function $keys() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      console.log(
        this.style.top,
        this.style.bottom,
        this.style.left,
        this.style.right
      );
      nrValueTop += 10;
      this.style.top = nrValueTop + "px";
    }
    if (event.key === "ArrowUp") {
      console.log(
        this.style.top,
        this.style.bottom,
        this.style.left,
        this.style.right
      );
      nrValueTop -= 10;
      this.style.top = nrValueTop + "px";
    }
    if (event.key === "ArrowLeft") {
      console.log(
        this.style.top,
        this.style.bottom,
        this.style.left,
        this.style.right
      );
      nrValueLeft -= 10;
      this.style.left = nrValueLeft + "px";
    }
    if (event.key === "ArrowRight") {
      console.log(
        this.style.top,
        this.style.bottom,
        this.style.left,
        this.style.right
      );
      nrValueLeft += 10;
      this.style.left = nrValueLeft + "px";
    }
  });
}
$keys.call(sq);

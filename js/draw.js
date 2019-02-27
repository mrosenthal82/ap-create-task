let firstClick = true;
let toolCurrent = "line";

function toolType(tool) {
    toolCurrent = tool;
}

function draw() {
    let xCord = event.offsetX;
    let yCord = event.offsetY;
    let ctx = document.getElementById("canvas1").getContext("2d");
    if (firstClick /* && toolCurrent !== "bucket" */){
            ctx.beginPath();
            ctx.moveTo(xCord, yCord);
            firstClick = false;
    }

    if (toolCurrent === "shape" || toolCurrent === "line"){
      ctx.lineTo(xCord, yCord);
      ctx.strokeStyle = colorDropdown();
      ctx.stroke();
    }
    // } else if (toolCurrent === "poly") {
    // } else if (toolCurrent === "bucket"){
    //   canvas.fill();
}

function endShape() {
    let ctx = document.getElementById("canvas1").getContext("2d");
    ctx.closePath();
    if (toolCurrent === "shape"){
      ctx.fillStyle = colorDropdown();;
      ctx.fill();
    }
    firstClick = true;
}

function clearCanvas() {
  let ctx = document.getElementById("canvas1").getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  firstClick = true;
}

function colorDropdown(){
  let a = document.getElementById("color");
  return a.value;
}

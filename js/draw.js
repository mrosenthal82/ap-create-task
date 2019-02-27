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
      ctx.fillStyle = "black";
      ctx.fill();
    }
    firstClick = true;
}

function clear() {
  let ctx = document.getElementById("canvas1").getContext("2d");
  ctx.clearRect(0, 0, 1500, 1500);
  alert("happens");
}

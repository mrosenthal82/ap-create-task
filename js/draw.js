let firstClick = true;
// let canvas = document.getElementById("canvas1").getContext("2d");
let toolCurrent = "line";

function toolType(tool) {
    toolCurrent = tool;
    alert("runs function");
}

function draw() {
    let xCord = event.offsetX;
    let yCord = event.offsetY;
    let canvas = document.getElementById("canvas1").getContext("2d");
    if (firstClick && toolCurrent !== "fill"){
            canvas.beginPath();
            canvas.moveTo(xCord, yCord);
            firstClick = false;
    }

    if (toolCurrent === "line"){
      canvas.lineTo(xCord, yCord);
    // } else if (toolCurrent === "poly") {
    // } else if (toolCurrent === "fill"){
    //   canvas.fill();
    }
}

function endLine() {
    let canvas = document.getElementById("canvas1").getContext("2d");
    canvas.closePath();
    canvas.fillStyle = "black";
    canvas.fill();
    firstClick = true;
}

function clear() {
  let canvas = document.getElementById("canvas1").getContext("2d");
  canvas.clearRect(0, 0, 1500, 1500);
  alert("happens");
}

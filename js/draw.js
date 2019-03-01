let firstClick = true;
let toolCurrent = "line";
let xPoints = [];
let yPoints = [];
// let i = 0;

function toolType(tool) {
    toolCurrent = tool;
}

function draw() {
    let xCord = event.offsetX;
    let yCord = event.offsetY;
    // xPoints.push(xCord);
    // yPoints.push(yCord);
    // alert(curvePoints[0]);
    // i++;
    let ctx = document.getElementById("canvas1").getContext("2d");

    if (toolCurrent === "shape" || toolCurrent === "line"){
      if (firstClick){
              ctx.beginPath();
              ctx.moveTo(xCord, yCord);
              firstClick = false;
      }
      ctx.lineTo(xCord, yCord);
      ctx.strokeStyle = colorPick();
      ctx.stroke();
    } else if (toolCurrent === "erase"){
      ctx.clearRect(xCord - 10, yCord - 10, 20, 20);
    }
    // } else if (toolCurrent === "poly") {
      // polyline(curvePoints[0], curvePoints[1], curvePoints[2], curvePoints[3]);
    // }
    // } else if (toolCurrent === "bucket"){
    //   canvas.fill();
}

function endShape() {
    let ctx = document.getElementById("canvas1").getContext("2d");
    ctx.closePath();
    if (toolCurrent === "shape"){
      ctx.fillStyle = colorPick();;
      ctx.fill();
    }
    firstClick = true;
}

function clearCanvas() {
  let ctx = document.getElementById("canvas1").getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  firstClick = true;
}

function colorPick(){
  // let a = document.getElementById("color-select");
  let b = document.getElementById("color-input");
  return b.value;
}

// function polyline(start, cp1, cp2, end){
//   let ctx = document.getElementById("canvas1").getContext("2d");
//   ctx.beginPath();
//   ctx.moveTo(start.x, start.y);
//   ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
//   ctx.stroke();
// }

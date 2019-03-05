let clickCount = 0;
let toolCurrent = "line";
let xPoints = [];
let yPoints = [];
// let i = 0;

function toolType(tool) {
    endShape();
    toolCurrent = tool;
    let ctx = document.getElementById("canvas1").getContext("2d");
    clickCount = 0;

    document.getElementById("shape").style.color = "black";
    document.getElementById("line").style.color = "black";
    document.getElementById("erase").style.color = "black";
    document.getElementById("poly").style.color = "black";
    document.getElementById("rect").style.color = "black";
    document.getElementById("circ").style.color = "black";
    document.getElementById(tool).style.color = "blue";
}

function draw() {
    let xCord = event.offsetX;
    let yCord = event.offsetY;
    xPoints.push(xCord);
    yPoints.push(yCord);
    let r;

    let ctx = document.getElementById("canvas1").getContext("2d");

    if (toolCurrent === "shape" || toolCurrent === "line"){
      outline(xCord, yCord);
    } else if (toolCurrent === "erase"){
      r = Number(document.getElementById("eraser-radius").value);
      ctx.beginPath();
      ctx.arc(xCord, yCord, r, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();
    } else if (toolCurrent === "poly") {
      if (clickCount%2 == 0 && clickCount != 0){
        polyline(xPoints[clickCount-2], yPoints[clickCount-2], xPoints[clickCount-1], yPoints[clickCount-1], xPoints[clickCount], yPoints[clickCount]);
      }
    } else if (toolCurrent === "rect" && clickCount === 1){
      ctx.fillStyle = colorPick();
      ctx.beginPath();
      ctx.moveTo(xCord, yCord);
      ctx.lineTo(xCord, yPoints[clickCount-1]);
      ctx.lineTo(xPoints[clickCount-1], yPoints[clickCount-1]);
      ctx.lineTo(xPoints[clickCount-1], yCord);
      ctx.lineTo(xCord, yCord);
      ctx.closePath();
      ctx.fill();
      xPoints = [];
      yPoints = [];
      clickCount = -1;
    }
    clickCount++;
}

function outline(xCord, yCord){
  let ctx = document.getElementById("canvas1").getContext("2d");
  if (clickCount === 0){
          ctx.beginPath();
          ctx.moveTo(xCord, yCord);
  }
  ctx.lineTo(xCord, yCord);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.strokeStyle = colorPick();
  ctx.stroke();
}

function endShape() {
    let ctx = document.getElementById("canvas1").getContext("2d");
    ctx.closePath();
    if (toolCurrent === "shape" && clickCount != 0){
      ctx.fillStyle = colorPick();
      ctx.fill();
    }
    clickCount = 0;
    xPoints = [];
    yPoints = [];
}

function clearCanvas() {
  let ctx = document.getElementById("canvas1").getContext("2d");
  ctx.closePath();
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  clickCount = 0;
}

function colorPick(){
  let b = document.getElementById("color-input");
  return b.value;
}

function polyline(xStart, yStart, xOnCurve, yOnCurve, xEnd, yEnd){
  let ctx = document.getElementById("canvas1").getContext("2d");
  let xControl = xOnCurve * 2 - (xStart + xEnd) / 2;
  let yControl = yOnCurve * 2 - (yStart + yEnd) / 2;
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.quadraticCurveTo(xControl, yControl, xEnd, yEnd);
  ctx.strokeStyle = colorPick();
  ctx.stroke();
}

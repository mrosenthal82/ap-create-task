let clickCount = 0;
let toolCurrent = "line";
let xPoints = [];
let yPoints = [];
let bgColor = "white";

function toolType(tool) {
    endShape();
    toolCurrent = tool;
    let ctx = document.getElementById("canvas1").getContext("2d");
    clickCount = 0;

    document.getElementById("shape").style.color = "#5facac";
    document.getElementById("line").style.color = "#5facac";
    document.getElementById("erase").style.color = "#5facac";
    document.getElementById("poly").style.color = "#5facac";
    document.getElementById("rect").style.color = "#5facac";
    document.getElementById("circ").style.color = "#5facac";
    document.getElementById(tool).style.color = "white";

    document.getElementById("shape").style.background = "#ebfcfc";
    document.getElementById("line").style.background = "#ebfcfc";
    document.getElementById("erase").style.background = "#ebfcfc";
    document.getElementById("poly").style.background = "#ebfcfc";
    document.getElementById("rect").style.background = "#ebfcfc";
    document.getElementById("circ").style.background = "#ebfcfc";
    document.getElementById(tool).style.background = "#92d3d3";
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
      // ctx.beginPath();
      // ctx.arc(xCord, yCord, r, 0, 2 * Math.PI, true);
      // ctx.closePath();
      // ctx.fillStyle = bgColor;
      // ctx.fill();
      ctx.clearRect(xCord - r, yCord - r, 2 * r, 2 * r);
      // ctx.clearRect(xCord - r * 0.75, yCord - r * 1.25, 1.5 * r, 2.5 * r);
      // ctx.clearRect(xCord - r * 1.25, yCord - r * 0.75, 2.5 * r, 1.5 * r);
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
    } else if (toolCurrent === "circ"){
      r = Number(document.getElementById("circle-radius").value);
      ctx.beginPath();
      ctx.arc(xCord, yCord, r, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = colorPick();
      ctx.fill();
      clickCount = -1;
    }
    // else if (toolCurrent === "eyedrop"){
    //
    // }
    clickCount++;
}

function outline(xCord, yCord){
  let ctx = document.getElementById("canvas1").getContext("2d");
  if (clickCount === 0){
          ctx.beginPath();
          ctx.moveTo(xCord, yCord);
  }
  ctx.lineTo(xCord, yCord);
  ctx.lineWidth = 1;
  // ctx.strokeStyle = "white";
  // ctx.stroke();
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
  bgColor = "white";
  document.getElementById("canvas1").style.background = "white";
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

function background(){
  bgColor = colorPick();
  document.getElementById("canvas1").style.background = bgColor;
}

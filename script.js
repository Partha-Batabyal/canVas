let can = document.querySelector(".canvas");
let btn = document.querySelector("button");
let ctx = can.getContext("2d");
let isDrawing = false;

window.addEventListener("load", () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
});

let getClientPosition = (e) => {
  return {
    x: e.clientX || e.touches[0].clientX,
    y: e.clientY || e.touches[0].clientY,
  };
};

let startDrawing = (e) => {
  e.preventDefault();
  isDrawing = true;
  ctx.beginPath();
  let { x, y } = getClientPosition(e);
  ctx.moveTo(x, y);
};

let draw = (e) => {
  e.preventDefault();
  if (!isDrawing) return;
  let { x, y } = getClientPosition(e);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "purple";
  ctx.stroke();
};

let stopDrawing = (e) => {
  e.preventDefault();
  isDrawing = false;
};

let clearCanvas = () => {
  ctx.clearRect(0, 0, can.width, can.height);
};

btn.addEventListener("dblclick", (e) => {
  e.preventDefault();
  clearCanvas();
  btn.blur();
});


btn.addEventListener("click", () => {
  if (isDrawing) {
    stopDrawing(event);
  } else {
    startDrawing(event);
  }
});

can.addEventListener("mousedown", startDrawing);
can.addEventListener("mousemove", draw);
can.addEventListener("mouseup", stopDrawing);
can.addEventListener("mouseout", stopDrawing);

can.addEventListener("touchstart", startDrawing);
can.addEventListener("touchmove", draw);
can.addEventListener("touchend", stopDrawing);
can.addEventListener("touchcancel", stopDrawing);

can.addEventListener("dblclick", clearCanvas);

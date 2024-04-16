let can = document.querySelector(".canvas");
let btn = document.querySelector("button");
let ctx = can.getContext("2d");
let isDrawing = false;

window.addEventListener("load", () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
});

let startDrawing = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(
    e.clientX || e.touches[0].clientX,
    e.clientY || e.touches[0].clientY
  );
};

let draw = (e) => {
  if (!isDrawing) return;
  ctx.lineTo(
    e.clientX || e.touches[0].clientX,
    e.clientY || e.touches[0].clientY
  );
  ctx.strokeStyle = "purple";
  ctx.stroke();
};

let stopDrawing = () => {
  isDrawing = false;
};

let clearCanvas = () => {
  ctx.clearRect(0, 0, can.width, can.height);
};

btn.addEventListener("click", () => {
  if (isDrawing) {
    stopDrawing();
  } else {
    startDrawing(event);
  }
});

can.addEventListener("mousedown", startDrawing);
can.addEventListener("mousemove", draw);
can.addEventListener("mouseup", stopDrawing);
can.addEventListener("mouseout", stopDrawing);

can.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startDrawing(e);
});

can.addEventListener("touchmove", (e) => {
  e.preventDefault();
  draw(e);
});

can.addEventListener("touchend", stopDrawing);
can.addEventListener("touchcancel", stopDrawing);

can.addEventListener("dblclick", clearCanvas);

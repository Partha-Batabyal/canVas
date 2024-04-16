let can = document.querySelector(".canvas");
let ctx = can.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
});

let startDrawing = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
};

let draw = (e) => {
  if (!isDrawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = "purple";
  ctx.stroke();
};

let stopDrawing = () => {
  isDrawing = false;
};

let clearCanvas = () => {
  ctx.clearRect(0, 0, can.width, can.height);
};

can.addEventListener("mousedown", startDrawing);
can.addEventListener("mousemove", draw);
can.addEventListener("mouseup", stopDrawing);
can.addEventListener("mouseout", stopDrawing);

can.addEventListener("dblclick", clearCanvas);

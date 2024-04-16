let can = document.querySelector(".canvas");
let btn = document.querySelector("button");
let ctx = can.getContext("2d");
let isDrawing = false;
let isErasing = false;
let lineWidth = 5;
let strokeColor = "purple";

window.addEventListener("load", () => {
  resizeCanvas();
});

let resizeCanvas = () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
};

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
  ctx.strokeStyle = isErasing ? "white" : strokeColor;
  ctx.lineWidth = isErasing ? 20 : lineWidth;
  ctx.stroke();
};

let stopDrawing = (e) => {
  e.preventDefault();
  isDrawing = false;
};

let clearCanvas = () => {
  ctx.clearRect(0, 0, can.width, can.height);
};

let toggleDrawingMode = () => {
  isErasing = !isErasing;
  btn.textContent = isErasing ? "Drawing Mode" : "Erasing Mode";
};

btn.addEventListener("click", toggleDrawingMode);
btn.addEventListener("dblclick", (e) => {
  e.preventDefault();
  clearCanvas();
  btn.blur();
});

can.addEventListener("mousedown", startDrawing);
can.addEventListener("mousemove", draw);
can.addEventListener("mouseup", stopDrawing);
can.addEventListener("mouseout", stopDrawing);

can.addEventListener("touchstart", startDrawing);
can.addEventListener("touchmove", draw);
can.addEventListener("touchend", stopDrawing);
can.addEventListener("touchcancel", stopDrawing);

let debouncedResize = debounce(() => {
  resizeCanvas();
}, 200);

window.addEventListener("resize", debouncedResize);

can.addEventListener("dblclick", clearCanvas);

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

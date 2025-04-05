const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidthInput = document.querySelector('.form-range');
let selectColor = document.querySelector('.select-color');
const getBodyColorBtn = document.querySelector('#body-btn');
const colorOptions = Array.from(document.querySelectorAll('.color-option'));
const resetBtn = document.querySelector("#reset-btn");

let canvas_width;
let canvas_height;
canvasSize();

function canvasSize(size) {
    size = window.innerWidth;
    if (size < 1070) {
        canvas_width = 480;
        canvas_height = 480;
        canvas.width = canvas_width
        canvas.height = canvas_height;
    } else {
        canvas_width = size / 2;
        canvas_height = size / 2;
        canvas.width = canvas_width
        canvas.height = canvas_height;
    }
}
window.addEventListener("resize", () => {
    canvasSize(window.innerWidth);
})


function getScaledCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (event.touches && event.touches.length > 0) {
        return {
            x: (event.touches[0].clientX - rect.left) * scaleX,
            y: (event.touches[0].clientY - rect.top) * scaleY,
        };
    } else {
        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        };
    }
}



let mouseState = false; //false는 마우스 클릭 땐 상태 true는 마우스 클릭중인 상태
function onMouseMove(event) {
    const {
        x,
        y
    } = getScaledCoords(event);

    if (mouseState) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function onMouseDown() {
    mouseState = true;
}

function onMouseUp() {
    mouseState = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
}

function clickColors(event) {
    eventColor = event.target.dataset.color;
    ctx.strokeStyle = eventColor;
    ctx.fillStyle = eventColor;
    selectColor.value = eventColor;
}

function onBodyBtnClick() {
    document.querySelector("canvas").style.backgroundColor = selectColor.value;
}

function onResetClick() {
    location.reload();
}

/*마우스 이벤트 부분*/
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);

/*색상 및 굵기 부분*/
lineWidthInput.addEventListener("change", onLineWidthChange);
selectColor.addEventListener("change", onColorChange);
getBodyColorBtn.addEventListener("click", onBodyBtnClick);
resetBtn.addEventListener("click", onResetClick);
colorOptions.forEach((color) => color.addEventListener("click", clickColors));


/*모바일 이벤트*/


canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    mouseState = true;
    const{x,y} = getScaledCoords(e);
    ctx.beginPath();
    ctx.moveTo(x,y);
},{passive:false});

canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    mouseState = false;
    ctx.closePath();
})

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const {
        x,
        y
    } = getScaledCoords(e);

    if (mouseState) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
}, {
    passive: false
});
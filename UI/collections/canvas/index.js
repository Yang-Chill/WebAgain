let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function drawHexagon() {
    let n = 0;
    let dx=150,dy=150,s=100;
    ctx.beginPath();
    ctx.fillStyle = 'pink';
    ctx.strokeStyle = 'red';
    let x=Math.sin(0), y=Math.cos(0),dig = Math.PI / 15 * 5;
    for (let i=0; i<6; i++) {
        x = Math.sin(i*dig);
        y = Math.cos(i*dig);
        ctx.lineTo(dx + x*s, dy + y*s);
        console.log(x,y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawAxis() {
    // 绘制网格
    for (let x=0.5; x<500; x+=10) {
        ctx.moveTo(x,0);
        ctx.lineTo(x,500);
    }
    for (let y=0.5; y<500; y+=10) {
        ctx.moveTo(0,y);
        ctx.lineTo(500,y);
    }
    ctx.strokeStyle = "#aaa";
    ctx.stroke();
// 绘制正方向
// x方向
    ctx.beginPath();
    ctx.moveTo(0,40);
    ctx.lineTo(240,40);
// 中间隔开20写坐标名
    ctx.moveTo(260,40);
    ctx.lineTo(500,40);
// 箭头
    ctx.moveTo(495,35);
    ctx.lineTo(500,40);
    ctx.lineTo(495,45);
// y方向
    ctx.moveTo(40,0);
    ctx.lineTo(40,240);
// 中间隔开20写坐标名
    ctx.moveTo(40,260);
    ctx.lineTo(40,500);
// 箭头
    ctx.moveTo(45,495);
    ctx.lineTo(40,500);
    ctx.lineTo(35,495);

    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.font = "bold 12px sans-serif";
    ctx.fillText("x",248,43)
    ctx.fillText("y",34,248);
    ctx.textBaseline = "top";
    ctx.fillText("(0,0)",5,5);
}

function drawImage() {
    let img = new Image();
    img.src = "../images/dylan.jpg"
    img.onload = function () {
        ctx.drawImage(img,0,0,100,100);
    }
}



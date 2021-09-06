let stage, preload;
let shape = [];

$(document).ready(function () {

    init();

});

function init() {

    initEasel();

    initTween();

    initSound();

    initPreload();

    $("#demoSound").click(() => {
        createjs.Sound.play("Thunder");
    });

    $("#demoPreload").click(() => {
        // preload.loadFile("https://th.bing.com/th/id/OIP.0MY24dGkklvUUbdXsi8eBQHaEo?w=261&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7");
        preload.loadFile("./assets/emo.jpg");
    })

}

function initEasel() {
    stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    shape.push(circle);
}

function initTween() {
    for (let s of shape) {
        createjs.Tween.get(s, {
                loop: true
            })
            .to({
                x: 400
            }, 1000, createjs.Ease.getPowInOut(4))
            .to({
                alpha: 0,
                y: 75
            }, 500, createjs.Ease.getPowInOut(2))
            .to({
                alpha: 0,
                y: 125
            }, 100)
            .to({
                alpha: 1,
                y: 100
            }, 500, createjs.Ease.getPowInOut(2))
            .to({
                x: 100
            }, 800, createjs.Ease.getPowInOut(2));
    }

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}



function initSound() {
    createjs.Sound.registerSound("./assets/xxx.mp3", "Thunder");
}

function initPreload() {
    preload = new createjs.LoadQueue();
    preload.addEventListener("fileload", (event) => {
        // $(".container").append(event.result)
        console.log(event);
    });
}
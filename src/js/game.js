var cvs = document.querySelector('#canvas');
var ctx = cvs.getContext('2d');

var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bg.src = './resources/images/flappy_bird_bg.png';
fg.src = './resources/images/flappy_bird_fg.png';
bird.src = './resources/images/flappy_bird_bird.png';
pipeUp.src = './resources/images/flappy_bird_pipeUp.png';
pipeBottom.src = './resources/images/flappy_bird_pipeBottom.png';

var hit = new Audio();
var point = new Audio();
var wing = new Audio();

hit.src = './resources/audio/sfx_hit.wav';
point.src = './resources/audio/sfx_point.wav';
wing.src = './resources/audio/sfx_wing.wav';

var gap = 150;
var xPos = 10;
var yPos = 150;
var grav = 2.6;
var jumpFrames = 6;
var jumpFrameSize = 10;
var border = 100;
var speed = 1.5;
var score = 0;

var pipes = [];
var nextPipeInd = -1;

function start() {
    pipes.push(new Pipe(cvs.width,
        randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
    nextPipeInd = 0;
}

function update() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, xPos, yPos);

    for(var i = 0; i < pipes.length; i++) {
        if(pipes[i] === null) continue;
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);
        pipes[i].x -= speed;
        debugger;
        if(pipes[i].x <= border && !pipes[i].gone) {
            pipes[i].gone = true;
            pipes.push(new Pipe(cvs.width,
                randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
        }

        if(pipes[i].x <= -pipeUp.width) {
            pipes[i] = null;
        }
    }

    if(xPos >= pipes[nextPipeInd].x + pipeUp.width && !pipes[nextPipeInd].passed) {
        pipes[nextPipeInd].passed = true;
        point.play();
        score++;
        nextPipeInd++;
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    yPos += grav;

    ctx.fillStyle = '#000000';
    ctx.font = '24px Verdana';
    ctx.fillText(`Score : ${score}`, 10, cvs.height - 20);

    if((xPos + bird.width >= pipes[nextPipeInd].x && xPos <= pipes[nextPipeInd].x + pipeUp.width)
        && (yPos <= pipes[nextPipeInd].y + pipeUp.height || yPos + bird.height >= pipes[nextPipeInd].y + pipeUp.height + gap)
        || (yPos >= cvs.height - fg.height - bird.height)) {
        hit.play();
        ctx.fillStyle = '#000000';
        ctx.font = '24px Verdana';
        ctx.fillText(`Your score : ${score}`, 70, 260);
        document.onkeydown = () => location.reload();
        return;
    }

    requestAnimationFrame(update);
}

pipeBottom.onload = () => {
    start();
    update();
};

document.onkeydown = () => {
    wing.play();
    flap(0);
};

function flap(frame) {
    if(frame === jumpFrames) return;
    yPos -= jumpFrameSize;
    requestAnimationFrame(() => flap(frame+1));
}

function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Pipe(x, y) {
    this.x = x;
    this.y = y;
    this.gone = false;
    this.passed = false;
}
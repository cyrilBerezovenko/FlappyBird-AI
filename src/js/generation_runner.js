/*
cHor: 0.0002100101735564852
cVert: 0.8266311296177093
 */

import Generation from './Generation';

let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext('2d');

let bg = new Image();
let fg = new Image();
let birdImage = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bg.src = './resources/images/flappy_bird_bg.png';
fg.src = './resources/images/flappy_bird_fg.png';
birdImage.src = './resources/images/flappy_bird_bird.png';
pipeUp.src = './resources/images/flappy_bird_pipeUp.png';
pipeBottom.src = './resources/images/flappy_bird_pipeBottom.png';

let gap = 120;
let acceleration = 0.2;
let jumpFrames = 6;
let jumpFrameSize = 10;
let border = 100;
let gameSpeed = 1.5;
let birdXPosition = 10;
let decision_threshold = 0.5;

let pipes = [];
let nextPipeInd = -1;
let genCounter = 1;

let genr;

function start() {
    genr = new Generation(60, bg, fg, acceleration, 150);
    pipes.push(new Pipe(cvs.width,
        randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
    nextPipeInd = 0;
}

function restart() {
    pipes = [];
    start();
    genr.next();
    genCounter++;
    update();
}

function update() {
    ctx.drawImage(bg, 0, 0);

    let birds = genr.birds.filter(b => b.isAlive);
    console.log(birds);
    if(birds.length === 0) {
        restart();
        return;
    }

    for(let bird of birds) {
        ctx.drawImage(birdImage, birdXPosition, bird.yPos);
    }

    for(let i = 0; i < pipes.length; i++) {
        if(pipes[i] === null) continue;
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);
        pipes[i].x -= gameSpeed;
        if(pipes[i].x <= border && !pipes[i].gone) {
            pipes[i].gone = true;
            pipes.push(new Pipe(cvs.width,
                randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
        }

        if(pipes[i].x <= -pipeUp.width) {
            pipes[i] = null;
        }
    }

    if(birdXPosition >= pipes[nextPipeInd].x + pipeUp.width && !pipes[nextPipeInd].passed) {
        pipes[nextPipeInd].passed = true;
        nextPipeInd++;
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    for(let bird of birds) {
        bird.yPos += bird.speed;
        bird.speed += acceleration;
        bird.score++;
    }

    for(let bird of birds) {
        if ((birdXPosition + birdImage.width >= pipes[nextPipeInd].x && birdXPosition <= pipes[nextPipeInd].x + pipeUp.width)
            && (bird.yPos <= pipes[nextPipeInd].y + pipeUp.height || bird.yPos + birdImage.height >= pipes[nextPipeInd].y + pipeUp.height + gap)
            || (bird.yPos >= cvs.height - fg.height - birdImage.height)) {
            bird.isAlive = false;
            continue;
        }
        bird.vert = bird.yPos - (pipes[nextPipeInd].y + pipeUp.height + gap/2);
        bird.hor = pipes[nextPipeInd].x - birdXPosition;
        if(bird.chooseToJump() >= decision_threshold) {
            flap(0, bird);
        }
    }

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText(`Generation ${genCounter}`, 10, 490);

    requestAnimationFrame(update);
}

pipeBottom.onload = () => {
    start();
    update();
};


function flap(frame, bird) {
    if(frame === jumpFrames) return;
    bird.yPos -= jumpFrameSize;
    bird.speed = 0;
    requestAnimationFrame(() => flap(frame+1, bird));
}

export function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Pipe(x, y) {
    this.x = x;
    this.y = y;
    this.gone = false;
    this.passed = false;
}
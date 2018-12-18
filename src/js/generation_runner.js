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

let gap = 100;
let acceleration = 0.36;
let jumpFrames = 12;
let jumpFrameSize = 3;
let border = 100;
let gameSpeed = 2.5;
let jumpTimeout = 50;
let cMax = 4;
let birdXPosition = 10;
let decision_threshold = 0.5;

let pipes = [];
let nextPipeInd = -1;
let genCounter = 1;
let score = 0;
let generationBestScore = 0;
let bestScore = 0;

let genr;
let generationInfo = document.querySelector('#info-generation span');
let scoreInfo = document.querySelector('#info-score span');
let bestScoreInfo = document.querySelector('#info-best-score span');
let aliveInfo = document.querySelector('#info-alive span');

function init() {
    genr = new Generation(10, bg, fg, acceleration, 150, cMax);
    start();
}

function start() {
    pipes.push(new Pipe(cvs.width,
        randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
    nextPipeInd = 0;
    score = 0;
}

function restart() {
    pipes = [];
    start();
    let cMutate = generationBestScore >= bestScore ? 0.05 : 0.3;
    genr.next(cMutate);
    generationBestScore = 0;
    genCounter++;
    update();
}

function update() {
    ctx.drawImage(bg, 0, 0);

    let birds = genr.birds.filter(b => b.isAlive);
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
        score++;
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
            bird.score -= pipes[nextPipeInd].x - birdXPosition;
            continue;
        }
        bird.vert = bird.yPos - (pipes[nextPipeInd].y + pipeUp.height + gap/2);
        bird.hor = pipes[nextPipeInd].x - birdXPosition;
        if(bird.chooseToJump() >= decision_threshold && !bird.isJumping) {
            flap(0, bird);
            bird.isJumping = true;
            setTimeout(() => bird.isJumping = false, jumpTimeout);
        }
    }

    generationInfo.innerText = genCounter;
    aliveInfo.innerText = birds.length;
    generationBestScore = Math.max(generationBestScore, score);
    bestScore = Math.max(bestScore, score);
    scoreInfo.innerText = score;
    bestScoreInfo.innerText = bestScore;

    requestAnimationFrame(update);
}

pipeBottom.onload = () => {
    init();
    update();
};


function flap(frame, bird) {
    if(frame === jumpFrames) {
        // setTimeout(() => bird.isJumping = false, jumpTimeout);
        return;
    }
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
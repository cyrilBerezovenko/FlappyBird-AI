class Generation {

    constructor(instanceCount, bg, fg, acceleration, init_ypos) {
        let vert_min = 0;
        let vert_max = bg.height - fg.height;
        let hor_min = 0;
        let hor_max = bg.width;
        this.init_ypos = init_ypos;

        this.birds = [];
        for(let i = 0; i < instanceCount; i++)
            this.birds.push(new Bird(this, init_ypos, vert_min, vert_max, hor_min, hor_max));
    }

    next() {
        this.birds.sort((b1, b2) => b1.score > b2.score ? 1 : (b1.score < b2.score ? -1 : 0));
        this.birds = this.birds.slice(0, 4);
        for(let bird of this.birds) {
            bird.isAlive = true;
            bird.speed = 0;
            bird.yPos = this.init_ypos;
            bird.hor = bird.vert = undefined;
            bird.score = 0;
        }

        let tmp = [];
        tmp.push(Generation.crossover(this.birds[0], this.birds[1]));
        let r1 = randomInt(0,3);
        let r2 = randomInt(0,3);
        while(r2 === r1) r2 = randomInt(0,3);
        for(let i = 0; i < 3; i++)
            tmp.push(Generation.crossover(this.birds[r1], this.birds[r2]));
        r1 = randomInt(0,3);
        r2 = randomInt(0,3);
        while(r2 === r1) r2 = randomInt(0,3);
        tmp.push(this.birds[r1]);
        tmp.push(this.birds[r2]);

        tmp.forEach(Generation.mutate);
        tmp.forEach(el => this.birds.push(el));
    }

    static mutate(b) {
        b.cVert *= 0.8 + Math.random()*(1.2-0.8);
        b.cHor *= 0.8 + Math.random()*(1.2-0.8);
    }

    static crossover(b1, b2) {
        let rand = randomInt(0, 3);
        let b3 = Object.assign({}, b1);
        switch(rand) {
            case 0:
                b3.cVert = b1.cVert;
                b3.cHor = b1.cHor;
                break;
            case 1:
                b3.cVert = b1.cVert;
                b3.cHor = b2.cHor;
                break;
            case 2:
                b3.cVert = b2.cVert;
                b3.cHor = b1.cHor;
                break;
            case 3:
                b3.cVert = b2.cVert;
                b3.cHor = b2.cHor;
                break;
        }
        return b3;
    }
}

class Bird {

    constructor(generation, init_ypos, vert_min, vert_max, hor_min, hor_max) {
        this.cVert = Math.random();
        this.cHor = Math.random();
        this.isAlive = true;
        this.yPos = init_ypos;
        this.speed = 0;
        this.score = 0;
        this.vert = undefined;
        this.hor = undefined;
        this.generation = generation;

        this.scale_vert = x => x / (vert_max - vert_min);
        this.scale_hor = x => x / (hor_max - hor_min);

        this.chooseToJump = function() {
            console.log(this.cVert * this.scale_vert(this.vert)
                + this.cHor * this.scale_hor(this.hor));
            return this.cVert*this.scale_vert(this.vert)
                + this.cHor*this.scale_hor(this.hor);
        }
    }
}


//=======================================


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
let acceleration = 0.1;
let jumpFrames = 6;
let jumpFrameSize = 10;
let border = 100;
let gameSpeed = 1.5;
let birdXPosition = 10;
let decision_threshold = 0.3;

let pipes = [];
let nextPipeInd = -1;
let genCounter = 1;

let genr = new Generation(20, bg, fg, acceleration, 150);

function start() {
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

function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Pipe(x, y) {
    this.x = x;
    this.y = y;
    this.gone = false;
    this.passed = false;
}
import Bird from './Bird';
import {randomInt} from './generation_runner';

export default class Generation {

    constructor(instanceCount, bg, fg, acceleration, init_ypos) {
        let vert_min = 0;
        let vert_max = bg.height - fg.height;
        let hor_min = 0;
        let hor_max = bg.width;
        this.init_ypos = init_ypos;

        this.birds = [];
        for(let i = 0; i < instanceCount; i++)
            this.birds.push(new Bird(init_ypos, vert_min, vert_max, hor_min, hor_max));
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
        let min = 0.9;
        let max = 1.1;
        b.cVert *= min + Math.random()*(max-min);
        b.cHor *= min + Math.random()*(max-min);
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
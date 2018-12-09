class Generation {

    constructor(instanceCount) {
        this.birds = [];
        for(let i = 0; i < instanceCount; i++)
            this.birds.push(new Bird(Math.random(), Math.random(), Math.random()));
    }
}

class Bird {

    constructor(cYPos, cSpeed, cDist) {
        this.cYPos = cYPos;
        this.cSpeed = cSpeed;
        this.cDist = cDist;
        this.isAlive = true;
        this.yPos = 150;
        this.speed = 0;
        this.score = 0;
        this.dist = undefined;
    }

    chooseToJump() {
        console.log(this.cYPos*this.yPos + this.cDist*this.cDist + this.cSpeed*this.speed);
        return this.cYPos*this.yPos + this.cDist*this.dist + this.cSpeed*this.speed;
    }

}

genr = new Generation(30);
export default class Bird {

    constructor(init_ypos, vert_min, vert_max, hor_min, hor_max) {
        this.cVert = Math.random();
        this.cHor = Math.random();
        this.isAlive = true;
        this.yPos = init_ypos;
        this.speed = 0;
        this.score = 0;
        this.vert = undefined;
        this.hor = undefined;

        this.scale_vert = x => x / (vert_max - vert_min);
        this.scale_hor = x => x / (hor_max - hor_min);

        let sigmoid = x => 1 / (1 + Math.exp(-x));
        this.chooseToJump = function() {
            return sigmoid(this.cVert*this.scale_vert(this.vert)
                + this.cHor*this.scale_hor(this.hor));
        };
    }
}
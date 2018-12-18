export default class Bird {

    constructor(init_ypos, vert_min, vert_max, hor_min, hor_max, cMax) {
        this._cVert = Math.random() * cMax;
        this._cHor = Math.random() * cMax;
        this.isAlive = true;
        this.yPos = init_ypos;
        this.speed = 0;
        this.score = 0;
        this.vert = undefined;
        this.hor = undefined;
        this.isJumping = false;
        this.cMax = cMax;

        this.scale_vert = x => x / (vert_max - vert_min);
        this.scale_hor = x => x / (hor_max - hor_min);

        let sigmoid = x => 1 / (1 + Math.exp(-x));
        this.chooseToJump = function() {
            return sigmoid(this.cVert*this.scale_vert(this.vert)
                + this.cHor*this.scale_hor(this.hor));
        };
    }

    get _cVert() {
        return this.cVert;
    }

    get _cHor() {
        return this.cHor;
    }

    set _cVert(value) {
        if(value > this.cMax)
            this.cVert = this.cMax;
        else if(value < -this.cMax)
            this.cVert = -this.cMax;
        else
            this.cVert = value;
    }

    set _cHor(value) {
        if(value > this.cMax)
            this.cHor = this.cMax;
        else if(value < -this.cMax)
            this.cHor = -this.cMax;
        else
            this.cHor = value;
    }
}
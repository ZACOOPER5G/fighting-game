class Sprite {
    constructor({ position, imgSrc, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framseElapsed = 0;
        this.framesHold = 5;
    };

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale,
        )
    };

    update() {
        this.draw();
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            this.framesCurrent < this.framesMax - 1 ? this.framesCurrent++ : this.framesCurrent = 0;
        }
    };
};

class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', offset, imgSrc, scale = 1, framesMax = 1, framesHold }) {
        super ({
            position,
            imgSrc, 
            scale, 
            framesMax,
        });
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framseElapsed = 0;
        this.framesHold = 5;
    };

    update() {
        this.draw();
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 130) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    };

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    };
};
class Sprite {
    constructor({ position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 1;
        this.offset = offset;
    };

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale,
        )
    };

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            this.framesCurrent < this.framesMax - 1 ? this.framesCurrent++ : this.framesCurrent = 0;
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    };
};

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        color = 'red', 
        imgSrc, scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y: 0},
        sprites
    }) {
        super ({
            position,
            imgSrc, 
            scale, 
            framesMax,
            offset,
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
        this.framesElapsed = 0;
        this.framesHold = 8;
        this.sprites = sprites
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
    };

    update() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, 50, 150)
        this.draw();
        this.animateFrames();
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 130) {
            this.velocity.y = 0;
            this.position.y = 300;
        } else {
            this.velocity.y += gravity;
        }
    };

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    };

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return
        switch (sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
            break;
            case "run":
                if (this.image !== this.sprites.run.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
            break;
            case "jump":
                if (this.image !== this.sprites.jump.image)
                this.framesCurrent = 0;
                this.framesHold = 14;
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
            break;
            case "attack1":
                if (this.image !== this.sprites.attack1.image)
                this.framesCurrent = 0;
                this.framesHold = 6;
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
            break;
        }
    }
};
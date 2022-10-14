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
        sprites,
        hitBox = { offset: {}, width: undefined, height: undefined},
        lastKey,
        healthTaken
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
        this.healthTaken = healthTaken;
        this.lastKey = lastKey;
        this.lastUpKey;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height,
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

        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
        if (this.lastKey === 'd') {
            this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
            this.hitBox.position.y = this.position.y + this.hitBox.offset.y;
        } else if (this.lastKey === 'a') {
            this.hitBox.position.x = this.position.x - 162;
            this.hitBox.position.y = this.position.y + this.hitBox.offset.y;
        };

        if (this.lastKey === 'ArrowLeft') {
            this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
            this.hitBox.position.y = this.position.y + this.hitBox.offset.y;
        } else if (this.lastKey === 'ArrowRight') {
            this.hitBox.position.x = this.position.x - this.hitBox.offset.x + this.width - 83;
            this.hitBox.position.y = this.position.y + this.hitBox.offset.y;
        };

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
        if (this.lastKey === 'a') {
            this.switchSprite('attack1Left')
        } else if (this.lastKey === 'd') {
            this.switchSprite('attack1')
        } else if (!this.lastKey) {
            this.switchSprite('attack1')
        };

        if (this.lastKey === 'ArrowRight') {
            this.switchSprite('attack1')
        } else if (this.lastKey === 'ArrowLeft') {
            this.switchSprite('attack1Left')
        } else if (this.lastKey === undefined) {
            this.switchSprite('attack1Left')
        };

        this.isAttacking = true;
    };

    takeHit() {
        if (this.lastKey === 'a') {
            this.switchSprite('takeHitLeft')
        } else if (this.lastKey === 'd') {
            this.switchSprite('takeHit')
        } else if (!this.lastKey) {
            this.switchSprite('takeHit')
        };

                if (this.lastKey === 'ArrowRight') {
            this.switchSprite('takeHit')
        } else if (this.lastKey === 'ArrowLeft') {
            this.switchSprite('takeHitLeft')
        } else if (this.lastKey === undefined) {
            this.switchSprite('takeHitLeft')
        };

        this.health -= this.healthTaken;
    }

    switchSprite(sprite) {
        // conditionals to override all other animations while attacking
        if ( 
                this.image === this.sprites.attack1Left.image && this.framesCurrent < this.sprites.attack1Left.framesMax - 1 
            ) return;
        
        if ( 
                this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1 
            ) return;

        // conditionals to override all other animations while being attacked
        if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return;

        if (this.image === this.sprites.takeHitLeft.image && this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1) return;

        switch (sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
                this.offset.x = this.sprites.idle.offset.x;
                this.offset.y = this.sprites.idle.offset.y
            break;
            case "run":
                if (this.image === this.sprites.attack1Left) {
                    this.offset.y = 0;
                }
                if (this.image !== this.sprites.run.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.offset.y = this.sprites.runLeft.offset.y;
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
                this.framesHold = this.sprites.attack1.framesHold;
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.offset.y = this.sprites.attack1.offset.y;
                this.offset.x = this.sprites.attack1.offset.x;
            break;
            case "idleLeft":
                if (this.image !== this.sprites.idleLeft.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.idleLeft.image;
                this.framesMax = this.sprites.idleLeft.framesMax;
                this.offset.x = this.offset.x;
                this.offset.x = this.sprites.idleLeft.offset.x;
                this.offset.y = this.sprites.idleLeft.offset.y
            break;
            case "runLeft":
                if (this.image !== this.sprites.runLeft.image)
                this.framesCurrent = 0;
                this.framesHold = 8;
                this.image = this.sprites.runLeft.image;
                this.framesMax = this.sprites.runLeft.framesMax;
                this.offset.y = this.sprites.runLeft.offset.y;
            break;
            case "jumpLeft":
                if (this.image !== this.sprites.jumpLeft.image)
                this.framesCurrent = 0;
                this.framesHold = 14;
                this.image = this.sprites.jumpLeft.image;
                this.framesMax = this.sprites.jumpLeft.framesMax;
            break;
            case "attack1Left":
                if (this.image !== this.sprites.attack1Left.image)
                this.image = this.sprites.attack1Left.image;
                this.offset.x = this.sprites.attack1Left.offset.x;
                this.framesCurrent = 0;
                this.framesHold = this.sprites.attack1Left.framesHold;
                this.framesMax = this.sprites.attack1Left.framesMax;
                this.offset.y = this.sprites.attack1Left.offset.y;
            break;
            case "takeHit":
                if (this.image !== this.sprites.takeHit.image)
                this.image = this.sprites.takeHit.image;
                this.offset.x = this.sprites.takeHit.offset.x;
                this.framesCurrent = 0;
                this.framesMax = this.sprites.takeHit.framesMax;
                this.offset.y = this.sprites.takeHit.offset.y;
            break;
            case "takeHitLeft":
                if (this.image !== this.sprites.takeHitLeft.image)
                this.image = this.sprites.takeHitLeft.image;
                this.offset.x = this.sprites.takeHitLeft.offset.x;
                this.framesCurrent = 0;
                this.framesMax = this.sprites.takeHitLeft.framesMax;
                this.offset.y = this.sprites.takeHitLeft.offset.y;
            break;
        }
    }
};
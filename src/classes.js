class Sprite {
    constructor({ position }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
    };

    draw() {

    };

    update() {
        this.draw();
    };
};

class Fighter {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position;
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
    };

    draw() {
        // playable character
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // hit box
        if (this.isAttacking) {
            c.fillStyle = 'yellow';
            c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
        };

    };

    update() {
        this.draw();
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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
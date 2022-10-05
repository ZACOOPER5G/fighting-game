// created canvas

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// creating sprite objects

class Sprite {
    constructor({ position, velocity, color = 'red'}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.hitBox = {
            position: this.position,
            width: 100,
            height: 50,
        };
        this.color = color;
        this.isAttacking;
    };

    draw() {
        // playable character
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // hit box
        c.fillStyle = 'yellow';
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
    };

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    };

    attack() {
        
    }
};

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue'
});

// player & enemy controls

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
};

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4;
        player.lastKey = 'd';
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4;
        player.lastKey = 'a';
    } else if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y = -20;
        player.lastKey = 'w';
    };

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4;
        enemy.lastKey = 'ArrowRight';
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4;
        enemy.lastKey = 'ArrowLeft';
    } else if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y = -20;
        enemy.lastKey = 'ArrowUp';
    };

    // detect for collison
    if (
            player.hitBox.position.x + player.hitBox.width >= enemy.position.x && 
            player.hitBox.position.x <= enemy.position.x + enemy.width && 
            player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
            player.hitBox.position.y <= enemy.position.y + enemy.height &&
            player.isAttacking

        ) {
        console.log('direct hit')
    }
};

animate();

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
        break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
        break
        case 'w':
           player.velocity.y = -20;
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
        break
        case 'ArrowUp':
           enemy.velocity.y = -20;
        break
    }

});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'd':
            keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break
        case 'w':
            keys.w.pressed = false;
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
        break
    }

});
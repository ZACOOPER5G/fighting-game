// created canvas

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// creating sprite objects

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    };

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
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
    }
});

// player controlscontrols

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
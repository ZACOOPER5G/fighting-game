// created canvas

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// creating sprite objects

const background = new Sprite ({
    position: {
        x: 0,
        y: 0,
    },
    imgSrc: '../assets/background.jpg'
})

const player = new Fighter({
    position: {
        x: 80,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    imgSrc: '../assets/naruto/naruto-idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 0,
        y: 0,
    },
    sprites: {
        idle: {
            imgSrc: '../assets/naruto/naruto-idle.png',
            framesMax: 4,
        },
        idleLeft: {
            imgSrc: '../assets/naruto/naruto-idle-left.png',
            framesMax: 4,
        },
        run: {
            imgSrc: '../assets/naruto/naruto-run.png',
            framesMax: 6,
        },
        runLeft: {
            imgSrc: '../assets/naruto/naruto-run-left.png',
            framesMax: 6,
        },
        jump: {
            imgSrc: '../assets/naruto/naruto-jump.png',
            framesMax: 3,
        },
        jumpLeft: {
            imgSrc: '../assets/naruto/naruto-jump-left.png',
            framesMax: 3,
        },
        attack1: {
            imgSrc: '../assets/naruto/attack1.png',
            framesMax: 5,
            framesHold: 8,
        },
        attack1Left: {
            imgSrc: '../assets/naruto/attack1-left.png',
            framesMax: 5,
            framesHold: 8,
        }
    },
    hitBox: {
        offset: {
            x: 100,
            y: 0,
        },
        width: 100,
        height: 50,
    },
});

const enemy = new Fighter({
    position: {
        x: 900,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0,
    },
    imgSrc: '../assets/sasuke/sasuke-idle-left.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 95,
        y: 65,
    },
    sprites: {
        idle: {
            imgSrc: '../assets/sasuke/sasuke-idle-left.png',
            framesMax: 4,
        },
        run: {
            imgSrc: '../assets/sasuke/sasuke-run-left.png',
            framesMax: 6,
        },
        jump: {
            imgSrc: '../assets/sasuke/sasuke-jump-left.png',
            framesMax: 4,
        },
        attack1: {
            imgSrc: '../assets/sasuke/attack1-left.png',
            framesMax: 7,
        }
    },
    hitBox: {
        offset: {
            x: -130,
            y: 0,
        },
        width: 100,
        height: 50,
    },
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

decreaseTimer();

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    // enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (player.position.y < 270 && player.lastKey === 'a') {
        player.switchSprite('jumpLeft')
        if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 4;
        }
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -4;
        }
    } else if (player.position.y < 270) {
        player.switchSprite('jump')
        if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 4;
        }
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -4;
        }
    } else {
        if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 4;
            player.switchSprite('run')
        } else if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -4;
            player.switchSprite('runLeft')
        } else {
            if (player.lastUpKey === 'a')
            player.switchSprite('idleLeft')
            else if (player.lastUpKey === 'd')
            player.switchSprite('idle')
            else if (!player.lastUpKey)
            player.switchSprite('idle')
        };
    };

    if (enemy.position.y < 270) {
        enemy.switchSprite('jump')
        if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 4;
        }
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -4;
        }
    } else {
        if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 4;
            enemy.switchSprite('run')
        } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -4;
            enemy.switchSprite('run')
        } else {
            enemy.switchSprite('idle')
        };
    };

    // detect for collison
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking

    ) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector("#enemyHealth").style.width = enemy.health + '%'
    };

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking

    ) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector("#playerHealth").style.width = player.health + '%'
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
            player.velocity.y = -15;
        break
        case ' ':
            player.attack();
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
            enemy.velocity.y = -15;
        break
        case 'Shift':
            enemy.attack();
         break
    }

});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'd':
            keys.d.pressed = false;
            !player.lastKey
            player.lastUpKey = 'd'
        break
        case 'a':
            keys.a.pressed = false;
            !player.lastKey
            player.lastUpKey = 'a'
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break
    }

});
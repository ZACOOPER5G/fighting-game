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
    imgSrc: './assets/background.jpg'
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
    lastKey: 'd',
    imgSrc: './assets/naruto/naruto-idle.png',
    scale: 2.5,
    offset: {
        x: 80,
        y: 0,
    },
    sprites: {
        idle: {
            imgSrc: './assets/naruto/naruto-idle.png',
            framesMax: 4,
            offset: {
                x: 70,
                y: 0,
            },
        },
        idleLeft: {
            imgSrc: './assets/naruto/naruto-idle-left.png',
            framesMax: 4,
            offset: {
                x: 50,
                y: 0,
            },
        },
        run: {
            imgSrc: './assets/naruto/naruto-run.png',
            framesMax: 6,
            offset: {
                x: 60,
                y: 0,
            }
        },
        runLeft: {
            imgSrc: './assets/naruto/naruto-run-left.png',
            framesMax: 6,
            offset: {
                x: 0,
                y: 0,
            }
        },
        jump: {
            imgSrc: './assets/naruto/naruto-jump.png',
            framesMax: 3,
        },
        jumpLeft: {
            imgSrc: './assets/naruto/naruto-jump-left.png',
            framesMax: 3,
        },
        attack1Left: {
            imgSrc: './assets/naruto/attack1-left.png',
            framesMax: 7,
            framesHold: 8,
            offset: {
                x: 166,
                y: 84,
            }
        },
        attack1: {
            imgSrc: './assets/naruto/attack1.png',
            framesMax: 7,
            framesHold: 8,
            offset: {
                x: 40,
                y: 84,
            }
        },
        takeHit: {
            imgSrc: './assets/naruto/take-hit.png',
            framesMax: 2,
            offset: {
                x: 80,
                y: 15,
            }
        },
        takeHitLeft: {
            imgSrc: './assets/naruto/take-hit-left.png',
            framesMax: 2,
            offset: {
                x: 0,
                y: 15,
            }
        },
        death: {
            imgSrc: './assets/naruto/death.png',
            framesMax: 6,
            offset: {
                x: 100,
                y: 20,
            }
        },
        deathLeft: {
            imgSrc: './assets/naruto/death-left.png',
            framesMax: 6,
            offset: {
                x: 0,
                y: 20,
            }
        },
    },
    hitBox: {
        offset: {
            x: 95,
            y: 60,
        },
        width: 100,
        height: 50,
    },
    healthTaken: 10,
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
    imgSrc: './assets/sasuke/sasuke-idle-left.png',
    framesMax: 4,
    scale: 2.5,
    lastKey: 'ArrowLeft',
    offset: {
        x: 10,
        y: 0,
    },
    sprites: {
        idleLeft: {
            imgSrc: './assets/sasuke/sasuke-idle-left.png',
            framesMax: 6,
            offset: {
                x: 10,
                y: 0,
            },
        },
        idle: {
            imgSrc: './assets/sasuke/sasuke-idle.png',
            framesMax: 6,
            offset: {
                x: 80,
                y: 0,
            },
        },
        runLeft: {
            imgSrc: './assets/sasuke/sasuke-run-left.png',
            framesMax: 6,
            offset: {
                x: 0,
                y: -20,
            }
        },
        run: {
            imgSrc: './assets/sasuke/sasuke-run.png',
            framesMax: 6,
            offset: {
                x: 0,
                y: -20,
            }
        },
        jumpLeft: {
            imgSrc: './assets/sasuke/sasuke-jump-left.png',
            framesMax: 3,
        },
        jump: {
            imgSrc: './assets/sasuke/sasuke-jump.png',
            framesMax: 3,
        },
        attack1: {
            imgSrc: './assets/sasuke/attack1.png',
            framesMax: 4,
            framesHold: 8,
            offset: {
                x: 0,
                y: 0,
            }
        },
        attack1Left: {
            imgSrc: './assets/sasuke/attack1-left.png',
            framesMax: 4,
            framesHold: 8,
            offset: {
                x: 145,
                y: 0,
            }
        },
        takeHit: {
            imgSrc: './assets/sasuke/take-hit.png',
            framesMax: 3,
            offset: {
                x: 80,
                y: 50,
            }
        },
        takeHitLeft: {
            imgSrc: './assets/sasuke/take-hit-left.png',
            framesMax: 3,
            offset: {
                x: 0,
                y: 50,
            }
        },
        death: {
            imgSrc: './assets/sasuke/death.png',
            framesMax: 6,
            offset: {
                x: 130,
                y: 30,
            }
        },
        deathLeft: {
            imgSrc: './assets/sasuke/death-left.png',
            framesMax: 6,
            offset: {
                x: 0,
                y: 30,
            }
        }
    },
    healthTaken: 20,
    hitBox: {
        offset: {
            x: -145,
            y: 60,
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
    c.fillStyle = "rgba(255, 255, 255, 0.15)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
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

    if (enemy.position.y < 270 && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('jump')
        if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 4;
        }
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -4;
        }
    } else if (enemy.position.y < 270) {
        enemy.switchSprite('jumpLeft')
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
            enemy.switchSprite('runLeft')
        } else {
            if (enemy.lastUpKey === 'ArrowLeft')
            enemy.switchSprite('idleLeft')
            else if (enemy.lastUpKey === 'ArrowRight')
            enemy.switchSprite('idle')
            else if (!enemy.lastUpKey)
            enemy.switchSprite('idleLeft')
            enemy.offset.y = 0;
        };
    };

    // detect for collison & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && player.framesCurrent === 5

    ) {
        enemy.takeHit()
        player.isAttacking = false;
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        });
    };

    // if player misses
    if (player.isAttacking && player.framesCurrent === 5) player.isAttacking = false;

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent === 2

    ) {
        player.takeHit()
        enemy.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health + '%'
        });
    }

   // if enemy misses
   if (enemy.isAttacking && enemy.framesCurrent === 2) enemy.isAttacking = false;
};

animate();

window.addEventListener('keydown', (e) => {
    if (!player.dead && timer > 0) {
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
                if (player.position.y > 270)
                player.velocity.y = -20;
            break
            case ' ':
                player.attack();
            break
        }
    };

    if (!enemy.dead && timer > 0) {
        switch(e.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
            break
            case 'ArrowUp':
                if (enemy.position.y > 270)
                enemy.velocity.y = -20;
            break
            case 'Shift':
                enemy.attack();
            break
        }
    };
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
            !enemy.lastKey
            enemy.lastUpKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            !enemy.lastKey
            enemy.lastUpKey = 'ArrowLeft'
        break
    }

});


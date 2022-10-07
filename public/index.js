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
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0,
    }
});

const enemy = new Fighter({
    position: {
        x: 400,
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
    }
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

// collision detector function

const rectangularCollision = ({
    rectangle1,
    rectangle2,
}) => {
    return (
        rectangle1.hitBox.position.x + rectangle1.hitBox.width >= rectangle2.position.x && 
        rectangle1.hitBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.hitBox.position.y + rectangle1.hitBox.height >= rectangle2.position.y &&
        rectangle1.hitBox.position.y <= rectangle2.position.y + rectangle2.height
    )
};

// timer funtion and end game function

let timer = 45;
const decreaseTimer = () => {
    setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    } else timer = 0;

    if (player.health === enemy.health && timer === 0) {
        document.querySelector('#result').style.display = 'flex'
        document.querySelector('#result').innerHTML = 'Draw'
    } else if (player.health > enemy.health && timer === 0 || enemy.health <= 0) {
        document.querySelector('#result').style.display = 'flex'
        document.querySelector('#result').innerHTML = 'Player 1 Wins'
        timer = 0;
    } else if (player.health < enemy.health && timer === 0 || player.health <= 0) {
        document.querySelector('#result').style.display = 'flex'
        document.querySelector('#result').innerHTML = 'Player 2 Wins'
        timer = 0;
    };
};

decreaseTimer();

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
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
           player.velocity.y = -20;
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
           enemy.velocity.y = -20;
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
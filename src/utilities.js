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


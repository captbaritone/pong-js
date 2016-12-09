const SIZE = 500;
const GRID = SIZE / 50;
const PADDLE_HEIGHT = GRID * 10;

const collides = (a, b) => !(
    a.y + a.height < b.y || // a is above b
    a.y > b.y + b.height || // a is below b
    a.x + a.width < b.x || // a is to the right of b
    a.x > b.x + b.width // a is to the left of b
);

const boing = new Audio('boing.mp3');
const doh = new Audio('doh.mp3');
const bum = new Audio('bum.mp3');
const pingpong = new Audio('pingpong.mp3');
pingpong.loop = true;
pingpong.volume = .5;
pingpong.play();

const canvas = document.getElementById('c');
// Double the size of the canvas to account for retina displays
canvas.width = SIZE * 2;
canvas.height = SIZE * 2;
canvas.style.height = SIZE;
canvas.style.width = SIZE;

const context = canvas.getContext('2d');

// Render the canvas at double pixel density for retina displays
context.scale(2, 2);

const ball = {
    color: '#b58900',
    x: (SIZE - GRID) / 2,
    y: (SIZE - GRID) / 2,
    width: GRID,
    height: GRID,
    xv: -1.5,
    yv: -1
};

const paddleOne = {
    color: '#268bd2',
    x: GRID,
    y: (SIZE - PADDLE_HEIGHT) / 2,
    width: GRID,
    height: PADDLE_HEIGHT,
    xv: 0,
    yv: 0
};

const paddleTwo = {
    color: '#268bd2',
    x: SIZE - (GRID * 2),
    y: (SIZE - PADDLE_HEIGHT) / 2,
    width: GRID,
    height: PADDLE_HEIGHT,
    xv: 0,
    yv: 0
};

const scene = [
    ball,
    paddleOne,
    paddleTwo
];

const tick = () => {
    context.fillStyle = '#002b36';
    context.fillRect(0, 0, SIZE, SIZE);

    // Collides with paddle
    if (collides(ball, paddleOne) || collides(ball, paddleTwo)) {
        boing.play();
        ball.xv = -ball.xv;
    }

    // Collides with top or bottom
    if (ball.y <= 0 || (ball.y + ball.height) >= SIZE) {
        bum.play();
        ball.yv = -ball.yv;
    }

    // Collides with left or right
    if (ball.x <= 0 || (ball.x + ball.width) >= SIZE) {
        doh.play();
        pingpong.pause();
        console.log('you lose!');
        return;
    }

    scene.forEach(item => {
        item.x += item.xv;
        item.y += item.yv;
        context.fillStyle = item.color;
        context.fillRect(item.x, item.y, item.width, item.height);
    });

    window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'a':
            paddleOne.yv = -2;
            break;
        case 'z':
            paddleOne.yv = 2;
            break;
        case 'ArrowUp':
            paddleTwo.yv = -2;
            break;
        case 'ArrowDown':
            paddleTwo.yv = 2;
            break;
    }
});

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'a':
        case 'z':
            paddleOne.yv = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            paddleTwo.yv = 0;
            break;
    }
});

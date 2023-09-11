const car_img = document.querySelector('#car_img');
const speed = document.querySelector('#speed');
const model = document.querySelector('#model');
const MAX_WIDTH = 800;
const MIN_WIDTH = 0;
const MAX_HEIGHT = 526;
const MIN_HEIGHT = 0;

let car = {
    speed: 1,
    model: 'bicycle'
}

// localStorage
if (localStorage.getItem('speed')) {
    car.speed = localStorage.getItem('speed');
    speed.value = car.speed;
}
if (localStorage.getItem('model')) {
    car.model = localStorage.getItem('model');
    model.value = car.model;
}
if (localStorage.getItem('left')) {
    car_img.style.left = localStorage.getItem('left');
} else {
    car_img.style.left = '0';
}
if (localStorage.getItem('top')) {
    car_img.style.top = localStorage.getItem('top');
} else {
    car_img.style.top = '0';
}

car.model = model.value;
car_img.src = `img/${car.model}.png`;

// 监听 model 事件
model.addEventListener('change', function () {
    car.model = model.value;
    car_img.src = `img/${car.model}.png`;
    localStorage.setItem('model', car.model);
    model.blur();
});

// 监听 speed 事件
speed.addEventListener('change', function () {
    car.speed = speed.value;
    speed.blur();
    localStorage.setItem('speed', car.speed);
});


// 辅助函数：判断是否超出边界
function isOutBound(x, y) {
    let max_height = MAX_HEIGHT - car_img.height;
    let max_width = MAX_WIDTH - car_img.width;
    if (x < MIN_WIDTH) {
        car_img.style.left = MIN_WIDTH + 'px';
        return true;
    } else if (x > max_width) {
        car_img.style.left = max_width + 'px';
        return true;
    } else if (y < MIN_HEIGHT) {
        car_img.style.top = MIN_HEIGHT + 'px';
        return true;
    } else if (y > max_height) {
        car_img.style.top = max_height + 'px';
        return true;
    } else {
        return false;
    }
}

// 监听键盘事件
document.addEventListener('keydown', function (e) {
    let x = car_img.offsetLeft;
    let y = car_img.offsetTop;
    switch (e.key) {
        case 'ArrowUp':
            y -= Number(car.speed);
            car_img.classList.remove('car-down', 'car-left', 'car-right');
            car_img.classList.add('car-up');
            break;
        case 'ArrowDown':
            y += Number(car.speed);
            car_img.classList.remove('car-up', 'car-left', 'car-right');
            car_img.classList.add('car-down');
            break;
        case 'ArrowLeft':
            x -= Number(car.speed);
            car_img.classList.remove('car-down', 'car-up', 'car-right');
            car_img.classList.add('car-left');
            break;
        case 'ArrowRight':
            x += Number(car.speed);
            car_img.classList.remove('car-down', 'car-left', 'car-up');
            car_img.classList.add('car-right');
            break;
    }
    if (isOutBound(x, y)) {
        alert('再开就超出边界了！请谨慎驾驶！');
        return;
    }
    car_img.style.left = x + 'px';
    car_img.style.top = y + 'px';
    localStorage.setItem('left', car_img.style.left);
    localStorage.setItem('top', car_img.style.top);
});

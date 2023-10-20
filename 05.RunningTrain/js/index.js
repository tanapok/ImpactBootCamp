// I. DOM 元素

let dom_map = document.querySelector('.map');
let dom_bgm = document.querySelector('#bgm');
let dom_bgm_control = document.querySelector('#bgm-control');

// II. 预定义变量

let curr_direction = 'right';
let next_direction = 'right';
let trainList = [
    {
        top: 0,
        left: 80,
        direction: 'right',
    },
    {
        top: 0,
        left: 40,
        direction: 'right',
    },
    {
        top: 0,
        left: 0,
        direction: 'right',
    }
];

// III. 函数

// 渲染火车函数
function renderTrain() {
    dom_map.innerHTML = '';
    // 遍历火车列表
    trainList.forEach(function (train) {
        // 创建火车元素
        let trainEle = document.createElement('div');
        trainEle.className = 'train';
        trainEle.style.top = train.top + 'px';
        trainEle.style.left = train.left + 'px';
        trainEle.classList.add('train-node');
        trainEle.classList.add('train-' + train.direction);
        trainEle.innerHTML = `
        <div class="window-list">
            <div class="window"></div>
            <div class="window"></div>
        </div>
        <div class="line"></div>
        `;
        // 将火车元素添加到地图中
        dom_map.appendChild(trainEle);
    });
}

// 火车运行函数
function trainRun() {
    curr_direction = next_direction;
    for (let i = trainList.length - 1; i >= 1; i--) {
        trainList[i].top = trainList[i - 1].top;
        trainList[i].left = trainList[i - 1].left;
        trainList[i].direction = trainList[i - 1].direction;
    }
    // 更新车头位置
    switch (curr_direction) {
        case 'right':
            trainList[0].left += 40;
            trainList[0].direction = 'right';
            break;
        case 'left':
            trainList[0].left -= 40;
            trainList[0].direction = 'left';
            break;
        case 'up':
            trainList[0].top -= 40;
            trainList[0].direction = 'up';
            break;
        case 'down':
            trainList[0].top += 40;
            trainList[0].direction = 'down';
            break;
    }
    renderTrain();
}

// 键盘事件函数
function keydownHandler(event) {
    switch (event.keyCode) {
        case 37:
            if (curr_direction !== 'right') {
                next_direction = 'left';
            }
            break;
        case 38:
            if (curr_direction !== 'down') {
                next_direction = 'up';
            }
            break;
        case 39:
            if (curr_direction !== 'left') {
                next_direction = 'right';
            }
            break;
        case 40:
            if (curr_direction !== 'up') {
                next_direction = 'down';
            }
            break;
    }
}

// 背景音乐函数
function addBgmHandler() {
    dom_bgm_control.addEventListener('change', function () {
        if (dom_bgm_control.value === 'yes') {
            dom_bgm.play();
        }
        else {
            dom_bgm.pause();
        }
    });
}

// 初始化函数
function init() {
    renderTrain();
    setInterval(trainRun, 300);
    document.addEventListener('keydown', keydownHandler);
    addBgmHandler();
}

// IV. 程序

init();

'use strict';

// DOM 元素
const roundText = document.querySelector('#round-text'); // 回合提示文本
const computerGesture = document.querySelector('#computer-gesture'); // 电脑出拳
const playerGesture = document.querySelector('#player-gesture'); // 玩家出拳
const computerScore = document.querySelector('#computer-score'); // 电脑分数
const playerScore = document.querySelector('#player-score'); // 玩家分数
const messageText = document.querySelector('#message-text'); // 消息提示文本
const resultText = document.querySelector('#result-text'); // 结果文本
const controlButton = document.querySelector('#control-button'); // 控制按钮
const selectDialog = document.querySelector('#select-dialog'); // 对话框
const selectForm = document.querySelector('#select-form'); // 表单
const selectGesture = document.querySelector('#select-gesture'); // 出拳选项

// 常量 & 变量
const GESTURE = {
    'ROCK': '✊',
    'PAPER': '✋',
    'SCISSORS': '✌️'
};
const GAME_STATES = {
    NOT_STARTED: 0,
    RUNNING: 1,
    FINISHED: 2
};
let game_state = GAME_STATES.NOT_STARTED;
let round = 0;
let max_round = 3;
let computer_win = 0;
let player_win = 0;

// 更新回合提示文本
function updateRoundText(text) {
    roundText.innerHTML = text;
}
// 更新电脑出拳图标
function updateComputerGesture(gesture) {
    if (gesture === '?') {
        computerGesture.classList.remove('computer-show-hand');
        computerGesture.innerHTML = '?';
    } else {
        computerGesture.innerHTML = gesture;
        computerGesture.classList.add('computer-show-hand');
    }
}
// 更新玩家出拳图标
function updatePlayerGesture(gesture) {
    if (gesture === '?') {
        playerGesture.classList.remove('player-show-hand');
        playerGesture.innerHTML = '?';
    } else {
        playerGesture.innerHTML = gesture;
        playerGesture.classList.add('player-show-hand');
    }
}
// 更新电脑分数文本
function updateComputerScoreText(win, lost) {
    computerScore.innerHTML = `胜：${win} ｜ 负：${lost}`;
}
// 更新玩家分数文本
function updatePlayerScoreText(win, lost) {
    playerScore.innerHTML = `胜：${win} ｜ 负：${lost}`;
}
// 更新消息提示文本
function updateMessageText(text) {
    messageText.innerHTML = text;
}
// 更新结果文本
function updateResultText(text) {
    resultText.innerHTML = text;
}
// 更新控制按钮文本
function updateControlButtonText(text) {
    controlButton.innerHTML = text;
}

// 游戏重置
function resetGame() {
    // 数值初始化
    game_state = GAME_STATES.NOT_STARTED;
    round = 0;
    computer_win = 0;
    player_win = 0;
    // 界面初始化
    updateRoundText('石头剪刀布');
    updateComputerGesture('?');
    updatePlayerGesture('?');
    updateComputerScoreText(0, 0);
    updatePlayerScoreText(0, 0);
    updateMessageText('');
    updateResultText('');
    updateControlButtonText('开始游戏');
}

// 处理游戏
function processGame(player_gesture_key) {
    round++;
    // 更新回合提示文本
    updateRoundText(`第 ${round} 回合（共 ${max_round} 回合）`);
    // 生成电脑出拳
    let computer_gesture_key = '?';
    let computer_gesture_key_num = Math.floor(Math.random() * 3);
    if (computer_gesture_key_num === 0) {
        computer_gesture_key = 'ROCK';
    } else if (computer_gesture_key_num === 1) {
        computer_gesture_key = 'PAPER';
    } else if (computer_gesture_key_num === 2) {
        computer_gesture_key = 'SCISSORS';
    }
    updateComputerGesture(GESTURE[computer_gesture_key]);
    updatePlayerGesture(GESTURE[player_gesture_key]);
    // 判断胜负并更新分数
    if (player_gesture_key === computer_gesture_key) {
        updateMessageText('本回合：平局');
    } else if (
        (player_gesture_key === 'ROCK' && computer_gesture_key === 'SCISSORS') ||
        (player_gesture_key === 'PAPER' && computer_gesture_key === 'ROCK') || 
        (player_gesture_key === 'SCISSORS' && computer_gesture_key === 'PAPER')
        ) {
        player_win++;
        updateMessageText('本回合：玩家赢');
    } else {
        computer_win++;
        updateMessageText('本回合：机器人赢');
    }
    updateComputerScoreText(computer_win, player_win);
    updatePlayerScoreText(player_win, computer_win);
    // 判断游戏是否结束
    if (round === 2) {
        if (player_win === 2) {
            updateResultText('(≧v≦)o~~好棒，恭喜你获得胜利！');
            updateControlButtonText('再玩一次');
            game_state = GAME_STATES.FINISHED;
        } else if (computer_win === 2) {
            updateResultText('(≧v≦)o~~好棒，恭喜机器人获得胜利！');
            updateControlButtonText('再玩一次');
            game_state = GAME_STATES.FINISHED;
        }
    } else if (round >= max_round) {
        if (player_win > computer_win) {
            updateResultText('(≧v≦)o~~好棒，恭喜你获得胜利！');
        } else if (player_win < computer_win) {
            updateResultText('(≧v≦)o~~好棒，恭喜机器人获得胜利！');
        } else {
            updateResultText('(≧v≦)o~~好棒，你和机器人不分伯仲！');
        }
        updateControlButtonText('再玩一次');
        game_state = GAME_STATES.FINISHED;
    } else {
        updateControlButtonText('下一回合');
    }
}

// 根据游戏状态决定游戏下一步行为
function switchGame(game_state) {
    if (game_state === GAME_STATES.NOT_STARTED) {
        selectDialog.showModal();
    } else if (game_state === GAME_STATES.RUNNING) {
        selectDialog.showModal();
    } else if (game_state === GAME_STATES.FINISHED) {
        resetGame();
    }
}

// 按钮点击事件
controlButton.addEventListener('click', () => {
    switchGame(game_state);
});

// 表单提交事件
selectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    selectDialog.close();
    processGame(selectGesture.value);
});

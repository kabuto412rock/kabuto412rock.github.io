// 使用者的輸入顯示區（作答區）
// const userInputView: HTMLElement = document.getElementById('userInputView') as HTMLElement
var userInput = document.getElementById('userInput');
// 當前題目的字串，可能會經過轉換傳給題目的顯示區(比如說不符合的字亮紅色之類的)
var currentProblemString = "";
// 當前的關卡等級
var currentLevel = 0;
// 題目的顯示區 
var problem = document.getElementById('problem');
var UserState;
(function (UserState) {
    UserState[UserState["View"] = 1] = "View";
    UserState[UserState["Edit"] = 2] = "Edit";
})(UserState || (UserState = {}));
var current_user_state = UserState.Edit;
var keyboard_string = " Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash ControlRight KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight CapsLock AltLeft MetaLeft Space MetaRight AltRight ArrowLeft ArrowUp ArrowDown ArrowRight ArrowDown";
var keyboard_list = keyboard_string.split(" ");
var levels_string_list = ["asdfghjkl;", "qwertyuiop", "zxcvbnm,./", "`1234567890-="];
var keyboard_doms = {};
var keyboard_doms_text = {};
for (var key in keyboard_list) {
    var key_id = keyboard_list[key];
    var key_dom = document.getElementById(key_id);
    if (key_dom != null) {
        keyboard_doms[key_id] = (key_dom);
        keyboard_doms_text[key_id] = key_dom.value;
    }
}
document.addEventListener('keydown', logKeydown);
document.addEventListener('keyup', logKeyup);
function init() {
    var mayHaveLevel = document.cookie.match("level:([0-9]+);");
    if (mayHaveLevel == null) {
        document.cookie = 'level:0;';
    }
    else {
        currentLevel = parseInt(mayHaveLevel[1]);
        document.cookie = "level:" + currentLevel;
    }
    createNewLevel();
}
// 鍵盤按鍵按下時。
function logKeydown(e) {
    userInput.focus();
    if (e.code == "Escape") {
        setUserState(UserState.View);
    }
    else if (current_user_state == UserState.View && e.code == 'KeyI') {
        setUserState(UserState.Edit);
    }
    if (keyboard_string.search(e.code) && current_user_state == UserState.Edit) {
        console.log('KeyDown', e.code);
        var key_dom = keyboard_doms[e.code];
        if (key_dom.classList.contains('button_active') !== true) {
            key_dom.classList.add('button_active');
        }
        console.log('userInput:@' + userInput.value + "@, userInput.length=", userInput.value.length);
        console.log('currentProblemString:@' + currentProblemString + "@, currentProblemString.length", currentProblemString.length);
    }
}
// 設定使用者的狀態模式(目前只有編輯模式、瀏覽模式)
function setUserState(state) {
    switch (state) {
        case UserState.View:
            // 進入瀏覽模式
            current_user_state = UserState.View;
            userInput.blur();
            userInput.disabled = true;
            $('#myModal').modal('show');
            break;
        case UserState.Edit:
            // 進入編輯模式
            current_user_state = UserState.Edit;
            userInput.focus();
            userInput.disabled = false;
            $('#myModal').modal('hide');
            break;
    }
}
// 鍵盤按鍵彈起時。
function logKeyup(e) {
    if (keyboard_string.search(e.code) && current_user_state == UserState.Edit) {
        console.log('KeyUp', e.code);
        var key_dom = keyboard_doms[e.code];
        key_dom.classList.remove('button_active');
        // key_dom.value = keyboard_doms_text[e.code]
        // 確認是否輸入正確
        if (checkUserInputIsCorrect()) {
            goNextLevel();
            return;
        }
        /**
         * 實做一個功能，問題的字串原始顯示會是白色的。
         * 當輸入正確的字元，會將當前符合對應的字元轉為黑色顯示。
         * 輸入錯誤的字元會自動刪除直到輸入正確。
         * 首先我想到的是當前比對index，如果
         */
        var userInputCorrectEndPosition = -1;
        for (var i = 0; i < userInput.value.length; i++) {
            var userCh = userInput.value[i];
            console.log("userCh='" + userCh + "', currentProblemtring[" + i + "]='" + currentProblemString[i] + "'");
            if (i < currentProblemString.length && userCh == currentProblemString[i]) {
                userInputCorrectEndPosition = i;
            }
            else {
                break;
            }
        }
        var correctUserInputString = currentProblemString.slice(0, userInputCorrectEndPosition + 1);
        userInput.value = correctUserInputString;
        problem.innerHTML =
            "<span class=\"correct-text\">" + correctUserInputString + "</span><span>" + currentProblemString.slice(userInputCorrectEndPosition + 1) + "</span>";
        // problem.innerHTML = "123<span class=\"wrong-text\">hello</span>"
    }
}
// 建立關卡，自動載入為當前關卡的內容
function createLevel(problemTemplate) {
    // 設定題目
    var randomProblem = problemTemplate + problemTemplate;
    for (var i = 0; i < randomProblem.length; i += 3) {
        var randomPosition = Math.floor(Math.random() * randomProblem.length);
        var a = randomProblem.slice(0, randomPosition);
        var b = randomProblem.slice(randomPosition);
        randomProblem = b + a;
    }
    // 設定當前的問題字串
    currentProblemString = randomProblem;
    // 將問題字串賦值給problem顯示
    problem.innerText = currentProblemString;
    // 清空使用者輸入區
    userInput.value = "";
}
// 檢查當前的輸入跟當前關卡的問題字串是否相同，相同回傳true，不相同則顯示在Problem中
function checkUserInputIsCorrect() {
    // 如果相等則回傳true，不相等則回傳flase
    return userInput.value === currentProblemString;
}
// 前往下一關
function goNextLevel() {
    console.log('Go next level');
    // 關卡+1
    currentLevel += 1;
    document.cookie = "level:" + currentLevel;
    $("#userScore").text("" + currentLevel * 100);
    // TODO:暫定使用最簡單的level題目字串
    // 生成一個新題目
    createNewLevel();
}
function createNewLevel() {
    createLevel(levels_string_list[Math.floor(Math.random() * levels_string_list.length)]);
}
$(document).ready(function () {
    // 當關閉modal時，自動進入編輯模式
    $('#myModal').on('hidden.bs.modal', function () {
        // 觸發 "編輯模式"
        console.log('關閉modal');
        setUserState(UserState.Edit);
    });
});

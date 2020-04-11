var hint = document.getElementById('hint');
// 使用者的輸入顯示區（作答區）
// const userInputView: HTMLElement = document.getElementById('userInputView') as HTMLElement
var userInput = document.getElementById('userInput');
// 小助手(圖片)
var assistantImg = document.getElementById('assistantImage');
// 題目的顯示區 
var problem = document.getElementById('problem');
// 使用者狀態
var userStateView = document.getElementById('userStateView');
var UserState;
(function (UserState) {
    UserState[UserState["View"] = 1] = "View";
    UserState[UserState["Edit"] = 2] = "Edit";
})(UserState || (UserState = {}));
var current_user_state = UserState.Edit;
var keyboard_string = " Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash ControlRight KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight CapsLock AltLeft MetaLeft Space MetaRight AltRight ArrowLeft ArrowUp ArrowDown ArrowRight ArrowDown";
var keyboard_list = keyboard_string.split(" ");
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
        if (key_dom.classList.contains('button_active')) {
            return;
        }
        key_dom.classList.add('button_active');
        for (var i = 0; i < userInput.innerText.length; i++) {
            var ch = userInput.innerText[i];
        }
        // key_dom.value = "@"
    }
}
function setUserState(state) {
    switch (state) {
        case UserState.View:
            // 進入瀏覽模式
            current_user_state = UserState.View;
            userInput.blur();
            userInput.disabled = true;
            assistantImg.hidden = false;
            break;
        case UserState.Edit:
            // 進入編輯模式
            current_user_state = UserState.Edit;
            userInput.focus();
            userInput.disabled = false;
            assistantImg.hidden = true;
            break;
    }
}
function logKeyup(e) {
    if (keyboard_string.search(e.code) && current_user_state == UserState.Edit) {
        console.log('KeyUp', e.code);
        var key_dom = keyboard_doms[e.code];
        key_dom.classList.remove('button_active');
        // key_dom.value = keyboard_doms_text[e.code]
    }
}

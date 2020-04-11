var hint = document.getElementById('hint')
// 使用者的輸入顯示區（作答區）
// const userInputView: HTMLElement = document.getElementById('userInputView') as HTMLElement
const userInput: HTMLTextAreaElement = document.getElementById('userInput') as HTMLTextAreaElement
// 小助手(圖片)
const assistantImg = document.getElementById('assistantImage') as HTMLImageElement 
// 題目的顯示區 
const problem: HTMLElement = document.getElementById('problem') as HTMLElement

// 使用者狀態
const userStateView : HTMLElement =document.getElementById('userStateView') as HTMLElement
enum UserState {
  View = 1,
  Edit = 2,
}
let current_user_state = UserState.Edit
const keyboard_string: String = " Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash ControlRight KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight CapsLock AltLeft MetaLeft Space MetaRight AltRight ArrowLeft ArrowUp ArrowDown ArrowRight ArrowDown"
const keyboard_list = keyboard_string.split(" ")

let keyboard_doms: { [name: string]: HTMLElement; } = {}
let keyboard_doms_text: { [name: string]: string; } = {}
for (var key in keyboard_list) {
  let key_id = keyboard_list[key]
  let key_dom: HTMLInputElement = document.getElementById(key_id) as HTMLInputElement
  if (key_dom != null) {
    keyboard_doms[key_id] = (key_dom)
    keyboard_doms_text[key_id] = key_dom.value;
  }
}
document.addEventListener('keydown', logKeydown)
document.addEventListener('keyup', logKeyup)

function logKeydown(e: KeyboardEvent) {
  userInput.focus()
  if (e.code == "Escape") {
    setUserState(UserState.View)
  } else if (current_user_state == UserState.View && e.code == 'KeyI') {
    setUserState(UserState.Edit)
  }

  if (keyboard_string.search(e.code) && current_user_state == UserState.Edit) {
    console.log('KeyDown', e.code)
    let key_dom: HTMLInputElement = keyboard_doms[e.code] as HTMLInputElement
    if (key_dom.classList.contains('button_active')) {
      return
    }

    key_dom.classList.add('button_active')
    for (var i =0; i< userInput.innerText.length;i++) {
      let ch = userInput.innerText[i]
    }
    
    // key_dom.value = "@"
  }
}
function setUserState(state: UserState) {
  switch (state) {
    case UserState.View:
      // 進入瀏覽模式
      current_user_state = UserState.View
      userInput.blur()
      userInput.disabled = true
      break;
    case UserState.Edit:
      // 進入編輯模式
      current_user_state = UserState.Edit
      userInput.focus()
      userInput.disabled = false
      break;
  }
}
function logKeyup(e: KeyboardEvent) {
  if (keyboard_string.search(e.code) && current_user_state == UserState.Edit) {
    console.log('KeyUp', e.code)
    let key_dom: HTMLInputElement = keyboard_doms[e.code] as HTMLInputElement
    key_dom.classList.remove('button_active')
    // key_dom.value = keyboard_doms_text[e.code]
  }
}

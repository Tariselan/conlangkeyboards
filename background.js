var contextID = 0;

var lut = {
  "KeyQ": [ "q", "Q" ],
  "KeyW": [ "w", "W" ],
  "KeyE": [ "e", "E"],
  "KeyR": [ "r", "R" ],
  "KeyT": [ "t", "T" ],
  "KeyY": [ "y", "Y" ],
  "KeyU": [ "u", "U" ],
  "KeyI": [ "i", "I" ],
  "KeyO": [ "o", "O" ],
  "KeyP": [ "p", "P" ],
  "KeyA": [ "a", "A" ],
  "KeyS": [ "s", "S" ],
  "KeyD": [ "d", "D" ],
  "KeyF": [ "f", "F" ],
  "KeyG": [ "g", "G" ],
  "KeyH": [ "h", "H" ],
  "KeyJ": [ "j", "J" ],
  "KeyK": [ "k", "K" ],
  "KeyL": [ "l", "L" ],
  "KeyZ": [ "z", "Z" ],
  "KeyX": [ "x", "X" ],
  "KeyC": [ "c", "C" ],
  "KeyV": [ "v", "V" ],
  "KeyB": [ "b", "B" ],
  "KeyN": [ "n", "N" ],
  "KeyM": [ "m", "M" ],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.capsLock != keyData.shiftKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
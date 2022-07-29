var contextID = 0;

var lut = {
  "KeyQ": [ "ⓠ", "Ⓠ" ],
  "KeyW": [ "ⓦ", "Ⓦ" ],
  "KeyE": [ "ⓔ", "Ⓔ"],
  "KeyR": [ "ⓡ", "Ⓡ" ],
  "KeyT": [ "ⓣ", "Ⓣ" ],
  "KeyY": [ "ⓨ", "Ⓨ" ],
  "KeyU": [ "ⓤ", "Ⓤ" ],
  "KeyI": [ "ⓘ", "Ⓘ" ],
  "KeyO": [ "ⓞ", "Ⓞ" ],
  "KeyP": [ "ⓟ", "Ⓟ" ],
  "KeyA": [ "ⓐ", "Ⓐ" ],
  "KeyS": [ "ⓢ", "Ⓢ" ],
  "KeyD": [ "ⓓ", "Ⓓ" ],
  "KeyF": [ "ⓕ", "Ⓕ" ],
  "KeyG": [ "ⓖ", "Ⓖ" ],
  "KeyH": [ "ⓗ", "Ⓗ" ],
  "KeyJ": [ "ⓙ", "Ⓙ" ],
  "KeyK": [ "ⓚ", "Ⓚ" ],
  "KeyL": [ "ⓛ", "Ⓛ" ],
  "KeyZ": [ "ⓩ", "Ⓩ" ],
  "KeyX": [ "ⓧ", "Ⓧ" ],
  "KeyC": [ "ⓒ", "Ⓒ" ],
  "KeyV": [ "ⓥ", "Ⓥ" ],
  "KeyB": [ "ⓑ", "Ⓑ" ],
  "KeyN": [ "ⓝ", "Ⓝ" ],
  "KeyM": [ "ⓜ", "Ⓜ" ],
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
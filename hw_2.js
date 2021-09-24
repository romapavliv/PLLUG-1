function crashBrowser() {
  while(true) {
    alert('CRAAAAAASH!')
  }
}

function transformingString(word) {
  let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newWord = '';
  for(let char of word) {
    if(upperCase.indexOf(char) != -1) {
      newWord += char.toLowerCase();
    } else {
      newWord += char.toUpperCase()
    }
  }
  return newWord
}


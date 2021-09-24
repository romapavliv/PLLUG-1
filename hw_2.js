function crashBrowser() {
  while(true) {
    alert('CRAAAAAASH!')
  }
}

function transformingStringEnglish(word) {
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

function transformingStringAll(word) {
  let wordUpperCase = word.toUpperCase();
  let newWord = '';
  for(let char of word) {
    if(wordUpperCase.indexOf(char) != -1) {
      newWord += char.toLowerCase();
    } else {
      newWord += char.toUpperCase()
    }
  }
  return newWord
}



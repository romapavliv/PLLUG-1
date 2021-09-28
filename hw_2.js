function crashBrowser() {
  while(true) {
    alert('CRAAAAAASH!')
  }
}

function stransformingStringShortVariant(word){
  //Можна використати замість деструктуризації [...word] метод word.split('')
  return [...word].map(letter => (letter == letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase())).join('')
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

Завдання виконано але умови в циклах можна упростити, пропущені крапки з комою в коді.

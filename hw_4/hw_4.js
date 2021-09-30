//1. Створити функцію яка б отримувала параметром масив з елементів різних типів (строки, масиви, числа, об’єкти і т.д), на виході має повернути строку у camel case
function transformStringToCamelCase(arr) {
  if (!arr) {
    return console.error("Something went wrong!");
  }
  let arrWithString = arr.filter((el) => typeof el == "string" && el != "");
  return arrWithString
    .map((el) => el.toLowerCase())
    .slice(1, arrWithString.length)
    .reduce((acc, el) => {
      return acc + `${el[0].toUpperCase()}${el.slice(1, el.length)}`;
    }, `${arrWithString[0].toLowerCase()}`);
}

//2. Створити функцію яка отримує параметром масив цілих чисел 1 <= value <= 26, і повертала б масиву у якому кожен елемент масиву є літерою англійського алфавіту відповідний конкретному елементу масива
function getLettersFromAlphabet(arr) {
  if (!arr) {
    return console.error("Something went wrong!");
  }
  for (let i of arr) {
    if (typeof i == "number" && 1 <= i && i <= 26) {
      continue;
    } else {
      return console.error("Something went wrong!");
    }
  }
  //65 - A, 97 - a
  return arr.map((el) => [
    String.fromCharCode(el + 64),
    String.fromCharCode(el + 96),
  ]);
}

//3. Створити функцію яка параметром отримує об’єкт  і повертає новий об’єкт у який містить тільки числа більші рівні 0.

function getPositiveNumberFromObj(obj) {
  if (!obj) {
    return console.error("Something went wrong!");
  }
  return Object.entries(obj).reduce((obj, [key, value]) => {
    if (typeof value == "number" && value >= 0) {
      return { ...obj, [key]: value };
    } else {
      return { ...obj };
    }
  }, {});
}

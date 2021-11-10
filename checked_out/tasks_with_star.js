//1. Функція яка отримує параметром масив строк і повертає суму довжин усіх строк, рахувати тільки англ. букви без пробілів, знаків пунктуації, тощо.

function filterArrOfString(arr) {
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return arr
    .flatMap((e) => e.split(""))
    .reduce((acc, e) => {
      if (alphabet.includes(e)) {
        return acc + 1;
      }
      return acc;
    }, 0);
}

//2. Функція яка отримує параметром масив масивів кожен з яких містить два елемента і повертає об'єкт у якому перший елемент вкладеного масиву є ключем, а наступний є його значенням, якщо зустрічаються два масива з однаковим ключем, то в об'єкті залишається, той що був доданий першим.
function parseObjectFromArr(arr) {
  return arr.reduce((acc, e) => {
    if (Object.keys(acc).includes(e[0])) {
      return acc;
    }
    return { ...acc, [e[0]]: e[1] };
  }, {});
}

//3. Функція яка отримує параметром деяку строку, наприклад '?a=22&b=33&c=44&d=55&e=111' і повертає об'єкт сформований з цієї строки як у даному випадку це {a: 22, b: 33, c: 44, d: 55, e: 111}.

function parseStringToObject(str) {
  return str
    .match(/[a-z]=\d*/gi)
    .map((e) => e.split("="))
    .reduce((acc, e) => {
      return { ...acc, [e[0]]: e[1] };
    }, {});
}

//4. Функція яка отримує параметром масив вкладених масивів і повертає масив з найглибше вкладеним елементом, або елементами якщо рівень глибина вкладеності однакова. Приклад [1, [2, 3], [[4], 5], [[6]]] => [4, 6].

function findTheMostDeepArray(arr) {
  let flag = true;
  let finalArr = [...arr];
  let deepestNumber = [];
  function findTheMostDeepArrayRecurs(Farr) {
    let copyDeepestNumber = [...deepestNumber];
    deepestNumber = [];
    let flatFlag = true;
    for (let i of Farr) {
      if (typeof i == "object" && flatFlag == true) {
        finalArr = [...Farr.flat(1)];
        flatFlag = false;
      }
      if (typeof i == "object") {
        deepestNumber.push(i);
      }
    }
    if (deepestNumber.length == 0) {
      flag = false;
    }
    return copyDeepestNumber;
  }
  let fin = [];
  while (flag) {
    fin = findTheMostDeepArrayRecurs(finalArr);
  }
  return fin.flat();
}

//5. Функція яка отримує параметром масив цілих чисел 0 >= value >= 10 і повертає масив вкладених масивів, де глибина вкладеності масива дорівнює його значенню, наприклад: [1, 2, 1, 3, 4] => [[1], [[2]], [1], [[[3]]], [[[[4]]]]];

function makeDeepArr(arr) {
  let myArr = [];
  function makeDeep(el, index) {
    let num = el;
    for (let i = 0; i < index; i++) {
      num = [num];
    }
    myArr.push(num);
  }
  for (let i = 0; i < arr.length; i++) {
    makeDeep(arr[i], i + 1);
  }
  return myArr;
}

//6. Функція яка отримує параметром об'єкт data і масив fieldsToNumber і повертає новий об'єкт у якому всі строкові значення перетворені у число, наприклад:  data = {a: '21', b: 'sensor', c: '0.2', d: '00.10'}, fieldsToNumber = ['a', 'c'] результат {a: 21, b: 'sensor', c: 0.2, d: '00.10'}. Строка яку потрібно перевести у число може бути десятковою і містити крапку "." або кому ",".

function filterFields(data, fieldsToNumber) {
  return (fixNumbersObj = Object.entries(data).reduce((acc, e) => {
    if (fieldsToNumber.includes(e[0])) {
      return { ...acc, [e[0]]: Number(e[1].replace(",", ".")) };
    }
    return { ...acc, [e[0]]: e[1] };
  }, {}));
}

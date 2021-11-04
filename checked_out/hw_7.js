//1. Провести заміри продуктивності для звичайного об’єкта, об’єкта без прототипу та MAP. Зробити заміри на різних наборах даних, наприклад 100 ключів, 10 000 ключів, 1 000 000 ключів. Дослідити швидкість добавлення нового ключа, взяття значення за ключем, видалення ключа на кожному наборі даних. Також дослідити перетворення тестовану структуру даних у масив, швидкість ітерації(у чистій формі та разом з конвертацією).

let testObjWithPrototype = {},
  testObjWithoutPrototype = Object.create(null),
  testMap = new Map();

const alphabet = "abcdefghijklmnopqrstuvwxyz";
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function fillObjectRandomValues(obj, n) {
  for (let i = 0; i < n; ++i) {
    obj[
      alphabet[randomInteger(0, 25)] +
        alphabet[randomInteger(0, 25)] +
        alphabet[randomInteger(0, 25)] +
        alphabet[randomInteger(0, 25)] +
        alphabet[randomInteger(0, 25)] +
        alphabet[randomInteger(0, 25)]
    ] = randomInteger(10, 1000);
  }
  return obj;
}

function fillMapRandomValues(map, n) {
  for (let i = 0; i < n; ++i) {
    map.set(randomInteger(1, 1000000000000), randomInteger(100, 1000));
  }
  return map;
}

//1) Додавання нового ключа

//Для 100 ключів:

//Prototype object: 0.0029296875 ms
//No prototype object: 0.000732421875 ms
///Map: 0.002197265625 ms

//Для 10000 ключів:

//Prototype object: 0.003173828125 ms
//No prototype object: 0.002197265625 ms
///Map: 0.003173828125 ms

//Для 1000000 ключів:

//Prototype object: 0.0048828125 ms
//No prototype object: 0.0029296875 ms
//Map: 0.002197265625 ms

//Функція для дослідження
function checkInsert(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  console.time("Prototype object");
  testObjWithPrototype["age"] = 19;
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  testObjWithoutPrototype["age"] = 19;
  console.timeEnd("No prototype object");
  console.time("Map");
  testMap.set("age", 19);
  console.timeEnd("Map");
}

//2) Взяття значення за ключем

//Для 100 ключів:

//Prototype object: 0.00390625 ms
//No prototype object: 0.0009765625 ms
///Map: 0.001953125 ms

//Для 10000 ключів:

//Prototype object: 0.001953125 ms
//No prototype object: 0.0009765625 ms
///Map: 0.001953125 ms

//Для 1000000 ключів:

//Prototype object: 0.004150390625 ms
//No prototype object: 0.001953125 ms
//Map: 0.003173828125 ms

//Функція для дослідження

function checkFind(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  let result;
  console.time("Prototype object");
  result = testObjWithPrototype["age"];
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  result = testObjWithoutPrototype["age"];
  console.timeEnd("No prototype object");
  console.time("Map");
  result = testMap.get("age");
  console.timeEnd("Map");
}

//3) Видалення ключа

//Для 100 ключів:

//Prototype object: 0.0029296875 ms
//No prototype object: 0.0009765625 ms
///Map: 0.001220703125 ms

//Для 10000 ключів:

//Prototype object: 0.005859375 ms
//No prototype object: 0.0029296875 ms
///Map: 0.002197265625 ms

//Для 1000000 ключів:

//Prototype object: 0.004150390625 ms
//No prototype object: 0.001953125 ms
//Map: 0.0009765625 ms

//Функція для дослідження

function checkDelete(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  testObjWithPrototype["age"] = 19;
  testObjWithoutPrototype["age"] = 19;
  testMap.set("age", 19);
  console.time("Prototype object");
  delete testObjWithPrototype["age"];
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  delete testObjWithoutPrototype["age"];
  console.timeEnd("No prototype object");
  console.time("Map");
  testMap.delete("age");
  console.timeEnd("Map");
}

//4) Перетворення у масив

//Для 100 ключів:

//Prototype object: 0.061767578125 ms
//No prototype object: 0.074951171875 ms
///Map: 0.01904296875 ms

//Для 10000 ключів:

//Prototype object: 3.171142578125 ms
//No prototype object: 5.5009765625 ms
///Map: 0.345947265625 ms

//Для 1000000 ключів:

//Prototype object: 917.13818359375 ms
//No prototype object: 1010.322998046875 ms
//Map: 484.637939453125 ms

//Функція для дослідження

function checkArr(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  let result;
  console.time("Prototype object");
  result = Object.entries(testObjWithPrototype);
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  result = Object.entries(testObjWithoutPrototype);
  console.timeEnd("No prototype object");
  console.time("Map");
  result = Array.from(testMap);
  console.timeEnd("Map");
}

//5) Чиста форма ітерації

//Для 100 ключів:

//Prototype object: 0.01220703125 ms
//No prototype object: 0.097900390625 ms
//Map: 0.008056640625 ms

//Для 10000 ключів:

//Prototype object: 1.2119140625 ms
//No prototype object: 1.08984375 ms
//Map: 0.26708984375 ms

//Для 1000000 ключів:

//Prototype object: 283.4130859375 ms
//No prototype object: 277.06005859375 ms
//Map: 31.080078125 ms

//Функція для дослідження

function checkClearIteration(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  let result;
  console.time("Prototype object");
  for(let key in testObjWithPrototype) {
    result = key;
  }
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  for(let key in testObjWithoutPrototype) {
    result = key;
  }
  console.timeEnd("No prototype object");
  console.time("Map");
  for(let key of testMap.keys()) {
    result = key;
  }
  console.timeEnd("Map");
  console.log(result);
}

//6) Чиста форма ітерації

//Для 100 ключів:

//Prototype object: 0.126953125 ms
//No prototype object: 0.077880859375 ms
//Map: 0.119873046875 ms

//Для 10000 ключів:

//Prototype object: 11.221923828125 ms
//No prototype object: 12.363037109375 ms
//Map: 7.548828125 ms

//Для 1000000 ключів:

//Prototype object: 1670.63818359375 ms
//No prototype object: 1654.928955078125 ms
//Map: 335.81298828125 ms

//Функція для дослідження

function checkConvertationIteration(n) {
  testObjWithPrototype = fillObjectRandomValues(testObjWithPrototype, n);
  testObjWithoutPrototype = fillObjectRandomValues(testObjWithoutPrototype, n);
  testMap = fillMapRandomValues(testMap, n);
  let result;
  console.time("Prototype object");
  Object.entries(testObjWithPrototype).forEach(([key, value]) => result = value);
  console.timeEnd("Prototype object");
  console.time("No prototype object");
  Object.entries(testObjWithoutPrototype).forEach(([key, value]) => result = value);  
  console.timeEnd("No prototype object");
  console.time("Map");
  Array.from(testMap).forEach(([key, value]) => result = value)
  console.timeEnd("Map");
}



//2. Написати функцію, яка приймає об’єкт у якості аргументу та повертає Map  з тими самими даними. Тобто просто перетворити об’єкт у Map.

function convertObjectToMap(obj) {
  return new Map(Object.entries(obj))
}



//3. Написати функцію, яка приймає Map у якості аргументу та повертає об’єкт з тими самими даними. Тобто просто перетворити Map у  об’єкт.

function convertMapToObject(map) {
  return Object.fromEntries(map.entries());
}
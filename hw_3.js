//1. Створити пустий об’єкт

const objWithPrototype2 = Object.create(Object.prototype);
const objWithPrototype1 = {};

//2. Створити пустий об’єкт без прототипу

const objWithoutPrototype = Object.create(null);

//3. Додати до об’єкта будь які нові поля всіма відомими способами

//1-й спосіб
objWithPrototype1.name = "Yevhen";
//2-й спосіб
objWithPrototype1["surname"] = "Nesterenko";
//3-й спосіб (не впевнений, що так правильно робити, але ключ таким способ з'являється)
Object.defineProperty(objWithPrototype1, "age", {
  configurable: false, //Не можна видалити дану властивість, конфігурувати
  enumerable: true, //Це налаштування робить age ітеруємим, в Object.keys буде відображатися
  writable: true //Дозволяємо змінювати дану властивість
});
objWithPrototype1.age = 19;

//4-й спосіб
Object.assign(objWithPrototype1, {city:'Lviv'});

//4. Створити пустий масив

const emptyArray1 = [];
const emptyArray2 = new Array();

//5. Створити пустий масив довжиною 100500 елементів

const emptyArrayWithLength = new Array(100500);

//6. Створити масив з декількома елементами

const arrayWithElements = [1, false, 'hello'];

//7. Зробити заповнений масив пустим

//Можна циклом пройтись по елементам і робити метод pop() - видалення з кінця або shift() - видалення спочатку
arrayWithElements.splice(0, arrayWithElements.length);

//8. Дано масив, [1,2,3,4,5], потрібно створити функцію, яка видалить певний елемент з масиву за його індексом та поверне новий масив(оновлений- після видалення)

function deleteElementByIndex(arr, index) {
  arr.splice(index, 1);
  return arr;
}

//9. Створити функцію, яка приймає один масив у якості аргументу та повертає булеве значення в залежності чи в неї передали пустий масив чи ні

//true, якщо пустий; false, якщо не пустий
function isEmptyArray(arr) {
  return arr.length > 0 ? false : true;
}

//10. Створити функцію, яка приймає один об’єкт у якості аргументу та повертає булеве значення в залежності чи в неї передали пустий об’єкт чи ні

//true, якщо пустий; false, якщо не пустий
function isEmptyObject(obj) {
  return Object.keys(obj).length > 0 ? false : true;
}

//11. Створити функцію, яка обєднає два масиви в один та поверне його в якості результату

function concatArray(arr1, arr2) {
  return arr1.concat(arr2);
}

//12. Створити функцію, яка приймає один масив чисел у якості аргументу та повертає новий масив, який складається з елементів попереднього в степені 3.

function powToThreeArray(arr) {
  return arr.map(e => Math.pow(e, 3));
}

//13. Створити функцію, яка приймає один масив чисел у якості аргументу та повертає новий масив, який складається з непарних елементів вхідного масиву

function filterOdd(arr) {
  return arr.filter(e => e % 2 != 0);
}

//14. Створити функцію, яка приймає один масив чисел у якості аргументу та повертає новий масив, який складається тільки з цілих елементів вхідного масиву

function filterInt(arr) {
  return arr.filter(e => Number.isInteger(e));
}

//15. Створити функцію, яка нічого не повертає

function noReturnFunction() {}

Завдання виконано.

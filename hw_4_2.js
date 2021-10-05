//1. Скрипт який виводить в консоль дату і час коли DOM побудований, але css, зображення ще не завантажились.
function checkTimeDOMContentLoaded() {
  return document.addEventListener("DOMContentLoaded", () => {
    let checkTime = new Date();
    console.log(
      `Дата: ${checkTime.getDate()}.${checkTime.getMonth()}.${checkTime.getFullYear()} і час: ${checkTime.getHours()}:${checkTime.getMinutes()}:${checkTime.getSeconds()}:${checkTime.getMilliseconds()} , коли DOM побудований, але css, зображення ще не завантажились`
    );
  });
}

//2. Скрипт який виводить в консоль дату і час коли DOM побудований і css, зображення вже завантажились.
function checkTimeOnload() {
  window.onload = function () {
    let checkTime = new Date();
    console.log(
      `Дата: ${checkTime.getDate()}.${checkTime.getMonth()}.${checkTime.getFullYear()} і час: ${checkTime.getHours()}:${checkTime.getMinutes()}:${checkTime.getSeconds()}:${checkTime.getMilliseconds()} , коли DOM побудований і css, зображення вже завантажились`
    );
  };
}

//3. Скрипт який виводить в консоль дату і час коли юзер натиснув на закрити вкладку або перезавантажити сторінку
function checkTimeBeforeUnload() {
  window.onbeforeunload = function () {
    let checkTime = new Date();
    console.log(
      `Дата: ${checkTime.getDate()}.${checkTime.getMonth()}.${checkTime.getFullYear()} і час: ${checkTime.getHours()}:${checkTime.getMinutes()}:${checkTime.getSeconds()}:${checkTime.getMilliseconds()} , коли юзер натиснув на закрити вкладку або перезавантажити сторінку`
    );
    //Для затримки консолі
    return false;
  };
}

//4. Скрипт який виводить повертає назву браузера та назву операційної системи через дефіс "-" як одну строку
function checkBrowserAndOS() {
  let user = navigator.userAgent;
  let browsers = {
    Firefox: "Mozilla Firefox",
    Edg: "Microsoft Edge",
    Opera: "Opera",
    Chrome: "Google Chrome",
    Safari: "Safari",
  };
  let myBrowser = "unknown";
  for (let b of Object.keys(browsers)) {
    if (user.indexOf(b) != -1) {
      myBrowser = browsers[b];
      break;
    }
  }
  let myOS = "unknown";
  let os = ["Windows", "Linux", "Android", "iOS"];
  for (let o of os) {
    if (user.indexOf(o) != -1) {
      myOS = o;
      break;
    }
  }
  return `${myBrowser}-${myOS}`;
}

//5. Скрипт який змушує браузер показувати сповіщення, коли ви намагаєтесь перезавантажити сторінку, видалити вкладку, чи вимкнути браузер
function stopUnload() {
  window.onbeforeunload = function () {
    return false;
  };
}

//6. Скрипт який виводить в консоль скільки секунд юзер перебував на сторінці, після того як юзер натиснув на закрити вкладку або перезавантажити сторінку.
let timeArr = [];
function checkUserStoppingTime() {
  window.onbeforeunload = function () {
    let checkTime = new Date();
    timeArr.push(checkTime);
    if (timeArr.length > 1) {
      console.log(
        `Час перебування на сторінці, після того як юзер натиснув на закрити вкладку або перезавантажити сторінку : ${
          (timeArr[1] - timeArr[0]) / 1000
        } c`
      );
      timeArr.shift();
    }
    //Для затримки консолі
    return false;
  };
}

Завдання виконано, але треба було створити скрипт якицй можна вкласти у HTML і шоб він виконався.

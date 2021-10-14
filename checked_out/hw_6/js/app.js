//Elements UI
const nickname = document.getElementById("nickname");
const nameMain = document.getElementById("name");
const comment = document.getElementById("comment");
const submitBtn = document.getElementById("add_comment");
const commentsSection = document.querySelector(".comments-section");
const formElements = document.querySelectorAll(".form-element");

//Events
nickname.addEventListener("input", onCheckNickname);
nameMain.addEventListener("input", onCheckName);
comment.addEventListener("input", onCheckComment);
submitBtn.addEventListener("click", onClickSubmit);

function onCheckNickname(e) {
  this.value = this.value.replace(/[^a-z0-9]/gi, "");
  const regexp = /^(?=(?:\d*[a-z]){1})\w{3,24}$/i;
  const str = e.target.value;
  const result = regexp.test(str);
  if (result) {
    e.target.classList.remove("form-input_invalid");
    e.target.classList.add("form-input_valid");
  } else {
    e.target.classList.remove("form-input_valid");
    e.target.classList.add("form-input_invalid");
  }
  checkDisabled();
}

function onCheckName(e) {
  this.value = this.value.replace(/[^a-z]/gi, "");
  const regexp = /^[a-z]{1,100}$/i;
  const str = e.target.value;
  const result = regexp.test(str);
  if (result) {
    e.target.classList.remove("form-input_invalid");
    e.target.classList.add("form-input_valid");
  } else {
    e.target.classList.remove("form-input_valid");
    e.target.classList.add("form-input_invalid");
  }
  checkDisabled();
}

function onCheckComment(e) {
  this.value = this.value.replace(/[^a-z\.,!?-\s]/gi, "");
  const regexp = /^[a-z\.,!?-\s]{1,1000}$/i;
  const str = e.target.value;
  const result = regexp.test(str);
  if (result) {
    e.target.classList.remove("form-input_invalid");
    e.target.classList.add("form-input_valid");
  } else {
    e.target.classList.remove("form-input_valid");
    e.target.classList.add("form-input_invalid");
  }
  checkDisabled();
}

function checkDisabled() {
  if (
    nickname.classList.contains("form-input_valid") &&
    nameMain.classList.contains("form-input_valid") &&
    comment.classList.contains("form-input_valid")
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "");
  }
}

function onClickSubmit(e) {
  e.preventDefault();
  let checkTime = new Date();
  const div = document.createElement("div");
  const divHelp = document.createElement("div");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  let arrElements = [];
  [...formElements].forEach((e) => {
    arrElements.push(e.value);
  });
  let [currentNickname, currentName, currentComment] = arrElements;
  h2.textContent = `${currentNickname} - ${currentName}`;
  p.textContent = currentComment;
  h3.textContent = `${String(checkTime.getHours()).padStart(2, "0")}:${String(
    checkTime.getMinutes()
  ).padStart(2, "0")}:${String(checkTime.getSeconds()).padStart(2, "0")}`;
  divHelp.appendChild(h2);
  divHelp.appendChild(h3);
  divHelp.classList.add("d-flex", "justify-content-between");
  div.classList.add("comment-section");
  p.classList.add("paragraph-margin");
  div.appendChild(divHelp);
  div.appendChild(p);
  commentsSection.prepend(div);
}

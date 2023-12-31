const body = document.querySelector("main");
const list = document.querySelector(".list");
const bigList = document.querySelector(".big-list");

function mainRun() {
  body.classList.add("normal");
}
function listRun() {
  list.classList.add("normal");
}
function bigListRun() {
  bigList.classList.add("normal");
}
setTimeout(mainRun, 800);

let scrollPos = 0;
function checkPosition() {
  let windowY = window.scrollY;
  if (windowY > scrollPos) {
    setTimeout(listRun, 200);
    setTimeout(bigListRun, 200);
  }
  scrollPos = windowY;
}

window.addEventListener("scroll", checkPosition);

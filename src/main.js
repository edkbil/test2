import "./styles/all.scss";

const body = document.querySelector("main");
const list = document.querySelector(".list");

function mainRun() {
  body.classList.add("normal");
}
function listRun() {
  list.classList.add("normal");
}
setTimeout(mainRun, 800);

let scrollPos = 0;
function checkPosition() {
  let windowY = window.scrollY;
  if (windowY > scrollPos) {
    setTimeout(listRun, 200);
  }
  scrollPos = windowY;
}

window.addEventListener("scroll", checkPosition);

console.log("こんちか～✨️✨️");

// 記録ごとにユニークなID（=作られた瞬間の時刻のミリ秒）を返す関数
// TODO IDだけどcreatedAtにも使うからちょい検討する
function generateEntryId() {
  return Date.now();
}

/** ーーーーHTML要素への参照ーーーー */
let inputFormElement;
let dateElement;
let typeElement;
let requiredTimeElement;
let memoElement;

function getElementFunc() {
  inputFormElement = document.getElementById("input-form");
  dateElement = document.getElementById("date");
  typeElement = document.getElementById("type");
  requiredTimeElement = document.getElementById("requiredTime");
  memoElement = document.getElementById("memo");
}

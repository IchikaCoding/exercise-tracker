// localStorageに保存するときのキー（合言葉）:'ichikaWorkoutLogEntries'
const WORKOUT_STORAGE_KEY = "ichikaWorkoutLogEntries";

/** ーーーーHTML要素への参照ーーーー */
let inputFormElement;
let dateInputElement;
let typeInputElement;
let requiredTimeInputElement;
let memoInputElement;

function assignElementReferences() {
  inputFormElement = document.getElementById("input-form");
  dateInputElement = document.getElementById("date");
  typeInputElement = document.getElementById("type");
  requiredTimeInputElement = document.getElementById("requiredTime");
  memoInputElement = document.getElementById("memo");
}

// // オブジェクトのプロパティ変更
// const user = { name: "Taro", age: 20 };
// // 配列の要素操作
// const items = ["A", "B", "C"];
// // 配列をプロパティに持つオブジェクト
// const todo = { title: "Work", tasks: ["mail", "docs"] };

// TODO UUIDでもやってみよう♪
// 記録ごとにユニークなID（=作られた瞬間の時刻のミリ秒）を返す関数
function generateEntryId() {
  return Date.now();
}

// フォームに入力された値を取得して、一つのオブジェクトにまとめて返す関数
// 1．記録のIDと作成時刻を取得
// 2．決めたデータ構造のオブジェクトに詰めていく
function getFormData() {
  const timestamp = generateEntryId();
  return {
    id: String(timestamp),
    date: dateInputElement.value,
    type: typeInputElement.value,
    minutes: parseInt(requiredTimeInputElement.value, 10) || 0,
    note: memoInputElement.value.trim(),
    createAt: timestamp,
  };
}

// localStorageから、保存されている記録の配列を読み込む関数load
//  返す値は保存されているデータがあるかどうかによって変わる
function loadEntriesFromStorage() {
  const rawData = localStorage.getItem(WORKOUT_STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : [];
}

// 記録の配列を、丸ごとlocalStorageに保存する関数save
// 保存するデータの引数は entries
function saveEntriesToStorage(entries) {
  return localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(entries));
}

/** ーーーーーイベントリスナー登録ーーーーーー */

// イベントリスナー（イベントを待ち受ける仕組み）を登録する関数
function attachEvent() {
  inputFormElement.addEventListener("submit", handleEventListener);
}

// フォームが送信（submit）されたときに呼ばれる関数
// 1. リロードを止める
// 2. フォームからデータを取得→ローカルストレージに最新データ全体を保存するまでやる
function handleEventListener(event) {
  event.preventDefault();

  const entry = getFormData();
  const entries = loadEntriesFromStorage();
  entries.push(entry);
  saveEntriesToStorage(entries);

  // 次の入力がしやすいように、フォームをリセット
  inputFormElement.reset();
  // ローカルストレージに保存されたデータ数をチェック
  console.log("entryの中身", entry);
  console.log("entriesの中身", entries);
}

function initializePage() {
  assignElementReferences();
  attachEvent();
}
document.addEventListener("DOMContentLoaded", initializePage);

function initializePage() {
  assignElementReferences();
  attachEvent();
}
document.addEventListener("DOMContentLoaded", initializePage);

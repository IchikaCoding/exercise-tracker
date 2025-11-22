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
  /** テーブルの要素を取得する */
  tabelBodyElement = document.getElementById("table-body");
  totalCountElement = document.getElementById("total-count");
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
  console.dir(entry);
  console.log("entriesの中身", JSON.stringify(entry));
  console.log("entriesの中身", entries);
  renderEntryTable();
}

/** 保存されているデータをテーブルに描画する関数 */
function renderEntryTable() {
  // まずは、localStorageから全データを読み込む
  const entries = loadEntriesFromStorage();
  // もし、記録が1件もなかったら、「データがありません」という特別な行を表示する
  // TODO ここのコード実行されるか確認
  if (entries.length === 0) {
    tableHTML = `<tr><td>「データがありません」</td></tr>`;
  }
  // 配列のデータを、forループで一件ずつ取り出して処理する
  // テーブルの要素はテーブルの行にデータを追加する順番
  // TODO <td class="text-end">は使うときに追加
  const tableHTML = entries
    .map(
      (entry) => `
    <tr>
        <td>${entry.date}</td>
        <td>${entry.type}</td>
        <td>${entry.minutes}</td>
        <td>${entry.note || ""}</td>
    </tr>
    `
    )
    .join("");
  console.table(entries);

  // 出来上がったHTMLの文字列を、テーブルの<tbody>に一気に流し込む！
  tabelBodyElement.innerHTML = tableHTML;
  // 合計件数（文字列）も、ちゃんと更新する
  totalCountElement.textContent = String(entries.length);
}

/** ページの準備をするための関数 */
function initializePage() {
  assignElementReferences();
  attachEvent();
  renderEntryTable();
}
document.addEventListener("DOMContentLoaded", initializePage);

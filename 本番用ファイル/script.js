// localStorageに保存するときのキー（合言葉）:'ichikaWorkoutLogEntries'
const WORKOUT_STORAGE_KEY = "ichikaWorkoutLogEntries";

/** ーーーーHTML要素への参照ーーーー */
let inputFormElement;
let dateInputElement;
let typeInputElement;
let requiredTimeInputElement;
let memoInputElement;
let tableBodyElement;
let totalCountElement;
let filterDateInputElement;
let clearFilterButtonElement;
let debugRemoveButtonElement;

function assignElementReferences() {
  inputFormElement = document.getElementById("input-form");
  dateInputElement = document.getElementById("date");
  typeInputElement = document.getElementById("type");
  requiredTimeInputElement = document.getElementById("requiredTime");
  memoInputElement = document.getElementById("memo");
  /** テーブルの要素を取得する */
  tableBodyElement = document.getElementById("table-body");
  totalCountElement = document.getElementById("total-count");
  /** フィルターの要素を取得する */
  filterDateInputElement = document.getElementById("filter-date");
  clearFilterButtonElement = document.getElementById("clear-filter");
  /** debug用の削除ボタンを取得する */
  debugRemoveButtonElement = document.getElementById("debug-remove-button");
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

// TODO XSS対策のために，メモを工夫する
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

/** localStorageから、保存されている記録の配列を読み込む関数load */
//  返す値は保存されているデータがあるかどうかによって変わる
//　tryの中でエラーが起きたら、キャッチの処理が動く！（失敗したときに動かすコードを書いておく）
function loadEntriesFromStorage() {
  try {
    const rawData = localStorage.getItem(WORKOUT_STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (e) {
    console.error("ストレージからのデータ読み込みに失敗しました:", e);
    return [];
  }
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
  filterDateInputElement.addEventListener("change", renderEntryTable);
  clearFilterButtonElement.addEventListener("click", handleFilterClear);
  debugRemoveButtonElement.addEventListener("click", handleDebugButton);
}

// フォームが送信（submit）されたときに呼ばれる関数
// 1. リロードを止める
// 2. フォームからデータを取得→ローカルストレージに最新データ全体を保存するまでやる
function handleEventListener(event) {
  event.preventDefault();

  const entry = getFormData();

  /** 運動の種類か日付が入力されていなかったらアラートする処理 */
  if (!entry.date || !entry.type || !entry.minutes) {
    alert("日付と種目、所要時間が入力されていません。必須項目です🐣");
    console.log("アラートが発生しました");
    return;
  }

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
  console.log("[renderEntryTable] called", new Date().toISOString());
  // まずは、localStorageから全データを読み込む
  const entries = loadEntriesFromStorage();

  /** フィルターでどの日が選ばれているかを取得 */
  const selectedEntryDate = filterDateInputElement.value;
  console.log("[filterDateInputElement.value]", filterDateInputElement.value);
  // フィルターした結果を表示するための新しい配列
  let filteredEntries = entries;
  // もし、日付が選択されていたら、絞り込み処理を実行！
  if (selectedEntryDate) {
    // 　　選択した日付とdataプロパティと一致するかチェック
    filteredEntries = entries.filter(
      (entry) => entry.date === selectedEntryDate
    );
  }
  console.log("[renderEntryTable] これから表示するデータ:", filteredEntries);

  // 絞り込んだ後の配列を、新しい順に並び替える
  filteredEntries.sort((a, b) => b.createAt - a.createAt);
  // 合計件数（文字列）も、ちゃんと更新する
  // textContentはDOMに文字列を入れるプロパティだから明示的に文字列化
  totalCountElement.textContent = String(filteredEntries.length);

  //  絞り込んだ後の配列を使って、テーブルのHTMLを組み立てる
  let tableHTML = filteredEntries
    .map(
      (entry) => `
    <tr>
        <td>${escapeHtml(entry.date)}</td>
        <td>${escapeHtml(entry.type)}</td>
        <td class="text-center">${escapeHtml(entry.minutes)}</td>
        <td>${escapeHtml(entry.note || "")}</td>
        <td>
          <button class="remove-button btn btn-sm btn-outline-danger" onclick="handleClickRemoveButton('${
            entry.id
          }')"><i class="bi bi-trash"></i><span class="d-none">削除</span></button>
        </td>
    </tr>
    `
    )
    .join("");

  // もし、記録が1件もなかったら、「データがありません」という特別な行を表示する
  // フィルターした結果でデータがなかったときの処理を書く
  if (filteredEntries.length === 0) {
    tableHTML = `<tr><td colspan="5">「データがありません」</td></tr>`;
  }
  // 配列のデータを、forループで一件ずつ取り出して処理する
  // テーブルの要素はテーブルの行にデータを追加する順番
  // TODO <td class="text-end">は使うときに追加
  // tableHTML = entries
  //   .map(
  //     (entry) => `
  //   <tr>
  //       <td>${entry.date}</td>
  //       <td>${entry.type}</td>
  //       <td>${entry.minutes}</td>
  //       <td>${entry.note || ""}</td>
  //       <td>
  //         <button class="remove-button" onclick="handleClickRemoveButton('${
  //           entry.id
  //         }')">削除</button>
  //       </td>
  //   </tr>
  //   `
  //   )
  //   .join("");

  // 出来上がったHTMLの文字列を、テーブルの<tbody>に一気に流し込む！
  tableBodyElement.innerHTML = tableHTML;
}

/** フィルター処理用の関数 */
function handleFilterClear() {
  // 日付入力欄を空っぽにする
  filterDateInputElement.value = "";
  console.log("[handleFilterClear] フィルターが解除されました！");
  renderEntryTable();
}

/** 削除ボタンのハンドル関数 */
function handleClickRemoveButton(entryID) {
  if (!entryID) {
    return;
  }
  removeEntryById(entryID);
}

/** localStorage のデータを全削除するデバッグボタンの処理。*/
// localStorage の「このアプリ関連」の「記録データ全て」を削除します。よろしいですか？
// データを削除しました。
// 確認する→削除→再描画→通知
// TODO 関数名を検討
function handleDebugButton() {
  const message =
    "localStorage の「このアプリ関連」の「記録データ全て」を削除します。よろしいですか？";
  const result = window.confirm(message);
  if (!result) {
    filterDateInputElement.value = "";
    return;
  }
  localStorage.removeItem(WORKOUT_STORAGE_KEY);
  filterDateInputElement.value = "";
  renderEntryTable();

  window.alert("データを削除しました。");
}

/** エントリを削除する関数 */
function removeEntryById(entryID) {
  // ローカルストレージからロードする
  const entries = loadEntriesFromStorage();
  // filterメソッドを使って、削除したいIDと「違う」IDを持つデータだけを残した、新しい配列を作る
  const filterEntries = entries.filter((entry) => entryID !== entry.id);
  // 新しく出来上がった配列を、localStorageに保存し直す
  saveEntriesToStorage(filterEntries);
  // 最後に、テーブルの表示を更新して、画面に削除を反映させる
  renderEntryTable();
}

/** 自動で日付入力してくれる処理 */
/** 2ケタ表示に整えるための処理(padToTwoDigits) */
function padToTwoDigits(value) {
  return String(value).padStart(2, "0");
}

/** 今日の日付を YYYYMMDD の文字列で取得します。 */
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = padToTwoDigits(today.getMonth() + 1);
  const date = padToTwoDigits(today.getDate());
  console.log({ today });
  console.log({ year });
  console.log({ month });
  console.log({ date });
  return `${year}${month}${date}`;
}

/** YYYYMMDD 形式の文字列を、input[type="date"] 用の YYYY-MM-DD に変換 */
function formatDateForInput(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const date = value.slice(6, 8);
  return `${year}-${month}-${date}`;
}

/** ページの準備をするための関数 */
function initializePage() {
  assignElementReferences();
  dateInputElement.value = formatDateForInput(getTodayString());
  attachEvent();
  renderEntryTable();
}

/** innerHTML に入れる前に危険な文字をエスケープ */
// 空文字を返す理由は、returnだけだとundefinedを返して画面にundefinedが表示されちゃうから！
function escapeHtml(value) {
  if (value === undefined || value === null) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "$#39;");
}

document.addEventListener("DOMContentLoaded", initializePage);

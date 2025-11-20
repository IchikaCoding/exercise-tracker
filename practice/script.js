document.addEventListener("DOMContentLoaded", setupMemoForm);

/**
 * JSが読み込まれたら実行されるイベントハンドラ
 */
function setupMemoForm() {
  const form = document.getElementById("memo-form");
  form.addEventListener("submit", handleMemoSubmit);
}

/** ボタンで送信されたら実行されるイベントハンドラ */
function handleMemoSubmit(event) {
  event.preventDefault();

  const memoInput = document.getElementById("memo");
  const memoList = document.getElementById("memo-list");

  /** スペースを除いた入力値 */
  const text = memoInput.value.trim();
  console.log({ text });
  /** 入力が空だったら処理中断 */
  if (text === "") {
    return;
  }
  const item = document.createElement("li");
  console.log({ item });
  item.textContent = text;
  memoList.appendChild(item);

  memoInput.value = "";
  memoInput.focus();
}

// ーーーーーーテーブルで表示するバージョンーーーーーー
document.addEventListener("DOMContentLoaded", setupTableMemo);
const tableEntries = [];

/**
 * テーブル版のフォームを準備する関数
 */
function setupTableMemo() {
  // DOM要素を参照するための処理
  const tableForm = document.getElementById("table-memo-form");
  tableForm.addEventListener("submit", handleTableMemoSubmit);
  renderTableMemo();
}

/**
 * フォームが送信されたときのハンドラ関数
 * @param {Event} event
 * @returns
 */
function handleTableMemoSubmit(event) {
  // ページのリロードを防ぐ
  event.preventDefault();
  // インプット内容を取ってくる
  const tableMemoInput = document.getElementById("table-memo");
  // 無駄なスペースをカット
  const text = tableMemoInput.value.trim();
  // 入力が空文字じゃないかどうかを確認する
  if (text === "") {
    return;
  }
  tableEntries.push(text);
  WORKOUT_STORAGE_KEY;
  // TODO 配列が更新されたので、テーブルを再描画する
  renderTableMemo();
  // 入力ボックスを空にして、フォーカスを当てる
  tableMemoInput.value = "";
  tableMemoInput.focus();
}

/**
 * テーブルの表示を更新する関数
 */
function renderTableMemo() {
  // テーブルの中身のDOMを参照
  const tableMemoBody = document.getElementById("table-memo-body");
  // tableEntries配列の中身を一つずつ取り出して、HTMLの文字列を作る
  let tableHTML = "";
  //   表の行を定義して，データセルを定義するようなHTML要素を作る
  for (let entry of tableEntries) {
    // TODO for文で文字列を追加するときはjoinとかを使う方が良い
    tableHTML = tableHTML + `<tr><td>${entry}</td></tr>`;
  }

  // 出来上がったHTMLの文字列を、<tbody>の中に一気に追加
  tableMemoBody.innerHTML = tableHTML;
}

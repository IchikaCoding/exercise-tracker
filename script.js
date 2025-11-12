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

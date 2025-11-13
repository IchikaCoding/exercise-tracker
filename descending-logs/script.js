// DOMが使える状態になったら、フォーム初期化を実行
document.addEventListener("DOMContentLoaded", setupTableMemoForm);
// 全ての記録を保持する配列（最新順に並び替えて表示する）
const tableEntries = [];

// テーブル版フォームの初期化。
function setupTableMemoForm() {
  // フォームのDOM要素を参照
  const tableForm = document.getElementById("table-memo-form");
  // ボタンをしたら入力値のバリデーションと登録を行うイベント発火
  tableForm.addEventListener("submit", handleTableMemoSubmit);
  renderTableMemo();
}

// フォーム送信時に呼ばれ、入力値のバリデーションと登録を行う
function handleTableMemoSubmit(event) {
  event.preventDefault();
  //   メモのinput要素を操作できるようにする
  const tableMemoInput = document.getElementById("table-memo");
  // 入力内容のスペースを切り取って変数に入れる
  const text = tableMemoInput.value.trim();
  //   console.log(text);
  //   入力がなかったらリターン
  if (text === "") {
    return;
  }
  //   記録管理の配列に追加（メモ内容と作成時刻をオブジェクトとして追加）
  tableEntries.push({
    id: Date.now(),
    text: text,
    createAt: Date.now(), // これは一意なIDとして有効
  });
  //   　　表示内容の更新
  renderTableMemo();
  //　入力欄を空に戻す
  tableMemoInput.value = "";
  //   入力欄をフォーカスさせる
  tableMemoInput.focus();
}
// renderTableMemo関数を作る
function renderTableMemo() {
  //　　追加された記録を操作できるようにする
  const tableMemoBody = document.getElementById("table-memo-body");
  //　　最新順でソートしたコピーを使えるように変数を準備する
  const sortedEntries = tableEntries.toSorted(
    (a, b) => b.createAt - a.createAt
  );
  let tableHTML = "";
  // 　　最新順にした記録の要素一つ一つに対して読める日付文字列（new Date(オブジェクトのプロパティ指定したもの).toLocaleString()）に変換
  for (let entry of sortedEntries) {
    const displayMemo = new Date(entry.createAt).toLocaleString();
    // 入力内容と時刻をテーブルのデータに追加
    tableHTML =
      tableHTML +
      `<tr>
         <td>${entry.text}</td>
         <td>${displayMemo}</td>
         <td>
         <button type="button" class="delete-button" onclick="removeButtonClick(${entry.id})">削除</button>
         </td>
        </tr>`;
    // ボタンタイプ，クラス名はデリートボタン，removeButtonClickの引数にIDを指定する，ボタンの名前は削除
  }
  //   テーブルの中身にHTML要素を追加
  tableMemoBody.innerHTML = tableHTML;
}
// 削除ボタンが押されたときに呼ばれる関数
// targetIDを引数に持っている関数

// 配列の中

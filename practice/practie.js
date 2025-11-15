// キーを変数で管理する
// 筋トレの内容を追加
// 1. オブジェクトをJSON文字列に変換して保存
// 2. 取り出して、オブジェクトに戻す
// コンソールで種目を表示する

// const WORKOUT_STORAGE_KEY = "ichikaWorkoutLogEntries";
// const workout = { type: "縄跳び", time: 30 };

// const jsonString = JSON.stringify(workout);
// localStorage.setItem(WORKOUT_STORAGE_KEY, jsonString);

// const savedJson = localStorage.getItem(WORKOUT_STORAGE_KEY);

const WORKOUT_STORAGE_KEY = "ichikaWorkoutLogEntries";

// localStorageからデータを取り出してみる
// データがあった場合console.log('わーい！保存されてたデータが見つかったよ！');
// →JSON文字列をオブジェクトに戻して、見やすく表示
// データがなかった場合console.log('保管ボックスは空っぽでした。');s
document.addEventListener("DOMContentLoaded", () => {
  const savedJson = localStorage.getItem(WORKOUT_STORAGE_KEY);

  if (savedJson) {
    console.log("わーい！保存されてたデータが見つかったよ！");
    console.log(JSON.parse(savedJson));
    console.log("JSON文字列：", savedJson);
  } else {
    console.log("保管ボックスは空っぽでした。");
  }
});

// オブジェクトをJSON文字列に変換して保存！
// console.log('サンプルデータを保存しました！ページをリフレッシュして確認してみてね。');
function saveSampleData() {
  const sampleData = [
    { id: 1, type: "なわとび", time: 30 },
    { id: 2, type: "筋トレ", time: 45 },
  ];
  localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(sampleData));
  console.log(
    "サンプルデータを保存しました！ページをリフレッシュして確認してみてね。"
  );
}

// --- データをリセットするための関数（お掃除用）---
// ローカルストレージを削除
// console.log('データをリセットしました。ページをリフレッシュしてください。');

function clearSavedData() {
  localStorage.removeItem(WORKOUT_STORAGE_KEY);
  console.log("データをリセットしました。ページをリフレッシュしてください。");
}

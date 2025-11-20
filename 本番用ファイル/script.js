console.log("こんちか～✨️✨️");

// 記録ごとにユニークなID（=作られた瞬間の時刻のミリ秒）を返す関数
// TODO IDだけどcreatedAtにも使うからちょい検討する
function generateEntryId() {
  return Date.now();
}

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

// localStorageに保存するときのキー（合言葉）:'ichikaWorkoutLogEntries'
const WORKOUT_STORAGE_KEY = "ichikaWorkoutLogEntries";
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

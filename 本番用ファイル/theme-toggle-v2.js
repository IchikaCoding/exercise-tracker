const themeToggle = document.getElementById("theme-toggle");
const TOGGLE_THEME_STORAGE_KEY = "toggleThemeEntry";

/**
 * @param {string} nextTheme
 * 選択されたテーマをローカルストレージにセットする処理
 */
function setThemeToStorage(nextTheme) {
  localStorage.setItem(TOGGLE_THEME_STORAGE_KEY, nextTheme);
}

/**
 * ローカルストレージに保存された値を取得する処理
 * TODO セットした値も文字列型だからパースなしでOK
 * TODO ページ読み込みごとに実行する
 * TODO getではapplyするのは良くない→ゲットはそれだけ，適用は別の関数でやる
 * @returns {("light"|"dark")|null}
 */
function getThemeSetting() {
  const currentTheme = localStorage.getItem(TOGGLE_THEME_STORAGE_KEY);
  if (currentTheme) {
    applyTheme(currentTheme);
    return currentTheme;
  } else {
    console.log("データがありません。");
    return null;
  }
}

document.addEventListener("DOMContentLoaded", getThemeSetting);

/**
 * テーマを適用するための処理
 * @param {string} nextTheme
 */
function applyTheme(nextTheme) {
  // 画面を書きかえ
  document.documentElement.setAttribute("data-bs-theme", nextTheme);
  //  ローカルストレージに保存する
  setThemeToStorage(nextTheme);
  applyToggleTheme(nextTheme);
}
/**
 *
 * @param {string} nextTheme
 */
function applyToggleTheme(nextTheme) {
  //   トグルのテーマを同期させる
  //   TODO DOMに適応ができていない
  themeToggle.checked = nextTheme === "dark" ? true : false;
}

/**
 * ボタンが押されたかどうかを確認できる処理
 * 引数はel.checked→trueだったらtrueだよ，
 * もしフォルスならapplyTheme("light"), trueならapplyTheme("dark")
 */
function handleToggle() {
  applyTheme(themeToggle.checked ? "dark" : "light");
}

themeToggle.addEventListener("change", handleToggle);

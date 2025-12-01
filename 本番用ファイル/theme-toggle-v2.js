const themeToggle = document.getElementById("theme-toggle");
const TOGGLE_THEME_STORAGE_KEY = "toggleThemeEntry";
/**
 * ボタンが押されたかどうかを確認できる処理
 * 引数はel.checked→trueだったらtrueだよ，
 * もしフォルスならapplyTheme("light"), trueならapplyTheme("dark")
 */
function handleToggle() {
  applyTheme(themeToggle.checked ? "dark" : "light");
}
/**
 * テーマを適用するための処理
 * @param {string} nextTheme
 */
const applyTheme = (nextTheme) => {
  document.documentElement.setAttribute("data-bs-theme", nextTheme);
};

themeToggle.addEventListener("change", handleToggle);

/**
 * @param {string} theme
 * 選択されたテーマをローカルストレージにセットする処理
 */
function setToggleTheme(nextTheme) {
  localStorage.setItem(TOGGLE_THEME_STORAGE_KEY, nextTheme);
}
/**
 * TODO セットした値も文字列型だからパースなしでOK
 * TODO ページ読み込みごとに実行する
 * @returns {string}
 */
function getThemeSetting() {
  const currentTheme = localStorage.getItem(TOGGLE_THEME_STORAGE_KEY);
  if (currentTheme) {
    console.log(currentTheme);
    return currentTheme;
  } else {
    console.log("データがありません。");
    return;
  }
}

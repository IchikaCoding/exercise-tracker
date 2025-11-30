{
  /**
   * 初期モードをダークに設定する
   */

  /**
   * HTMLで選択されたモードを取得する処理
   */
  function getToggleElement() {
    const el = document.getElementById("theme-toggle");
    console.log(el.checked);
    return el;
  }
  /**
   * ボタンが押されたかどうかを確認できる処理
   * 引数はel.checked→trueだったらtrueだよ，
   * もしフォルスならapplyTheme("light"), trueならapplyTheme("dark")
   */
  function handleToggle() {
    const el = getToggleElement();
    let isDarkMode = el.checked;
    isDarkMode === true ? applyTheme("dark") : applyTheme("light");
  }
  /**
   * テーマを適用するための処理
   * @param {string} theme
   */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }

  /**
   * モードがダークならライトにする
   * 戻り値は反映されたHTML要素
   */
  function handleLightTheme() {
    let theme = document.documentElement.getAttribute("data-bs-theme");
    if (theme === "dark") {
      theme = "light";
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
    console.log("theme:", theme);
  }

  function handleDarkTheme() {
    let theme = document.documentElement.getAttribute("data-bs-theme");
    if (theme === "light") {
      theme = "dark";
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
    console.log("theme:", theme);
  }

  const currentThemeElement = getToggleElement();
  currentThemeElement.addEventListener("change", handleToggle);

  /**
   * 選択されたモードを記録する
   * TODO ローカルストレージ保存機能を実装
   */
  function saveSelectTheme() {}
}

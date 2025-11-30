{
  const currentThemeElement = document.getElementById("theme-toggle");

  /**
   * ボタンが押されたかどうかを確認できる処理
   * 引数はel.checked→trueだったらtrueだよ，
   * もしフォルスならapplyTheme("light"), trueならapplyTheme("dark")
   */
  function handleToggle() {
    applyTheme(currentThemeElement.checked ? "dark" : "light");
  }
  /**
   * テーマを適用するための処理
   * @param {string} nextTheme
   */
  const applyTheme = (nextTheme) => {
    document.documentElement.setAttribute("data-bs-theme", nextTheme);
  };

  currentThemeElement.addEventListener("change", handleToggle);

  /**
   * 選択されたモードを記録する
   * TODO ローカルストレージ保存機能を実装
   */
  function saveSelectTheme() {}
}

{
  /**
   * 初期モードをダークに設定する
   */

  /**
   * HTMLで選択されたモードを取得する処理
   */
  function getThemeMode() {
    const el = document.getElementById("theme-toggle");
    console.log(el.checked);
    return el;
  }
  /**
   * ボタンが押されたかどうかを確認できる処理
   * 引数はel.checked→trueだったらtrueだよ，
   *
   */
  function handleToggle() {
    const el = getThemeMode();
    let isDarkMode = el.checked;
    if (!isDarkMode) {
      handleLightTheme();
      console.log("ライトモードに変更中！");
    } else {
      handleDarkTheme();
      console.log("ダークモード");
    }
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

  const currentThemeElement = getThemeMode();
  currentThemeElement.addEventListener("change", handleToggle);

  /**
   * 選択されたモードを記録する
   */
  function saveSelectTheme() {}
}

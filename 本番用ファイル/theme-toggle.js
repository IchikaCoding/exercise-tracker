// テーマ保存用にキーを作る
// ライトかダークのテーマオブジェクトを用意する
{
  const THEME_STORAGE_KEY = "ichikaThemeSetting";
  const themeMode = {
    dark: dark,
    light: light,
  };

  /**
   * localStorage に保存されているテーマを返します。
   * @returns {dark | light}
   * 今選択されたモードと保存されたモードが異なっていたら更新
   */
  function getThemeMode() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const currentThemeElement = document.getElementById("theme-toggle");
    return (savedTheme =
      currentThemeElement.value === themeMode.dark
        ? themeMode.dark
        : themeMode.light);
  }

  /** HTML の data-bs-theme 属性を更新します。 */
  // setAttributeメソッドを使用すると属性を更新できる
  function updateHtmlAttribute() {}
}

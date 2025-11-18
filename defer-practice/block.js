console.log("DOMの現在の要素数", document.body.children);

const start = performance.now();
while (performance.now() - start < 1500) {
  // 重い処理を模擬
}

console.log("重い処理終了");

document.addEventListener("DOMContentLoaded", () => {
  // ここで表示されるのは4つと表示される
  // Live serverがScriptを追加していて，HTMLの要素数+1になってるよ
  console.log("DOMContentLoaded ->", document.body.children);
});

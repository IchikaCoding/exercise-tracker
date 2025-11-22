# 運動記録 1 件分のデータの形

```ts
type WorkoutEntry = {
  id: string; // createdAtを文字列に変換したもの（String(createdAt)）を使う
  date: string; // YYYY-MM-DD形式は文字列形式
  type: string;
  minutes: number;
  note: string;
  createdAt: number;
};
```

# 2025-11-15

## 今日のゴール

- HTML で土台を最低限で作成する
- デザインは後回しにする
- JS で初期化，入力検証
  - id っていう名前を HTML で適宜確認する

## フォームのフィールド構造

- [ ] 日付：date
  - いつ運動したか記録するため
- [ ] 運動種目：text
  - 何の運動したかを記録するため
  - 言い訳もここで選択できる
- 所要時間：number + 分単位
  - 何分運動したか記録するため
  - 分単位の実装は後回しで OK
- メモ：text
  - 任意な項目
  - 運動の詳細を記録するため

## memo

- [ ] `querySelector` なら`("form#input-form-section")`とか`("form#input-form >iv:nth-of-type(1)")`でも指定できる
- [ ] Ctrl + d で要素とかを複数カーソル当てられるよ
- [ ] excalidraw はオープンソースで TS・JS でできるらしい
- [ ] `Shift + Alt + ↓`で今いる行の複製ができる ✨️

## TODO

- [x] 全部の入力項目に id を追加
- [x] 必須項目のラベルには、class="required"→ デザインの統一感に関わるらしい
- [ ] required をつけるかつけないかによる動きの違いをチェックする
- [ ] name 属性の有無によってコードが変わるかをチェックする
  - [ ] 全部の入力欄に name 属性をつけると、後でフォームのデータをまとめて JavaScript で取得できるらしい
- [x] ラベルをクリックして入力欄にフォーカスが当たるようにする
  - `<label>`の for 属性と`<input>`の id 属性の名前を同じにしたらできるよ
- [ ] `<table>`の中で，`<thead>`とか`<tbody>`と分ける意義が未だにわからず…
  - ブラウザに列見出しだと伝えられる
  - tbody だけにスクロールを付ける
  - 見出しと本文を構造的に分けられる
    - スクリーンリーダーやテーブルを解析するツールが理解しやすくなる

## 2025-11-16 のやること

- [ ] 2025-11-15 の TODO を片付ける
- [ ] 最低限の CSS で、見た目をちょっとだけ整えよう
  - [ ] ID やら動きの違いやらを確認しながら進める ✨️
  - [ ] プッシュしてね ♪

# 2025-11-17

## わからないことリスト

- [x] CSS セレクタのスペース有り無しの挙動がわからない
  - スペースあり → 子孫セレクタ
    - 例: .main p は、クラスが main である要素の中にある、すべての p 要素にスタイルを適用
  - スペースなし →AND 条件になる
    - 例: p.important は、p 要素であり、かつ class が important である要素にスタイルを適用
- [ ] （原因不明）date 型のときは input 要素でも`class="required"`つけたらアスタリスク表示できた。でも，type がテキスト型，number 型のときは表示されなった
- [x] `::afer`って何？→[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Selectors/::after)
- [x] テーブルのスタイルについて →[MDN](https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Styling_basics/Tables)
- [x] `<head>`の意味は？
  - メタ情報を入れる場所
  - `<body>`はページ本体を入れる場所
- [x] HTML 要素を参照するとき，const でやる方法は？
  - const は「宣言と同時に値を決めておく」
  - 宣言時に初期値を与えていないとエラーになる
  - DomContentLoaded を使用する場合
    - JS のあとに HTML を再度読み直すから，const で宣言することは難しそう
  - 関数の外側で let のまま宣言 → 関数内で代入して使う方針にする
  <!-- TODO ここチェック！！ミスあり -->
- [x] HTML 要素を参照するとき，const でやる方法は？
  - const は「宣言と同時に値を決めておく」
  - 宣言時に初期値を与えていないとエラーになる
  - DomContentLoaded を使用する場合
    - JS のあとに HTML を再度読み直すから，const で宣言することは難しそう
  - 関数の外側で let のまま宣言 → 関数内で代入して使う方針にする

## データ構造

```json
{
  "id": "1763389283580", //IDは数値のまま受け取って使うときに文字列に変換すると良き！
  "date": "2023-04-01",
  "type": "なわとび",
  "minutes": 30,
  "note": "30分って強くない？？",
  "createdAt": 1763389283580
}
```

# 2025-11-18

## TODO

- [ ] const と let の違いの曖昧さをなくす
  - 「JS の const と let の違いを完全に理解するための最小サンプルをリストして」
  - 中身を変えられるとは？
  - まず const で宣言し、再代入が必要になったときだけ let に切り替える
- [ ] defer をつけて JS を読み込んだときの挙動について調べる
- [ ] DOMContentLoaded について調べる
- [ ] エントリーポイントも調べる

## 今のところわかっていること

defer で DOMContentLoaded イベントを発行する前に実行される

defer つけると，HTML で土台ができたあとに実行される

- HTML とスクリプト読む順番，DOMContentLoaded のイベントが発火するタイミングとどんな処理がされるか

HTML を上から読み込み > script タグの位置で JS を実行 > 下まで読み込んだら DOMContetLoaded 発火が defer なしで、HTML を上から読み込み > 下まで読み込んで defer が付いた JS 実行 > DOMContetLoaded 発火が defer あり

## defer つけたバージョン

- HTML の読み込みが全部終わってからスクリプトを読み込む
- DOMContentLoaded イベントが発火する前に実行してねというフラグ
  HTML（全部読んで DOM 構築終了）→script 実行 → DOMContentLoaded イベントが発火
  - DOMContentLoaded の前に Script が実行されるらしいのですが，script でやっていることは何？
  - DOMContentLoaded のコードを読む
- HTML 読み込みと DOM 組み立てがスムーズに進む

## defer つけてないバージョン

- HTML 読み込む
- DOM 構築途中でも script タグの位置で JS を実行（DOM を作る途中で JS に邪魔）
- DOMContentLoaded イベントは DOM が完成したあとに発火する

# 2025-11-20

- [ ] JS の処理を追加する
  - [ ] ローカルストレージの実装

## わからないこと

- `minutes: parseInt(minutesInputElement.value, 10) || 0,`について
  - minutesInputElement.value が文字列だったりして parseInt がエラー（NaN など）を返した場合 → 左が falsy
  - エラーになったら 0 を返す仕組みにするために論理和を使用した → フォールバック

## TODO

- [x] ローカルストレージとイベントリスナーの登録

# 2025-11-21

## TODO

- [ ] `<input type="submit" />`と`<button type="submit">追加</button>`の違いを調べる
- [x] 手動テスト
- [ ] 保存データの画面表示処理を実装
- [ ] UUID で ID をセットしてみる #TODO
- [ ] onSubmit を実行してみる
- [ ]

## わからないこと

- [ ] localStorage の中身が空なら空配列を返すとどういうときに便利なの？

- これは一体なにかを調べる

  - `const form = document.getElementById("input-form"); getEventListeners(form).submit`

- デバッグツールで確認した結果
  - JS での実行
  - HTML のほうの onsubmit が実行された
- `const form = document.getElementById("input-form"); getEventListeners(form).submit`を実行したら`[0]`に onsubmit がいた。`[1]`には`handleEventListener(event)`がいた
- 実行順がわからない

# 運動記録 1 件分のデータの形

```ts
type WorkoutEntry = {
  id: string; // createdAtを文字列に変換したもの（String(createdAt)）を使う
  date: string; // YYYY-MM-DD形式は文字列形式
  type: string;
  minutes: number;
  note: string;
  createAt: number;
};
```

# 2025-11-15

## 今日のゴール

- HTML で土台を最低限で作成する
- デザインは後回しにする
- JS で初期化，入力検証
  - id っていう名前を HTML で適宜確認する

## フォームのフィールド構造

- 日付：date
  - いつ運動したか記録するため
- 運動種目：text
  - 何の運動したかを記録するため
  - 言い訳もここで選択できる
- 所要時間：number + 分単位
  - 何分運動したか記録するため
  - 分単位の実装は後回しで OK
- メモ：text
  - 任意な項目
  - 運動の詳細を記録するため

## memo

- `querySelector` なら`("form#input-form-section")`とか`("form#input-form > div:nth-of-type(1)")`でも指定できる
- Ctrl + d で要素とかを複数カーソル当てられるよ
- excalidraw はオープンソースで TS・JS でできるらしい

## TODO

- [x] 全部の入力項目に id を追加
- [x] 必須項目のラベルには、class="required"→ デザインの統一感に関わるらしい
- [ ] required をつけるかつけないかによる動きの違いをチェックする
- [ ] name 属性の有無によってコードが変わるかをチェックする
  - [ ] 全部の入力欄に name 属性をつけると、後でフォームのデータをまとめて JavaScript で取得できるらしい
- [x] ラベルをクリックして入力欄にフォーカスが当たるようにする
  - `<label>`の for 属性と`<input>`の id 属性の名前を同じにしたらできるよ
- [ ] `<table>`の中で，`<thead>`とか`<tbody>`と分ける意義が未だにわからず…

## 2025-11-16 のやること

- [ ] 2025-11-15 の TODO を片付ける
- [ ] 最低限の CSS で、見た目をちょっとだけ整えよう
  - [ ] ID やら動きの違いやらを確認しながら進める ✨️

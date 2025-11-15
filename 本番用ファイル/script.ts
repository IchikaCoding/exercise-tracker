// 運動記録1件分のデータの形
type WorkoutEntry = {
  id: string; // createdAtを文字列に変換したもの（String(createdAt)）を使う
  date: string; // YYYY-MM-DD形式は文字列形式
  type: string;
  minutes: number;
  note: string;
  createAt: number;
};

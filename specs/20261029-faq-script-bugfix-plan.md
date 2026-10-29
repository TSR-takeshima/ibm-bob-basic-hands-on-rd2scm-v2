# 実装計画書: script.js バグ修正（nullチェック・タブDOM再生成・検索中タブ表示）

## 基本情報

* 仕様書: 20261029-faq-script-bugfix-spec.md
* 作成日時: 2026-10-29T15:04:36+09:00
* 更新日時: 2026-10-29T15:04:36+09:00
* 作成者: Bob
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
|---|---|---|
| `script.js` | 修正 | ① toggleBtn null チェック追加、② updateActiveTab 関数追加・renderTabs 呼び出し置換、③ 検索中タブ非アクティブ化 |

## 実装手順

### 1. `updateActiveTab()` 関数の追加

`renderTabs()` 関数の直後に、既存タブの classList を更新するだけの関数を追加する。

```js
function updateActiveTab() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === activeCategory);
  });
}
```

### 2. ① `toggleBtn` の null チェック追加（146〜164行目）

`toggleBtn` の参照をすべて `if (toggleBtn) { ... }` で囲む。

**変更前:**
```js
const savedTheme = localStorage.getItem("theme");
const toggleBtn = document.getElementById("theme-toggle");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  ...
});
```

**変更後:**
```js
const savedTheme = localStorage.getItem("theme");
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => {
    ...
  });
} else if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}
```

※ `toggleBtn` がない場合も `savedTheme` によるダークテーマ復元は実行する。

### 3. ② タブクリック時の `renderTabs()` を `updateActiveTab()` に置換（174行目）

**変更前:**
```js
activeCategory = btn.dataset.category;
renderTabs();
document.getElementById("search").value = "";
renderFaqList(getItemsByCategory(activeCategory));
```

**変更後:**
```js
activeCategory = btn.dataset.category;
updateActiveTab();
document.getElementById("search").value = "";
renderFaqList(getItemsByCategory(activeCategory));
```

### 4. ③ 検索中のタブ非アクティブ化 + ② 検索クリア時の `renderTabs()` を `updateActiveTab()` に置換（191〜202行目）

**変更前:**
```js
if (keyword === "") {
  renderTabs();
  renderFaqList(getItemsByCategory(activeCategory));
  return;
}
const lower = keyword.toLowerCase();
const filtered = faqData.filter(...);
renderFaqList(filtered);
```

**変更後:**
```js
if (keyword === "") {
  updateActiveTab();
  renderFaqList(getItemsByCategory(activeCategory));
  return;
}
document.querySelectorAll(".tab").forEach((btn) => {
  btn.classList.remove("active");
});
const lower = keyword.toLowerCase();
const filtered = faqData.filter(...);
renderFaqList(filtered);
```

## GUI実装

* 対象コンポーネント: タブバー（`#tabs`）内の `.tab` ボタン
* スタイル: 既存の `.tab.active` を使用。新規CSS不要
* 状態管理: `activeCategory` グローバル変数は維持。`updateActiveTab()` で classList を同期
* 画面遷移: 対象外
* レスポンシブ対応: 変更なし

## テストの追加・更新

テストファイルなし（手動確認のみ）

## 検証計画

1. `index.html` をブラウザで開き、FAQが正常に表示されることを確認
2. タブをキーボード（Tab キー + Enter）で操作し、フォーカスが維持されることを確認
3. 検索ボックスにキーワードを入力し、タブがすべて非アクティブになることを確認
4. 検索ボックスをクリアし、タブのアクティブ表示が元に戻ることを確認
5. `index.html` の `#theme-toggle` ボタンを一時的に削除してページを開き、コンソールにエラーが出ないことを確認

## 移行・ロールバック

- 変更は `script.js` のみ。git でロールバック可能

## 未解決事項

なし

# 仕様書: script.js バグ修正（nullチェック・タブDOM再生成・検索中タブ表示）

## 基本情報

* 種別: 不具合修正
* 作成日時: 2026-10-29T15:04:01+09:00
* 更新日時: 2026-10-29T15:04:01+09:00
* 作成者: Bob
* ステータス: Approved

## 背景・目的

コードレビューにより `script.js` に以下3点の問題が確認された。修正して品質を向上させる。

## 現在の挙動

1. **① nullチェックなし**: `document.getElementById("theme-toggle")` の結果を null チェックせずに使用しており、`#theme-toggle` 要素が存在しない場合に `TypeError` が発生し、FAQページ全体の初期化が停止する。
2. **② タブDOM全再生成**: タブクリック時と検索クリア時に `renderTabs()` を呼び出してタブボタンを全削除・再生成する。これによりキーボード操作中のフォーカスが失われる。
3. **③ 検索中もタブがアクティブ表示**: キーワード検索中はすべてのカテゴリを横断して絞り込んでいるが、タブのアクティブ表示が変わらない。ユーザーに「タブでの絞り込みが無効になっている」ことが伝わらない。

## 期待する挙動

1. **① nullチェック追加**: `toggleBtn` が null の場合は null チェックで処理をスキップし、FAQの初期化は正常に続行される。
2. **② classList直接更新**: `renderTabs()` でのDOM再生成をやめ、既存タブボタンの `.active` クラスを直接付け外しすることでフォーカスを維持する。
3. **③ 検索中はタブを非アクティブ**: キーワード入力中はすべてのタブから `.active` クラスを外し、タブ絞り込みが無効な状態を視覚的に示す。検索クリア時は `activeCategory` のタブを再度アクティブにする。

## 対象範囲・対象外

### 対象範囲

- `script.js` — `DOMContentLoaded` 内のダークテーマ初期化・タブ切り替え・検索ロジック

### 対象外

- `index.html`
- `style.css`
- FAQデータ（`faqData`、`CATEGORIES`）
- アコーディオンロジック

## 利用者・影響システム

- FAQサイトを参照するユーザー

## 主な仕様

### ① toggleBtn の null チェック

```js
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  if (savedTheme === "dark") {
    toggleBtn.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => { ... });
}
```

- `#theme-toggle` が存在しない場合も `renderTabs()` 以降の処理は正常に実行される

### ② renderTabs() をやめ classList を直接更新する

- `renderTabs()` の呼び出しをタブクリックハンドラと検索クリア時から削除する
- 代わりに以下の関数を追加する:

```js
function updateActiveTab() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === activeCategory);
  });
}
```

- タブクリック時: `activeCategory` 更新後に `updateActiveTab()` を呼ぶ
- 検索クリア時: `updateActiveTab()` を呼ぶ

### ③ 検索中はタブを非アクティブ表示

- キーワード入力中（`keyword !== ""`）は以下を実行する:

```js
document.querySelectorAll(".tab").forEach((btn) => {
  btn.classList.remove("active");
});
```

- 検索クリア時（`keyword === ""`）は `updateActiveTab()` でアクティブを復元する

## 制約・非機能要件

- 新規CSSは追加しない
- `renderTabs()` 関数自体は初回レンダリング用として残す（`DOMContentLoaded` の最初の呼び出しで使用）

## UI・画面仕様

### 対象画面

FAQサイト（`index.html`）のタブバー

### 画面構成・表示項目

変更なし

### 操作・画面遷移

| 操作 | 変更前 | 変更後 |
|---|---|---|
| タブをクリック | タブDOMを全再生成（フォーカス消失） | classList を直接更新（フォーカス維持） |
| 検索キーワード入力 | タブのアクティブ表示が維持される | すべてのタブから `.active` を外す |
| 検索クリア | `renderTabs()` でDOMを全再生成 | `updateActiveTab()` で classList を更新 |

### 表示状態

| 状態 | タブ表示 |
|---|---|
| タブ選択中（検索なし） | 選択中タブが `.active` |
| キーワード検索中 | すべてのタブが非アクティブ |
| 検索クリア後 | 直前に選択していたタブが `.active` に戻る |

### 入力・バリデーション

なし

### デザイン要件

- 新規CSSなし。既存の `.tab.active` スタイルをそのまま使用

### 参考資料

なし

## 完了条件

- `#theme-toggle` が存在しない場合でもエラーが出ず、FAQが正常に初期化される
- タブをクリックしてもキーボードフォーカスが失われない
- キーワード検索中はどのタブも `.active` 表示にならない
- 検索クリア後、直前に選択していたタブが `.active` に戻る

## 確認方法

1. `index.html` をブラウザで開き、FAQが正常に表示されることを確認
2. タブをキーボード（Tab キー + Enter）で操作し、フォーカスが維持されることを確認
3. 検索ボックスにキーワードを入力し、タブがすべて非アクティブになることを確認
4. 検索ボックスをクリアし、タブのアクティブ表示が元に戻ることを確認
5. `index.html` の `#theme-toggle` ボタンを一時的に削除してページを開き、コンソールにエラーが出ないことを確認

## リスク・懸念点

- `renderTabs()` は初回レンダリング（`DOMContentLoaded` の最初の呼び出し）では引き続き使用するため、削除しない

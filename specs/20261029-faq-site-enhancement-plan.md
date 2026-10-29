# 実装計画書: FAQサイト追加機能（ロゴ・リンク・テーマカラー・ダークテーマ）

## 基本情報

* 仕様書: 20261029-faq-site-enhancement-spec.md
* 作成日時: 2026-10-29T14:50:48+09:00
* 更新日時: 2026-10-29T14:50:48+09:00
* 作成者: Bob
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
|---|---|---|
| `index.html` | 修正 | ヘッダーにロゴ画像（リンク付き）とダークテーマ切り替えボタンを追加 |
| `style.css` | 修正 | アクセントカラーをIBM Blueに変更、ダークテーマCSS変数・ヘッダーレイアウトを追加 |
| `script.js` | 修正 | ダークテーマ切り替えロジック（`localStorage` 永続化）を追加 |

## 実装手順

### サブタスク 1: `style.css` の修正

**Intent:** テーマカラーをIBM Blueに変更し、ダークテーマ用のCSS変数・ヘッダーレイアウトを追加する。

**Expected Outcomes:**
- `--color-accent` が `#0f62fe` に変更されている
- `[data-theme="dark"]` セレクタにダークテーマ変数が定義されている
- ヘッダーがFlexboxで左（ロゴ+タイトル）と右（切り替えボタン）に分かれたレイアウトになっている
- 切り替えボタン（`#theme-toggle`）のスタイルが定義されている

**Todo List:**
1. `--color-accent` を `#4b5563` から `#0f62fe` に変更する
2. `[data-theme="dark"]` セレクタを追加し、ダークテーマ変数を定義する
   - `--color-bg: #161616`
   - `--color-surface: #262626`
   - `--color-border: #393939`
   - `--color-text: #f4f4f4`
   - `--color-muted: #a8a8a8`
   - `--color-accent: #4589ff`
3. `header` をFlexbox（`justify-content: space-between; align-items: center`）に変更する
4. ヘッダー左側のロゴ+タイトル用ラッパー（`.header-left`）のスタイルを追加する
   - `display: flex; align-items: center; gap: 12px`
5. ロゴ画像（`.header-logo`）のスタイルを追加する
   - `height: 48px; width: auto; display: block`
6. 切り替えボタン（`#theme-toggle`）のスタイルを追加する
   - 背景透過・ボーダーなし・カーソルポインタ・ホバー時に薄い背景色

**Relevant Context:**
- [`specs/20261029-faq-site-enhancement-spec.md`](20261029-faq-site-enhancement-spec.md) — デザイン要件・カラー定義
- [`style.css`](../style.css) — `:root` の変数定義は L4〜L11、`header` スタイルは L35〜L46

**Status:** [ ] pending

---

### サブタスク 2: `index.html` の修正

**Intent:** ヘッダーにロゴ画像（リンク付き）とダークテーマ切り替えボタンを追加する。

**Expected Outcomes:**
- `bob.svg` がヘッダー左上にリンク付きで表示される構造になっている
- ダークテーマ切り替えボタン（`id="theme-toggle"`）がヘッダー右上に配置されている
- `style.css` の `.header-left` ラッパー構造と一致している

**Todo List:**
1. `<header>` 内を以下の構造に変更する:
   ```html
   <header>
     <div class="header-left">
       <a href="https://www.ibm.com/products/bob" target="_blank" rel="noopener noreferrer">
         <img src="bob.svg" alt="IBM Bob" class="header-logo">
       </a>
       <h1>よくある質問</h1>
     </div>
     <button id="theme-toggle" aria-label="テーマ切り替え">🌙</button>
   </header>
   ```

**Relevant Context:**
- [`specs/20261029-faq-site-enhancement-spec.md`](20261029-faq-site-enhancement-spec.md) — ヘッダー構成
- [`index.html`](../index.html) — 現在の `<header>` は L10〜L12

**Status:** [ ] pending

---

### サブタスク 3: `script.js` の修正

**Intent:** ダークテーマ切り替えロジックを `DOMContentLoaded` 内に追加する。

**Expected Outcomes:**
- `#theme-toggle` クリックで `<html>` の `data-theme` 属性がトグルされる
- テーマ状態が `localStorage` の `theme` キーに保存される
- ページ読み込み時に `localStorage` の値を読み取り、ダークテーマが復元される
- ボタンの絵文字が現在のテーマに応じて 🌙 / ☀️ に切り替わる

**Todo List:**
1. `DOMContentLoaded` の先頭で `localStorage` からテーマを復元する処理を追加する:
   - `localStorage.getItem('theme') === 'dark'` の場合、`<html>` に `data-theme="dark"` を設定し、ボタンを ☀️ にする
2. `#theme-toggle` の `click` イベントリスナーを追加する:
   - 現在 `data-theme === 'dark'` なら `data-theme` 属性を削除してライトに戻し、`localStorage` を `'light'` に設定、ボタンを 🌙 にする
   - そうでなければ `data-theme="dark"` を設定し、`localStorage` を `'dark'` に設定、ボタンを ☀️ にする

**Relevant Context:**
- [`specs/20261029-faq-site-enhancement-spec.md`](20261029-faq-site-enhancement-spec.md) — ダークテーマ仕様
- [`script.js`](../script.js) — `DOMContentLoaded` リスナーは L143〜L182

**Status:** [ ] pending

---

## GUI実装

* **対象コンポーネント:** ヘッダー（ロゴ・タイトル・切り替えボタン）
* **スタイル:** `style.css`（CSS変数オーバーライド、Flexboxヘッダーレイアウト）
* **状態管理:** `localStorage` の `theme` キー + `<html>` の `data-theme` 属性
* **画面遷移:** テーマ切り替えはリロードなし（CSSカスケードで即時反映）
* **レスポンシブ対応:** ヘッダーのFlexboxレイアウトはモバイルでも維持（既存メディアクエリに追従）

## テストの追加・更新

自動テストは対象外（スタティックHTMLのため）。

以下を手動確認する。

1. ロゴが左上に高さ48pxで表示される
2. ロゴをクリックして `https://www.ibm.com/products/bob` が新しいタブで開く
3. タブアクティブ状態・検索フォーカスがIBMブルー（`#0f62fe`）になっている
4. 🌙 ボタンクリックでダークテーマに切り替わる
5. ☀️ ボタンクリックでライトテーマに戻る
6. ダークテーマでページを再読み込みして状態が維持される
7. モバイル表示（375px幅）でヘッダーレイアウトが崩れない

## 検証計画

| 確認項目 | 確認方法 |
|---|---|
| ロゴ表示 | ブラウザで `index.html` を開いて左上にロゴが表示されることを確認 |
| ロゴリンク | ロゴをクリックして正しいURLが新しいタブで開くことを確認 |
| IBMブルーアクセント | タブ選択・検索フォーカスの色を目視確認 |
| ダークテーマ切り替え | 🌙/☀️ ボタンをクリックしてテーマが切り替わることを確認 |
| localStorage 永続化 | ダークテーマでリロードして状態が維持されることを確認 |
| レスポンシブ | Chrome DevToolsでモバイル表示（375px幅）を確認 |

## 移行・ロールバック

- 変更は既存3ファイルの修正のみ（新規ファイルなし）
- ロールバックはgitで変更前のコミットに戻すことで完了

## 未解決事項

なし

# 仕様書: テストコード削除（Vitest → 手動確認へ移行）

## 基本情報

* 種別: 追加改修
* 作成日時: 2026-10-29T15:15:42+09:00
* 更新日時: 2026-10-29T15:15:42+09:00
* 作成者: Bob
* ステータス: Approved

## 背景・目的

Vitest による自動テストを廃止し、`node_modules` を使わないシンプルな構成に戻す。
テストの確認はブラウザで `index.html` を開く手動確認に切り替える。

## 現在の挙動

以下のファイルが存在し、`npm test` で Vitest を実行できる。

- `package.json`
- `package-lock.json`
- `vitest.config.js`
- `script.test.js`
- `node_modules/`

## 期待する挙動

上記ファイル・ディレクトリが削除され、`node_modules` を含まないシンプルな構成になる。
テスト確認はブラウザで `index.html` を開く手動確認で行う。

## 対象範囲・対象外

### 対象範囲（削除対象）

- `package.json`
- `package-lock.json`
- `vitest.config.js`
- `script.test.js`
- `node_modules/`

### 対象外

- `script.js`
- `index.html`
- `style.css`
- `specs/`（仕様書・計画書）

## 利用者・影響システム

- 開発者

## 主な仕様

削除のみ。コードの変更なし。

## 制約・非機能要件

- `script.js`・`index.html`・`style.css` は変更しない

## UI・画面仕様

対象外

## 完了条件

- `package.json`・`package-lock.json`・`vitest.config.js`・`script.test.js`・`node_modules/` が存在しない
- `script.js`・`index.html`・`style.css` に変更がない

## 確認方法

1. 上記ファイル・ディレクトリが削除されていることを確認
2. `index.html` をブラウザで開いて動作に問題がないことを確認

## リスク・懸念点

- 削除後は自動テストによる回帰検知ができなくなる

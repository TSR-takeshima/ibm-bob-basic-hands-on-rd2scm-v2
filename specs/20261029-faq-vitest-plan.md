# 実装計画書: script.js テストコード新規作成（Vitest + jsdom）

## 基本情報

* 仕様書: 20261029-faq-vitest-spec.md
* 作成日時: 2026-10-29T15:07:45+09:00
* 更新日時: 2026-10-29T15:07:45+09:00
* 作成者: Bob
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
|---|---|---|
| `package.json` | 新規 | vitest 依存・test スクリプト定義 |
| `vitest.config.js` | 新規 | jsdom 環境・グローバル有効化設定 |
| `script.test.js` | 新規 | 全16テストケース |

## 実装手順

### 1. `package.json` 作成

```json
{
  "type": "module",
  "scripts": {
    "test": "vitest run"
  },
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0"
  }
}
```

### 2. `vitest.config.js` 作成

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

### 3. `npm install` 実行

```sh
npm install
```

### 4. `script.test.js` 作成

テストの基本構造：

```js
import { beforeEach, describe, expect, it, vi } from "vitest";

// DOM の初期化ヘルパー
function setupDOM() {
  document.body.innerHTML = `
    <header>
      <div class="header-left"></div>
      <button id="theme-toggle">🌙</button>
    </header>
    <main>
      <input type="text" id="search">
      <div id="tabs"></div>
      <div id="faq-list"></div>
    </main>
  `;
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
}

// script.js のインポートと DOMContentLoaded の発火
// ※ Vitest の動的 import + 再発火でテストする
```

各テストケースは `beforeEach` で DOM をリセットし、`script.js` を動的インポートして `DOMContentLoaded` を発火する。

### 5. `npm test` で動作確認

## GUI実装

対象外

## テストの追加・更新

新規作成のみ。既存テストなし。

## 検証計画

1. `npm install` が正常に完了する
2. `npm test` で全16テストがパスする

## 移行・ロールバック

- 新規ファイルのみ追加。`script.js` の変更なし
- ロールバックは新規ファイルを削除するだけでよい

## 未解決事項

- Vitest + jsdom では `script.js` の ES Module 形式（`type: "module"`）の互換性を確認する必要がある。`script.js` は ESM でなく通常のスクリプトのため、インポート方法はテスト実行時に調整する

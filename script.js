const faqData = [
  // 全般
  {
    category: "全般",
    q: "Bobとは何ですか？",
    a: "Bobはコードの記述、既存コードのリファクタリング、さまざまなタスクを支援するAIコーディングコンパニオンです。カスタムモードや指示によって機能を拡張できます。"
  },
  {
    category: "全般",
    q: "Bobはどのように動作しますか？",
    a: "Bobは大規模言語モデル（LLM）を使用してリクエストを理解し、アクションに変換します。プロジェクト内のファイルの読み書き、ターミナルでのコマンド実行、インターネットの閲覧（有効時）、Model Context Protocol（MCP）を通じた外部ツールの利用が可能です。チャットインターフェースを通じてBobに指示を出し、提案されたアクションを確認・承認します。"
  },
  {
    category: "全般",
    q: "Bobは何ができますか？",
    a: "Bobは以下のようなさまざまなコーディングタスクを支援します：自然言語の説明からのコード生成、既存コードのリファクタリング、バグ修正、ドキュメントの作成、コードの説明、コードベースに関する質問への回答、反復作業の自動化、新しいファイルやプロジェクトの作成。"
  },
  {
    category: "全般",
    q: "Bobで処理してはいけないデータの種類はありますか？",
    a: "以下のデータ種別はBobで処理しないでください：SPI（機密個人情報）、個人医療情報（PHI）、輸出規制対象（ITAR、APPなど）、規制対象の金融データ（銀行口座番号、PAN、非公開の財務データ）。"
  },
  {
    category: "全般",
    q: "Bobを使用するリスクは何ですか？",
    a: "Bobは強力なツールであり、責任を持って使用することが重要です。Bobはミスを犯す可能性があります。承認前にBobが提案した変更を必ず慎重に確認してください。またBobはコマンドを実行できます。特に自動承認を使用している場合は、コマンドの実行を依頼する際に注意が必要です。"
  },
  // 使い方
  {
    category: "使い方",
    q: "新しいタスクを始めるにはどうすればよいですか？",
    a: "Bobパネルを開き、チャットボックスにタスクを入力してください。Bobに何をしてほしいかを明確かつ具体的に伝えてください。"
  },
  {
    category: "使い方",
    q: "モードを切り替えるにはどうすればよいですか？",
    a: "チャット入力エリアのドロップダウンメニューから別のモードを選択するか、`/` コマンドを使用して特定のモードに切り替えてください。"
  },
  {
    category: "使い方",
    q: "ツールとは何ですか？どのように使いますか？",
    a: "ツールはBobがシステムと連携するための仕組みです。BobはタスクをこなすためにBobが適切なツールを自動的に選択・使用します。ツールを直接呼び出す必要はありません。各ツールの使用時に承認または拒否するよう求められます。"
  },
  {
    category: "使い方",
    q: "コンテキストメンションとは何ですか？",
    a: "コンテキストメンションは、ファイル、フォルダー、問題などのプロジェクトに関する具体的な情報をBobに提供する方法です。`@` 記号の後にメンションしたいアイテムを記述します（例：`@/src/file.ts`、`@problems`）。"
  },
  {
    category: "使い方",
    q: "Bobはターミナルでコマンドを実行できますか？",
    a: "はい、Bobはコマンドを実行できます。コマンドの自動承認を有効にしていない限り、各コマンドの承認を求められます。コマンドの自動承認は十分に注意して使用してください。"
  },
  {
    category: "使い方",
    q: "Bobにフィードバックを提供するにはどうすればよいですか？",
    a: "Bobが提案したアクションを承認または拒否することでフィードバックを提供できます。フィードバックフィールドを使用して追加のフィードバックを提供することもできます。"
  },
  {
    category: "使い方",
    q: "Bobの動作をカスタマイズできますか？",
    a: "はい、いくつかの方法でBobをカスタマイズできます：カスタム指示（全モードまたは特定モードへの指示）、カスタムモード（カスタムプロンプトとツール権限を持つ独自モードの作成）、Bobルール（プロジェクトルート`.bob/rules/`フォルダーへのMarkdownルールファイルの作成）、設定（自動承認・差分編集などの各種設定）。"
  },
  {
    category: "使い方",
    q: "Bobには自動承認設定がありますか？",
    a: "はい、Bobには有効にするとアクションを自動的に承認するいくつかの設定があります。"
  },
  // 高度な機能
  {
    category: "高度な機能",
    q: "MCP（Model Context Protocol）とは何ですか？",
    a: "MCPはBobが外部サーバーと通信するためのプロトコルで、カスタムツールやリソースによってBobの機能を拡張します。"
  },
  {
    category: "高度な機能",
    q: "独自のMCPサーバーを作成できますか？",
    a: "はい、独自のMCPサーバーを作成してBobにカスタム機能を追加できます。"
  },
  // トラブルシューティング
  {
    category: "トラブルシューティング",
    q: "Bobが応答しません。どうすればよいですか？",
    a: "以下を確認してください：APIキーが正しく、有効期限が切れていないこと、インターネット接続を確認すること、VS Codeを再起動してみること。"
  },
  {
    category: "トラブルシューティング",
    q: "Bobが意図しない変更を加えました。元に戻すにはどうすればよいですか？",
    a: "BobはVS Code組み込みのファイル編集機能を使用しています。標準の「元に戻す」コマンド（Ctrl/Cmd + Z）で変更を取り消せます。チェックポイントを使用してファイルへの変更を元に戻すこともできます。"
  }
];

const CATEGORIES = ["全般", "使い方", "高度な機能", "トラブルシューティング"];

let activeCategory = CATEGORIES[0];

function renderTabs() {
  const tabsEl = document.getElementById("tabs");
  tabsEl.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.dataset.category = cat;
    tabsEl.appendChild(btn);
  });
}

function updateActiveTab() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === activeCategory);
  });
}

function renderFaqList(items) {
  const listEl = document.getElementById("faq-list");
  listEl.innerHTML = "";

  if (items.length === 0) {
    const msg = document.createElement("p");
    msg.className = "no-result";
    msg.textContent = "該当する項目がありません";
    listEl.appendChild(msg);
    return;
  }

  items.forEach((item) => {
    const el = document.createElement("div");
    el.className = "faq-item";

    const question = document.createElement("button");
    question.className = "faq-question";
    question.textContent = item.q;

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.textContent = item.a;

    el.appendChild(question);
    el.appendChild(answer);
    listEl.appendChild(el);
  });
}

function getItemsByCategory(category) {
  return faqData.filter((item) => item.category === category);
}

document.addEventListener("DOMContentLoaded", () => {
  // ダークテーマの復元
  const savedTheme = localStorage.getItem("theme");
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleBtn.textContent = "☀️";
    }

    // ダークテーマ切り替え
    toggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      }
    });
  } else if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  renderTabs();
  renderFaqList(getItemsByCategory(activeCategory));

  // タブ切り替え
  document.getElementById("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    updateActiveTab();
    document.getElementById("search").value = "";
    renderFaqList(getItemsByCategory(activeCategory));
  });

  // アコーディオン
  document.getElementById("faq-list").addEventListener("click", (e) => {
    const question = e.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item");
    if (!item) return;
    item.classList.toggle("open");
  });

  // キーワード検索
  document.getElementById("search").addEventListener("input", (e) => {
    const keyword = e.target.value.trim();
    if (keyword === "") {
      updateActiveTab();
      renderFaqList(getItemsByCategory(activeCategory));
      return;
    }
    document.querySelectorAll(".tab").forEach((btn) => {
      btn.classList.remove("active");
    });
    const lower = keyword.toLowerCase();
    const filtered = faqData.filter(
      (item) =>
        item.q.toLowerCase().includes(lower) ||
        item.a.toLowerCase().includes(lower)
    );
    renderFaqList(filtered);
  });
});

/* =====================================================
   全ページ共通の設定
   ・販売ページやお問い合わせフォームのURLは、このファイルだけ書き換えれば全ページに反映されます。
   ===================================================== */
(function () {
  "use strict";

  // ▼▼▼ 販売ページのURL（BOOTHなど）── 公開したらここに貼り付けてください ▼▼▼
  //   例：var BOOTH_URL_P1 = "https://xxxx.booth.pm/items/1234567";
  //   空 ("") のあいだは「BOOTHで近日販売予定です」と表示されます（リンクなし）。
  var BOOTH_URL_P1 = "";
  // ▲▲▲ ここまで ▲▲▲

  var SITE = {
    // お問い合わせフォーム（例：Googleフォーム）のURL
    contactUrl: ""
  };

  // available: false の商品は、案内枠そのものを表示しません（準備ができたら true に）
  var PRODUCTS = {
    p1: {
      available: true,
      name: "請求書・見積書テンプレート",
      format: "Googleスプレッドシート版",
      desc: "フリーランス・個人事業主向け。薄い黄色のセルに入力するだけで、消費税・源泉徴収・差引の請求金額を自動で計算します。",
      features: [
        "請求書と見積書の2種類に、迷わないための「使い方」タブ付き",
        "消費税あり／なし・敬称（御中／様）・源泉徴収の対象（税抜／税込）をプルダウンで切り替え",
        "源泉徴収は100万円を超える場合の税率にも対応（このサイトの逆算電卓と同じ計算）",
        "交通費などの立替金を報酬の明細と分けて記載。源泉徴収に含めるかも選べます",
        "10%対象の金額と消費税額を表示（インボイスの記載を意識した構成）",
        "コピーしてすぐ使える。スマホ・iPadのスプレッドシートアプリでも入力できます"
      ],
      note: "Googleアカウントが必要です。税務・記載内容の最終的な判断は、公式情報や専門家にご確認ください。",
      url: BOOTH_URL_P1
    },
    p2: {
      available: false,
      name: "請求・入金・年間収支 管理シート",
      desc: "請求 → 入金 → 月別・年間の集計までつながる管理シート。",
      url: ""
    },
    p3: {
      available: false,
      name: "フリーランス事務 スターターセット",
      desc: "請求書テンプレート・管理シート・印刷用チェックシートのセット。",
      url: ""
    }
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // <aside class="promo-box" data-product="p1" data-lead="…" data-max-features="3"></aside> を描画
  document.querySelectorAll(".promo-box[data-product]").forEach(function (box) {
    var p = PRODUCTS[box.getAttribute("data-product")];
    box.innerHTML = "";
    if (!p || !p.available) return; // 空のままなら CSS で非表示
    var head = el("div", "promo-head");
    head.appendChild(el("span", "promo-tag", "有料テンプレート"));
    if (p.format) head.appendChild(el("span", "promo-tag promo-format", p.format));
    box.appendChild(head);
    box.appendChild(el("b", "", p.name));
    box.appendChild(el("p", "", box.getAttribute("data-lead") || p.desc));
    if (p.features && p.features.length) {
      var max = parseInt(box.getAttribute("data-max-features"), 10) || p.features.length;
      var ul = el("ul", "promo-feats");
      p.features.slice(0, max).forEach(function (f) { ul.appendChild(el("li", "", f)); });
      box.appendChild(ul);
    }
    if (p.url) {
      var a = el("a", "promo-btn", "販売ページ（BOOTH）で詳しく見る");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      box.appendChild(a);
      box.appendChild(el("p", "promo-note", "外部の販売サイトに移動します。" + (p.note ? p.note : "")));
    } else {
      box.appendChild(el("p", "promo-soon", "BOOTHで近日販売予定です"));
      if (p.note) box.appendChild(el("p", "promo-note", p.note));
    }
  });

  // <span data-contact></span> にお問い合わせ導線を描画
  document.querySelectorAll("[data-contact]").forEach(function (slot) {
    slot.innerHTML = "";
    if (SITE.contactUrl) {
      var a = el("a", "", "お問い合わせフォームを開く");
      a.href = SITE.contactUrl;
      a.target = "_blank";
      a.rel = "noopener";
      slot.appendChild(a);
    } else {
      slot.appendChild(document.createTextNode("お問い合わせフォームは準備中です。公開までしばらくお待ちください。"));
    }
  });
})();

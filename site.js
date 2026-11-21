/* =====================================================
   全ページ共通の設定
   ・販売ページやお問い合わせフォームのURLは、このファイルだけ書き換えれば全ページに反映されます。
   ===================================================== */
(function () {
  "use strict";

  // ▼▼▼ 販売ページのURL（BOOTHなど）── 公開したらここに貼り付けてください ▼▼▼
  //   例：var BOOTH_URL_P1 = "https://xxxx.booth.pm/items/1234567";
  //   ・このURLを使うのは /templates（テンプレート紹介ページ）の購入ボタンだけです。
  //   ・ツール画面や記事の小さな案内は /templates に移動するので、URLが空でもリンク切れになりません。
  //   ・空 ("") のあいだは「BOOTHで近日販売予定」と表示され、入れると「販売中」に変わります。
  var BOOTH_URL_P1 = "https://keirilab.booth.pm/items/9192915";
  // ▲▲▲ ここまで ▲▲▲

  var SITE = {
    // お問い合わせフォーム（例：Googleフォーム）のURL
    contactUrl: ""
  };

  // available: false の商品は、案内を表示しません（準備ができたら true に）
  // page: ツール画面や記事の小さな案内から移動する先（テンプレート紹介ページ内の位置）
  var PRODUCTS = {
    p1: {
      available: true,
      name: "請求書・見積書テンプレート",
      format: "Googleスプレッドシート版",
      short: "入力するだけで、消費税・源泉徴収・差引の請求金額を自動で計算します。",
      page: "/templates#p1",
      url: BOOTH_URL_P1
    },
    p2: { available: false, name: "請求・入金・年間収支 管理シート", page: "/templates", url: "" },
    p3: { available: false, name: "フリーランス事務 スターターセット", page: "/templates", url: "" }
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // ---------- 小さな案内カード ----------
  // <aside class="promo-box compact" data-product="p1" data-lead="（ページに合わせた一文）"></aside>
  //   → カード全体が /templates へのリンクになります（販売ページへ直接は飛びません）
  document.querySelectorAll(".promo-box[data-product]").forEach(function (box) {
    var p = PRODUCTS[box.getAttribute("data-product")];
    box.innerHTML = "";
    if (!p || !p.available) return; // 空のままなら CSS で非表示
    box.classList.add("compact");
    var a = el("a", "rel-card promo-link");
    a.href = p.page;
    var head = el("span", "promo-head");
    head.appendChild(el("small", "promo-tag", "有料テンプレート"));
    if (p.format) head.appendChild(el("small", "promo-tag promo-format", p.format));
    a.appendChild(head);
    a.appendChild(el("b", "", p.name));
    a.appendChild(el("span", "rel-desc", box.getAttribute("data-lead") || p.short));
    var foot = el("span", "rel-foot");
    foot.appendChild(el("span", "status" + (p.url ? " on" : ""), p.url ? "BOOTHで販売中" : "近日販売予定"));
    foot.appendChild(el("span", "go", "詳しく見る →"));
    a.appendChild(foot);
    box.appendChild(a);
  });

  // ---------- 購入ボタン（/templates だけで使用） ----------
  // <div class="buy" data-buy="p1"></div>
  //   ・枠の中に「見出し → 緑のボタン → 注記」の順で、ひとかたまりで表示します
  document.querySelectorAll("[data-buy]").forEach(function (slot) {
    var p = PRODUCTS[slot.getAttribute("data-buy")];
    slot.innerHTML = "";
    if (!p) return;
    var box = el("div", "buy-box");
    if (p.url) {
      box.appendChild(el("p", "buy-lead", "ご購入はBOOTH（外部サイト）から"));
      var a = el("a", "buy-btn");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      var main = el("span", "buy-main", "BOOTHの販売ページを見る");
      main.appendChild(el("span", "buy-icon", "↗"));
      main.lastChild.setAttribute("aria-hidden", "true");
      a.appendChild(main);
      a.appendChild(el("span", "buy-sub", "購入はこちら（新しいタブで開きます）"));
      box.appendChild(a);
      box.appendChild(el("p", "buy-note", "価格・お支払い方法・返品などの扱いは、BOOTHの販売ページでご確認ください。"));
    } else {
      box.appendChild(el("p", "buy-soon", "BOOTHで近日販売予定です"));
      box.appendChild(el("p", "buy-note", "販売を開始したら、ここに購入ボタンを表示します。"));
    }
    slot.appendChild(box);
  });

  // ---------- お問い合わせ導線 ----------
  // <span data-contact></span>
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

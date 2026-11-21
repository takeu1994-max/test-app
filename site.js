/* =====================================================
   全ページ共通の設定
   ・販売ページやお問い合わせフォームのURLは、ここだけ書き換えれば全ページに反映されます。
   ・url が空 ("") のあいだは「準備中」と表示されます。
   ===================================================== */
(function () {
  "use strict";

  var SITE = {
    // お問い合わせフォーム（例：Googleフォーム）のURL
    contactUrl: ""
  };

  var PRODUCTS = {
    p1: {
      name: "請求書・見積書テンプレート",
      desc: "Googleスプレッドシート版。金額を入れるだけで消費税・源泉徴収・差引の請求額を自動計算します。",
      url: ""
    },
    p2: {
      name: "請求・入金・年間収支 管理シート",
      desc: "請求 → 入金 → 月別・年間の集計までつながる管理シート。iPhone・iPad・PCで同じデータを使えます（Googleアカウントが必要）。",
      url: ""
    },
    p3: {
      name: "フリーランス事務 スターターセット",
      desc: "請求書テンプレート・管理シート・印刷用チェックシート・使い方ガイドをまとめたセット。",
      url: ""
    }
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // <aside class="promo-box" data-product="p1" data-lead="…"></aside> を描画
  document.querySelectorAll(".promo-box[data-product]").forEach(function (box) {
    var p = PRODUCTS[box.getAttribute("data-product")];
    if (!p) return;
    box.innerHTML = "";
    box.appendChild(el("span", "promo-tag", "有料テンプレート"));
    box.appendChild(el("b", "", p.name));
    box.appendChild(el("p", "", box.getAttribute("data-lead") || p.desc));
    if (p.url) {
      var a = el("a", "promo-btn", "販売ページで詳しく見る");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      box.appendChild(a);
      box.appendChild(el("p", "promo-note", "外部の販売サイトに移動します。"));
    } else {
      box.appendChild(el("span", "promo-btn off", "準備中"));
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

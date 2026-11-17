/* 모든 페이지 공통: 테마 전환, 현재 장 표시, 코드 색칠, 진행 상황 저장소 */
(function () {
  var J = (window.JCG = window.JCG || {});
  var KEY = "jcg-progress-v2";

  J.store = {
    all: function () {
      try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
    },
    get: function (id) { return !!this.all()[id]; },
    set: function (id, v) {
      var s = this.all();
      if (v) s[id] = 1; else delete s[id];
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }
  };

  // 테마: 저장된 선택이 있으면 적용, 없으면 시스템 설정을 따른다
  var root = document.documentElement;
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function label(btn) { btn.textContent = current() === "dark" ? "밝게" : "어둡게"; }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (btn) {
      label(btn);
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("jcg-theme", next); } catch (e) {}
        label(btn);
      });
    }
    // 현재 페이지를 상단 메뉴에 표시하고 보이게 스크롤
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".chapnav a").forEach(function (a) {
      if (a.getAttribute("href").split("/").pop() === here) {
        a.setAttribute("aria-current", "page");
        var ul = a.closest("ul");
        if (ul) ul.scrollLeft = Math.max(0, a.offsetLeft - ul.clientWidth / 2 + a.offsetWidth / 2);
      }
    });
    if (J.highlightAll) J.highlightAll();
  });
})();

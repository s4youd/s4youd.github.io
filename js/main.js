/* copy writeup link buttons */
(function () {
  document.querySelectorAll("button.copy-link").forEach(function (btn) {
    var label = btn.querySelector(".label");
    btn.addEventListener("click", function () {
      var url = window.location.href;
      function done() {
        btn.setAttribute("data-state", "copied");
        if (label) label.textContent = "copied!";
        setTimeout(function () {
          btn.removeAttribute("data-state");
          if (label) label.textContent = "copy link";
        }, 1500);
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        if (ok) done();
        else if (label) label.textContent = "copy failed";
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done, fallback);
      } else {
        fallback();
      }
    });
  });
})();
(function () {
  document.querySelectorAll("pre code").forEach(function (code) {
    var pre = code.parentNode;
    if (pre.querySelector(".code-copy")) return;
    var btn = document.createElement("button");
    btn.className = "code-copy";
    btn.type = "button";
    btn.textContent = "copy";
    btn.addEventListener("click", function () {
      var text = code.textContent;
      function done() {
        btn.textContent = "copied";
        setTimeout(function () { btn.textContent = "copy"; }, 1400);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        if (ok) done();
        else btn.textContent = "copy failed";
      }
    });
    pre.appendChild(btn);
  });
})();
/* reading focus: top bar hides on scroll down, dims to 80% in middle, reappears at top/bottom */
(function () {
  var nav = document.querySelector(".site-nav");
  if (!nav) return;
  // only enable focus behavior on article/writeup/research pages; keep index/about always visible
  var isArticle = !!document.querySelector(".article");
  if (!isArticle) return;

  var lastY = window.scrollY || document.documentElement.scrollTop;
  var ticking = false;
  var hidden = false;
  var TOP_SHOW = 90;          // within top hero -> always show 100%
  var HIDE_AFTER = 160;       // past this, allow hiding on scroll down
  var BOTTOM_SHOW = 140;      // within bottom -> always show 100%
  var DELTA = 8;              // minimal scroll delta to trigger hide/show

  function update() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = window.innerHeight;
    var docH = document.documentElement.scrollHeight;
    var atTop = y <= TOP_SHOW;
    var atBottom = (y + h) >= (docH - BOTTOM_SHOW);
    var goingDown = y > lastY;
    var goingUp = y < lastY;
    var delta = Math.abs(y - lastY);

    if (atTop || atBottom) {
      // fully visible at edges
      nav.classList.remove("site-nav--hidden");
      nav.classList.remove("site-nav--dimmed");
      hidden = false;
    } else if (goingDown && delta > DELTA && y > HIDE_AFTER && !hidden) {
      // scrolling down through article -> hide entirely for focus
      nav.classList.add("site-nav--hidden");
      nav.classList.remove("site-nav--dimmed");
      hidden = true;
    } else if (goingUp && delta > DELTA && hidden) {
      // scrolling up -> show but dimmed to 80% so reading stays focused
      nav.classList.remove("site-nav--hidden");
      nav.classList.add("site-nav--dimmed");
      hidden = false;
    } else if (!hidden && y > HIDE_AFTER && !nav.classList.contains("site-nav--dimmed")) {
      // idle in middle while not hidden -> keep dimmed 80%
      nav.classList.add("site-nav--dimmed");
    }

    // if user stops and is in middle without direction, ensure dimmed (not hidden)
    if (!atTop && !atBottom && !hidden && y > HIDE_AFTER) {
      nav.classList.add("site-nav--dimmed");
    }

    lastY = y;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // respect reduced motion: just dim, never hide
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY || 0;
      if (y <= TOP_SHOW || (y + window.innerHeight) >= (document.documentElement.scrollHeight - BOTTOM_SHOW)) {
        nav.classList.remove("site-nav--dimmed");
      } else if (y > HIDE_AFTER) {
        nav.classList.add("site-nav--dimmed");
      }
    }, { passive: true });
    return;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // also show on hover/focus via CSS, but ensure scroll state correct on load/resize
  window.addEventListener("load", update);
  window.addEventListener("resize", onScroll);
  // initial
  update();
})();

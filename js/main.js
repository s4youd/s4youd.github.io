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
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
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
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    pre.appendChild(btn);
  });
})();

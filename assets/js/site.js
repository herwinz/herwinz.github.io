(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var header = document.querySelector(".topbar");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var btn = document.getElementById("backToTop");
  if (btn) {
    var onScroll = function () { btn.classList.toggle("show", window.scrollY > 320); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Typewriter: cycles through data-words (separated by "|").
  var typed = document.querySelector("[data-words]");
  if (typed && !reduce) {
    var words = typed.getAttribute("data-words").split("|");
    var w = 0, i = words[0].length, del = true;
    var tick = function () {
      var word = words[w];
      i += del ? -1 : 1;
      typed.textContent = word.slice(0, i);
      var delay = del ? 35 : 70;
      if (!del && i === word.length) { del = true; delay = 1800; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

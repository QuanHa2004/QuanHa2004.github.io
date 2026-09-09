document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Theme (mặc định dark) ---------------- */
  const themeButton = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#080d16" : "#f4f7fb";
  };

  const saved = localStorage.getItem("portfolio-theme");
  let currentTheme = saved === "light" || saved === "dark" ? saved : "dark";
  applyTheme(currentTheme);

  themeButton?.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", currentTheme);
    applyTheme(currentTheme);
  });

  /* ---------------- Ảnh đại diện: fallback chữ cái khi chưa có avatar.jpg ---------------- */
  const avatar = document.getElementById("avatar");
  if (avatar) {
    const markMissing = () => avatar.classList.add("is-missing");
    avatar.addEventListener("error", markMissing);
    if (avatar.complete && avatar.naturalWidth === 0) markMissing();
  }

  /* ---------------- Hiệu ứng gõ chữ ---------------- */
  const typed = document.getElementById("typed");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typed && !reduceMotion) {
    const phrases = [
      "Backend Developer",
      "Java · Spring Boot",
      "REST APIs · MySQL · Redis",
      "Spring Security · JWT · Docker",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    typed.textContent = "";

    const tick = () => {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typed.textContent = phrase.slice(0, charIndex);

      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 500);
  }

  /* ---------------- Hiện dần khi cuộn ---------------- */
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach((el) => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("visible"), i * 90);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealItems.forEach((el) => observer.observe(el));
  }

  /* ---------------- Topbar + nút về đầu trang ---------------- */
  const topbar = document.querySelector(".topbar");
  const backToTop = document.getElementById("back-to-top");

  /* ---------------- Đánh dấu mục đang xem trên menu ---------------- */
  const navLinks = [...document.querySelectorAll(".topbar nav a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateActiveLink = () => {
    if (!sections.length) return;

    // Mốc so sánh nằm ngay dưới thanh menu dính (sticky)
    const line = window.scrollY + 140;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;

    let currentId = null;
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= line) currentId = section.id;
    });
    if (atBottom) currentId = sections[sections.length - 1].id;

    navLinks.forEach((link) =>
      link.classList.toggle("active", currentId !== null && link.getAttribute("href") === `#${currentId}`)
    );
  };

  const onScroll = () => {
    const y = window.scrollY;
    topbar?.classList.toggle("scrolled", y > 8);
    backToTop?.classList.toggle("show", y > 420);
    updateActiveLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveLink);
  onScroll();

  /* ---------------- Năm ở footer ---------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");

  // Hàm xác định theme khởi tạo
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // Lấy system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Hàm áp dụng theme lên DOM
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  };

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  // Sự kiện khi click vào nút đổi theme
  themeButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", currentTheme);
    applyTheme(currentTheme);
  });

  // Lắng nghe thay đổi khi OS đổi theme (nếu người dùng chưa từng set cứng theme)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("portfolio-theme")) {
      const newTheme = e.matches ? "dark" : "light";
      currentTheme = newTheme;
      applyTheme(newTheme);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load theme đã lưu
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else {
    body.classList.add("dark"); // mặc định dark
  }

  // Cập nhật icon theo theme hiện tại
  function updateIcon() {
    if (body.classList.contains("dark")) {
      btn.textContent = "☀️"; // đang dark => cho hiện icon mặt trời
    } else {
      btn.textContent = "🌙"; // đang light => hiện icon mặt trăng
    }
  }
  updateIcon();

  // Click để đổi theme
  btn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    updateIcon();
  });

  // Hiệu ứng typing RTL (nếu có phần tử #typing-rtl)
  const el = document.getElementById("typing-rtl");
  if (el) {
    const text = el.textContent;
    let i = text.length; // bắt đầu từ cuối
    let deleting = false;

    function typeRTL() {
      if (!deleting) {
        el.textContent = text.substring(i);
        i--;
        if (i < 0) {
          deleting = true;
          setTimeout(typeRTL, 1500);
          return;
        }
      } else {
        el.textContent = text.substring(text.length - i);
        i++;
        if (i > text.length) {
          deleting = false;
          i = text.length;
        }
      }
      setTimeout(typeRTL, 120);
    }

    el.textContent = "";
    typeRTL();
  }

  // Menu toggle (nếu có nút .menu-toggle)
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
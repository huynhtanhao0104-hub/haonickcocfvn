
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


window.addEventListener("beforeunload", () => {
  const pageKey = "scroll-" + window.location.pathname;
  localStorage.setItem(pageKey, window.scrollY);
});

window.addEventListener("load", () => {
  const pageKey = "scroll-" + window.location.pathname;
  const savedPos = localStorage.getItem(pageKey);
  if (savedPos) {
    smoothScrollTo(parseInt(savedPos), 1000); // 1500ms = 1.5s
  }
});

function smoothScrollTo(target, duration) {
  const start = window.scrollY;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 -> 1
    const ease = progress < 0.5
      ? 2 * progress * progress         // easeInOutQuad
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, start + change * ease);

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// Lưu vị trí trước khi rời trang
window.addEventListener("pagehide", () => {
  sessionStorage.setItem("scroll:" + location.pathname, window.scrollY);
});

// Khôi phục vị trí khi quay lại
window.addEventListener("pageshow", (e) => {
  const key = "scroll:" + location.pathname;
  const saved = sessionStorage.getItem(key);

  if (e.persisted || performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
    // Nếu back/forward thì khôi phục
    if (saved) {
      window.scrollTo(0, parseInt(saved));
    }
  } else {
    // Nếu load mới/reload thì về đầu trang
    window.scrollTo(0, 0);
  }
});



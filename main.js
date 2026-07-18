// Shared behaviour for every page: injects the header/footer partials,
// wires up the mobile menu, and marks the active nav link.

async function includePartial(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return;
  const res = await fetch(url);
  host.innerHTML = await res.text();
}

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function initNav() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const page = currentPage();

  header.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }
}

function initFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    includePartial("#navbar", "navbar.html"),
    includePartial("#footer", "footer.html"),
  ]);
  initNav();
  initFooterYear();
});

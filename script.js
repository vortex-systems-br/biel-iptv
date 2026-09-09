(() => {
  const PHONE = "5518991721536";
  const BASE_MESSAGE = "Olá! Vim pelo site da Biel Play e quero solicitar meu teste grátis de 4 horas.";

  function makeWhatsAppUrl() {
    const params = new URLSearchParams(location.search);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
    const origin = keys.filter(k => params.get(k)).map(k => `${k}=${params.get(k)}`).join(" | ");
    const message = origin ? `${BASE_MESSAGE}\n\nOrigem: ${origin}` : BASE_MESSAGE;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  }

  const whatsappUrl = makeWhatsAppUrl();

  document.querySelectorAll(".js-wpp").forEach(link => {
    link.href = whatsappUrl;
    link.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("bielplay:whatsapp_click", {
        detail: { location: link.dataset.cta || "unknown" }
      }));
    });
  });

  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 20);

    // Sticky WhatsApp CTA only AFTER leaving the hero.
    const hero = document.getElementById("inicio");
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    document.body.classList.toggle("past-hero", window.scrollY > heroBottom - 120);
  }
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
    header.classList.remove("open");
  }

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    if (open) closeMenu();
    else {
      menuButton.setAttribute("aria-expanded", "true");
      mobileNav.hidden = false;
      document.body.classList.add("menu-open");
      header.classList.add("open");
    }
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

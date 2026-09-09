(() => {
  const PHONE = "5518991721536";
  const MESSAGE = "Olá! Vim pelo site da Biel Play e quero solicitar meu teste grátis de 4 horas.";

  function whatsappUrl() {
    const params = new URLSearchParams(location.search);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
    const track = keys.filter(k => params.get(k)).map(k => `${k}=${params.get(k)}`).join(" | ");
    const text = track ? `${MESSAGE}\n\nOrigem: ${track}` : MESSAGE;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  }

  const url = whatsappUrl();
  document.querySelectorAll(".js-wpp").forEach(el => {
    el.href = url;
    el.addEventListener("click", () => {
      const locationName = el.dataset.cta || "unknown";
      window.dispatchEvent(new CustomEvent("bielplay:whatsapp_click", {
        detail: { location: locationName }
      }));
    });
  });

  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 24);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  const closeMenu = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    header.classList.remove("open");
  };
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    if (open) closeMenu();
    else {
      btn.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      document.body.classList.add("menu-open");
      header.classList.add("open");
    }
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

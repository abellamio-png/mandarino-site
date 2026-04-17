// Reveal sections on scroll
// Handles both initial page load and Astro View Transitions

function initReveal() {
  // Seleziona tutti gli elementi con data-reveal
  // che non sono ancora stati rivelati
  const elements = document.querySelectorAll(
    '[data-reveal]:not(.is-visible)'
  );

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', initReveal);

// Re-inizializzazione dopo ogni View Transition di Astro
// Questo è il fix critico per le pagine interne
document.addEventListener('astro:page-load', initReveal);

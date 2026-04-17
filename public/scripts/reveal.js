// Reveal sections on scroll
// Adds 'is-visible' class when element enters viewport
// Works with CSS animations defined in home.css

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing after reveal (one-shot animation)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px', // Slight offset from bottom
  }
);

function initReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
  if (revealElements.length > 0) {
    revealElements.forEach((el) => observer.observe(el));
  }
}

// Initial run
initReveal();

// Re-run after Astro View Transitions
document.addEventListener('astro:page-load', () => {
  initReveal();
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate
  const animatedElements = [
    { selector: '.hero h1, .hero h2, .hero p', animation: 'animate-on-scroll' },
    { selector: '.img1, .img3, .img4, .img6, .img31', animation: 'animate-on-scroll from-right' },
    { selector: '.head, .h2, .h3, .h4, .h8', animation: 'animate-on-scroll' },
    { selector: '.content, .c2, .c3, .c8', animation: 'animate-on-scroll' },
    { selector: '.card1', animation: 'animate-on-scroll from-left' },
    { selector: '.card2', animation: 'animate-on-scroll from-right' },
    { selector: '.card3', animation: 'animate-on-scroll from-left' }
  ];

  // Add animation classes to elements
  animatedElements.forEach(({ selector, animation }) => {
    document.querySelectorAll(selector).forEach(element => {
      element.classList.add(...animation.split(' '));
    });
  });

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      } else {
        // Remove the visible class when element is out of view
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.add('visible');
        observer.unobserve(element);
      });
    }
  }

  // Check initial preference
  handleReducedMotion();
  
  // Listen for preference changes
  prefersReducedMotion.addEventListener('change', handleReducedMotion);
});
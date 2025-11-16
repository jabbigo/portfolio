/* Basic interactive behavior */
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close nav on mobile
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // simple contact form handler (works with Formspree)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);
    const action = form.action;
    try {
      const resp = await fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (resp.ok) {
        status.textContent = 'Thanks! I will reply soon.';
        form.reset();
      } else {
        const result = await resp.json();
        status.textContent = result?.error ? result.error : 'Submission failed. Try again later.';
      }
    } catch (err) {
      status.textContent = 'Network error. Try again later.';
    }
  });

});

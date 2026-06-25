function initFAQ() {
  document.querySelectorAll('.faq-toggle').forEach(btn => {

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {

      const item = newBtn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const wasOpen = item.classList.contains('active');

      // Tutup semua FAQ
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');

        const panel = faq.querySelector('.faq-answer');
        panel.style.maxHeight = null;
      });

      // Buka FAQ yang diklik
      if (!wasOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });

  });
}

window.initFAQ = initFAQ;
document.addEventListener('DOMContentLoaded', initFAQ);
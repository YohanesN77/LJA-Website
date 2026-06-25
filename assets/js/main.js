// ---- Portfolio filter ----
function filterPortfolio(filter) {
  // Update buttons
  document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-blue-600', 'text-white');
    btn.classList.add('border', 'border-slate-200', 'hover:border-blue-600');
  });

  // Find the clicked button or the one with the matching onclick
  const clickedBtn = Array.from(document.querySelectorAll('.portfolio-filter-btn'))
    .find(btn => btn.getAttribute('onclick').includes(`'${filter}'`));

  if (clickedBtn) {
    clickedBtn.classList.add('active', 'bg-blue-600', 'text-white');
    clickedBtn.classList.remove('border', 'border-slate-200', 'hover:border-blue-600');
  }

  document.querySelectorAll('.portfolio-item').forEach(item => {
    if (filter === 'all' || item.classList.contains(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// ---- Contact form ----
async function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector(
    'button[type="submit"]'
  );

  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  const data = {
    nama: document.getElementById('f-name').value,
    perusahaan: document.getElementById('f-company').value,
    email: document.getElementById('f-email').value,
    wa: document.getElementById('f-wa').value,
    layanan: document.getElementById('f-service').value,
    lokasi: document.getElementById('f-location').value,
    deskripsi: document.getElementById('f-desc').value
  };

  try {

    await fetch(
      'https://script.google.com/macros/s/AKfycbwSdkpYgugyRPdAgPUC_vLZzuWN3zL_oQlRpoLwOdWNHE95vAZESANEW9gzLF0gQjzX/exec',
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );

    document
      .getElementById('form-success')
      .classList.remove('hidden');

    e.target.reset();

  } catch (err) {
    alert('Gagal mengirim data');
  }

  btn.disabled = false;
  btn.textContent =
    'Kirim Permintaan Penawaran';
}

// ---- Intersection Observer for bar animations ----
let barObserver;
let portfolioInterval;

function initMain() {
  if (barObserver) barObserver.disconnect();

  barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.animationPlayState = 'running';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });

  const aboutSection = document.getElementById('about');
  if (aboutSection) barObserver.observe(aboutSection);

  // ---- Portfolio Slider ----

  const slides = document.querySelectorAll('.portfolio-slide');
  const dots = document.querySelectorAll('.portfolio-dot');

  const prevBtn = document.querySelector('.portfolio-prev');
  const nextBtn = document.querySelector('.portfolio-next');

  let current = 0;
  let sliderInterval;

  // ---- Show Slide ----

  function showSlide(index) {

    slides.forEach((slide, i) => {

      slide.classList.remove(
        'translate-x-0',
        'translate-x-full',
        '-translate-x-full'
      );

      if (i === index) {

        slide.classList.add('translate-x-0');

      } else if (i < index) {

        slide.classList.add('-translate-x-full');

      } else {

        slide.classList.add('translate-x-full');
      }
    });

    // ---- Dots ----

    dots.forEach((dot, i) => {

      if (i === index) {

        dot.classList.remove(
          'bg-white/30',
          'w-2',
          'md:w-3'
        );

        dot.classList.add(
          'bg-white',
          'w-8',
          'md:w-10'
        );

      } else {

        dot.classList.remove(
          'bg-white',
          'w-8',
          'md:w-10'
        );

        dot.classList.add(
          'bg-white/30',
          'w-2',
          'md:w-3'
        );
      }
    });

    current = index;
  }

  // ---- Next ----

  function nextSlide() {

    current++;

    if (current >= slides.length) {
      current = 0;
    }

    showSlide(current);
  }

  // ---- Prev ----

  function prevSlide() {

    current--;

    if (current < 0) {
      current = slides.length - 1;
    }

    showSlide(current);
  }

  // ---- Auto Slide ----

  function startSlider() {

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // ---- Events ----

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlider();
    });
  }

  if (dots && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startSlider();
      });
    });
  }

  // ---- Init ----

  if (slides && slides.length > 0) {
    showSlide(0);
    startSlider();
  }
}



// Bind to window for inline HTML access
window.handleSubmit = handleSubmit;
window.filterPortfolio = filterPortfolio;
window.initMain = initMain;

// Fallback if not using component loader
document.addEventListener('DOMContentLoaded', initMain);

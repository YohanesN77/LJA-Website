// ---- Language toggle ----
let currentLang = 'id';

function setLang(lang) {
  currentLang = lang;
  window.currentLang = lang;
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id-text') || el.getAttribute('data-id');
    if (text && el.tagName !== 'OPTION') el.textContent = text;
    if (text && el.tagName === 'OPTION') el.textContent = text;
  });

  // Handle placeholder
  const placeholders = {
    'Nama PIC *': 'PIC Name *',
    'Nama Perusahaan *': 'Company Name *',
    'Email *': 'Email *',
    'Nomor WhatsApp *': 'WhatsApp Number *',
    'Lokasi Proyek': 'Project Location',
    'Deskripsi singkat kebutuhan proyek Anda *': 'Brief description of your project needs *'
  };

  document.querySelectorAll('[placeholder]').forEach(el => {
    if (!el._origPlaceholder) el._origPlaceholder = el.placeholder;

    if (lang === 'en') {
      if (placeholders[el._origPlaceholder]) {
        el.placeholder = placeholders[el._origPlaceholder];
      }
    } else {
      el.placeholder = el._origPlaceholder;
    }
  });

  // Update consultation button
  document.querySelectorAll('a[href*="#contact"]').forEach(a => {
    if (a.querySelector('span') && a.querySelector('span').textContent.match(/(Konsultasi|Consultation)/)) {
      a.querySelector('span').textContent = lang === 'en' ? 'Free Consultation' : 'Konsultasi Gratis';
    }
  });

  // Toggle active state on buttons
  ['btn-id','btn-en','btn-id-m','btn-en-m'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if ((lang === 'id' && id.includes('id')) || (lang === 'en' && id.includes('en'))) {
      btn.classList.add('active','bg-blue-600','text-white');
      btn.classList.remove('text-slate-400');
    } else {
      btn.classList.remove('active','bg-blue-600','text-white');
      btn.classList.add('text-slate-400');
    }
  });
}

// Bind to window for inline HTML access and global state
window.currentLang = currentLang;
window.setLang = setLang;

// ===================== DATA =====================
const servicesData = [
  {
    num: '01', icon: '🗼',
    titleId: 'Tower Telekomunikasi', titleEn: 'Telecom Tower',
    subId: 'Fabrikasi & instalasi tower telekomunikasi', subEn: 'Telecom tower fabrication & installation',
    imgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    descId: 'Fabrikasi dan instalasi tower telekomunikasi berbagai tipe — SST, Monopole, Guyed Mast — sesuai spesifikasi operator. Dikerjakan dengan standar keamanan struktur tinggi dan material baja berkualitas.',
    descEn: 'Fabrication and installation of various telecommunication tower types — SST, Monopole, Guyed Mast — per operator specifications, with high structural safety standards and quality steel.',
    features: [
      { id: 'SST, Monopole & Guyed Mast', en: 'SST, Monopole & Guyed Mast' },
      { id: 'Fabrikasi & Erection Tower', en: 'Tower Fabrication & Erection' },
      { id: 'Grounding & Lightning Protection', en: 'Grounding & Lightning Protection' },
      { id: 'Hot Dip Galvanizing', en: 'Hot Dip Galvanizing' },
      { id: 'Sesuai Standar Telko Nasional', en: 'Per National Telco Standards' },
    ],
  },
  {
    num: '02', icon: '📡',
    titleId: 'Mobile Tower', titleEn: 'Mobile Tower',
    subId: 'Tower portabel & mudah dipindah', subEn: 'Portable & relocatable tower',
    imgUrl: 'https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&w=1200&q=80',
    descId: 'Tower portabel yang dapat dipindahkan dan dipasang dengan cepat di lokasi terpencil atau sementara. Ideal untuk coverage jaringan di area remote, event, atau emergency deployment.',
    descEn: 'Portable tower that can be relocated and deployed quickly at remote or temporary sites. Ideal for network coverage in remote areas, events, or emergency deployments.',
    features: [
      { id: 'Desain Portabel & Knockdown', en: 'Portable & Knockdown Design' },
      { id: 'Pemasangan Cepat di Lapangan', en: 'Rapid Field Deployment' },
      { id: 'Cocok untuk Area Remote', en: 'Suitable for Remote Areas' },
      { id: 'Struktur Ringan & Kuat', en: 'Lightweight & Strong Structure' },
      { id: 'Custom Tinggi & Spesifikasi', en: 'Custom Height & Specifications' },
    ],
  },
  {
    num: '03', icon: '🛢️',
    titleId: 'Tanki Bahan Bakar / Air', titleEn: 'Fuel or Water Tank',
    subId: 'Tangki bahan bakar & tanki air industri', subEn: 'Industrial fuel & water tanks',
    imgUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    descId: 'Fabrikasi tangki penyimpanan bahan bakar dan air industri berbagai kapasitas. Dibangun dari plat baja berkualitas dengan sistem coating anti-karat dan sesuai standar keamanan penyimpanan cairan.',
    descEn: 'Fabrication of industrial fuel and water storage tanks in various capacities, built from quality steel with anti-rust coating and liquid storage safety standards.',
    features: [
      { id: 'Tangki BBM & Solar', en: 'Fuel & Diesel Tank' },
      { id: 'Tangki Air Bersih & Proses', en: 'Clean & Process Water Tank' },
      { id: 'Kapasitas Custom Sesuai Kebutuhan', en: 'Custom Capacity per Requirements' },
      { id: 'Coating Epoxy Anti-Karat', en: 'Anti-Rust Epoxy Coating' },
      { id: 'Horizontal & Vertikal', en: 'Horizontal & Vertical' },
    ],
  },
  {
    num: '04', icon: '🏗️',
    titleId: 'Konstruksi Baja', titleEn: 'Steel Construction',
    subId: 'Struktur baja skala besar', subEn: 'Large-scale steel structures',
    imgUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    descId: 'Pembangunan struktur baja presisi tinggi untuk gedung industri, gudang, platform, dan infrastruktur berat. Menangani proyek skala besar dengan standar K3 tertinggi dan pengalaman lebih dari 20 tahun.',
    descEn: 'High-precision steel construction for industrial buildings, warehouses, platforms, and heavy infrastructure, with the highest K3 standards and over 20 years of experience.',
    features: [
      { id: 'Struktur Gedung & Gudang Industri', en: 'Industrial Buildings & Warehouses' },
      { id: 'Platform & Mezzanine Baja', en: 'Steel Platform & Mezzanine' },
      { id: 'Jembatan & Infrastruktur Berat', en: 'Bridges & Heavy Infrastructure' },
      { id: 'Erection & Assembly Struktur', en: 'Structure Erection & Assembly' },
      { id: 'Standar SNI & International', en: 'SNI & International Standards' },
    ],
  },
  {
    num: '05', icon: '📦',
    titleId: 'Modifikasi Container', titleEn: 'Container Modification',
    subId: 'Modifikasi container sesuai kebutuhan', subEn: 'Custom container modification',
    imgUrl: 'https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?auto=format&fit=crop&w=1200&q=80',
    descId: 'Modifikasi container pengiriman menjadi berbagai fungsi: kantor portabel, gudang, barak, workshop, atau unit khusus sesuai kebutuhan industri dan proyek lapangan.',
    descEn: 'Transforming shipping containers into portable offices, warehouses, barracks, workshops, or custom units for industrial and field project needs.',
    features: [
      { id: 'Container Kantor & Barak', en: 'Office & Barrack Container' },
      { id: 'Container Workshop & Gudang', en: 'Workshop & Storage Container' },
      { id: 'Cutting, Welding & Plating', en: 'Cutting, Welding & Plating' },
      { id: 'Instalasi Listrik & AC', en: 'Electrical & AC Installation' },
      { id: 'Custom Layout Sesuai Kebutuhan', en: 'Custom Layout per Requirements' },
    ],
  },
  {
    num: '06', icon: '⚙️',
    titleId: 'Tipping Unit', titleEn: 'Tipping Unit',
    subId: 'Unit tipping untuk industri tambang', subEn: 'Tipping unit for mining industry',
    imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    descId: 'Fabrikasi tipping unit untuk industri pertambangan dan transportasi material curah. Dirancang kuat, tahan beban berat, dan mudah dioperasikan di berbagai kondisi lapangan.',
    descEn: 'Tipping unit fabrication for mining and bulk material transport. Designed to be strong, heavy-load resistant, and easy to operate in various field conditions.',
    features: [
      { id: 'Tipping Unit Industri Tambang', en: 'Mining Industry Tipping Unit' },
      { id: 'Material Baja Tebal & Kuat', en: 'Thick & Strong Steel Material' },
      { id: 'Sistem Hidrolik Handal', en: 'Reliable Hydraulic System' },
      { id: 'Custom Kapasitas & Dimensi', en: 'Custom Capacity & Dimensions' },
      { id: 'Coating Anti-Karat & Abrasif', en: 'Anti-Rust & Abrasion Coating' },
    ],
  },
  {
    num: '07', icon: '🔧',
    titleId: 'Instalasi', titleEn: 'Installation',
    subId: 'Instalasi peralatan & sistem industri', subEn: 'Equipment & industrial system installation',
    imgUrl: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=1200&q=80',
    descId: 'Jasa instalasi peralatan industri, sistem mekanikal, elektrikal, dan struktur pendukung di berbagai sektor. Dikerjakan oleh tenaga ahli berpengalaman dengan standar keselamatan kerja K3.',
    descEn: 'Industrial equipment installation, mechanical and electrical systems, and support structures across various sectors, by experienced professionals under K3 safety standards.',
    features: [
      { id: 'Instalasi Peralatan Industri', en: 'Industrial Equipment Installation' },
      { id: 'Mekanikal & Elektrikal', en: 'Mechanical & Electrical' },
      { id: 'Instalasi Perpipaan & Fitting', en: 'Piping & Fitting Installation' },
      { id: 'Commissioning & Testing', en: 'Commissioning & Testing' },
      { id: 'Standar K3 & HSE', en: 'K3 & HSE Standards' },
    ],
  },
  {
    num: '08', icon: '✂️',
    titleId: 'Cutting Skip', titleEn: 'Cutting Skip',
    subId: 'Peralatan cutting skip presisi tinggi', subEn: 'Precision cutting skip equipment',
    imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    descId: 'Fabrikasi cutting skip untuk penanganan material sisa dan scrap di lingkungan industri berat. Dirancang dengan dimensi custom, material tebal, dan sistem pengosongan yang efisien.',
    descEn: 'Cutting skip fabrication for scrap and waste material handling in heavy industrial environments, with custom dimensions, thick materials, and efficient emptying systems.',
    features: [
      { id: 'Penanganan Scrap & Material Sisa', en: 'Scrap & Waste Material Handling' },
      { id: 'Plat Baja Tebal & Tahan Lama', en: 'Thick & Durable Steel Plate' },
      { id: 'Sistem Fork Pocket & Lifting Lug', en: 'Fork Pocket & Lifting Lug System' },
      { id: 'Kapasitas Custom', en: 'Custom Capacity' },
      { id: 'Finishing Sandblast & Cat', en: 'Sandblast & Paint Finishing' },
    ],
  },
  {
    num: '09', icon: '🚛',
    titleId: 'Cargo Carrying Unit', titleEn: 'Cargo Carrying Unit',
    subId: 'Unit pengangkut kargo industri', subEn: 'Industrial cargo carrying unit',
    imgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    descId: 'Fabrikasi unit pengangkut kargo (CCU) untuk operasi offshore, onshore, dan logistik industri berat. Memenuhi standar DNV / EN 12079 dengan kapasitas dan spesifikasi sesuai permintaan klien.',
    descEn: 'CCU fabrication for offshore, onshore, and heavy industrial logistics. Compliant with DNV / EN 12079 standards with capacity and specifications per client requirements.',
    features: [
      { id: 'CCU Offshore & Onshore', en: 'Offshore & Onshore CCU' },
      { id: 'Standar DNV / EN 12079', en: 'DNV / EN 12079 Standard' },
      { id: 'Sling & Lifting Arrangement', en: 'Sling & Lifting Arrangement' },
      { id: 'Kapasitas SWL Custom', en: 'Custom SWL Capacity' },
      { id: 'Certified & Third Party Inspection', en: 'Certified & Third Party Inspection' },
    ],
  },
];

// ===================== RENDER =====================

function renderDesktopTabs() {
  const container = document.getElementById('service-tabs-desktop');
  if (!container) return;

  const total = servicesData.length;
  container.innerHTML = servicesData.map((s, i) => `
    <button class="service-tab${i === 0 ? ' active' : ''}" onclick="selectService(${i}, this)">
      <span class="tab-num">${s.num}</span>
      <span class="tab-icon">${s.icon}</span>
      <span class="flex-1">
        <span class="tab-title block" data-id="${s.titleId}" data-en="${s.titleEn}">${s.titleId}</span>
        <span class="tab-sub block" data-id="${s.subId}" data-en="${s.subEn}">${s.subId}</span>
      </span>
      <span class="tab-arrow">&#8594;</span>
    </button>
  `).join('') + `
    <div class="mt-auto pt-3 border-t border-white/5">
      <a href="#contact"
        class="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold font-display uppercase tracking-wide transition group">
        <span data-id="Butuh Solusi Custom? Diskusi Sekarang" data-en="Need Custom Solution? Discuss Now">
          Butuh Solusi Custom? Diskusi Sekarang
        </span>
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>
  `;
}

function renderMobileTabs() {
  const container = document.querySelector('.service-tabs-mobile');
  if (!container) return;

  container.innerHTML = servicesData.map((s, i) => `
    <button class="service-tab-mobile${i === 0 ? ' active' : ''}" onclick="selectService(${i}, this)">
      ${s.icon}
      <span data-id="${s.titleId}" data-en="${s.titleEn}">${s.titleId}</span>
    </button>
  `).join('');
}

function renderPreviews() {
  const container = document.getElementById('service-preview');
  if (!container) return;

  const total = String(servicesData.length).padStart(2, '0');

  container.innerHTML = servicesData.map((s, i) => `
    <div class="svc-preview-item${i === 0 ? ' active' : ''}" data-index="${i}">
      <div class="relative rounded-2xl overflow-hidden">
        <img src="${s.imgUrl}" alt="${s.titleId}" class="w-full h-56 lg:h-72 object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"></div>
        <div class="absolute top-4 left-4">
          <span class="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            ${s.num} / ${total}
          </span>
        </div>
      </div>
      <div class="mt-5 px-1">
        <h3 class="font-display font-extrabold text-3xl uppercase text-white tracking-tight"
          data-id="${s.titleId}" data-en="${s.titleEn}">${s.titleId}</h3>
        <p class="mt-3 text-slate-400 text-sm leading-relaxed"
          data-id="${s.descId}" data-en="${s.descEn}">${s.descId}</p>
        <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${s.features.map(f => `
            <li class="flex items-center gap-2 text-slate-300 text-xs">
              <span class="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">&#10003;</span>
              <span data-id="${f.id}" data-en="${f.en}">${f.id}</span>
            </li>
          `).join('')}
        </ul>
        <div class="mt-5 flex items-center gap-3">
          <a href="#contact"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition">
            <span data-id="Konsultasi Sekarang" data-en="Consult Now">Konsultasi Sekarang</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <span class="text-slate-600 text-xs"
            data-id="Respon dalam 24 jam" data-en="Response within 24 hours">Respon dalam 24 jam</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===================== INTERAKSI =====================

function selectService(index) {
  document.querySelectorAll('#service-tabs-desktop .service-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  document.querySelectorAll('.service-tab-mobile').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  document.querySelectorAll('.svc-preview-item').forEach(p => p.classList.remove('active'));
  const target = document.querySelector(`.svc-preview-item[data-index="${index}"]`);
  if (target) {
    requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('active')));
  }
}

// ===================== INIT =====================

function initServices() {
  renderDesktopTabs();
  renderMobileTabs();
  renderPreviews();

  // Re-apply bahasa jika sudah di-switch sebelumnya
  if (window.currentLang && window.currentLang !== 'id' && window.setLang) {
    window.setLang(window.currentLang);
  }
}

window.selectService = selectService;
window.initServices = initServices;
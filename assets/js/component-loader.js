const components = [
    { id: 'home-placeholder', file: 'assets/components/hero.html' },
    { id: 'services-placeholder', file: 'assets/components/services.html' },
    { id: 'why-us-placeholder', file: 'assets/components/why-us.html' },
    { id: 'about-placeholder', file: 'assets/components/about.html' },
    { id: 'portfolio-placeholder', file: 'assets/components/portfolio.html' },
    { id: 'pricing-placeholder', file: 'assets/components/pricing.html' },
    { id: 'testimonials-placeholder', file: 'assets/components/testimonials.html' },
    { id: 'faq-placeholder', file: 'assets/components/faq.html' },
    { id: 'contact-placeholder', file: 'assets/components/contact.html' },
    { id: 'footer-placeholder', file: 'assets/components/footer.html' },
];

async function loadComponent(id, file) {
    try {
        const response = await fetch(`${file}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const html = await response.text();
        document.getElementById(id).outerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function loadAllComponents() {
    await Promise.all(components.map(c => loadComponent(c.id, c.file)));
    // Hanya fire event — biarkan index.html yang handle inisialisasi
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
}

loadAllComponents();
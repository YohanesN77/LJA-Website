const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// ─── Auth ──────────────────────────────────────────────────────────────────────
function auth(req, res, next) {
    const token = req.headers['x-admin-token'];
    if (token === ADMIN_PASSWORD) return next();
    res.status(401).json({ error: 'Unauthorized' });
}

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ token: ADMIN_PASSWORD });
    } else {
        res.status(401).json({ error: 'Password salah' });
    }
});

// ─── Components ────────────────────────────────────────────────────────────────
const COMPONENTS = [
    { id: 'hero',         label: 'Hero (Home)',    icon: '🏠' },
    { id: 'services',     label: 'Layanan',        icon: '⚙️' },
    { id: 'why-us',       label: 'Mengapa Kami',   icon: '⭐' },
    { id: 'about',        label: 'Tentang Kami',   icon: '🏢' },
    { id: 'portfolio',    label: 'Portofolio',     icon: '📁' },
    { id: 'pricing',      label: 'Harga',          icon: '💰' },
    { id: 'testimonials', label: 'Testimoni',      icon: '💬' },
    { id: 'faq',          label: 'FAQ',            icon: '❓' },
    { id: 'contact',      label: 'Kontak',         icon: '📞' },
    { id: 'footer',       label: 'Footer',         icon: '📄' },
];

app.get('/api/components', auth, (req, res) => {
    res.json(COMPONENTS);
});

app.get('/api/component/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const file = path.join(__dirname, 'assets/components', name + '.html');
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json({ content: fs.readFileSync(file, 'utf8') });
});

app.post('/api/component/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const file = path.join(__dirname, 'assets/components', name + '.html');
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'Tidak ditemukan' });
    // Backup otomatis
    fs.writeFileSync(file + '.bak', fs.readFileSync(file));
    fs.writeFileSync(file, req.body.content, 'utf8');
    res.json({ success: true });
});

app.post('/api/component/:name/restore', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const file = path.join(__dirname, 'assets/components', name + '.html');
    const bak = file + '.bak';
    if (!fs.existsSync(bak)) return res.status(404).json({ error: 'Backup tidak ada' });
    fs.writeFileSync(file, fs.readFileSync(bak));
    res.json({ content: fs.readFileSync(file, 'utf8') });
});

// ─── CSS ───────────────────────────────────────────────────────────────────────
const CSS_FILES = [
    { id: 'main',       label: 'main.css' },
    { id: 'components', label: 'components.css' },
    { id: 'animations', label: 'animations.css' },
];

app.get('/api/css-files', auth, (req, res) => res.json(CSS_FILES));

app.get('/api/css/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z]/g, '');
    const file = path.join(__dirname, 'assets/css', name + '.css');
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json({ content: fs.readFileSync(file, 'utf8') });
});

app.post('/api/css/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z]/g, '');
    const file = path.join(__dirname, 'assets/css', name + '.css');
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'Tidak ditemukan' });
    fs.writeFileSync(file + '.bak', fs.readFileSync(file));
    fs.writeFileSync(file, req.body.content, 'utf8');
    res.json({ success: true });
});

// ─── Images ────────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'assets/images/uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.originalname)) cb(null, true);
        else cb(new Error('Format tidak didukung. Gunakan JPG, PNG, GIF, WEBP, atau SVG.'));
    }
});

app.get('/api/images', auth, (req, res) => {
    const imagesDir = path.join(__dirname, 'assets/images');
    const images = [];

    function scan(dir) {
        if (!fs.existsSync(dir)) return;
        for (const file of fs.readdirSync(dir)) {
            const full = path.join(dir, file);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) {
                scan(full);
            } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
                const rel = full.replace(__dirname + path.sep, '').replace(/\\/g, '/');
                images.push({
                    name: file,
                    path: rel,
                    url: '/' + rel,
                    size: stat.size,
                    mtime: stat.mtime,
                    canDelete: rel.startsWith('assets/images/uploads/')
                });
            }
        }
    }

    scan(imagesDir);
    images.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    res.json(images);
});

app.post('/api/upload', auth, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file' });
    const rel = 'assets/images/uploads/' + req.file.filename;
    res.json({ path: rel, url: '/' + rel, name: req.file.filename });
});

app.delete('/api/image', auth, (req, res) => {
    const { filePath } = req.body;
    if (!filePath || !filePath.startsWith('assets/images/uploads/')) {
        return res.status(403).json({ error: 'Hanya gambar di folder uploads yang bisa dihapus' });
    }
    const full = path.join(__dirname, filePath);
    if (fs.existsSync(full)) fs.unlinkSync(full);
    res.json({ success: true });
});

// ─── Admin Panel ───────────────────────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║     LJA Website Admin Server           ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  Website  : http://localhost:${PORT}       ║`);
    console.log(`║  Admin    : http://localhost:${PORT}/admin  ║`);
    console.log(`║  Password : ${ADMIN_PASSWORD.padEnd(27)}║`);
    console.log('╚════════════════════════════════════════╝\n');
});

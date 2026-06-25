const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// DATA_DIR: folder persisten untuk menyimpan perubahan
// Di Railway: /data (dari volume), di lokal: ./data
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_COMPONENTS = path.join(DATA_DIR, 'components');
const DATA_UPLOADS    = path.join(DATA_DIR, 'uploads');

// Buat folder jika belum ada
[DATA_DIR, DATA_COMPONENTS, DATA_UPLOADS].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

// Serve uploaded images dari DATA_UPLOADS
app.use('/assets/images/uploads', express.static(DATA_UPLOADS));

// Serve static files
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

app.get('/api/components', auth, (req, res) => res.json(COMPONENTS));

// GET: cek DATA_DIR dulu, fallback ke assets/components
app.get('/api/component/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const dataFile    = path.join(DATA_COMPONENTS, name + '.html');
    const defaultFile = path.join(__dirname, 'assets/components', name + '.html');

    if (fs.existsSync(dataFile)) {
        return res.json({ content: fs.readFileSync(dataFile, 'utf8') });
    }
    if (fs.existsSync(defaultFile)) {
        return res.json({ content: fs.readFileSync(defaultFile, 'utf8') });
    }
    res.status(404).json({ error: 'Tidak ditemukan' });
});

// POST: simpan ke DATA_DIR (persisten)
app.post('/api/component/:name', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const dataFile = path.join(DATA_COMPONENTS, name + '.html');
    // Backup
    if (fs.existsSync(dataFile)) fs.writeFileSync(dataFile + '.bak', fs.readFileSync(dataFile));
    fs.writeFileSync(dataFile, req.body.content, 'utf8');
    res.json({ success: true });
});

app.post('/api/component/:name/restore', auth, (req, res) => {
    const name = req.params.name.replace(/[^a-z-]/g, '');
    const dataFile = path.join(DATA_COMPONENTS, name + '.html');
    const bak = dataFile + '.bak';
    if (fs.existsSync(bak)) {
        fs.writeFileSync(dataFile, fs.readFileSync(bak));
        return res.json({ content: fs.readFileSync(dataFile, 'utf8') });
    }
    // Restore ke original
    const orig = path.join(__dirname, 'assets/components', name + '.html');
    if (fs.existsSync(orig)) {
        if (fs.existsSync(dataFile)) fs.unlinkSync(dataFile);
        return res.json({ content: fs.readFileSync(orig, 'utf8') });
    }
    res.status(404).json({ error: 'Backup tidak ada' });
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
    destination: (req, file, cb) => cb(null, DATA_UPLOADS),
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
        else cb(new Error('Format tidak didukung'));
    }
});

app.get('/api/images', auth, (req, res) => {
    const images = [];

    // Scan original assets
    const assetsDir = path.join(__dirname, 'assets/images');
    function scan(dir, canDelete = false) {
        if (!fs.existsSync(dir)) return;
        for (const file of fs.readdirSync(dir)) {
            const full = path.join(dir, file);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) {
                scan(full, canDelete);
            } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
                const rel = full.replace(__dirname + path.sep, '').replace(/\\/g, '/');
                images.push({ name: file, path: rel, url: '/' + rel, size: stat.size, mtime: stat.mtime, canDelete });
            }
        }
    }

    scan(assetsDir, false);

    // Scan uploads dari DATA_DIR
    if (fs.existsSync(DATA_UPLOADS)) {
        for (const file of fs.readdirSync(DATA_UPLOADS)) {
            if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
                const full = path.join(DATA_UPLOADS, file);
                const stat = fs.statSync(full);
                images.push({
                    name: file,
                    path: 'assets/images/uploads/' + file,
                    url: '/assets/images/uploads/' + file,
                    size: stat.size,
                    mtime: stat.mtime,
                    canDelete: true
                });
            }
        }
    }

    images.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    res.json(images);
});

app.post('/api/upload', auth, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file' });
    const url = '/assets/images/uploads/' + req.file.filename;
    res.json({ path: 'assets/images/uploads/' + req.file.filename, url, name: req.file.filename });
});

app.delete('/api/image', auth, (req, res) => {
    const { filePath } = req.body;
    if (!filePath || !filePath.includes('uploads/')) {
        return res.status(403).json({ error: 'Hanya gambar di folder uploads yang bisa dihapus' });
    }
    const filename = path.basename(filePath);
    const full = path.join(DATA_UPLOADS, filename);
    if (fs.existsSync(full)) fs.unlinkSync(full);
    res.json({ success: true });
});

// ─── Admin Panel ───────────────────────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║     LJA Website Admin Server           ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  Port     : ${PORT.toString().padEnd(27)}║`);
    console.log(`║  Data Dir : ${DATA_DIR.slice(-27).padEnd(27)}║`);
    console.log(`║  Password : ${ADMIN_PASSWORD.padEnd(27)}║`);
    console.log('╚════════════════════════════════════════╝\n');
});

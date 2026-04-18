const fs = require('fs');
const path = require('path');

const cp1252 = {
  0x80: '\u20AC', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E', 0x85: '\u2026',
  0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6', 0x89: '\u2030', 0x8A: '\u0160',
  0x8B: '\u2039', 0x8C: '\u0152', 0x8E: '\u017D', 0x91: '\u2018', 0x92: '\u2019',
  0x93: '\u201C', 0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014',
  0x98: '\u02DC', 0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A', 0x9C: '\u0153',
  0x9E: '\u017E', 0x9F: '\u0178'
};

function mangle(str) {
  const bytes = Buffer.from(str, 'utf8');
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (cp1252[b]) {
        result += cp1252[b];
    } else {
        result += String.fromCharCode(b);
    }
  }
  return result;
}

const charsToFix = [
    'è', 'é', 'ì', 'ò', 'ù', 'à', 'È', 'É', 'Ì', 'Ò', 'Ù', 'À',
    '’', '—', '“', '”', "'", "«", "»", "→", "←", "⚠️"
];

const fixMap = {};
for (const c of charsToFix) {
    const mangled = mangle(c);
    fixMap[mangled] = c;
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function(filePath) {
    if (!filePath.match(/\.(astro|md|mdx|js|ts|css)$/)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    const keys = Object.keys(fixMap).sort((a, b) => b.length - a.length);

    for (const bad of keys) {
        let good = fixMap[bad];
        content = content.split(bad).join(good);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed symbols:', filePath);
    }
});

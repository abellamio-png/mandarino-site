const fs = require('fs');
const content = fs.readFileSync('src/pages/metodo.astro', 'utf8');
const regex = /[\x80-\uFFFF]/g;
let match;
const set = new Set();
while ((match = regex.exec(content)) !== null) {
  set.add(match[0]);
}
for (const char of set) {
  console.log(char, char.charCodeAt(0).toString(16));
}

import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'dist';
const files = fs.readdirSync(srcDir, { withFileTypes: true });

const exportsField = {} as Record<string, { import: string, types: string }>;

function scan(dir: string, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const name = entry.name;
    const fullPath = path.join(dir, name);
    const subPath = path.join(prefix, name);
    if (entry.isDirectory()) {
      scan(fullPath, subPath);
    } else if (name.endsWith('.js')) {
        const importPath = `./${path.join('dist', subPath).replace(/\\/g, '/')}`;
        const typePath = importPath.replace(/\.js$/, '.d.ts');
        let key = `./${subPath.replace(/\\/g, '/').replace(/\.js$/, '')}`;
        if (key.endsWith('/index')) {
          key = key.replace(/\/index$/, '');
        }
        exportsField[key] = { import: importPath, types: typePath };
    }
  }
}
scan('dist');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.exports = exportsField;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

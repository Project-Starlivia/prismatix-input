import fs from 'node:fs';
import path from 'node:path';

// 除外するファイルパスの配列
const excludePaths = [
    'utils.js',
    'input/utils.js'
];

const exportsField = {} as Record<string, { import: string, types: string }>;

function isExcluded(relativePath: string): boolean {
  return excludePaths.some(excludePath => {
    // 正規化されたパスで比較
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const normalizedExcludePath = excludePath.replace(/\\/g, '/');

    // 完全一致または、除外パスがディレクトリの場合はその配下もチェック
    return normalizedPath === normalizedExcludePath || 
           normalizedPath.startsWith(normalizedExcludePath + '/');
  });
}

function scan(dir: string, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const name = entry.name;
    const fullPath = path.join(dir, name);
    const subPath = path.join(prefix, name);

    // 除外チェック
    if (isExcluded(subPath)) {
      continue;
    }

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

const pkgContent = fs.readFileSync('package.json', 'utf8').replace(/^\uFEFF/, ''); // Remove BOM
const pkg = JSON.parse(pkgContent);
pkg.exports = exportsField;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
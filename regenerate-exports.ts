import fs from 'node:fs';
import path from 'node:path';

// Find the project root directory (where package.json with workspaces exists)
function findProjectRoot(): string {
  let currentDir = process.cwd();

  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.workspaces) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }

  return process.cwd(); // fallback to current directory
}

const projectRoot = findProjectRoot();

// Get package name from command line arguments
const packageName = process.argv[2];

// Package directories to process (relative to project root)
const packageDirs = packageName ? [`packages/${packageName}`] : ['packages/core', 'packages/mitt', 'packages/rxjs', 'packages/all'];

// 除外するファイルパスの配列（パッケージごとに設定可能）
const excludePathsMap: Record<string, string[]> = {
  'packages/core': [
      'utils.js',
      'input/utils.js'
  ],
  'packages/mitt': [],
  'packages/rxjs': [],
  'packages/all': []
};

function isExcluded(relativePath: string, excludePaths: string[]) {
  return excludePaths.some(excludePath => {
    // 正規化されたパスで比較
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const normalizedExcludePath = excludePath.replace(/\\/g, '/');

    // 完全一致または、除外パスがディレクトリの場合はその配下もチェック
    return normalizedPath === normalizedExcludePath ||
           normalizedPath.startsWith(normalizedExcludePath + '/');
  });
}

function scan(dir: string, prefix = '', excludePaths: string[] = []) {
  const exportsField: Record<string, { import: string, types: string }> = {};

  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return exportsField;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const name = entry.name;
    const fullPath = path.join(dir, name);
    const subPath = path.join(prefix, name);

    // 除外チェック
    if (isExcluded(subPath, excludePaths)) {
      continue;
    }

    if (entry.isDirectory()) {
      const subExports = scan(fullPath, subPath, excludePaths);
      Object.assign(exportsField, subExports);
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

  return exportsField;
}

function processPackage(packageDir: string) {
  console.log(`Processing package: ${packageDir}`);

  const fullPackageDir = path.join(projectRoot, packageDir);
  const packageJsonPath = path.join(fullPackageDir, 'package.json');
  const distDir = path.join(fullPackageDir, 'dist');

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`Package.json not found in ${packageDir}, skipping...`);
    return;
  }

  if (!fs.existsSync(distDir)) {
    console.log(`Dist directory not found in ${packageDir}, skipping...`);
    return;
  }

  const excludePaths = excludePathsMap[packageDir] || [];
  const exportsField = scan(distDir, '', excludePaths);

  const pkgContent = fs.readFileSync(packageJsonPath, 'utf8').replace(/^\uFEFF/, ''); // Remove BOM
  const pkg = JSON.parse(pkgContent);
  pkg.exports = exportsField;
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

  console.log(`Updated exports for ${packageDir}`);
}

// Process all packages
packageDirs.forEach(processPackage);

console.log('All packages processed successfully!');

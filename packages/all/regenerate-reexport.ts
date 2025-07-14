import fs from 'node:fs';
import path from 'node:path';

interface PackageExports {
  [key: string]: {
    import: string;
    types: string;
  };
}

interface PackageJson {
  name: string;
  exports: PackageExports;
}

// パッケージ名とディレクトリのマッピング
const packageMappings = {
  '@starlivia/prismatix-input-core': 'core',
  '@starlivia/prismatix-input-mitt': 'mitt',
  '@starlivia/prismatix-input-rxjs': 'rxjs'
};

// srcディレクトリをクリーンアップ（index.ts以外）
function cleanSrcDirectory() {
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name !== 'index.ts') {
      const fullPath = path.join(srcDir, entry.name);
      if (entry.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    }
  }
}

// パッケージのpackage.jsonを読み込む
function readPackageJson(packagePath: string): PackageJson | null {
  const packageJsonPath = path.join(packagePath, 'package.json');
  console.log(`Looking for package.json at: ${packageJsonPath}`);

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`Package.json not found at: ${packageJsonPath}`);
    return null;
  }

  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8').replace(/^\uFEFF/, ''); // Remove BOM
    const parsed = JSON.parse(content);
    console.log(`Found package: ${parsed.name}`);
    console.log(`Exports:`, parsed.exports);
    return parsed;
  } catch (error) {
    console.error(`Error reading ${packageJsonPath}:`, error);
    return null;
  }
}

// ディレクトリを作成
function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// re-exportファイルを生成
function generateReexportFile(filePath: string, exportPath: string, packageName: string) {
  let importPath: string;
  if (exportPath === '.') {
    importPath = packageName;
  } else {
    // Remove ./ prefix if present and add / separator
    const cleanPath = exportPath.startsWith('./') ? exportPath.slice(1) : exportPath;
    importPath = `${packageName}${cleanPath}`;
  }
  const content = `export * from '${importPath}';\n`;
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

// メイン処理
function main() {
  console.log('Regenerating re-export files...');

  // srcディレクトリをクリーンアップ
  cleanSrcDirectory();

  // 各パッケージを処理
  for (const [packageName, dirName] of Object.entries(packageMappings)) {
    const packagePath = path.resolve('..', dirName);
    console.log(`Resolved package path: ${packagePath}`);
    const packageJson = readPackageJson(packagePath);

    if (!packageJson || !packageJson.exports) {
      console.warn(`No exports found for ${packageName}`);
      continue;
    }

    console.log(`Processing ${packageName}...`);

    // exportsを処理
    for (const [exportPath, exportConfig] of Object.entries(packageJson.exports)) {
      if (exportPath === '.') {
        // メインエクスポート: src/{dirName}/index.ts
        const filePath = path.join('src', dirName, 'index.ts');
        generateReexportFile(filePath, exportPath, packageName);
      } else {
        // サブエクスポート: src/{dirName}/{exportPath}.ts または src/{dirName}/{exportPath}/index.ts
        const cleanExportPath = exportPath.startsWith('./') ? exportPath.slice(2) : exportPath;

        // ディレクトリ構造に応じてファイルパスを決定
        if (cleanExportPath.includes('/')) {
          // ネストしたパス（例: key-map/types）
          const filePath = path.join('src', dirName, `${cleanExportPath}.ts`);
          generateReexportFile(filePath, exportPath, packageName);

          // ディレクトリのindex.tsも生成（例: src/core/key-map/index.ts）
          const dirPath = path.dirname(cleanExportPath);
          const indexPath = path.join('src', dirName, dirPath, 'index.ts');
          generateReexportFile(indexPath, `./${dirPath}`, packageName);
        } else {
          // 単一レベルのパス（例: input, types）
          const filePath = path.join('src', dirName, `${cleanExportPath}.ts`);
          generateReexportFile(filePath, exportPath, packageName);
        }
      }
    }
  }

  console.log('Re-export files regenerated successfully!');
}

main();

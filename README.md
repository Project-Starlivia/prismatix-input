# prismatix-input

[English](README_EN.md) | [日本語](README.md)

## 概要
webの入力の統合・拡張するライブラリ。

やってて不便だと感じたので作った。なるだけ遅くならないように作ってるけど、純粋に1層噛むのでパフォーマンスは多分落ちる。拡張性も比較的高いほうだけど、明確な縛りはある感じ。

名前は入力を集めたり拡散したりするイメージ。

## インストール

```bash
# メインパッケージをインストール（全ての統合を含む）
npm install @starlivia/prismatix-input

# または個別パッケージをインストール
npm install @starlivia/prismatix-input-core      # コア機能
npm install @starlivia/prismatix-input-mitt      # Mitt統合
npm install @starlivia/prismatix-input-rxjs      # RxJS統合
```

## NPMパッケージ
- [`@starlivia/prismatix-input`](https://www.npmjs.com/package/@starlivia/prismatix-input) - 全ての統合を含むメインパッケージ
- [`@starlivia/prismatix-input-core`](https://www.npmjs.com/package/@starlivia/prismatix-input-core) - コア機能
- [`@starlivia/prismatix-input-mitt`](https://www.npmjs.com/package/@starlivia/prismatix-input-mitt) - Mitt統合
- [`@starlivia/prismatix-input-rxjs`](https://www.npmjs.com/package/@starlivia/prismatix-input-rxjs) - RxJS統合

## 今後
- 他のOSS作りたいため、しばらくアプデとかはしないかも...
- issue/pull request頂ければできる限り対応いたします

今後拡張するとしたら
- middleware
  - クリック中判定
  - コンボ
- 他のメッセージングライブラリ統合
トカかな

### ライセンス
MIT

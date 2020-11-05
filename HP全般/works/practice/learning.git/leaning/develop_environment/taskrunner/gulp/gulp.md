# **$ gulp**

https://ics.media/entry/3290/

Node.js系タスクランナー。
npm init -y -> ローカルフォルダにpackage.json作成
npm install -D gulp -> ローカルフォルダにgulpをインストール -> 現在はグローバルにはインストールせずローカルのみに落とすのが主流
npm install -D gulp-sass -> sassをコンパイルするのに必要なモジュール。
npx gulp -> タスクの実行（gulpfile.jsにてwatch機能追加）
npx view <pkg> version -> packageのversionを表示

## error
'ReferenceError: primordials is not defined'
-> Node.jsとgulpのversionの相性が良くない的な話。
-> npm rm -D gulp でアンインストール後、npm i gulp@4.0.2 -D などversionを指定してインストール。

## ejs (cf. https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9)
- '<% %>' -> 中身はjs仕様。htmlとしては出力されない。
- '<%= %>' -> 中にあるjs変数の値をエスケープ込みで展開。
e.g.: meta情報をオブジェクトで持たせて、展開する。
<% const meta = {title: 'サイトタイトル', desc: 'このサイトは練習用です'} %>
<title><%= meta.title %></title>
<meta description="<%= meta.desc %>">
- '<%- %>' -> エスケープせずに展開する。htmlをタグごと書きたい時など。
- '<%# %>' -> コンパイルされないコメント。
- "<%- include('./_hoge', {param: 'param'}) %>" -> _hoge.ejsをインクルードする書き方。第二引数にパラメータを付与できる。


## 現状いつも入れているプラグイン(2020.08時点)
- gulp  
- gulp-sass
- gulp-ejs
- gulp-autoprefixer -> オートプレフィックス。
- gulp-imagemin
- imagemin-mozjpeg
- imagemin-pngquant -> この3つでセット。
- gulp-sass-glob -> sassファイルを@importするときにglobで`/**`みたいにまとめられる。

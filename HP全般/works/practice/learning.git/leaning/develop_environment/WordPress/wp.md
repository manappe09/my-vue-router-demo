# **$ WordPress My theme**

## set up
チュートリアル -> https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/hosting-wordpress.html
- wget https://wordpress.org/latest.tar.gz -> パッケージのインストール
- tar -xzf latest.tar.gz -> 解凍する
- sudo cp -r * /var/www/html/ -> home/ec2-user 以下にあるwpファイルを、ドキュメントルートディレクトリ以下に移動させる
- sudo wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz -> phpMyAdminのインストール
- sudo tar -xvzf phpMyAdmin-latest-all-languages.tar.gz -C phpMyAdmin --strip-components 1 -> phpMyAdminの解凍
- sudo rm phpMyAdmin-latest-all-languages.tar.gz -> phpMyAdminのインストーラーの削除
- 上記RDSのところからmysqlに接続する
- sudo chown -R apache:apache /var/www/html -> ルートとなるディレクトリのアクセス権限を付与する（更新やプラグインの更新ができるようになる）。
- Apacheの再起動

#### サイトURLの変更
- cf. https://ja.wordpress.org/support/article/changing-the-site-url/


#### PHPインストール
- awsで何も考えずインストールするphpは古い -> amazon linux extrasというパッケージがあり、それを有効化する

- DB [wp-db]-> wpuser:7_Ij+=ruvaP?-s3E6aXU

- パブリックDNS/phpMyAdmin -> phpMyAdminにアクセスできる。（きちんとしたサイトの場合はない方がセキリュティ的に無難）

- mh09:u4HZibNzPsZNFqUIGY
- FTP(rootユーザーで確認できるマイセキリュティ資格情報とかなんとかの情報) ->  アクセスキー（ユーザー）:シークレットアクセスキー（パスワード）->AKIAIVBCEFXWTT7QZGHA:[rootkey.csv] -> manahigurashi直下に作成。

#### 日本語化
- cf) https://ja.wordpress.org/install-ja/
- https://translate.wordpress.org/projects/wp/dev/ja/default/ より.moフォルダをExport。
- 管理画面から「日本語」を選択

#### データベース
- RDSのデータベースに接続、wp用のデータベースとユーザーを作成しWPに設定
@TODO: データベースの紐付けし直し




## WP

- wp-config
  - WP設定用ファイル。sampleをコピーして参考にしながら設定する。
  - MySQLで設定したユーザー名とパスワードを入力、キーを生成してコピペする。
pass: J3EsZLYdYOuYsqLT7t
  - wp-content/uploads
  - パーミッションを777で書き込み可にするとアップロードできる。

#### 自作テーマ
- index.htmlをindex.phpに変換。style.cssは同じディレクトリにないとテンプレートとして認識されない。
- 880x660のscreenshot.pngをindex.phpと同ディレクトリに置くとテーマのイメージ画像に自動で認識される。
- wpファイル等のディレクトリを変更する場合
  - TOP階層のindex.phpの下記ディレクトリに関する記述を変更。
  ```
  <?php
  /**
   * Front to the WordPress application. This file doesn't do anything, but loads
   * wp-blog-header.php which does and tells WordPress to load the theme.
   *
   * @package WordPress
   */
  /**
   * Tells WordPress to load the WordPress theme and output it.
   *
   * @var bool
   */
  define('WP_USE_THEMES', true);
  /** Loads the WordPress Environment and Template */
  <!-- require( dirname( __FILE__ ) . '/wp-blog-header.php' ); -->
  require( dirname( __FILE__ ) . '/wp/wp-blog-header.php' );
  ```

#### テンプレートタグ
- `<?php get_header(); ?>` -> header情報を読み込む。
- `<?php get_stylesheet_uri(); ?>` -> style.cssを読み込む。
- `<?php  add_theme_support('menus');` -> 管理画面にてメニュー項目を追加
- `<?php wp_head(); ?>` -> これをヘッダーには必ず入れる。

#### テンプレート階層
テンプレート（hoge.phpなど）をページ内に表示させる仕組みのこと。
cf. https://wpdocs.osdn.jp/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E9%9A%8E%E5%B1%A4

###### e.g. カテゴリ一覧(category.php)を表示したいとき
1. category-$slag.phpを探索
2. なければ category-$id.phpを探索
3. category.phpを探索
4. なければarchive.phpを探索
5. 2ページ以降でなければindex.php
-> みたいに、順繰りにテンプレートを探し、表示させる仕組み（全該当テンプレートを作る必要ない）。
(https://wpdocs.osdn.jp/wiki/images/wp-template-hierarchy.jpg)

#### ショートコード
functions.php内で定義する。    

e.g.[tw] で下記の関数を呼び出せる例
```
function tw_shortcode() {
  return '<a href="twitter.com">フォローする</a>'
}
add_shortcode('tw', 'tw_shortcode');
```

## WPコンテンツ
#### 投稿記事一覧の取得
cf. https://note.com/koushikagawa/n/nad899f38cf3c

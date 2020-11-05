# **$ MySQL**

- 起動 / 終了
  - sudo service mysqld status -> 実行中と出ればサーバー動いている。
  - mysql -u root -> mysqlサーバーに接続。
  - \q -> 終了
- tips
  - \c -> terminalで次のコマンド打ちたい時

- show databases; -> データベースの表示
- create database -> データベースの作成
- drop database -> データベースの削除
- select database(); -> 選択中のデータベースを取得
- select user(); -> 選択中のユーザーを取得
-> pass: 6AVAkig2

- クエリ -> MySQLにおいてターミナルに入力するコマンドのこと。大文字小文字が区別されない。

- 作業用ユーザーを作る。
- create user username@localhost identified by 'pass';
-> identified by でパスワードを設定。
- grant all on mydb01.* to username@localhost;
-> userに対してmydb01というデータベース以下の全てに対する、全ての権限を与える。
-> ログイン時 mysql -u username -p databasename;でパスワードを入力する。
- FLUSH PRIVILEGES; -> 全ての変更を反映するため、権限をフラッシュする。
=> データベースごとに作業用ユーザーを設定するのが基本！

- ユーザー一覧の確認
-> rootにログインした状態で、select Host, User, Password from mysql.user;

- 作業用ユーザーの削除
-> rootユーザーに入り直す。
-> drop user username@localhost;

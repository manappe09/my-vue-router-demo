# **$ AWS**

## 設定
- 請求アラートの設定 -> 設定 -> 請求アラートを受け取る
- SNS(Single Notification Service) -> トピックと呼ばれるアドレスリストに、指定した条件（メトリクス）を満たしたときにアラートを通知する。
- IAMユーザーの追加 -> ポリシー（権限）を、使いたいサービスのみにする。IAMというサービスからグループを作り、そこにユーザーを作成し追加していく流れ。
- パスワードポリシーも指定。
sign in: https://169645118085.signin.aws.amazon.com/console
pass: 3mMc$%=jcSLt
-> 作業用ユーザーはログイン後、アカウント名が＠hogehogeになっていることを確認。


## Cloud9
IDE -> 統合開発環境のこと。

#### OSの更新
Red Hat系 ->

1. sudo yum -y update -> OSを最新に更新。-y: 選択肢を自動でyesにしてくれる。
2. タイムゾーンの設定 -> コマンド'date'を叩くとUTCになっているので日本時間に設定。
  -> sudo vi /etc/sysconfig/clock でviを起動。UTCの部分を'Asia/Tokyo'に。
3. sudo ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime ->  2で設定したタイムゾーンをローカルタイムに設定。
4. sudo reboot -> リブートをかける（再起動する）。

#### phpでの開発
1. touchでファイルを作成
2. コードを書いたら右上のRunでビルドインサーバーを立ち上げる
3. Previewで実行結果を見ることができる

## EC2(Elastic Compute Cloud) -> 仮想サーバー
1. リージョンの選択 -> 東京を選択
2. インスタンスの立ち上げ
2-0. (Classic Wizardが一番わかりやすいらしい、、けど新しくなったUIだと選択画面がない。ちょっとわからん。飛ばす)
2-1. マシンイメージ(AMI)の立ち上げ: Amazon Linux AMIで。
2-2. インスタンスの設定やらストレージの追加やら、タグの設定をする
2-3. セキュリティグループを設定。: 仮想ファイアウォール
-> VPC: 仮想プライベートネットワーク
-> ようわからんので、ひとまずSSHのマイIPで。
-> WEB用のhttpも開ける。

-> 立ち上がると、NavigationにVolume,EBSができる。
3. 接続 -> スタンドアロンSSHクライアントで。ターミナルで表示されたコマンドを打ち込んで接続。
3-1. 仮想サーバーの各種設定:
- sudo yum -y install httpd php mysql -> webサーバー/php/mysqlをinstall
- sudo service httpd start -> webサーバーを起動
- sudo chkconfig httpd on -> サーバー起動時に自動的にhttpdも起動させる。
- service httpd status -> サーバーの起動状況を確認
- sudo vim /var/www/html/index.html -> index.htmlをこのパスで作成。

#### キーペアについて
- キーペア欄から秘密鍵ファイルを作成
- mv ./Downloads/manahigurashi/[my-key-pair].pem . -> ホームディレクトリに移動。
- chmod 600 [my-key-pair].pem -> パーミッションを600に設定。
- インスタンスに紐付ける。

#### イメージの作成
- インスタンスのイメージを作成 -> 内部的には、インスタンスがシャットダウンしてsnapshotを作成し、イメージを作成している。
- Elastic IPs -> イメージを作るとURLが変わる。IPアドレスを割り当てる。
  - Actionsから割り当てを実行。対象のインスタンスに割り当てる。
  - EC2に結びついていないと課金対象なので、使わない場合は外しておく。

#### スナップショットの作成
- ボリュームまたはインスタンスからスナップショット(= 現状態のバックアップ)を取る。 -> ここからイメージを作成し、インスタンスを作成する。

---------------------------

## RDS(Relational Database Service) -> データベース
dbuser: sUKuecEGOdh628jrmHTC
- Multi-AZ Deployment をYESにするとDBのホットスタンバイみたいなものを別のAZに作ってくれる。 (AZ = Availability Zone) -> 冗長性の確保。
- 立ち上がったら、エンドポイントをコピーしておく
-> mydbinstance.czje8mk2znv7.ap-northeast-1.rds.amazonaws.com
- スペックの変更は、選択して「変更」を押すだけ

#### EC2から接続する方法
- EC2に設定したセキュリティグループと同じセキュリティグループを設定する -> 接続可能になる。
- セキュリティグループの詳細ページへ行き、インバウンドルールを追加する。タイプ[MySQL]でソースにEC2に設定したセキュリティグループIDを割り当てる。
- EC2へ移動し、サーバーに接続。
- mysql -h [上のエンドポイント(host)] -u [上のuser名] -p -> passを入力して接続



---------------------------

## サーバーの増設
- 元となるインスタンスからイメージを作る。 (AMI)
- イメージから「起動」でインスタンスを立ち上げる。
- AZを違うものを設定する。 -> 「サブネット」。S3にアップロードすると自動的に複数のデータセンター（AZ）に複製される。

#### ロードバランサー
-> サーバー間の負荷分散をしたりなんだりしてくれる。
- タブメニュー「ロードバランサー」から新規作成。
- つなげたいインスタンス同士を選択し実行。
-> 紐づいているTargetGroupに両インスタンスを追加。

---------------------------

## S3(Simple Storage Service) -> ストレージ
- 容量気にしなくていい、安全安心、高速という特徴

#### 手順
- Bucketを作成 -> アップロード -> パーミッション設定をpublicに。
-> アカウント自体のブロックパブリックアクセスがデフォルトで設定されていてpublicにできないので、変更。アカウントレベル、bucketレベル共にブロックパブリックアクセスの設定があるので注意。
- obのLPのimgURLもS3だった。。
-> S3のbucket名がドメイン部分。※Route53でルートドメインで登録の仕方がわからん。サブドメインでの登録になる。
-> ドメイン部分に独自ドメインを割り当てられるけど(CNAME)、ドメイン名がhttpに限定される。httpsを使いたい場合は避ける。

#### SDK (Software Development Kit)
- WEBで入れたいパッケージなどを検索しDL。

#### webサイトをホストする
- bucket名をドメイン名に
- AWS PolicyGeneraterで、WEBサイト公開用のポリシーを「アクセス権限」にコピペして保存
- 「プロパティ」のStatic Website Hostingでホストを有効化。

- ARN(Amazon Resource Name) -> AWSリソースを一意に識別。

## 独自ドメインと紐づける方法
#### サイト側のインスタンスのElastic IPを設定。
- エンドポイントのURLは都度更新される。
  - 固定する必要がある

#### Route53にドメインを移管 -> DNSを管理する？
- ホストゾーンの作成 -> 取得したドメイン名を入力して作成
- インスタンスに割り当てたElastic IPで「レコードセットの作成」からAレコードを登録する。
- 取得したドメインのサービス側でNSレコードを設定。
1. お名前.comの場合 -> ドメイン機能一覧 > ネームサーバーの設定
2. Route53側で設定したホストゾーンのNSを全て設定。
3. ちゃんと紐づいているか確認
  - dig YOUR_DOMAIN_NAME -> Aレコードが表示されればOK
  - dig YOUR_DOMAIN_NAME NS @8.8.8.8 -> NSレコードが表示されればOK
- ルートアカウントで入り、アカウント名「マイセキュリティ資格情報」（rootユーザー）からアクセス証明書を発行、コピーした情報をcyberduckへ登録する。
  - CNAMEを設定。S3で設定したバケット名と同じドメインをnameに入力。バケットのエンドポイントを設定。数分後に見れるようになる？？


cf) DNS -> Domain Name System. IP同士で従来は繋がっているサイト等に、ドメインという固有名詞をつけることでわかりやすいアクセスを可能にするシステム。(?)


## Basic認証かける
- httpd -v -> apacheのversion
#### PHP使えるように？してルートパスを確認する -> httpd.confの中にルートパス書いてある
- sudo vim /etc/httpd/conf/httpd.conf -> Apacheにアクセス。sudoをつけないと読み取り専用になり更新できない。
- LoadModule php73_module modules/libphp73.so -> httpd.confに追加。
- AddType application/x-httpd-php .php -> httpd.confに追加。
- service httpd configtest -> Apache設定チェック。OKならOK。
- sudo service httpd restart / sudo systemctl restart httpd -> httpd再起動。

#### Apache直接いじって(?)Basic認証かける(WPでパーマリンク有効にするためにも必要)
- sudo vim /etc/httpd/don/httpd.conf
  - /var/www/htmlの'AllowOverride None' -> 'AllowOverride All'へ書き換える。
  - 下記のように/var/www/html内にbasic認証の記述をして保存。
```
AuthUserFile /var/www/html/.htpasswd #自分の環境に合わせる
AuthName “Please enter your ID and password”
AuthType Basic
require valid-user
```

- sudo htpasswd -c /etc/httpd/htpasswd [user-name] -> htpasswdを設定。任意のユーザー名。
- アクセス権限の変更
  - cat /etc/httpd/htpasswd -> 設定したhtpasswdファイルを確認（passは暗号化されている）
    - cf. https://qiita.com/t-a-run/items/239ed690ece7a011804a
  - chown apache:apache /etc/httpd/htpasswd -> 所有者変更。Apacheのみアクセスできるように。

- sudo apachectl configtest -> apacheで設定を変更した時にチェックできる。

- webplayground -> mnp_home:pass0705
- status
  - EC2 -> stopped
   ボリューム -> デタッチ
- mariadb root pass: 8utHavl+-!&u31lFrOfr
  - wp-user: !-5s&axi@R2k3Sw6Vo&7 -> DB `wp-db`を作成、ユーザーに割り当て。
- mysql dbuser: sUKuecEGOdh628jrmHTC
- systemctl status mariadb.service -> mariadbが起動しているか確認。
- sudo systemctl start mariadb -> DBを起動。

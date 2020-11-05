# **$ ローカル開発環境**

- virtualbox -> ローカル開発環境作ってくれる。
- vagrant -> virtualboxのタスクランナー的なもの。いずれも公式サイトからDL。
- terminalのPC名変更 -> mac > cmd + ; > 共有 > name: mbp
- vagrant boxを追加-> vagrant box add bento/centos-7.1
- vagrant初期化(仮装マシン設定用のVagrantfileを作る)  -> vagrant init bento/centos-7.1
- Vagrantfileを編集してvm(仮想マシン)のIPアドレスを192.168.33.10とかにする -> コメントアウトになってる部分
-> sed -i '' -e 's/# config.vm.network "private_network", ip: "192.168.33.10"/config.vm.network "private_network", ip: "192.168.33.10"/' Vagrantfile
- config.ssh.insert_key = false -> boxをコピペしたときに同じ鍵ファイルを使う。
- vagrant reload -> 再起動。
- vagrant up -> 仮想マシンの立ち上げ
- vagrant status -> vagrantの状態
- vagrant ssh -> サーバーにログインできる。冒頭が[vagrant]になってればOK。
- vagrant halt -> vagrant停止。
- vagrant package -> boxの作成
- vagrant box list -> box一覧
- vagrant box remove [ex.bento/centos-6.8] -> boxの削除
- vagrant destroy -> vagrantの削除。Vagrantfileとか.vagrantとか消えない。
- vagrant plugin list -> 入っているプラグインの確認
- cat /etc/redhat-release -> centosバージョン確認
- vagrant plugin install vagrant-hostsupdater -> 好きなドメイン名をつけるのに必要なモジュール。

## 用語
- ホストOS -> SSHで接続する側のOS。Macとか。
- ゲストOS -> 接続される側のOS。CentOSとか。

## Vagrantfile config
下記の部分をコメントアウト、追記。
```
# Create a private network, which allows host-only access to the machine
# using a specific IP.
config.vm.hostname = "local.stevejobs"
config.vm.network "private_network", ip: "192.168.33.10"
```
- config.vm.hostname = "obbs.demo" -> ホスト名をわかりやすく変更
- config.vm.synced_folder "/Users/testuser/projects/app", "/home/vagrant/app" , type: "virtualbox" -> ローカルのファイルと同期
- sudo ln -s /vagrant/[appとかリンクさせたファイル] /var/www/html -> シンボリックリンクを作成。/home/vagrantと/var/www/htmlのリンクをしてサーバーで見れるように。
  - unlink .hogefile -> シンボリックリンクの解除。
<!-- cf. https://qiita.com/tiwu_dev/items/f135e6b6fbbe3ec6aa54 -->


## VirtualBox上での共有フォルダ設定
<!-- - VirtualBox起動。GUIより設定>共有フォルダ>「自動マウント」にチェック。
- rootでしか入れなくなるので、vagrant上で下記の流れで権限を付与。
  - sudo su - -> rootユーザーでログイン。
  - sudo gapasswd -a アカウント名[vagrant] vboxsf -> vboxsfグループに追加。 -->
- ゲストOSの機能向上ができるGuest Additionsをインストール。共有フォルダの設定に必要。
  - Guest Additionsを管理するためのvagrant-vbguestというプラグインを入れる。

```
# インストール
$ vagrant plugin install vagrant-vbguest

# アンインストール
$ vagrant plugin uninstall vagrant-vbguest
```

#### 詰まったメモ
- vagrant-vbguestでGuest Additionsをインストールしたものの、vagrant reloadができない。カーネルのバージョンが揃っていないとかなんとか。 -> ゲストOS(Vagrant側)に入り、下記コマンドを実行。
```
sudo yum -y update kernel
sudo yum -y install kernel-devel kernel-headers kernel-tools kernel-tools-libs
```
  - カーネルのパッチ番号を確認
  ```
  rpm -qa kernel\* | sort
  ```
  - 下記が揃ったらOK。
  ```
  kernel-3.10.0-[693]... <- ここ
  kernel-headers-3.10.0-[693]... <- ここ
  ```

## 開発環境にいろいろインストール(cf. https://qiita.com/nemui_/items/de5dd5feee95e60aa264)
- sudo yum -y update -> OSを最新にアップデート
- sudo yum -y install git -> git 入れる
- sudo yum install php
  sudo yum install httpd -> php, Apacheのインストール
- sudo service httpd start -> サーバーの起動
- sudo chkconfig httpd on -> サーバー起動時に自動的にhttpdも起動させる。 = sudo systemctl enable httpd.service
- service httpd status -> サーバーの起動状況を確認
- $ sudo vi /etc/httpd/conf/httpd.conf -> Apacheでphpを有効化する
  - この記述を探し、
  ```
  AddType application/x-compress .Z
  AddType application/x-gzip .gz .tgz
  ```
  - この記述を追記
  ```
  AddType application/x-httpd-php .php
  AddType application/x-httpd-php-source .phps
  ```
  <!-- - chown apache:apache /var/www/html -> apacheユーザーにのみ権限付与。 -->
- phpのバージョンアップ -> EPELとREMIのリポジトリを有効化
  - sudo yum install epel-release
    - 設定ファイル内の記述を変更しないと有効化できない可能性。（https://chusotsu-program.com/cannot-retrieve-metalink/）
  - sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
  - sudo yum remove php-* -> 現在のphpを消去
  - sudo yum install --disablerepo=* --enablerepo=epel,remi,remi-safe,remi-php73 php -> 7.3.Xのインストール
  - sudo yum install --disablerepo=* --enablerepo=epel,remi,remi-safe,remi-php73 php-mbstring -> パッケージを元に戻す
- service httpd configtest -> Apache設定チェック。OKならOK。
- sudo service httpd restart / sudo systemctl restart httpd -> httpd再起動。


<!-- // - dotinstallで用意してくれたスクリプトを実行する
//   - # gitを使ってアプリケーション設定用のスクリプトをダウンロード
//   -> git clone https://github.com/dotinstallres/centos6.git
//   - # centos6フォルダができるのでそちらに移動
//   -> cd centos6
//   - # スクリプトを実行（時間かかります）
//   ->./run.sh
//   - # もろもろの設定を反映
//   -> exec $SHELL -l -->

- cyberduck 入れる。ブラウザからDL。なんだろう。FTPとかのまとめられてるやつっぽい。。
-> 起動し、sftp(ssh接続のftp)で新規サーバー接続。
-> vagrantで作った場合、自動的にID:pass = vagrant:vagrantになる。
- 学習の流れ
  1. 仮想マシンを立ち上げ、cyberduckに登録する。
  2. 学習用のフォルダを作成。
  3. php側で用意しているwebサーバーというのをターミナル上で立ち上げる。
    -> サーバー上の作業ディレクトリへcdで移動、php -S 192.168.33.10:8000と入力してURLを叩く。
  4. ローカルで変更した中身が、仮想サーバーを通じてブラウザ上で確認できる。
  5. 終了時は、ctrl + CでPHPのWebサーバーを停止し、'exit'を押して仮想マシンからログアウト。さらにvagrant suspendとして仮想マシンを停止させる。
- vagrant ssh-config -> vagrantの設定あれこれが確認できる。ここから鍵ファイルの場所を指定して秘密鍵認証も可能。
- sudo usermod -G root vagrant -> vagrantのrootユーザーに権限を許可。
- [ssh] ls -ld /var/www/html -> ドキュメントルートのアクセス権、所有権情報を確認。ルートに変更する。
  - group -> グループの確認。vagrant rootになっていればおけ。
- [ssh] sudo chmod -R 775 /var/www/html-> 書き込み可にする。


## Docker -> 軽量な仮想環境を実現するためのツール。
- 本来は、手元のpcの環境とアップ先のサーバーの環境を揃える必要がある（PHP等のverやOS等）
- Dockerの「コンテナ」上に仮想環境を構築し、1マシンのように使うことができる。かつ、それをサーバー上にも持っていくことができる。
- くじらアイコンができる。かわいい。これがrunnigになっていることを確認。
- docker-compose up -d -> 起動。初回は時間かかる。localhost:8080(/index.html)でアクセス可能に。



#### DockerとVagrant
- vagrantは起動に時間かかるけどサクサク
- Dockerは起動早いけど処理時間かかる



## 開発環境について
#### 一般的な開発の流れ
https://qiita.com/nemui_/items/de5dd5feee95e60aa264

#### box add後
- Vagrantfileよりファイルの同期、IPの変更
- php, Apache入れる
- /etc/hosts を編集してホスト名変更

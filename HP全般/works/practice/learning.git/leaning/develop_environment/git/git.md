# **$ git**

* must knowledge
- Linux
- vim(editer)

- git config -> 設定あれこれ
-> user.name, user.email など
- git config --local(global) user.name "XXXX" -> ユーザー名を指定。個人用ならlocalでユーザー変更する。
- git config --local(global) user.email "XXXX@hogehoge.com" -> アドレスを指定。
-> color.ui: gitの色分けができる
-> -l : 設定一覧が見れる
- git init -> gitで使うよ！という宣言。まず最初にやる。
- git add -> stagingに上げる (index)
-> git add . : 今のディレクトリ 以下のファイルを全てaddする
- git commit -> コミットする（エディタが立ち上がる） -> vimでコミットメッセージを入力し保存。
-> -m -> コメント１行くらいで簡易的にコミットできる。
-> --amend -> 変更の意。直前のコミットを簡易的に変更する。
- git log -> コミットの履歴を見れる。
-> options:
-> --oneline: 1行でコミットメッセージを表示
-> -p: 変更箇所を詳細に見れる
-> --stat: どこのファイルが何箇所変わったか
- *git status -> 作業ディレクトリ、ステージングエリア、リポジトリのどこあるかを表示。次に何をすべきか教えてくれる
- git restore -> 変更履歴を削除する
- git diff -> まだステージングエリアに上げていない差分を表示
-> git diff --cached -> ステージングエリアには上がっていてコミットされていないファイルの差分を表示
- git rm -> gitの管理下にあったものを削除/移動させる。
- vim .gitignore -> 作業ディレクトリに作る -> git管理に含めない設定を適用。置いた場所以下のディレクトリ全てに対して適用。
- git reset -> 以前のverに戻りたい時。
-> --mixed：commitとaddの取り消し。
-> --soft：commitのみ取り消し。
-> --hard : 作業ディレクトリもステージングエリアも一気に戻したい場合。直前のコミットはHEADで表せる。
-> --hard HEAD : 直前のコミットメッセージのところまで強制的に戻る。
-> --hard HEAD^ or --hard [commit ID(最低7桁以上テキトーな桁数でコピペ)]: 2つ前とかのコミットに戻る
-> --hard ORIG_HEAD : 前回取り消されたHEADの情報が保存されているので、戻すことができる
- git branch -> 現存するブランチを一覧で見れる。後に続けて新規のbranch名を入れると新たにブランチを切れる。
- git checkout -> 作業ブランチを移動する。
-> git checkout -b -> 新規でブランチ切りつつ移動してくれる。
-> git checkout [remote branchname] -> 最新のバージョンでは、リモートのブランチをローカルに作成できる。
- git merge develop -> マージさせる（混ぜる）。マージさせたい大元のブランチの方へ行き、マージさせたい先のブランチ名を入力する。この場合、developにmasterをマージさせるので、developの変更内容がmasterにも降りてくる形。
- git branch -d -> deleteの略。不要になったブランチを削除する。
- git branch -a -> ブランチ一覧を見れる。リモートも。

// コンフリクト 同じ部分を違うブランチでいじってしまった場合 -> mergeするとコンフリクト
- vim で編集。 -> コンフリクトのうち取りたい方を採択して残す。あとは消して保存。
- 通常通りステージングにあげてコミットするだけ。

// タグ -> ID名で判別されてるコミットに固有の名前をつけられる。
- git tag -> tag一覧を表示。
- git tag v1.0(ex) -> 直近のコミットにv1.0というタグをつける。
- git show v1.0 -> タグ名を指定してコミットの内容を表示。他にもreset等もできる。
- git tag v0.9 ~ -> 直近でないコミットは、後にコミットのID適当な桁数を貼り付ける。
- git tag -d v0.9 -> タグを削除。

// エイリアス（短縮名）
- git config --global alias.co checkout -> 最後につけたコマンドを直前のエイリアスで登録

// 共有

-> .gitは空のワークスペース。ここでpush等の作業を行わない。
-> 作業ディレクトリ内でもgit initする

- git init --bare -> 共有リポジトリの宣言。管理ファイルのみが管理され、この中ではコミット等は行われない。
- git remote add origin ~/ourweb.git(git URL)
-> リモートにoriginという共有リポジトリ を作成。反対にrmもできる。
-> URLにoriginという名前をつける
- git remote -v -> リモートリポジトリを取得
- git push origin master -> プッシュする構文。git push [remote] [branch]。originにmasterの内容を突っ込む。
-> git push -u -> 現在のbranchの上流ブランチを本プッシュ先のリモートのブランチにしてくれる。次回からgit branchのみで良くなる。
-> git push -d -> リモートへの直前のプッシュを消したいとき。リモートが最新だけど強制的にpushする。
- git clone ~/ourweb.git/ myweb2 -> ourweb.git というディレクトリの中身をmyweb2にするという意味。
-> cloneで関連づけたリポジトリに対しては、push時にリポジトリを指定しなくても自動で紐づく。
- git pull origin master -> プルする。他の人の変更をマージしてくれる。
-> git pull origin pullしたいリモートブランチ名:ローカルブランチ名 -> master以外のブランチのpull
- git commit -am'message' -> -a(add)m(message): addとコミットを同時にしてくれる
- git fetch -> リモートの更新情報をローカルに持ってくる。リポジトリ名は自動的に'origin/master'となり、ブランチは'FETCH_HEAD'となる。
-> git log でリモートの変更履歴を見ることができる。

## トラブルシューティング
#### Repository Not Found
- https接続でアカウントを切り替えたりしたことが原因。 -> SSHに切り替える。
  - git remote set-url origin [git@github.com:xxx/abc.git]
- ssh認証用の公開鍵/秘密鍵を生成、id_rsa.pubファイルをgithubに登録(cf. https://qiita.com/redamoon/items/07e445d1fce360cb5fa3)


## 取り消す
- git checkout [commit number] [file] -> 現在のコミット内容に戻す

## bare repository / non-bare repository

#### bare repository
- bare -> 裸の、剥き出しの
- ワーキングディレクトリを持たず、更新情報のみを持つ。末尾に.gitとかつける。
- ローカルからのpushを受け取り、ノンベアリポジトリにpullされることで更新情報を引き渡す。

#### non-bare repository
- ワーキングディレクトリを持つ。
- 本番反映情報を持つ。ノンベアリポジトリとは基本直接やりとりしない。

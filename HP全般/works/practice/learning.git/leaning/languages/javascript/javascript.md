# **$ javascript**


配列の操作をする関数
forEach() -> 配列のそれぞれの値に対してアクセスできる。数値型で返す。
map() -> 配列を扱って、また配列として返す。
filter() -> 配列を絞り込み、また配列として返す。

文字列に関するメソッド
indexOf(searchvalue[, fromIndex]) -> fromIndex番目から数えて、配列内でserchvalueの文字列は何番目に出てくるか？を取得。


オブジェクト/プロパティの操作をする関数
object名.key名 -> オブジェクトの特定のプロパティの値にアクセスできる。
Object.keys() -> 各プロパティのkeyを配列として取得する。

## documentインターフェイスによるURL取得
-> document.location -> documentのURL情報を持つLocationオブジェクトを返す。URL情報を文字列で返すtoStringメソッドを提供し文字列っぽく扱えるけど、利用時には明示的にtoStringする必要がある。
-> document.URL -> 読み取り専用。ドキュメントの場所を文字列で返す。ただ取得したいだけの場合など。

if(document.URL.match('/hoge')) {}
-> 特定のURLでのみ発火。条件分岐で使う。
cf. document.URL / document.documentURI / document.URL.indexOf(n番目)

// @TODO: other props wanna try
- document.lastModified -> 最終更新日時
- document.cookie
- document.refferer

## URI / URL の違い
-> URI (Uniform Resourse Indentifier) - 名前または書き方を識別するルールの総称。
-> URL (Uniform Resourse Locater) - ページの場所やアクセス方法を示す。

URI
┣ URL
┗ URN - 名前を永続的に識別。

#### about URL
- https: -> スキーム。この場合はhttpプロトコルを使うことを明示している。(cf. flie:, ftp:, ...)
- hogehoge.com/foo/index.html -> オーソリティ。アドレスの根幹部分。
  - hogehoge.com -> ホスト。アクセス先のサーバー名。
  - foo/index.html -> パス。httpプロトコルではサーバーの公開領域内での


# **$ Object**

## オブジェクト {プロパティ1(or key): 値1, プロパティ2(or key): 値2} -> この塊は要素。



ランダムな整数値を生成する公式
(0〜nまで)
Math.floor(Math.random() * (n + 1));

(min〜maxまで)
Math.floor(Math.random() * (max + 1 - min)) + min;


日付の扱い
const d = new Date();

d.getFullYear(); -> 年
d.getMonth(); -> 月 - 1 (0月始まり)
d.getDate(); -> 日にち
d.getDay(); -> 曜日のindex (0が日曜日)
d.getHours(); -> 時間
d.getMinutes(); -> 分
d.getSeconds(); -> 秒
d.getMilliseconds(); -> ミリ秒

Date.now() -> UTCでの現在までの経過ミリ秒。
-> UTC 1970/1/1 00:00:00



Math.hogehoge //とか -> Number型に対して標準装備されてるメソッドってところか
Object.hogehgoe // とか なんだろう -> Object型のデータに対して使えるメソッドってところか

-> javascriptで、各データ型に標準で定義済みのメソッドって考えてればいいかな。



# **$ DOM**

javascriptで操作できるのはDOM. -> htmlを書き換えるわけではない
html内の字下げの空白や改行もNodeとして認識される。 -> ただし、先頭と末尾のものは無視される。

## 要素の取得方法いろいろ
// よく使うやつは大体HTMLCollectionを返す。-> 要素をリスト化した配列っぽいもの。
getElementById,
querySelector,
querySelectorAll, // NodeListを返す。
getElementByTagName, // querySelectorAllで代用可能
getElementByClassName, // querySelectorAllで代用可能
childNodes, // スペースや改行も含む -> NodeListが取得できる。
children, // 子要素全て。スペースや改行は含まない。 -> HTMLcollectionが取得できる。
firstChild, // 最初の子要素
firstElementChild // 最初の要素エレメントのみ
parentNode // 親Node
nextSibling // 1つ次の兄弟要素
nextElementSibling
nodeName // 要素ノードの場合、要素名が取得できる。htmlでは大文字で。

Array.from(HTMLCollection) // -> これで配列可できる。
-> *jQuery: get()でjqueryオブジェクトを通常の配列化できる。

## 要素の操作いろいろ
- removeChild() -> 指定した子Nodeを削除する。メモリには残っており削除した子Node自身を保有するが、特に保持しなかった場合破棄される。


# **$ thisについて**

- 厳格モードと非厳格モードでも異なる。 -> 厳格モードでは、関数内等ではthisが何か明示されていないとundefinedになる。
1. コンストラクタの親(?)にアクセス。
e.g.
const test {
  data: 10;
  func: function() {
    return this.data;
  }
}
2. グローバルコンテキスト（全ての関数の外側）においてはグローバルオブジェクトを指す。 -> windowのことっぽい。
3. 関数内では、call()やapply()によってthisを明示する（厳格モード）。
e.g.



# **$ knowledge**

- MVC -> ModelViewControls. データベースと、見た目とその中間の仲介を分離する考え方のフレームワーク。

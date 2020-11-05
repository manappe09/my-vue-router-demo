# **$Google Apps Script**

## Docの見方
- https://developers.google.com/apps-script/guides/triggers/events
  - Event Objectの概要ページ。
  - セクションごとにスプレッドシート、ドキュメント、スライド、フォーム…というようにツールごとの受け取れるオブジェクトに関する説明が記載。
    - その中でさらにOpen時か、Send時か…といった具合にセクション分けがある。
    - 各項目が表すのは、そのプロパティには何が含まれているか（メソッドのように実行することで、何が返されるか？）が説明されている。
    - e.g.) Form -> response なら、FormResponse Objectが返される。さらにFormResponse Objectページに飛ぶことで、そのオブジェクトに用意されているメソッドと、何ができるかを見られる。
    ```
    const itemResponses = e.response.getItemResponses();
     -> e.response == FormResponse Objectであるということ。
    ```
    

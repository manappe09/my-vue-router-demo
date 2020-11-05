# **$CSS**
## 謎の余白の正体
- インライン要素は要素の下に余白を持つ。親が`display: block`の時に見られる現象。解決方法は下記。
  - 親要素のfont-sizeまたはline-heightを0にする。
  - 中のインライン要素に`vertical-align: bottom`を適用。
  - 中のインライン要素に`display: block`を適用。

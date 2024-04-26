# Idempotent Dice

結局神がサイコロを振るのか振らないのかは私は知りませんが、Hash 関数でできたサイコロには再現性があります。
つまり、何かのイベントが起きた時刻や紐付いた URL を利用すると再現可能で完全な乱数を利用できます。

https://idempotent-dice.burion.net/

<img src="https://github.com/buri83/idempotent-dice/blob/main/dist/image.png" height="540px">

# 使い方

## Entropy

乱数の素になるテキストを入力します。これが Hash 関数の入力になり乱数を生成します。

## Branches

ここに選択肢を行区切りで入力します。実行するとこの中から一つが選び出されます。  
Copy URL をクリックすることで結果を共有できる URL をクリップボードへコピーします。

### checksum

branches の入力値を 0~999 のチェックサムを計算します。Branches の内容が変更されると値が変わります。

# オンライン・ダイス・プロトコル

この Idenpotent Dice を利用したオンライン上での正しいサイコロの振り方は以下のような流れになる。この手続きを踏むことによってオンライン上で平等にサイコロを振ることができる。

1. Choices にメンバー全員の名前を入れて「Roll Dice」をクリックする
2. checksum を各自メモを取る
3. Entropy に入力する、イベント識別子を決め同意する。この説明では例として「メッセージの送信時刻」を用いる。
   - 改ざんが不可能・難しいものであればあるほど望ましい
4. YYYY-MM-DD HH:MM:SS に slack 上で何かサイコロを振りたいイベントを発生させるメッセージが投稿された
5. Entropy にイベント識別子 `YYYY-MM-DD HH:MM:SS` を入れ「Roll Dice」をクリックする
6. 結果を slack 上で共有する
7. 他のメンバーは Entropy が適切であり checksum が正しいことを確認する
8. 問題ない場合はその結果は正当なものとする。誤りがある場合はダイスの振り直しを要求できる。

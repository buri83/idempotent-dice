# GetDestiny

神がサイコロを振るのか振らないのかは知らないですが、Hash 関数でできたサイコロには再現性があります。
つまり、何かのイベントが起きた時刻や紐付いた URL を利用すると再現可能で完全な乱数を利用できます。

https://get-destiny.burion.net/

<img src="https://github.com/buri83/get-destiny/blob/main/dist/image.png" height="540px">

# 使い方

## Entropy

乱数の素になるテキストを入力します。これが Hash 関数の入力になり乱数を生成します。

## Branches

ここに選択肢を行区切りで入力します。実行するとこの中から一つが選び出されます。

### checksum

branches の入力値を 0~999 のチェックサムを計算します。Branches の内容が変更されると値が変わります。

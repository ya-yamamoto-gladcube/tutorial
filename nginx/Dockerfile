# nginx/Dockerfile

# Nginxのベースイメージを使用
FROM nginx:alpine

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Reactアプリのビルド成果物をコピー
# 後でdocker-composeでボリュームを使ってマウントしますので、ここではコピーしません

# 必要に応じてSSL証明書をコピー（HTTPS対応の場合）
COPY certs /etc/nginx/certs

# ポート80（および443）を公開
EXPOSE 80
EXPOSE 443 
# HTTPSを使用する場合

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]

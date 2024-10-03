# Nginxのベースイメージを使用
FROM nginx:alpine

# Nginxの設定ファイルをコピー
# COPY nginx.conf /etc/nginx/conf.d/default.conf # docker-composeでマウントするため不要

# 必要に応じてSSL証明書をコピー（HTTPS対応の場合）
COPY certs /etc/nginx/certs

# ポート80および443を公開
EXPOSE 80
EXPOSE 443 

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]

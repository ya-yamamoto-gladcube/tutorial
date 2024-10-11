# ビルドステージ
FROM node:18-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app/gomoku

# 依存関係のインストール
COPY gomoku/package.json gomoku/package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY gomoku ./

# アプリケーションをビルド
RUN npm run build

# 実行ステージ
FROM nginx:alpine

# ビルド成果物をコピー
COPY --from=build /app/gomoku/build /usr/share/nginx/html

# Nginxの設定ファイルをコピー
# COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ポートを公開
EXPOSE 80
EXPOSE 443

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]

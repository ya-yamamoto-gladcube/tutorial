# 変数定義
APP_NAME := tutorial-app
DOCKER_IMAGE := $(APP_NAME):latest
DOCKERFILE := Dockerfile

# ビルド用ターゲット
.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE) -f $(DOCKERFILE) .

# 開発環境用ビルド（キャッシュを無効化）
.PHONY: build-no-cache
build-no-cache:
	docker build --no-cache -t $(DOCKER_IMAGE) -f $(DOCKERFILE) .

# コンテナの起動
.PHONY: run
run:
	docker run -d --name $(APP_NAME) -p 80:80 $(DOCKER_IMAGE)

# コンテナの停止と削除
.PHONY: stop
stop:
	docker stop $(APP_NAME)
	docker rm $(APP_NAME)

# ログの表示
.PHONY: logs
logs:
	docker logs -f $(APP_NAME)

# コンテナ内でのシェルアクセス
.PHONY: shell
shell:
	docker exec -it $(APP_NAME) /bin/sh

# イメージの削除
.PHONY: clean
clean:
	docker rmi $(DOCKER_IMAGE)

# すべてのクリーンアップ
.PHONY: prune
prune:
	docker system prune -f

# ヘルプの表示
.PHONY: help
help:
	@echo "使用可能なMakefileコマンド："
	@echo "  make build          - Dockerイメージをビルド"
	@echo "  make build-no-cache - キャッシュを無効化してDockerイメージをビルド"
	@echo "  make run            - コンテナをバックグラウンドで起動"
	@echo "  make stop           - コンテナを停止して削除"
	@echo "  make logs           - コンテナのログをフォロー"
	@echo "  make shell          - コンテナ内でシェルを起動"
	@echo "  make clean          - Dockerイメージを削除"
	@echo "  make prune          - 未使用のデータをすべてクリーンアップ"

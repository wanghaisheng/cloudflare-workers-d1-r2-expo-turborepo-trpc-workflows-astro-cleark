.PHONY: dev build deploy migrate

dev: build
	npx -y wrangler d1 migrations apply openilink_hub --local
	npx -y wrangler dev

build:
	cd hub/web && pnpm install && pnpm run build
	rm -rf public && cp -r hub/internal/web/dist public

migrate:
	npx -y wrangler d1 migrations apply openilink_hub --remote

deploy: build migrate
	npx -y wrangler deploy

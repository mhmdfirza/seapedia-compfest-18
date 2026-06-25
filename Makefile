# =============================================================================
# Makefile — Docker command aliases for Seapedia
# =============================================================================
#
# Usage:  make <target>
#
# This Makefile provides short aliases for common Docker Compose commands
# so that every team member (Linux, macOS, Windows with Make) can use the
# same workflow regardless of their OS.
#
# On Windows without Make, use the full `docker compose ...` commands shown
# in each target's recipe.
# =============================================================================

# Use bash for shell commands
SHELL := /bin/bash

# Docker Compose command (supports both v1 'docker-compose' and v2 'docker compose')
DC := docker compose

# Default service for exec commands
APP := app

# =============================================================================
# Container Lifecycle
# =============================================================================

.PHONY: build up down restart stop logs ps

## Build all container images
build:
	$(DC) build

## Start all containers in detached mode
up:
	$(DC) up -d

## Build and start all containers
up-build:
	$(DC) up -d --build

## Stop and remove all containers (preserves volumes)
down:
	$(DC) down

## Restart all containers
restart:
	$(DC) restart

## Stop all containers without removing them
stop:
	$(DC) stop

## Show real-time logs from all containers
logs:
	$(DC) logs -f

## Show logs from a specific service (usage: make log s=app)
log:
	$(DC) logs -f $(s)

## Show the status of all containers
ps:
	$(DC) ps

# =============================================================================
# Shell Access
# =============================================================================

.PHONY: shell shell-root shell-node shell-mysql

## Enter the app container as the default user
shell:
	$(DC) exec $(APP) bash

## Enter the app container as root
shell-root:
	$(DC) exec -u root $(APP) bash

## Enter the node container
shell-node:
	$(DC) exec node sh

## Open a MySQL CLI session
shell-mysql:
	$(DC) exec mysql mysql -u$${DB_USERNAME:-seapedia} -p$${DB_PASSWORD:-secret} $${DB_DATABASE:-seapedia}

# =============================================================================
# PHP / Composer
# =============================================================================

.PHONY: composer-install composer-update composer

## Run composer install
composer-install:
	$(DC) exec $(APP) composer install

## Run composer update
composer-update:
	$(DC) exec $(APP) composer update

## Run an arbitrary Composer command (usage: make composer c="require package/name")
composer:
	$(DC) exec $(APP) composer $(c)

# =============================================================================
# Node / NPM
# =============================================================================

.PHONY: npm-install npm-build npm

## Run npm install inside the node container
npm-install:
	$(DC) exec node npm install

## Run npm build (production assets)
npm-build:
	$(DC) exec node npm run build

## Run an arbitrary npm command (usage: make npm c="run dev")
npm:
	$(DC) exec node npm $(c)

# =============================================================================
# Laravel Artisan
# =============================================================================

.PHONY: artisan migrate migrate-fresh seed fresh tinker

## Run an arbitrary Artisan command (usage: make artisan c="make:model Post")
artisan:
	$(DC) exec $(APP) php artisan $(c)

## Run database migrations
migrate:
	$(DC) exec $(APP) php artisan migrate

## Drop all tables and re-run migrations
migrate-fresh:
	$(DC) exec $(APP) php artisan migrate:fresh

## Run database seeders
seed:
	$(DC) exec $(APP) php artisan db:seed

## Fresh migrations + seed (full reset)
fresh:
	$(DC) exec $(APP) php artisan migrate:fresh --seed

## Open Laravel Tinker (interactive REPL)
tinker:
	$(DC) exec $(APP) php artisan tinker

# =============================================================================
# Laravel Cache / Optimization
# =============================================================================

.PHONY: cache-clear optimize optimize-clear key-generate

## Clear all Laravel caches (config, route, view, event, cache)
cache-clear:
	$(DC) exec $(APP) php artisan config:clear
	$(DC) exec $(APP) php artisan route:clear
	$(DC) exec $(APP) php artisan view:clear
	$(DC) exec $(APP) php artisan event:clear
	$(DC) exec $(APP) php artisan cache:clear

## Optimize Laravel (cache config, routes, views)
optimize:
	$(DC) exec $(APP) php artisan optimize

## Clear the optimization cache
optimize-clear:
	$(DC) exec $(APP) php artisan optimize:clear

## Generate Laravel application key
key-generate:
	$(DC) exec $(APP) php artisan key:generate

# =============================================================================
# Testing
# =============================================================================

.PHONY: test test-coverage pint

## Run PHPUnit tests
test:
	$(DC) exec $(APP) php artisan test

## Run tests with coverage (requires Xdebug or PCOV)
test-coverage:
	$(DC) exec $(APP) php artisan test --coverage

## Run Laravel Pint (code style fixer)
pint:
	$(DC) exec $(APP) ./vendor/bin/pint

# =============================================================================
# Setup / First Run
# =============================================================================

.PHONY: setup nuke

## First-time project setup: build, start, install deps, migrate
setup:
	@echo "🚀 Building containers..."
	$(DC) build
	@echo "🚀 Starting containers..."
	$(DC) up -d
	@echo "📦 Installing Composer dependencies..."
	$(DC) exec $(APP) composer install
	@echo "🔑 Generating app key..."
	$(DC) exec $(APP) php artisan key:generate
	@echo "📦 Installing npm dependencies (via node container CMD)..."
	@echo "   (node_modules are installed automatically on container start)"
	@echo "🗃️  Running migrations..."
	$(DC) exec $(APP) php artisan migrate
	@echo ""
	@echo "✅ Setup complete!"
	@echo "   App:        http://localhost:8000"
	@echo "   phpMyAdmin: http://localhost:8080"
	@echo "   Vite HMR:   http://localhost:5173"

## ⚠️  Destroy everything: containers, volumes, orphans
nuke:
	$(DC) down -v --remove-orphans
	@echo "💣 All containers and volumes destroyed."

# =============================================================================
# Help
# =============================================================================

.PHONY: help

## Show this help message
help:
	@echo ""
	@echo "Seapedia — Docker Commands"
	@echo "=========================="
	@echo ""
	@grep -E '^## ' Makefile | sed 's/## /  /'
	@echo ""
	@echo "Run 'make <target>' to execute a command."
	@echo ""

# Default target
.DEFAULT_GOAL := help

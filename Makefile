# --- nitro-skeleton

npmdir = $(shell npm bin)
whoami = $(shell whoami)

# TASKS

install:
	npm install
	bower install
	@node run build

auto.install:
	@node auto-install

live: auto.install
	@node run live

dev: auto.install
	@node run watch

build: auto.install
	@node run build

release: publish

echo:
	@echo "make options: build dev live"

# DEFAULT TASKS

.DEFAULT_GOAL := echo

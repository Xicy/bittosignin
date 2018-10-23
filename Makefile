VERSION ?= $(shell git describe --tags --abbrev=0 2>/dev/null || echo latest)
SERVICE ?= react-frontend
IMAGE   := gcr.io/bitto-stage-213505/$(SERVICE):$(VERSION)

.PHONY: default build push run

default: build run

build:
	@echo '> Building "$(SERVICE)" docker image...'
	@docker build -t $(IMAGE) .

push: build
	@gcloud docker -- push $(IMAGE)

run:
	@echo '> Starting "$(SERVICE)" container...'
	@docker run -d --name $(SERVICE) -p 8080:80 $(IMAGE)

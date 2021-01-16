
.PHONY: build
build:
	docker build -t streamr/streamr-docker-dev-action:dev .

.PHONY: run
run:
	docker run --rm streamr/streamr-docker-dev-action:dev foo bar foobar

.PHONY: run-post
run-post:
	docker run --rm  --entrypoint /cleanup.sh streamr/streamr-docker-dev-action:dev foo bar foobar

.PHONY: clean
clean:
	docker rmi streamr/streamr-docker-dev-action:dev


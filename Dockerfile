FROM golang:1.15-buster AS builder


FROM debian:buster-slim
COPY entrypoint.sh /entrypoint.sh
COPY cleanup.sh /cleanup.sh
ENTRYPOINT ["/entrypoint.sh"]


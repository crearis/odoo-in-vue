#!/usr/bin/env bash
cd "$(dirname "$0")"
CWD=$(pwd)
docker run --rm -it --name dev13_traefik \
--network="host" \
--add-host="odoo13:127.0.0.1" \
--add-host="quasar:127.0.0.1" \
-v "$CWD"/traefik.yml:/etc/traefik/traefik.yml:ro \
traefik:v2.2
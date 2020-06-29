#!/usr/bin/env bash
cd "$(dirname "$0")"
docker run --rm -it --name dev13_pg12 \
-e POSTGRES_PASSWORD=odoo \
-e POSTGRES_USER=odoo \
-e POSTGRES_DB=postgres \
-p 5432:5432 \
postgres:12
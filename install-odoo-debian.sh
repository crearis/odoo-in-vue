#!/usr/bin/env bash
cd "$(dirname "$0")"

ODOO_VERSION="14.0"
ODOO_RELEASE="20230430"
ODOO_SHA="06586ebb9902fa4840fb177f5e45f98d19dadf6d"

curl -o odoo.deb -sSL http://nightly.odoo.com/${ODOO_VERSION}/nightly/deb/odoo_${ODOO_VERSION}.${ODOO_RELEASE}_all.deb \
&& echo "${ODOO_SHA} odoo.deb" | sha1sum -c - \
&& sudo apt-get update \
&& sudo apt-get -y install --no-install-recommends ./odoo.deb \
&& rm odoo.deb
#!/usr/bin/env bash
cd "$(dirname "$0")"

ODOO_VERSION="13.0"
ODOO_RELEASE="20200417"
ODOO_SHA="db29fbcebf63f9f656e9445f462190ac775ee533"

curl -o odoo.deb -sSL http://nightly.odoo.com/${ODOO_VERSION}/nightly/deb/odoo_${ODOO_VERSION}.${ODOO_RELEASE}_all.deb \
&& echo "${ODOO_SHA} odoo.deb" | sha1sum -c - \
&& sudo apt-get update \
&& sudo apt-get -y install --no-install-recommends ./odoo.deb \
&& rm odoo.deb
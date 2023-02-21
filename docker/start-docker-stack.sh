#!/usr/bin/env bash
cd "$(dirname "$0")"

# make sure we have directories with proper permissions
mkdir -p ./pg-data
mkdir -p ./var-lib-odoo


read -p "Update 3rd party add-ons? (y/N) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  ../update-other-addons.sh
fi
echo
read -p "Reset docker data? (Y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
  sudo rm -rf ./pg-data && mkdir ./pg-data
  sudo rm -rf ./var-lib-odoo && mkdir ./var-lib-odoo
  read -p "Continue? (Y/n) " -n 1 -r
  if [[ $REPLY =~ ^[Nn]$ ]]; then
    exit 1
  fi
fi
echo

./reset-data.sh
docker compose -f ./docker-compose.yml up
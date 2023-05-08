#!/usr/bin/env bash
cd "$(dirname "$0")"

echo "======================"
echo ">stop dev_pg12"
docker stop dev_pg12 > /dev/null 2>&1
echo ">set ownership of data"
sudo chown -R $USER:$USER ./pg-data
sudo chown -R $USER:$USER ./var-lib-odoo
echo ">set directory access"
find ./pg-data -type d -exec chmod 777 {} \;
find ./var-lib-odoo -type d -exec chmod 777 {} \;
echo "Done. Launch PG container as needed."
echo
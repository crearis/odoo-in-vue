#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

echo '
---
title: Odoo In Vue
description: Odoo In Vue landing page
date: 2020-01-26T04:15:05+09:00
---
' > ./content/_index.md
echo '
{{< figure src="https://gitlab.com/sylnsr/odoo-in-vue/-/raw/13/docs/hugo/static/odooinvue.png" >}}
' >> ./content/_index.md
cat ../../README.md >> ./content/_index.md

######


echo '
---
title: "Docker"
description: "Introduction / Docker"
date: 2020-01-11T14:09:21+09:00
---
' > ./content/doc/docker.md
cat ../../docker/readme-docker.md >> ./content/doc/docker.md

######

echo '
---
title: "Vue Setup"
description: "Introduction/ Vue Setup"
date: 2020-01-11T14:09:21+09:00
---
' > ./content/doc/quasar.md
cat ../../readme-ui.md >> ./content/doc/quasar.md
cat ../../ui/README.md >> ./content/doc/quasar.md

######

echo '
---
title: "Odoo Development"
description: "Introduction / Odoo Development"
date: 2020-01-11T14:09:21+09:00
---
' > ./content/doc/development.md
cat ../../readme-dev.md >> ./content/doc/development.md


###### bug: Hugo isn't building to a higher lvl dir for whatever reason, so we have to move it up after a pause
rm -rf ../public
hugo
sleep 3
mv ./public ../
cd ../
git add ./public
rm -rf ./hugo/resources
git commit ./public ./hugo -m"update www"

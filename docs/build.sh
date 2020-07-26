#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1


echo '
---
title: Odoo In Vue
description: Odoo In Vue landing page
date: 2020-01-26T04:15:05+09:00
---
' > ./hugo/content/_index.md
cat ../README.md >> ./hugo/content/_index.md

######


echo '
---
title: "Docker"
description: "Introduction / Docker"
date: 2020-01-11T14:09:21+09:00
---
' > ./hugo/content/doc/docker.md
cat ../docker/readme-docker.md >> ./hugo/content/doc/docker.md

######

echo '
---
title: "Vue Setup"
description: "Introduction/ Vue Setup"
date: 2020-01-11T14:09:21+09:00
---
' > ./hugo/content/doc/quasar.md
cat ../readme-ui.md >> ./hugo/content/doc/quasar.md
cat ../ui/README.md >> ./hugo/content/doc/quasar.md

######

echo '
---
title: "Odoo Development"
description: "Introduction / Odoo Development"
date: 2020-01-11T14:09:21+09:00
---
' > ./hugo/content/doc/development.md
cat ../readme-dev.md >> ./hugo/content/doc/development.md


---
title: "Docker"
description: "Introduction / Docker"
date: 2020-01-11T14:09:21+09:00
---

## Starting backend services in Docker

The scripts in the `/docker` dir are only for getting the backend services running. Docker is not used to run the
Quasar/Vue part of the project. Quasar provides a built-in server for running the Vue app. There is a script in `/docker`
which provides a proxy server that will reverse proxy to Quasar's built in server, but obviously for that to work, the
Quasar server needs to be started from the commmand line (e.g. `quasar dev`)

Run `/docker/start-docker-stack.sh`. The script will first prompt you about installing 3rd party add-ons. If this is
your first time running the script enter `y`. The stack requires those modules. You will also be prompted if you want to
reset `docker` folder data and if you want to preserve your demo data, choose `n`.

Once the stack is running, you can access the standard Odoo UI from http://localhost and the Quasar/Vue UI from http://localhost/vue


Once logged in, go to the main menu and click `Apps` and install the `project_task_plan` module. This will install the
base module for this project and load all its dependencies. **Because there are a lot of dependencies to install, this
process can take a while.** The `cpu_time_limit` config in
[`/docker/odoo.conf`](https://gitlab.com/sylnsr/odoo-in-vue/-/tree/13/docker/odoo.conf) is deliberately set to a large
value so that the installation should not time out, provided that you have a reasonably fast machine.

Once all the modules are installed, you can navigate to `Projects`.
 
Note: Using Docker with Odoo is an established paradigm and Odoo themselves provide the Docker images and Docker files.
Whether or not you use this paradigm and how you might use it, is up to you.

Alternatively, you might want to run the stack for development purposes in which case you might only want the reverse
proxy (Traefik) and DB (Postgres 12) Docker containers. For this purpose, the individual scripts are:

 - `/docker/start-traefik.sh`
 - `/docker/start-postgres.sh`

So, a typical workflow for a full development setup is to:

 1. run these two scripts (above)
 2. start Odoo debugging in your Python IDE (e.g. Pycharm)
 3. start Quasar in dev mode with `quasar dev`

**Note:** starting these containers using these 2 scripts start them with the `--rm` param, so they will be removed once
you stop them. In this case of the Postgres container, this means that no data is persisted. If you want to start
debugging again, you will also need to reinstall the Odoo modules.
 
---

### Directory Notes

The `/docker` directory has pre-existing `pg-data` and `var-lib-odoo` directories for convenience however the
.gitignore file omits all their contents from being part of the repo.

When the containers start, they will set the permissions of these directories to be owned by root.
The [/docker/start-docker-stack.sh](https://gitlab.com/sylnsr/odoo-in-vue/-/tree/13/docker/start-docker-stack.sh) and
[/docker/reset-data.sh](https://gitlab.com/sylnsr/odoo-in-vue/-/tree/13/docker/reset-data.sh) scripts will use `sudo` to
reset these and you can read those scripts and confirm it, to know that nothing evil is going on when your sudo
password is prompted.

---

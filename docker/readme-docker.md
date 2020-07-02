## Getting started with Docker

Run `start-docker-stack.sh`. The script will first prompt you about installing 3rd party add-ons.
If this is your first time running the script enter `y`. The stack requires those modules.
You will also be prompted if you want to reset `docker` folder data and if you want to preserve your
demo data, choose `n`.

Once the stack is running, you can access the Odoo UI from http://localhost and the VueJS UI from
http://localhost/vue


Once logged in, go to the main menu and click `Apps` and install the `fm_base` module. This will
install the base module for this project and load all its dependencies. **Because there are a lot
of dependencies to install, this process can take a while.** The `cpu_time_limit` config in
[`odoo.conf`](./docker-odoo.conf) is deliberately set to a large value so that the installation
should not time out, provided that you have a reasonably fast machine.

Once all the modules are installed, you can navigate to `Projects`.
 
Note: Using Docker with Odoo is an established paradigm and Odoo themselves provide the Docker images
 and Docker files. 
---

### Directory Notes

The `docker` directory has pre-existing `pg-data` and `var-lib-odoo` directories for convenience
however the [.gitignore](../.gitignore) file omits all their contents from being part of the repo.

When the containers start, they will set the permissions of these directories to be owned by root.
The [start-docker-stack.sh](./start-docker-stack.sh) and [reset-data.sh](./reset-data.sh) scripts
will use `sudo` to reset these and you can read those scripts and confirm it to know that nothing
sinister is going on when your sudo password is prompted.

---

There are 2 scripts for development purposes. [See dev notes for more info.](./readme-dev.md)
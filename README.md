# Odoo In Vue

Odoo In Vue is a repo that provides a foundation for developing typical business apps with Odoo and Vue.
It already includes some free add-on modules from the Odoo community.

It also includes a very simple Vue prototype app that connects to the Odoo server through the Odoo JSON-RPC API.

The Vue framework is built upon using the [Quasar Framework](https://quasar.dev/), which means that you can easily
convert your Vue app to a mobile app using Cordova or a desktop app using Electron. Using the Quasar framework also
means that you have all the basic components needed to build a very robust custom UI with Vue

Just download this repo and start customizing the Vue app in the `/ui` directory, or just download the `ui` directory
by itself to get a basis for the Vue project, if you already have your Odoo development environment setup.

### External Odoo Addons

These are the external modules that are downloaded to this project when running the `update-other-addons.sh` script.

 - [project_category](https://github.com/OCA/project/tree/13.0/project_category): For categorization of projects
 - [project_contact](https://github.com/sylnsr/project_tools/tree/13.0/project_contact): Contextually link contacts to projects
 - [project_key](https://github.com/OCA/project/tree/13.0/project_key): Unique project key generation
 - [project_ledger](https://github.com/sylnsr/project_tools/tree/13.0/project_ledger): Adds project ledger features
 - [project_status](https://github.com/OCA/project/tree/13.0/project_status): Provides status management on projects
 - [project_task_add_very_high](https://github.com/OCA/project/tree/13.0/project_task_add_very_high): Adds two new levels of priority for tasks on projects
 - [project_task_dependency](https://github.com/OCA/project/tree/13.0/project_task_dependency): Define dependencies (other tasks) of a task
 - [project_task_material](https://github.com/OCA/project/tree/13.0/project_task_material): Enables tracking of expenses for a project
 - [tagged_notes](https://github.com/odoo-ce-modules/13/tree/master/tagged_notes): Link notes to other records and tag them

---

## More reading:

 - [Docker Quick-start](./docker/readme-docker.md)
 - [Dev Setup Tips](./readme-dev.md)

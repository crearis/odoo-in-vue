# Odoo In Vue

Odoo In Vue is a repo that assists with developing typical business apps with Odoo. It already includes some free
add-ons modules from the Odoo community.

It also includes a very simple VueJS app that connects to the Odoo server through its RPC API. The VueJS app uses the
[Quasar Framework](https://quasar.dev/). The VueJS interface is build using Quasar and Quasar CLI is required.

### External Odoo Addons

These are the external modules that are downloaded to this project when running the `update-other-addons.sh` script.

 - [project_key](https://github.com/OCA/project/tree/13.0/project_key): Unique project key used for unique matter ID
 management
 - [project_category](https://github.com/OCA/project/tree/13.0/project_category): For categorization of matters
 - [project_status](https://github.com/OCA/project/tree/13.0/project_status): Provides status management on individual
 matters
 - [project_task_add_very_high](https://github.com/OCA/project/tree/13.0/project_task_add_very_high): Adds two new
 levels of priority for tasks on matters
 - [project_task_dependency](https://github.com/OCA/project/tree/13.0/project_task_dependency): Enables the user to
 define dependencies (other tasks) of a task
 - [project_task_material](https://github.com/OCA/project/tree/13.0/project_task_material): Enables tracking of expenses
 for a matter

---

## More reading:

 - [Docker Quick-start](./docker/readme-docker.md)
 - [Dev Setup Tips](./readme-dev.md)

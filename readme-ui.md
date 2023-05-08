## About the Quasar/Vue project

Using VueJS with Odoo is an established paradigm that we borrow from older projects in the public domain. The Quasar/Vue
app in this project is obviously not meant to be complete since it's just a functional sample that demonstrates how to
use VueJS with Odoo as the backend.

Because the VueJS interface is built using [Quasar](https://quasar.dev) .. the [Quasar CLI](https://quasar.dev/start/quasar-cli)
is required.

The root directory for the Quasar/Vue project is `/vue`

---

### Quasar setup basics

 - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) for dependencies
 - Pinia to manage data state
 - Axios for async queries
 - Sass with SCSS syntax for the CSS preprocessor
 - ESLint with Prettier
 - Project uses JSON-RPC to communicate with the Odoo backend
 - Server interfacing is managed as a mixin

# User Interface

Using VueJS with Odoo is an established paradigm that we borrow from older projects in the public domain.
The sample UI app is obviously not meant to be complete since its just a functional sample that demonstrates
how to use VueJS with Odoo as a backend.

The VueJS interface is build using Quasar and Quasar CLI is required.

---

## Technical

 - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) for dependencies
 - Vuex to manage data state
 - Axios for async queries
 - Project uses JSON-RPC to communicate with the Odoo backend
 - Server interfacing is managed as a mixin

---

### More reading

 - Quasar generated [README.md](./ui/README.md)
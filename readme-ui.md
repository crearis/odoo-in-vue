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
 - Design goals
   - Manage as much as possible from within a matter (reduced clicks)
   - Be as intuitive as possible - minimal training should be necessary
 - SPA UI priority over Odoo parity (UI features in the SPA might not exist in the Odoo UI)
   - Eliminated maintaining UI features in two places
   - Focuses UI development priority on the SPA and deliverable of MVP
   - Keep Odoo usage focused on model design and server side functionality

---

### More reading

 - Quasar generated [README.md](./ui/README.md)
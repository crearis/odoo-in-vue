**Before you run the Quasar/Vue sub-project follow these steps (as needed).**

Install the dependencies:

`yarn`

Start the app in development mode (hot-code reloading, error reporting, etc.):

`quasar dev`

Lint the files:

`yarn run lint`

Build the app for production:

`quasar build`

Customize the configuration:

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

---

# Project Directories and Files

All of the core Odoo files in the Vue project which provide Odoo specific functions and features, have their file name
prefixed with `Odoo`. These files are explained as follows:

**Components:**

- `/ui/src/components/odoo/OdooBaseData.js`: Provides core data features for other Odoo components
- `/ui/src/components/odoo/OdooBaseForm.js`: Base form component to extend to create your own Quasar/Odoo forms
- `/ui/src/components/odoo/OdooField.vue`: Provides field for your Quasar/Odoo form based on field schema data
- `/ui/src/components/odoo/OdooForms.vue`: Provides a standard container for your Quasar/Odoo forms with standard buttons

**Mixins:**

- `/ui/src/mixins/Odoo.js`: Mixin for Odoo server interaction
- `/ui/src/mixins/OdooQUtils.js`: Mixin for features that pertain to Quasar and Odoo, e.g. Odoo to Quasar data conversion
- `/ui/src/mixins/OdooRpc.js`: Mixin for RPC calls made to Odoo

**Vuex (Store):**

- `/ui/src/store/odoo.js`: Vuex file for Odoo stuff

Currently these are all the files you need to create your own Quasar-Odoo project and eventually these will be files put
into an NPM package. The other files of interest are in `/ui/src/components/myforms`, which are example Vue components
that use the files listed above and demonstrate how simple it is to create Quasar-Odoo forms. Lastly, the `/ui/src/pages`
directory can be reviewed to give a broad level example of how one might setup their own Quasar-Odoo project in Vue.

---

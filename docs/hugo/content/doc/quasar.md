
---
title: "Vue Setup"
description: "Introduction/ Vue Setup"
date: 2020-01-11T14:09:21+09:00
---

## About the Quasar/Vue project

Using VueJS with Odoo is an established paradigm that we borrow from older projects in the public domain. The Quasar/Vue
app in this project is obviously not meant to be complete since its just a functional sample that demonstrates how to
use VueJS with Odoo as the backend.

Because the VueJS interface is built using [Quasar](https://quasar.dev) .. the [Quasar CLI](https://quasar.dev/start/quasar-cli)
is required.

The root directory for the Quasar/Vue project is `/ui`

---

### Quasar setup basics

 - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) for dependencies
 - Vuex to manage data state
 - Axios for async queries
 - Project uses JSON-RPC to communicate with the Odoo backend
 - Server interfacing is managed as a mixin

---
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

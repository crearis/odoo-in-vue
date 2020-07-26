---
title: "Concepts"
description: "Project concepts for the Odoo modules and the Vue project together"
date: 2020-01-28T00:38:51+09:00
draft: false
weight: 1
---

## Odoo Concepts

As you can see in the main [Odoo Development](/doc/development) page, the Odoo setup for this project centers around
usage of the Odoo Projects module and additional modules that extend that. There is a lot more to Odoo than the Projects
module, but the main concepts I want to demonstrate is how to build a Vue app that uses Odoo in the backend. For this
the Projects module is enough to demonstrate all the paradigms involved in using Odoo's JSON-RPC API, which are:

 - authenticating against Odoo and getting user profile data
 - reading data from Odoo including schema info for fields
 - creating / updating records
 - archiving / deleting records
 - calling actions on modules

##### Regarding the Calendar

Odoo does have a Calendar module but its not used for the purposes of this project. Instead we show project task data on
the QCalendar component because project tasks have deadlines, which are fine for basically demonstrating how we can put
that on QCalendar. 

---
 
## Vue Project Concepts

As long as we can effectively use the Odoo JSON-RPC API, we have everything we need to leverage Odoo from Vue just as
effectively as if we built a UI using QWeb. This is because the native Odoo UI ("client") also uses the existing
JSON-RPC API, with no additional hidden or proprietary tricks. 

In the Vue project the following mixins will provide whats needed to bridge the communication gap from Quasar to Odoo:

 - `OdooRpc.js`: wrappers for the common RPC calls made to Odoo (inspired by the [odoo-rpc-client](https://github.com/katyukha/odoo-rpc-client) Python library)
 
 - `Server.js`: bridges OdooRpc.js methods to code in the rest of the project
 
 - `Utilities.js`: converts Odoo things to Quasar things and provides some other minor utility methods

---

---
title: "Concepts"
description: "Project concepts for the Odoo modules and the Vue project together"
date: 2020-01-28T00:38:51+09:00
draft: false
weight: 1
---

## Inspiration for this project

#### Whats so bad about QWeb?  
  
**Using Qweb to develop your UX solution has some specific drawbacks:**

 - QWeb is still based on terse and bloated XML
 - QWeb is complicated and has a big learning curve
 - QWeb is specific to Odoo
 - QWeb provides a small selection of standard UI widgets
 - Odoo documentation sucks and the QWeb part of it is no exception
 - Reactive design with QWeb still sucks and is still buggy
 - QWeb is only targeted for browsers and for converting HTML to PDF
 - Community support is tiny compared to the Vue community
 - Lacks support for many modern paradigms and concepts available in Vue
 - No browser plugins to help QWeb development
 - No popular IDE plugin support
 - Odoo Studio requires Enterprise Edition ($$$)
 - Work done in Odoo Studio can't be exported as .xml view files that can be used in an add-on and stored in a code repo
 - It's hard to find UX developers that know QWeb or are willing to learn it and those that do usually cost more ($$$)
 
**Conversely, using Quasar/Vue for UX development has specific advantages:**

 - It's much easier to learn and use
 - It's much simpler to find Vue developers than QWeb developers
 - It has a huge, vibrant and active community
 - Lots of great documentation and video tutorials
 - Quasar apps can be built to target browsers, mobile devices or cross platform desktop as Electron apps
 - Quasar provides rich selection of UI widgets
 - All the major IDEs have plugins to make Vue development even simpler
 - Quasar apps look slick and modern compared to QWeb forms
 - [Vue Dev Tools](https://github.com/vuejs/vue-devtools) plugin is available for all major browsers 

---

#### On the flip side

What does QWeb have that's better than Quasar? Currently, Odoo has a great calendar with drag and drop support for
moving appointments. The QCalendar component from Quasar supports it also .. but .. I just haven't prototyped it yet. 

---

## Odoo concepts for this project

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
the QCalendar component because project tasks have deadlines, which is fine for basically demonstrating how we can put
that on QCalendar. 

---
 
## Vue concepts for this project

As long as we can effectively use the Odoo JSON-RPC API, we have everything we need to leverage Odoo from Vue just as
effectively as if we built a UI using QWeb. This is because the native Odoo UI ("client") also uses the existing
JSON-RPC API, with no additional hidden or proprietary tricks. 

In the Vue project the following mixins will provide whats needed to bridge the communication gap from Quasar to Odoo:

 - `OdooRpc.js`: wrappers for the common RPC calls made to Odoo (inspired by the [odoo-rpc-client](https://github.com/katyukha/odoo-rpc-client) Python library)
 
 - `Server.js`: bridges OdooRpc.js methods to code in the rest of the project
 
 - `Utilities.js`: converts Odoo things to Quasar things and provides some other minor utility methods

---

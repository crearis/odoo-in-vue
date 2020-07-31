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
 - automatic field generation based on Odoo model/field data

##### Regarding the Calendar

Odoo does have a Calendar module but its not used for the purposes of this project. Instead we show project task data on
the QCalendar component because project tasks have deadlines, which is fine for basically demonstrating how we can put
that on QCalendar. 

---

## Vue concepts for this project

In the Vue/Quasar sub-project in the `/ui` directory, I provide components; mixins and a store that bridges the knowledge
gap between Odoo and Vue/Quasar. The idea is that the UI developer can use these to easily create lists and forms that
connect to Odoo in the back-end, with minimal effort and just basic knowledge of Odoo. The UI developer should only need
minimal attentiveness concerning schema's of the various Odoo models because that information is already stored in Odoo
and the Odoo resources here already account for all of that. The UI developer should only need to focus on what fields
the end user needs; if they should be represented in specific "widgets" and how they should be laid out.

I follow the exact same paradigm for specifying widgets for fields, as Odoo does, because its one of the few, simple
and intuitive paradigms for a non-Odoo developer to grasp from Odoo. For example, in Odoo, time fields are stored as a
`float` value, but to show that properly in an Odoo form, you must use the following in the Odoo form XML to get the
[proper type of input field](https://www.odoo.com/fr_FR/forum/aide-1/question/time-field-in-odoo-124037) ("widget"):
`<field name="time" widget="float_time"/>`

In Odoo-In-View, you likewise do it like this:

`<OField name="time" widget="float_time" v-bind:record="record"/>`

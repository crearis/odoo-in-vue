This is a project that provides a foundation for developing typical business apps with Odoo and Vue. It includes
a very simple Vue prototype app that connects to the Odoo server through the Odoo JSON-RPC API.

The Vue framework is built upon using the [Quasar Framework](https://quasar.dev/), which means that you can easily
convert your Vue app to a mobile app using Cordova or a desktop app using Electron. Using the Quasar framework also
means that you have a rich set of modern Vue components needed to build a very robust custom UI for Odoo, with Vue.

Just download this repo and start customizing the Vue app in the `/ui` directory. Alternatively, if you already have
your Odoo development environment setup, then just download the `ui` directory from this project to get a basis for your
Quasar/Vue project that connects to Odoo.

Everything is available on **Gitlab**: https://gitlab.com/sylnsr/odoo-in-vue

The stand-alone documentation is here: https://www.odooinvue.org

---

### Whats so bad about QWeb?
  
  
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

### On the flip side

What does QWeb have that's better than Quasar? Currently, Odoo has a great calendar with drag and drop support for
moving appointments. The QCalendar component from Quasar supports it drag and drop also .. but .. I just haven't
prototyped that .... yet. 

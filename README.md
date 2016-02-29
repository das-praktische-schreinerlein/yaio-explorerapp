yaio-explorerapp - Le petit D'Artagnan ExplorerApp
=====================

# Desc
The "Your-All-In-One" or "Le petit D'Artagnan" ExplorerApp is the prototype of the GUI for my 
collaboration-softwareproject: "D'Artagnan - Dein persönlicher Software-Musketier".

Originally part of my project-management software [Your-All-In-One](https://github.com/das-praktische-schreinerlein/your-all-in-one) its now a stand-alone project. 

A demo can be found at [http://your-all-in-one.de/demos/yaio-explorerapp/](http://your-all-in-one.de/demos/yaio-explorerapp/).

# Installation
Quite simple: download, build, run

- clone project
```
cd projects
git clone https://github.com/das-praktische-schreinerlein/yaio-explorerapp.git
cd yaio-explorerapp
```
- build with [npm](https://docs.npmjs.com/getting-started/installing-node)
```
npm install
grunt dist
```
- start
```
firefox build/yaio-explorerapp/yaio-explorerapp.html
```

# Todos for me
- [ ] use and optimize it :-)
- **and a lot more to implement - take a look at [YAIO-Masterproject resources/docs/Roadmap.md](https://github.com/das-praktische-schreinerlein/your-all-in-one/blob/master/resources/docs/Roadmap.md)**

# History and milestones
- **see details on [YAIO-Masterproject resources/docs/Changelog.md](https://github.com/das-praktische-schreinerlein/your-all-in-one/blob/master/resources/docs/Changelog.md)**
- 2016
   - spin off of [Your-All-In-One](https://github.com/das-praktische-schreinerlein/your-all-in-one)
   - and it take another spin-off: I extracted the MarkdownEditor to [Your-Markdown-Fellow](https://github.com/das-praktische-schreinerlein/your-markdown-fellow)
   

# Thanks to
- **Build-Tools**
    - **Node**
        - Dev-Stack: [Nodejs](https://nodejs.org)
        - Frontend-Packagemanager: [Bower](http://bower.io/)
        - Packagemanager: [NPM](https://www.npmjs.com/)
        - Taskrunner: [Grunt](http://gruntjs.com/)
        - Test-Framework: [Jasmine](http://jasmine.github.io/)
        - Test-Runner: [Karma](http://karma-runner.github.io/)
        - Test-Browser Headless: [Phantomjs](http://phantomjs.org/)
        - Test-Framework e2e: [Protractor](https://angular.github.io/protractor/#/)
        - Test-Framework Browser automation: [Selenium](http://www.seleniumhq.org/)
    - **Virtualisation**
        - Docker: [Docker](https://www.docker.com/)
        - Vagrant: [Vagrant](https://www.vagrantup.com/)
- **JS-Code-Frameworks**
    - App-Framework: [AngularJS](https://angularjs.org/)
    - Layout-Framework: [JQuery](https://github.com/jquery/jquery)
- **JS-GUI**
    - App-Routing: [Angular-Route](https://github.com/angular/bower-angular-route)
    - DOM-Manipulation: [findAndReplaceDOMText](https://github.com/padolsey/findAndReplaceDOMText)
    - Explorer-Visualisation: [fancytree](https://github.com/mar10/fancytree)
    - Html-Editor: [Ace](https://github.com/ajaxorg/ace-builds)
    - Image-Show: [Slimbox2](http://www.digitalia.be/software/slimbox2)
    - SEO-Metadata: [Angular-Update-Meta](https://github.com/jvandemo/angular-update-meta)
    - Toast-Messages: [Toastr](https://github.com/CodeSeven/toastr)
    - TOC: [Strapdown TOC](https://github.com/ndossougbe/strapdown)
    - UI-Features: [JQuery-UI](https://github.com/jquery/jquery-ui)
    - UI-Features ContextMenu: [UI-Contextmenu](https://github.com/mar10/jquery-ui-contextmenu)
    - UI-Features Date/TimePicker: [JQuery-UI-Timepicker](https://github.com/trentrichardson/jQuery-Timepicker-Addon)
    - UI-Features Fat Selectboxes: [Select2](https://github.com/select2/select2)
    - UI Search Pagination: [Angular-Paging](https://github.com/brantwills/Angular-Paging)
- **JS-Formatter**
    - Freemmind-Browser: [Freemind Flash-Browser](http://freemind.sourceforge.net/wiki/index.php/Flash_browser)
    - Html-Editor: [Ace](https://github.com/ajaxorg/ace-builds)
    - Layout-Framework: [JQuery](https://github.com/jquery/jquery)
    - Markdown-Parser+Formatter: [Marked](https://github.com/chjj/marked)
    - Syntax-Highlighting: [highlight.js](https://highlightjs.org/)
    - Web-Diagrams: [mermaid](https://github.com/knsv/mermaid)
    - Web-Diagrams: [PlantUML](http://plantuml.com/)
- **JS-Multilanguage**
    - Multilanguage for Angular-Fields: [Angular-Translate](https://github.com/angular-translate/)
    - Multilanguage for Angular-Fields from Static-Files: [Angular-Translate-Loader-Static-Files](https://github.com/angular-translate/bower-angular-translate-loader-static-files)
    - Multilanguage for Tooltipps: [JQuery-Lang](https://github.com/coolbloke1324/jquery-lang-js)


# License
    /**
     * @author Michael Schreiner <michael.schreiner@your-it-fellow.de>
     * @category collaboration
     * @copyright Copyright (c) 2010-2014, Michael Schreiner
     * @license http://mozilla.org/MPL/2.0/ Mozilla Public License 2.0
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at http://mozilla.org/MPL/2.0/.
     */

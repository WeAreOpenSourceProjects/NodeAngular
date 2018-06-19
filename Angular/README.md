[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/weareopensource?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
[![Build Status](https://travis-ci.org/weareopensource/angular.svg?branch=master)](https://travis-ci.org/weareopensource/angular)
[![Dependencies Status](https://david-dm.org/weareopensource/angular.svg)](https://david-dm.org/weareopensource/angular)
[![Coverage Status](https://coveralls.io/repos/weareopensource/angular/badge.svg?branch=master&service=github)](https://coveralls.io/github/weareopensource/angular?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/weareopensource/angular/badge.svg)](https://snyk.io/test/github/weareopensource/angular)



# [WeAreOpenSource](https://weareopensource.me) Angular

### Angular / material / ngRx Starter

## Presentation
This project a stack Angular that can be ran as a standalone application. Or in a fullstack, like this example, [MEANie](https://github.com/weareopensource/MEANie). We are actually in Beta.

It's build upon angular 5+ , [angular material](https://github.com/angular/material2), [angular-cli](https://github.com/angular/angular-cli) / [Nx](https://github.com/nrwl/nx) and [ngRx](https://github.com/ngrx).

<br><br><br>
![demo-stack](https://raw.githubusercontent.com/weareopensource/Angular/assets/screenshot.png)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js (7.x, 8.x) - [Download & Install Node.js](https://nodejs.org/en/download/) or [GitHub Gist](https://gist.github.com/isaacs/579814)

## Installation
It's straightforward
```bash
$ git clone https://github.com/weareopensource/Angular.git && cd Angular
$ npm i
```

## Running Your Application

### Development
* Run `npm start` for a dev server. Available at `http://localhost:4200/`.

### Production
* Run `npm run build:prod` to build your client App

### Configuration
Both processes take into account all system environment variables defined under the form WAOS_FRONT_<path_toVariable>. A pre-build npm script turns under the hood those system environment variables into an object, infering paths from the varialbles name, merged to the environment object defined on environment.prod.ts to regenerate that file, regardless of the production or developement mode.

All configuration avalable on environment.ts file are overidable. You can for instance define the API server coordonates by defining those system environment variables:

-  WAOS_FRONT_api_host='my-server'
-  WAOS_FRONT_api_port=4000
-  WAOS_FRONT_api_endPoints_basePath='api2'

<!--
## Running unit tests
Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
-->

## Developper Guide
In order to develop some feature modules with respect of the starter structure, for instance, if you wand to add an entry point to the sidenav, you should provide a configuration object to the core-state module that manages the content of sidenav. Your configuration file consists of an object with an entry called `core` witch have the following structure
```
export const myFeatureConfiguration: FeatureConfiguration = {
  ... // myFeature can provide a configuration for different modules
  core: {  // coreModule configuration
    sidenav: [{
      order: number;
      link: string, // ie the URL path to access the module
      name: string,  // ie the name appears on the sidenav
      icon: string; // ie the svg material icon that correspond to your feature. It follows the rule: set:ic___<icon_name>____24px
    }]
  }
  ...
};
```

Your feature can provide multiple entries to the sidenav since the `menuItems` entry is an array.
Once defined, you have to pass the configuration to the core-state module (ie the core module part that manages the datas or state) when it's initilizing.
<br>
app.module.ts:
```
  ...
  CoreStateModule.forRoot([..., myFeatureConfiguration.core]),
  ...
```

In order to modify the logo and the title, directy edit the `self` entry of the coreConfiguration object.
<br>
core.configuration.ts:
```
export const coreConfiguration: CoreConfiguration = {
  self: {
    ...
    logo: '/assets/rominet-logo.svg',
    title: 'Angular starter',
    ...
  }
};
```

## [Contribute](CONTRIBUTING.md)

## History

This work is based on [MEAN.js](http://meanjs.org). We want to create updated stack with same mindset "simple", "easy to use". The toolbox needed to start projects.

Today, we dreams to create Backs/Fronts, aligns on feats, in multiple languages, in order to allow anyone to compose fullstack on demand. Feel free to discuss, share other bricks, and invite whoever you want with this mindset to come help us.

## License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE.md)

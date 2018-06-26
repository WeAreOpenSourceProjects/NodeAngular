# Temp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## [Demo](http://meanie.weareopensource.me)  (This Angular stack is used for this demonstration of MEANie fullstack)

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

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## [We Are Open Source, Who we are ?](https://weareopensource.me)
Today, we dreams to create Backs/Fronts, aligns on feats, in multiple languages, in order to allow anyone to compose fullstack on demand (React, Angular, VusJS, Node, Nest, Swift, Go).
Feel free to discuss, share other kind of bricks, and invite whoever you want with this mindset to come help us.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

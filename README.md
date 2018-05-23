[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/weareopensource?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

# MEANie

## Presentation 
[Angular Kick Starter](https://github.com/weareopensource/Angular) / [Riess.js](https://github.com/weareopensource/Riess.js) association. This project, on active developpement, aims to be the next MEAN.
<br><br><br>
![demo-stack](https://raw.githubusercontent.com/weareopensource/Angular/assets/screenshot.png)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js (7.x 8.x) - [Download & Install Node.js](https://nodejs.org/en/download/) or [GitHub Gist](https://gist.github.com/isaacs/579814)

## Simple install
Straightforward
```bash
## Clone the repo localy
$ git clone https://github.com/weareopensource/MEANie.git && cd MEANie

## Install dependencies
$ npm i
```

## Running Your Application
   ### Development
   * Run `npm start` for dev. Navigate to `http://localhost:4200/`.
   ### Production
   * Run `npm run start:prod` to build your client app and start a web server on `http://localhost:4200/`

   This process takes into account all system environment variables defined under the form FRONT_PATH_TO_VARIABLE or BACK_PATH_TO_VARIABLE. You can for instance overide the environment.ts global variables for API server by redefining them throught system environment variables:
   -  FRONT_API_HOST='my-server' overides environemnt.api.host value
   -  FRONT_API_PORT=4000 overides environemnt.api.port value
   -  FRONT_API_ENDPOINTS_BASEPATH='api2' overides environemnt.api.enpoints.basepath value


## Define your own project repo and keep it sync with MEANie
This step is not mandatory. You can directly clone the repository and get a working app. But since you will need to deploy your app soon, hosting your own project on github and configuring it to get the last update from the kick starter is a must. This is done this way:
```bash
## Fork the repo

## Clone the repo localy
$ git clone https://github.com/me/MEANie.git

## cd into it
$ cd MEANie

## Keep track of the upstream
$ git remote add Angular https://github.com/weareopensource/Angular.git
$ git remote add Node https://github.com/weareopensource/Node.git
$ git remote add MEANie https://github.com/weareopensource/MEANie.git

## Install dependencies
$ npm i

## Run it
$ npm start
```

## Sync with the source
Since MEANie is split into two separate projects (Angular and Riess) hosted on two different reposotories, to get the last updates for one or the other part, simply run the commands bellow
```bash
$ git pull MEANie master
$ git pull -s subtree Angular master
$ git pull -s subtree Node master
```

## How to contribute
We welcome pull requests from the community!
See [Angular READ.me](https://github.com/weareopensource/Angular) and [Node READ.me](https://github.com/weareopensource/Node).

## License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE.md)

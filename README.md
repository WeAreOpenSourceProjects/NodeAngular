# MEANie
[![Build Status](https://travis-ci.org/weareopensource/meanjs-2.svg?branch=master)](https://travis-ci.org/weareopensource/meanjs-2)

## Presentation 
[Angular Kick Starter](https://github.com/weareopensource/Angular) / [Riess.js](https://github.com/weareopensource/Riess.js) combination. This project, on active developpement, aims to be the next MEAN.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) or [GitHub Gist](https://gist.github.com/isaacs/579814)

## Clone, rename and define a remote
```
$ git clone https://github.com/weareopensource/MEANie.git
$ mv MEANie myproject
$ cd myproject
$ git remote add -u origin https://github.com/me/myproject.git
# keep track of the upstream
$ git remote add Angular https://github.com/weareopensource/Angular.git
$ git remote add Riess.js https://github.com/weareopensource/Riess.js.git
$ git add .
$ git commit -m 'first commit'
$ git push
```

## Sync
```
$ git pull -s subtree Angular master
$ git pull -s subtree Riess.js master
```

## Install
```
$ cd myproject
$ npm i
```

## Running Your Application
   ### Development
   * Run `npm start` for dev. Navigate to `http://localhost:4200/`.
   ### Production
   * Run `npm run start:prod` to build your client app and start a web server on `http://localhost:4200/`
## Contributing
We welcome pull requests from the community!
## License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE.md)
[![Gitter](https://badges.weareopensource.me/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/weareopensource) [![Slack](https://badges.weareopensource.me/badge/Chat-On%20Slack-d0355b.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Join%20Slack&body=Hi,%20I%20found%20your%20community%20We%20Are%20Open%20Source.%20I%20would%20be%20interested%20to%20join%20the%20Slack%20to%20share%20and%20discuss,%20Thanks) [![Mail](https://badges.weareopensource.me/badge/Contact-By%20Mail-3498db.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Contact)

[![Packagist](https://badges.weareopensource.me/packagist/l/doctrine/orm.svg?style=flat-square)](/LICENSE.md)

# MEANie

## Presentation 
[Angular](https://github.com/weareopensource/Angular) / [Node](https://github.com/weareopensource/Node) repo association. This FullStack, on active developpement, aims to be the next MEAN exemple of our work, and our first FullStack. 
<br><br><br>
![demo-stack](https://raw.githubusercontent.com/weareopensource/Angular/assets/screenshot.png)

## [Demo](http://meanie.weareopensource.me) 

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
   * Run `npm run prod` to build your client app and start a web server on `http://localhost:4200/`

   This process takes into account all system environment variables defined under the form WAOS_<BACK|FRONT>_<path_toVariable>. You can for instance overide the front or back default configuration by redefining them throught system environment variables:
   -  WAOS_FRONT_api_port=3200 overides environemnt.api.host value
   -  WAOS_BACK_port=3200 overides config.port value

All front/back configuration varialables are overidable.

   Examples on server with PM2 = 
   
   - Build FRONT : `WAOS_FRONT_api_host=meanie.weareopensource.me WAOS_FRONT_api_port=80 npm run prod`
   - Launch BACK & FRONT : `NODE_ENV=production pm2 start server.js --name meanie`

## Define your own project repo and keep it sync with MEANie
This step is not mandatory. You can directly clone the repository and get a working app. But since you will need to deploy your app soon, hosting your own project on github and configuring it to get the last update from the kick starter is a must. This is done this way:
```bash
## Fork the repo

## Clone the repo localy
$ git clone https://github.com/me/MEANie.git

## cd into it
$ cd MEANie

## Keep track of the upstream
$ git remote add angular https://github.com/weareopensource/Angular.git
$ git remote add node https://github.com/weareopensource/Node.git
$ git remote add upstream https://github.com/weareopensource/MEANie.git

## Install dependencies
$ npm i

## Run it
$ npm start
```

## Sync with the source
Since MEANie is split into two separate projects (Angular and Riess) hosted on two different reposotories, to get the last updates for one or the other part, simply run the commands bellow
```bash
$ git pull upstream master
$ git pull -s subtree angular master
$ git pull -s subtree node master
```

## Contribute
We welcome pull requests from the community!
See [Angular READ.me](https://github.com/weareopensource/Angular) and [Node READ.me](https://github.com/weareopensource/Node).

## [We Are Open Source, Who we are ?](https://weareopensource.me)
Today, we dreams to create Backs/Fronts, aligns on feats, in multiple languages, in order to allow anyone to compose fullstack on demand (React, Angular, VusJS, Node, Nest, Swift, Go).
Feel free to discuss, share other kind of bricks, and invite whoever you want with this mindset to come help us.

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)


## License
[![Packagist](https://badges.weareopensource.me/packagist/l/doctrine/orm.svg?style=flat-square)](/LICENSE.md)

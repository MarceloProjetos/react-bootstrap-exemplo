React-bootstrap-exemplo
========================

How to creat one react + react-bootstrap + lodash and library in one clean aplication with creat-react-app

# Install environment

## 1- Create-react-app installation  

Install it once globally:
```
  -npm install -g create-react-app
```
### Creating an App

To create a new app, run:
```
create-react-app react-bootstrap-exemplo && cd react-bootstrap-exemplo
npm start
```
Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

## 2- Adding Bootstrap

Install React Bootstrap and Bootstrap from NPM. React Bootstrap does not include Bootstrap CSS so this needs to be installed as well:

```
npm install react-bootstrap --save
npm install bootstrap@3 --save
npm install react-bootstrap-date-picker --save
```

Import Bootstrap CSS and optionally Bootstrap theme CSS in the ```src/index.js``` file:

```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```

Import required React Bootstrap components within ```src/App.js``` file or your custom component files:

```js
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
```
Now you are ready to use the imported React Bootstrap components within your component hierarchy defined in the render method.

## 3- Adding mqtt, lodash and node-uuid

MQTT.js is a client library for the [MQTT](http://mqtt.org/) protocol, written
in JavaScript for node.js and the browser.
```
npm install mqtt --save
```
Node-uuid simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.
```
npm install node-uuid --save
```
Lodash makes JavaScript easier by taking the hassle out of working with arrays,
numbers, objects, strings, etc.
```
npm install lodash --save
```
## 4-Broker Installation "ActiveMQ" 

Access the site [ActiveMQ][2]
Look for "Downloads" and download the version **"Windows Distribution"**

Unzip the file "apache-activemq-5.14.1-bin.zip" 
In a terminal window enter the following command

    .../apache-activemq-5.14.1/bin/activemq start

If an error occurred, Maybe you don't have installed "JAVA SE". Download and install the [**"Java SE Development Kit"**][6].

For test open a browser **FireFox** or **Chrome** e connect to port 8161 "http://127.0.0.1:8161/admin/"

Password: **admin**   Login: **admin**

Configuring to start ActiveMQ on Windows Boot.

For systems 64 bits in a terminal window, in root permission, enter the following command

    .../apache-activemq-5.13.3/bin/win64/InstallService.bat

For systems 32 bits in a terminal window, in root permission, enter the following command

    .../apache-activemq-5.13.3/bin/win32/InstallService.bat

To verify that it is installed as a service see:

    Control Panel-->Administrative tools-->Services and look for **ActiveMQ**
    
#MQTT structure of Topics names
![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/create topics.png)

----

#Structure of Project
![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/estrutura.png)

This project is an React page that accesses a "MQTT" server, that accesses the "Node-red". The Node-Red in turn accesses a MongoDB database which stores the duplicates records.

## 5-Node-red

Run the following command in the root directory of your Node-RED install

    npm install -g node-red
    npm install -g bcryptjs

Wait finish installation...

Run the following command in root mode. Of the libraries installation.

    npm install -g node-red-node-mongodb

Run the command prompt **"node-red"**

Open <http://localhost:1880>

To restore a node-red flow with Ctrl-I command or the menu, "Menu > Import > Clipboard".

Below you will find node-red project.

###Duplicatas Node-red Flow
 ```sh
[{"id":"b01357d9.8e32f8","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/alterar/#","qos":"0","broker":"673dc57b.0c3b2c","x":700,"y":1000,"wires":[["da3a4ae8.ed2278"]]},{"id":"ff7ece03.861f6","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1150,"y":1040,"wires":[]},{"id":"f35260a9.3b4e6","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/inserir","qos":"0","broker":"673dc57b.0c3b2c","x":710,"y":1160,"wires":[["f489ca14.807a78"]]},{"id":"46da0969.7c1b78","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1160,"wires":[]},{"id":"6cba88bf.428848","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/excluir","qos":"0","broker":"673dc57b.0c3b2c","x":710,"y":1260,"wires":[["b482c984.a7a4c8"]]},{"id":"7682c3b3.c1fe1c","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1260,"wires":[]},{"id":"f82c0e0d.e9358","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/imprimir","qos":"0","broker":"673dc57b.0c3b2c","x":720,"y":1360,"wires":[["c05a1ab.96bf3e8"]]},{"id":"d72d9964.6e5908","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1360,"wires":[]},{"id":"e0a073b2.98fca","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/listar","qos":"0","broker":"673dc57b.0c3b2c","x":710,"y":1460,"wires":[["2e907298.e15b1e"]]},{"id":"25de084d.06cf28","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1460,"wires":[]},{"id":"8b7d8878.881248","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/busca","qos":"0","broker":"673dc57b.0c3b2c","x":710,"y":1560,"wires":[["dc3d9e14.d5ac5"]]},{"id":"7bf2762d.0f98a8","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1560,"wires":[]},{"id":"2609576c.c9bb18","type":"mqtt in","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/calcular","qos":"0","broker":"673dc57b.0c3b2c","x":720,"y":1660,"wires":[["f950d58b.6acce8"]]},{"id":"a15903ed.f926d","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"payload","x":1130,"y":1660,"wires":[]},{"id":"437e2893.bde318","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"{ \"_id\": \"asdfsd45sdfs09ssdfsdfs\" }","payloadType":"json","repeat":"","crontab":"","once":false,"x":90,"y":1000,"wires":[["83815d4d.264c1"]]},{"id":"83815d4d.264c1","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/gravar/mg09xe054","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":340,"y":1000,"wires":[]},{"id":"11bec429.b3b43c","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"inserir","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":1160,"wires":[["325b9e0e.fb0d32"]]},{"id":"325b9e0e.fb0d32","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/inserir","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":380,"y":1160,"wires":[]},{"id":"16de55f5.7729ea","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"excluir","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":1260,"wires":[["4b2a3f12.29c4"]]},{"id":"4b2a3f12.29c4","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/excluir","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":380,"y":1260,"wires":[]},{"id":"a4f190e5.7a346","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"imprimir","payloadType":"str","repeat":"","crontab":"","once":false,"x":120,"y":1360,"wires":[["feab4145.229df"]]},{"id":"feab4145.229df","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/imprimir","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":380,"y":1360,"wires":[]},{"id":"7081c732.841638","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"listar","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":1460,"wires":[["2c29164c.b68a5a"]]},{"id":"2c29164c.b68a5a","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/listar","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":370,"y":1460,"wires":[]},{"id":"5b77cb36.b9cc04","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"busca","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":1560,"wires":[["f9617e5c.307a4"]]},{"id":"f9617e5c.307a4","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/busca","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":380,"y":1560,"wires":[]},{"id":"f94bb145.4d3a8","type":"inject","z":"10900aeb.adaf25","name":"","topic":"","payload":"calcular","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":1660,"wires":[["fafd3c0b.1b661"]]},{"id":"fafd3c0b.1b661","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"financeiro/duplicata/calcular","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":380,"y":1660,"wires":[]},{"id":"f489ca14.807a78","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1160,"wires":[["46da0969.7c1b78","9a8bb18.44c755"]]},{"id":"b482c984.a7a4c8","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1260,"wires":[["7682c3b3.c1fe1c"]]},{"id":"c05a1ab.96bf3e8","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1360,"wires":[["d72d9964.6e5908"]]},{"id":"2e907298.e15b1e","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1460,"wires":[["25de084d.06cf28"]]},{"id":"f950d58b.6acce8","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1660,"wires":[["a15903ed.f926d"]]},{"id":"dc3d9e14.d5ac5","type":"json","z":"10900aeb.adaf25","name":"","x":930,"y":1560,"wires":[["7bf2762d.0f98a8"]]},{"id":"57fb9f6a.a6b9b","type":"mongodb out","z":"10900aeb.adaf25","service":"_ext_","mongodb":"258dcda0.cc5e32","name":"","collection":"duplicatas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1220,"y":1000,"wires":[]},{"id":"9a8bb18.44c755","type":"mongodb out","z":"10900aeb.adaf25","service":"_ext_","mongodb":"258dcda0.cc5e32","name":"","collection":"duplicatas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1200,"y":1200,"wires":[]},{"id":"a578af9f.e7b65","type":"function","z":"10900aeb.adaf25","name":"","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro/duplicata/alterado/' + msg.payload._id,\n        payload: msg.payload\n    }, \n    {\n        id: msg.id,\n        topic: 'financeiro/duplicata/erros/' + msg.topic.split('/')[msg.topic.split('/').length - 1],\n        payload: msg.payload\n    }\n];","outputs":"2","noerr":0,"x":1130,"y":1080,"wires":[["50d0ea81.613f24","a42cd5d0.603078"],["d60d6d03.50c37","30b5f3f0.993a9c"]]},{"id":"50d0ea81.613f24","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":1390,"y":1060,"wires":[]},{"id":"a42cd5d0.603078","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"true","x":1390,"y":1020,"wires":[]},{"id":"da3a4ae8.ed2278","type":"json","z":"10900aeb.adaf25","name":"","x":950,"y":1000,"wires":[["ff7ece03.861f6","57fb9f6a.a6b9b","a578af9f.e7b65"]]},{"id":"30b5f3f0.993a9c","type":"mqtt out","z":"10900aeb.adaf25","name":"","topic":"","qos":"0","retain":"false","broker":"673dc57b.0c3b2c","x":1390,"y":1160,"wires":[]},{"id":"d60d6d03.50c37","type":"debug","z":"10900aeb.adaf25","name":"","active":true,"console":"false","complete":"true","x":1390,"y":1120,"wires":[]},{"id":"673dc57b.0c3b2c","type":"mqtt-broker","z":"10900aeb.adaf25","broker":"192.168.0.1","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"","willQos":"0","willPayload":"","birthTopic":"","birthQos":"0","birthPayload":""},{"id":"258dcda0.cc5e32","type":"mongodb","z":"","hostname":"127.0.0.1","port":"27017","db":"node-red","name":"mongodb"}]
```
Select all **"Ctrl-a"** --> Copy **"Ctrl-c"** --> Past **"Ctrl-v"** all JSON content to the box that appears empty in node-red.

Click "OK" and position the flow where to find, the better.

Check out http://nodered.org/docs/getting-started/ for full instructions on getting started.

Below you will find some information on how to perform common tasks.

## Table of UI Components

- [Duplicatas](#duplicatas)
- [Node-red](#node-red)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)

## Duplicatas

##Component preview page
![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/duplicatas.png)

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](#running-tests) for more information.

### `npm run build`

---


- [Displaying Lint Output in the Editor](#displaying-lint-output-in-the-editor)
- [Installing a Dependency](#installing-a-dependency)
- [Importing a Component](#importing-a-component)
- [Adding a Stylesheet](#adding-a-stylesheet)
- [Post-Processing CSS](#post-processing-css)
- [Adding Images and Fonts](#adding-images-and-fonts)
- [Using the `public` Folder](#using-the-public-folder)
- [Adding Bootstrap](#adding-bootstrap)
- [Adding Flow](#adding-flow)
- [Adding Custom Environment Variables](#adding-custom-environment-variables)
- [Can I Use Decorators?](#can-i-use-decorators)
- [Integrating with a Node Backend](#integrating-with-a-node-backend)
- [Proxying API Requests in Development](#proxying-api-requests-in-development)
- [Using HTTPS in Development](#using-https-in-development)
- [Generating Dynamic `<meta>` Tags on the Server](#generating-dynamic-meta-tags-on-the-server)
- [Running Tests](#running-tests)
  - [Filename Conventions](#filename-conventions)
  - [Command Line Interface](#command-line-interface)
  - [Version Control Integration](#version-control-integration)
  - [Writing Tests](#writing-tests)
  - [Testing Components](#testing-components)
  - [Using Third Party Assertion Libraries](#using-third-party-assertion-libraries)
  - [Initializing Test Environment](#initializing-test-environment)
  - [Focusing and Excluding Tests](#focusing-and-excluding-tests)
  - [Coverage Reporting](#coverage-reporting)
  - [Continuous Integration](#continuous-integration)
  - [Disabling jsdom](#disabling-jsdom)
  - [Experimental Snapshot Testing](#experimental-snapshot-testing)
- [Deployment](#deployment)
  - [Building for Relative Paths](#building-for-relative-paths)
  - [GitHub Pages](#github-pages)
  - [Heroku](#heroku)
  - [Modulus](#modulus)
  - [Netlify](#netlify)
  - [Now](#now)
  - [Surge](#surge)
- [Something Missing?](#something-missing)

## Updating to New Releases

Create React App is divided into two packages:

* `create-react-app` is a global command-line utility that you use to create new projects.
* `react-scripts` is a development dependency in the generated projects (including this one).

You almost never need to update `create-react-app` itself: it delegates all the setup to `react-scripts`.

When you run `create-react-app`, it always creates the project with the latest version of `react-scripts` so you’ll get all the new features and improvements in newly created apps automatically.

To update an existing project to a new version of `react-scripts`, [open the changelog](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md), find the version you’re currently on (check `package.json` in this folder if you’re not sure), and apply the migration instructions for the newer versions.

In most cases bumping the `react-scripts` version in `package.json` and running `npm install` in this folder should be enough, but it’s good to consult the [changelog](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md) for potential breaking changes.

We commit to keeping the breaking changes minimal so you can upgrade `react-scripts` painlessly.

## Sending Feedback

We are always open to [your feedback](https://github.com/facebookincubator/create-react-app/issues).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Displaying Lint Output in the Editor

>Note: this feature is available with `react-scripts@0.2.0` and higher.

Some editors, including Sublime Text, Atom, and Visual Studio Code, provide plugins for ESLint.

They are not required for linting. You should see the linter output right in your terminal as well as the browser console. However, if you prefer the lint results to appear right in your editor, there are some extra steps you can do.

You would need to install an ESLint plugin for your editor first.

>**A note for Atom `linter-eslint` users**

>If you are using the Atom `linter-eslint` plugin, make sure that **Use global ESLint installation** option is checked:

><img src="http://i.imgur.com/yVNNHJM.png" width="300">

Then add this block to the `package.json` file of your project:

```js
{
  // ...
  "eslintConfig": {
    "extends": "react-app"
  }
}
```

Finally, you will need to install some packages *globally*:

```sh
npm install -g eslint-config-react-app@0.3.0 eslint@3.8.1 babel-eslint@7.0.0 eslint-plugin-react@6.4.1 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-flowtype@2.21.0
```

We recognize that this is suboptimal, but it is currently required due to the way we hide the ESLint dependency. The ESLint team is already [working on a solution to this](https://github.com/eslint/eslint/issues/3458) so this may become unnecessary in a couple of months.

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```
npm install --save <library-name>
```

## Importing a Component

This project setup supports ES6 modules thanks to Babel.<br>
While you can still use `require()` and `module.exports`, we encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead.

For example:

### `Button.js`

```js
import React, { Component } from 'react';

class Button extends Component {
  render() {
    // ...
  }
}

export default Button; // Don’t forget to use export default!
```

### `DangerButton.js`


```js
import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file

class DangerButton extends Component {
  render() {
    return <Button color="red" />;
  }
}

export default DangerButton;
```

Be aware of the [difference between default and named exports](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281). It is a common source of mistakes.

We suggest that you stick to using default imports and exports when a module only exports a single thing (for example, a component). That’s what you get when you use `export default Button` and `import Button from './Button'`.

Named exports are useful for utility modules that export several functions. A module may have at most one default export and as many named exports as you like.

Learn more about ES6 modules:

* [When to use the curly braces?](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)
* [Exploring ES6: Modules](http://exploringjs.com/es6/ch_modules.html)
* [Understanding ES6: Modules](https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules)

## Adding a Stylesheet

This project setup uses [Webpack](https://webpack.github.io/) for handling all assets. Webpack offers a custom way of “extending” the concept of `import` beyond JavaScript. To express that a JavaScript file depends on a CSS file, you need to **import the CSS from the JavaScript file**:

### `Button.css`

```css
.Button {
  padding: 20px;
}
```

### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```

**This is not required for React** but many people find this feature convenient. You can read about the benefits of this approach [here](https://medium.com/seek-ui-engineering/block-element-modifying-your-javascript-components-d7f99fcab52b). However you should be aware that this makes your code less portable to other build tools and environments than Webpack.

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them. In production, all CSS files will be concatenated into a single minified `.css` file in the build output.

If you are concerned about using Webpack-specific semantics, you can put all your CSS right into `src/index.css`. It would still be imported from `src/index.js`, but you could always remove that import if you later migrate to a different build tool.

## Post-Processing CSS

This project setup minifies your CSS and adds vendor prefixes to it automatically through [Autoprefixer](https://github.com/postcss/autoprefixer) so you don’t need to worry about it.

For example, this:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

becomes this:

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

There is currently no support for preprocessors such as Less, or for sharing variables across CSS files.

## Adding Images and Fonts

With Webpack, using static assets like images and fonts works similarly to CSS.

You can **`import` an image right in a JavaScript module**. This tells Webpack to include that image in the bundle. Unlike CSS imports, importing an image or a font gives you a string value. This value is the final image path you can reference in your code.

Here is an example:

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default function Header;
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack finds all relative module references in CSS (they start with `./`) and replaces them with the final paths from the compiled bundle. If you make a typo or accidentally delete an important file, you will see a compilation error, just like when you import a non-existent JavaScript module. The final filenames in the compiled bundle are generated by Webpack from content hashes. If the file content changes in the future, Webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.

Please be advised that this is also a custom feature of Webpack.

**It is not required for React** but many people enjoy it (and React Native uses a similar mechanism for images).<br>
An alternative way of handling static assets is described in the next section.


## Adding Custom Environment Variables

>Note: this feature is available with `react-scripts@0.2.3` and higher.

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`. These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`, in addition
to `process.env.NODE_ENV`.

>Note: Changing any environment variables will require you to restart the development server if it is running.

These environment variables can be useful for displaying information conditionally based on where the project is
deployed or consuming sensitive data that lives outside of version control.

First, you need to have environment variables defined. For example, let’s say you wanted to consume a secret defined
in the environment inside a `<form>`:

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

During the build, `process.env.REACT_APP_SECRET_CODE` will be replaced with the current value of the `REACT_APP_SECRET_CODE` environment variable. Remember that the `NODE_ENV` variable will be set for you automatically.

When you load the app in the browser and inspect the `<input>`, you will see its value set to `abcdef`, and the bold text will show the environment provided when using `npm start`:

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

The above form is looking for a variable called `REACT_APP_SECRET_CODE` from the environment. In order to consume this
value, we need to have it defined in the environment. This can be done using two ways: either in your shell or in
a `.env` file.


## Can I Use Decorators?

Many popular libraries use [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) in their documentation.<br>
Create React App doesn’t support decorator syntax at the moment because:

* It is an experimental proposal and is subject to change.
* The current specification version is not officially supported by Babel.
* If the specification changes, we won’t be able to write a codemod because we don’t use them internally at Facebook.

However in many cases you can rewrite decorator-based code without decorators just as fine.<br>
Please refer to these two threads for reference:

* [#214](https://github.com/facebookincubator/create-react-app/issues/214)
* [#411](https://github.com/facebookincubator/create-react-app/issues/411)

Create React App will add decorator support when the specification advances to a stable stage.


## Running Tests

>Note: this feature is available with `react-scripts@0.3.0` and higher.<br>
>[Read the migration guide to learn how to enable it in older projects!](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md#migrating-from-023-to-030)

Create React App uses [Jest](https://facebook.github.io/jest/) as its test runner. To prepare for this integration, we did a [major revamp](https://facebook.github.io/jest/blog/2016/09/01/jest-15.html) of Jest so if you heard bad things about it years ago, give it another try.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

We recommend that you use a separate tool for browser end-to-end tests if you need them. They are beyond the scope of Create React App.

#Author

[Marcelo Miranda][4]

pxa255@gmail.com

[1]:http://nodered.org
[2]:http://activemq.apache.org/
[3]:https://nodejs.org/
[4]:https://github.com/MarceloProjetos
[5]:https://www.mongodb.com/download-center#community
[6]:http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html
[7]:http://www.pipo-store.com/pipo-x9-tv-box-8-9-inch-mini-pc.html
[8]:https://www.python.org/downloads/release/python-2712/
[9]:https://github.com/MarceloProjetos/HMI-controler-with-node-red/blob/master/NodeRed/settings.js
[10]:https://tortoisegit.org/
[11]:http://www.7-zip.org/
[12]:https://www.sublimetext.com/
[13]:https://packagecontrol.io/installation
[14]:http://gulpjs.com/plugins/

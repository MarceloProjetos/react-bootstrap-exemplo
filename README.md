React-bootstrap-exemplo
========================

How to creat one react + react-bootstrap + lodash and library in one clean aplication with creat-react-app

# Install environment

### To setup this project we need to the free softwares below:

| Software | Description |
| -------- | ----------- |
| [Java SE][6]  |If you have not installed, First download and install the most suitable for your system. X64 or i586. |
| [ActiveMQ][2] | MQTT v3.1 support allowing for connections in an IoT environment.  |
| [NodeJS][3]   | Support package npm, is the largest ecosystem of open source libraries in the world. |
| [Node-Red][1] | Node-RED is a tool for wiring together hardware devices, APIs and online services. |
| [MongoDB][5]  | It is a graphical tool for control together hardware devices, online services and others NPM library. |

## 1-Installation NODE-JS and Python

Access the site [NodeJS][3]

Download the latest LTS version, follow with the default installation. In this example I used the "node-v4.4.5-x64"

Now install the **phyton**. In this tutorial I used [python-2.7.10][8]

Wait for the installation and restart the machine to continue.

## 2- Create-react-app installation  

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

## 3- Adding Bootstrap

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

## 4- Adding mqtt, lodash and node-uuid

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
## 5-Broker Installation "ActiveMQ" 

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

## 6-Installation MongoDB

Access the site [MongoDB][5]
Download file mongodb-win32-x86_64-2008plus-ssl-3.2.9-signed.msi or later version.
Run the default full installation.

Once installed MongoDB Create 3 directories to store the data.

    mkdir c:\data
    mkdir c:\data\db
    mkdir c:\data\log
        
In c:\data create one file named "mongod.cfg" containing:

    systemLog:
    destination: file
    path: c:\data\log\mongod.log
    storage:
    dbPath: c:\data\db

Save and close file...

Starting Server MongoDB "**mongod**"

Enter the directory where is installed the binaries and run the command. 

In my case it is ...

    c:\Program Files\MongoDB\Server\3.2\bin>mongod -dbpath c:\data\db

If your system is Windows 32bits

    C:\Program Files\MongoDB\Server\3.2\bin>mongod --journal --storageEngine=mmapv1 -dbpath c:\data\db
    
If the Windows firewall ask for permission, click the button to "Allow Access".

Now open another Windows Prompt or "Powershell"

To make a connection to MongoDB server that left running in the previous step.

Enter the directory where you installed the binaries again and run:

    c:\Program Files\MongoDB\Server\3.2\bin\mongo.exe

You will see the prompt mongodb, ready to receive your commands!
___
###Testing and creating Collections or Tables

Enter at the prompt where you run "mongo.exe" run commands below:

    use db 					            <--Create a database called db. If exists it enters in the collection.
    db.createCollection('parametros')	<--Create a collection called parametros
    db.createCollection('log_erro')		<--Create a collection called log_erro
    db.createCollection('indice')		<--Create a collection called indice
    show dbs 				            <--Show names of banks and their sizes
    show collections			        <--Displays the collections in the current bank
    exit					            <--Exit to mongo shell or **Ctrl + C**

Installing the service for MongoDB automatically start on Windows **boot**.

Enter the directory where is installed the binaries and run the command.

    c:\Program Files\MongoDB\Server\3.2\bin\mongod --config "c:\data\mongod.cfg" --install
    
If your system is Windows 32bits

    c:\Program Files\MongoDB\Server\3.2\bin\mongod --journal --config "c:\data\mongod.cfg" --install
    
I use as webadmin the "**mongobooster**"

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
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---


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

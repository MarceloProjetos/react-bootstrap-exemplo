React-bootstrap-exemplo
=======================

How to creat one react + react-bootstrap + lodash and library in one clean aplication with creat-react-app

#Structure of Project
![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/estrutura.png)

This project is an React page that accesses a "MQTT" server, that accesses the "Node-red". The Node-Red in turn accesses a MongoDB database which stores the records.

#MQTT structure of Topics names
![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/create topics.png)

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

Download the latest LTS version, follow with the default installation. In this example I used the "node-v6.9.1-x64"

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
   
**Delete all of the topics in ActiveMQ on startup:**

Go to configuration file "ACTIVEMQ.XML", open the file for editing on the broker element, add the following attribute: 

    deleteAllMessagesOnStartup="true"
   
This will cause all previous topics & queues, and their pending messages to be deleted from your kaha store when you restart your broker.

In my case...

    <broker xmlns="http://activemq.apache.org/schema/core" brokerName="localhost" dataDirectory="${activemq.data}"  deleteAllMessagesOnStartup="true">

----

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

###Financeiro Node-red Flow
 ```sh
[{"id":"7682ced4.b2797","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/incluir/#","qos":"0","broker":"8c91fad3.2f359","x":714.11669921875,"y":302.1166687011719,"wires":[["655b6531.8b397c"]]},{"id":"49f58bb6.cafbbc","type":"debug","z":"121c01c2.e652c6","name":"","active":true,"console":"false","complete":"payload","x":1154.11669921875,"y":302.1166687011719,"wires":[]},{"id":"5fcabf38.e2dec","type":"inject","z":"121c01c2.e652c6","name":"Incluido","topic":"","payload":"testando incluido","payloadType":"str","repeat":"","crontab":"","once":false,"x":134.11669921875,"y":302.1166687011719,"wires":[["6154d42e.a02964"]]},{"id":"655b6531.8b397c","type":"json","z":"121c01c2.e652c6","name":"","x":950.11669921875,"y":302.1166687011719,"wires":[["49f58bb6.cafbbc","c9dd8b01.6af208"]]},{"id":"12dfbf40.b03bc9","type":"function","z":"121c01c2.e652c6","name":"","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro.cadastro.contas.alterado.' + msg.payload._id,\n        payload: msg.payload\n    }, \n    {\n        id: msg.id,\n        topic: 'financeiro.cadastro.contas.erros.' + msg.topic.split('/')[msg.topic.split('/').length - 1],\n        payload: msg.payload\n    }\n];","outputs":"2","noerr":0,"x":1154.11669921875,"y":223.11666870117188,"wires":[["572ea40.fe662dc"],["bfe40a41.cbe938"]]},{"id":"572ea40.fe662dc","type":"debug","z":"121c01c2.e652c6","name":"","active":true,"console":"false","complete":"true","x":1339.11669921875,"y":207.11666870117188,"wires":[]},{"id":"bfe40a41.cbe938","type":"debug","z":"121c01c2.e652c6","name":"","active":true,"console":"false","complete":"true","x":1341.11669921875,"y":254.11666870117188,"wires":[]},{"id":"ea8107a7.2c9958","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"","collection":"duplicatas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1835.4443969726562,"y":102.49209594726562,"wires":[]},{"id":"d6fbe76e.108e3","type":"link in","z":"121c01c2.e652c6","name":"fila_react","links":["a3841933.a3a358","c9dd8b01.6af208"],"x":1659.4500122070312,"y":102.1166763305664,"wires":[["ea8107a7.2c9958"]]},{"id":"c9dd8b01.6af208","type":"link out","z":"121c01c2.e652c6","name":"","links":["d6fbe76e.108e3"],"x":1057.7000122070312,"y":269.1166687011719,"wires":[]},{"id":"6154d42e.a02964","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/incluido/","topic":"financeiro/cadastro/contas/incluido/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":310.5624694824219,"y":302.4375,"wires":[]},{"id":"b45293d2.db863","type":"inject","z":"121c01c2.e652c6","name":"Alterado","topic":"","payload":"testando alterado","payloadType":"str","repeat":"","crontab":"","once":false,"x":143.89584350585938,"y":377.6458435058594,"wires":[["a9267c84.a3c97"]]},{"id":"a9267c84.a3c97","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/alterado/","topic":"financeiro/cadastro/contas/alterado/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":310.34161376953125,"y":377.9666748046875,"wires":[]},{"id":"ee7ddeb1.dd89e8","type":"inject","z":"121c01c2.e652c6","name":"Erros","topic":"","payload":"testando erros","payloadType":"str","repeat":"","crontab":"","once":false,"x":132.64584350585938,"y":166.89584350585938,"wires":[["23ff999.118ece6"]]},{"id":"23ff999.118ece6","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/erros/","topic":"financeiro/cadastro/contas/erros/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":299.09161376953125,"y":167.2166748046875,"wires":[]},{"id":"b86c7e09.ac246","type":"inject","z":"121c01c2.e652c6","name":"Search","topic":"","payload":"testando search","payloadType":"str","repeat":"","crontab":"","once":false,"x":132.42498779296875,"y":234.42501831054688,"wires":[["83808054.abfb4"]]},{"id":"83808054.abfb4","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/search/","topic":"financeiro/cadastro/contas/search/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":308.8707580566406,"y":234.745849609375,"wires":[]},{"id":"ce65f1db.fa2d9","type":"inject","z":"121c01c2.e652c6","name":"Excluido","topic":"","payload":"testando excluido","payloadType":"str","repeat":"","crontab":"","once":false,"x":138.89584350585938,"y":448.8958435058594,"wires":[["132b6521.9052fb"]]},{"id":"132b6521.9052fb","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/excluido/","topic":"financeiro/cadastro/contas/excluido/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":305.34161376953125,"y":449.2166748046875,"wires":[]},{"id":"96389197.5abbe","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/#","qos":"0","broker":"8c91fad3.2f359","x":598.8958740234375,"y":510.14581298828125,"wires":[["2c66b4d8.56aa7c","6942310e.17915"]]},{"id":"2c66b4d8.56aa7c","type":"debug","z":"121c01c2.e652c6","name":"MQTT # RAW","active":false,"console":"false","complete":"payload","x":1223.8958740234375,"y":506.3958435058594,"wires":[]},{"id":"6942310e.17915","type":"function","z":"121c01c2.e652c6","name":"Store and shift msg","func":"\n\n\n// initialise the counter to 0 if it doesn't exist already\nvar text = context.get('text')|| [];\n\ntext.push(msg);\nif (text.length > 20){\n    text.shift();\n    text.length = 20;\n} \n\n// store the value back\ncontext.set('text',text);\n// make it part of the outgoing msg object\nmsg = {};\nmsg.payload = text;\nreturn msg;\n","outputs":1,"noerr":0,"x":893.8958740234375,"y":566.3958435058594,"wires":[["693b1c2.8bf10e4","2505d6a8.981a8a"]]},{"id":"693b1c2.8bf10e4","type":"debug","z":"121c01c2.e652c6","name":"mqtt array","active":true,"console":"false","complete":"payload","x":1213.8958740234375,"y":586.3958435058594,"wires":[]},{"id":"2505d6a8.981a8a","type":"ui_template","z":"121c01c2.e652c6","group":"3a10a5e1.081502","name":"MQTT Output","order":1,"width":"9","height":"10","format":"<ul>\n <li ng-repeat=\"x in msg.payload\">\n <font color=\"red\">{{x.topic}}</font>\n    <ul>\n        <li>{{x.payload}}</li>\n    </ul>\n </li>\n</ul>","storeOutMessages":true,"fwdInMessages":true,"x":1223.8958740234375,"y":546.3958435058594,"wires":[[]]},{"id":"316128f.ee2f8d8","type":"mqtt out","z":"121c01c2.e652c6","name":"","topic":"","qos":"0","retain":"","broker":"8c91fad3.2f359","x":1233.8958740234375,"y":686.3958435058594,"wires":[]},{"id":"894b37a3.4279f8","type":"ui_text_input","z":"121c01c2.e652c6","name":"Message","label":"Message","group":"3a10a5e1.081502","order":3,"width":"","height":"","mode":"text","delay":"300","topic":"message","x":623.8958740234375,"y":626.3958435058594,"wires":[["c182ff6.ea814"]]},{"id":"c4ab64c2.fcfdf8","type":"ui_button","z":"121c01c2.e652c6","name":"Submit","group":"3a10a5e1.081502","order":4,"width":"6","height":"2","label":"SUBMIT","color":"black","icon":"fa-arrow-circle-o-up","payload":"submit","topic":"submit","x":613.8958740234375,"y":666.3958435058594,"wires":[["c182ff6.ea814"]]},{"id":"c182ff6.ea814","type":"function","z":"121c01c2.e652c6","name":"Store and Submit","func":"context.msg = context.msg || {};\n\nswitch (msg.topic){\n    case 'message':\n        context.msg.payload = msg.payload;\n        break;\n    case 'topic':\n        context.msg.topic = msg.payload;\n        break;\n    case 'submit':\n        if(context.msg.topic){\n            return context.msg;\n        }else{\n            context.msg.topic=\"#\"; // set default topic\n            return context.msg;\n        }\n}","outputs":"1","noerr":0,"x":893.8958740234375,"y":646.3958435058594,"wires":[["316128f.ee2f8d8","a8cad9fa.cacb48"]]},{"id":"a8cad9fa.cacb48","type":"debug","z":"121c01c2.e652c6","name":"MQTT Monitor","active":true,"console":"false","complete":"true","x":1203.8958740234375,"y":646.3958435058594,"wires":[]},{"id":"94987da1.f60e","type":"ui_text_input","z":"121c01c2.e652c6","name":"Topic","label":"Topic/","group":"3a10a5e1.081502","order":2,"width":"","height":"","mode":"text","delay":300,"topic":"topic","x":613.8958740234375,"y":586.3958435058594,"wires":[["c182ff6.ea814"]]},{"id":"e640a697.776f6","type":"ui_button","z":"121c01c2.e652c6","name":"Clear","group":"3a10a5e1.081502","order":0,"width":"4","height":"2","label":"CLEAR","color":"black","icon":"fa-trash","payload":"","topic":"","x":613.8958740234375,"y":706.3958435058594,"wires":[["94987da1.f60e","894b37a3.4279f8"]]},{"id":"21e460e2.ee1db8","type":"comment","z":"121c01c2.e652c6","name":"MQTT Console","info":"This flow demonstrates how to view MQTT data\n\nIt is also a nice demonstration how you can\nuse an array to shift data into the UI template\n\n\nUI Viewable:\nhttp://localhost:1880/ui\n\nWritten by\nCory Guynn\n2016\nwww.InternetOfLEG0.com","x":643.8958740234375,"y":442.6458435058594,"wires":[]},{"id":"8c91fad3.2f359","type":"mqtt-broker","z":"121c01c2.e652c6","broker":"localhost","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"","willQos":"0","willPayload":"","birthTopic":"","birthQos":"0","birthPayload":""},{"id":"1ba03f37.e3ec11","type":"mongodb","z":"","hostname":"127.0.0.1","port":"27017","db":"db","name":""},{"id":"3a10a5e1.081502","type":"ui_group","z":"121c01c2.e652c6","name":"MQTT Console","tab":"714785c.2b77bfc","disp":true,"width":"12"},{"id":"714785c.2b77bfc","type":"ui_tab","z":"","name":"Home","icon":"dashboard"}]
```
Select all **"Ctrl-a"** --> Copy **"Ctrl-c"** --> Past **"Ctrl-v"** all JSON content to the box that appears empty in node-red.

Click "OK" and position the flow where to find, the better.

Check out http://nodered.org/docs/getting-started/ for full instructions on getting started.

Below you will find some information on how to perform common tasks.

##5-Configuring access of node-red across settings.js

**DNS**
There are two ways to access a page on the Internet: the domain name "DNS" or "IP ADDRESS" of the servers on which it is hosted. In our case "Node-RED."

For your application to make a simple DNS access or "IP ADDRESS". We need to edit the [settings.js][9] file.

    user folder...\AppData\Roaming\npm\node_modules\node-red\settings.js
or 

    user folder...\.node-red\settings.js

The first thing that changed is the node-red port. Change 8080 to 80 as below:

    uiPort: process.env.PORT || 80,
    
The second change was uncomment the line 

    httpAdminRoot: '/admin',
    
Now save the "settings.js" and restart **node-red**
    
With this change your page application its goes::

    http://127.0.0.1:80
    
And now to access your **node-red flow** enter in:

    http://127.0.0.1:80/admin/

And now it is easy to configure your DNS server, for directly access your application. And remember now to access your flow is "IP/admin"!

Now you can create an ALIAS on your DNS server for the IP Project.

| NAME          |   TYPE        |   TARGET      |
| --------      | -----------   |-----------    |
| example.com   |      A        | 192.168.0.X   |

___
##6- PASSWORD in node-red flow

To protect your **node-red flow**, you can enable password. 

The first thing enter the **node_modules** directory:

    ....\AppData\Roaming\npm\node_modules

You need to make a key with this commnand and put your **password**:

    node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here

Now save result number and edit the file settings.js again.

 ```sh
 /**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// The `https` setting requires the `fs` module. Uncomment the following
// to make it available:
//var fs = require("fs");

module.exports = {
    // the tcp port that the Node-RED web server is listening on
    uiPort: process.env.PORT || 80,

    // By default, the Node-RED UI accepts connections on all IPv4 interfaces.
    // The following property can be used to listen on a specific interface. For
    // example, the following would only allow connections from the local machine.
    //uiHost: "127.0.0.1",

    // Retry time in milliseconds for MQTT connections
    mqttReconnectTime: 15000,

    // Retry time in milliseconds for Serial port connections
    serialReconnectTime: 15000,

    // Retry time in milliseconds for TCP socket connections
    //socketReconnectTime: 10000,

    // Timeout in milliseconds for TCP server socket connections
    //  defaults to no timeout
    //socketTimeout: 120000,

    // Timeout in milliseconds for HTTP request connections
    //  defaults to 120 seconds
    //httpRequestTimeout: 120000,

    // The maximum length, in characters, of any message sent to the debug sidebar tab
    debugMaxLength: 1000,

    // The file containing the flows. If not set, it defaults to flows_<hostname>.json
    //flowFile: 'flows.json',

    // To enabled pretty-printing of the flow within the flow file, set the following
    //  property to true:
    //flowFilePretty: true,

    // By default, all user data is stored in the Node-RED install directory. To
    // use a different location, the following property can be used
    //userDir: '/home/nol/.node-red/',

    // Node-RED scans the `nodes` directory in the install directory to find nodes.
    // The following property can be used to specify an additional directory to scan.
    //nodesDir: '/home/nol/.node-red/nodes',

    // By default, the Node-RED UI is available at http://localhost:1880/
    // The following property can be used to specifiy a different root path.
    // If set to false, this is disabled.
    httpAdminRoot: '/admin',

    // Some nodes, such as HTTP In, can be used to listen for incoming http requests.
    // By default, these are served relative to '/'. The following property
    // can be used to specifiy a different root path. If set to false, this is
    // disabled.
    //httpNodeRoot: '/red-nodes',

    // The following property can be used in place of 'httpAdminRoot' and 'httpNodeRoot',
    // to apply the same root to both parts.
    //httpRoot: '/red',

    // When httpAdminRoot is used to move the UI to a different root path, the
    // following property can be used to identify a directory of static content
    // that should be served at http://localhost:1880/.
    //httpStatic: '/home/nol/node-red-static/',

    // Securing Node-RED
    // -----------------
    // To password protect the Node-RED editor and admin API, the following
    // property can be used. See http://nodered.org/docs/security.html for details.
    adminAuth: {
        type: "credentials",
        users: [{
           username: "admin",
            password: "$2a$08$tIP24A6fn9F9DH30OwunG.4dWSO7sJk/YvbabyvKY1ej9DN0GrCLe",
            permissions: "*"
        }]
    },

    // To password protect the node-defined HTTP endpoints (httpNodeRoot), or 
    // the static content (httpStatic), the following properties can be used.
    // The pass field is a bcrypt hash of the password.
    // See http://nodered.org/docs/security.html#generating-the-password-hash
    //httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},
    //httpStaticAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},

    // The following property can be used to enable HTTPS
    // See http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
    // for details on its contents.
    // See the comment at the top of this file on how to load the `fs` module used by
    // this setting.
    //
    //https: {
    //    key: fs.readFileSync('privatekey.pem'),
    //    cert: fs.readFileSync('certificate.pem')
    //},

    // The following property can be used to disable the editor. The admin API
    // is not affected by this option. To disable both the editor and the admin
    // API, use either the httpRoot or httpAdminRoot properties
    //disableEditor: false,

    // The following property can be used to configure cross-origin resource sharing
    // in the HTTP nodes.
    // See https://github.com/troygoode/node-cors#configuration-options for
    // details on its contents. The following is a basic permissive set of options:
    //httpNodeCors: {
    //    origin: "*",
    //    methods: "GET,PUT,POST,DELETE"
    //},

    // If you need to set an http proxy please set an environment variable
    // called http_proxy (or HTTP_PROXY) outside of Node-RED in the operating system.
    // For example - http_proxy=http://myproxy.com:8080
    // (Setting it here will have no effect)
    // You may also specify no_proxy (or NO_PROXY) to supply a comma separated
    // list of domains to not proxy, eg - no_proxy=.acme.co,.acme.co.uk

    // The following property can be used to add a custom middleware function
    // in front of all http in nodes. This allows custom authentication to be
    // applied to all http in nodes, or any other sort of common request processing.
    //httpNodeMiddleware: function(req,res,next) {
    //   // Handle/reject the request, or pass it on to the http in node
    //   // by calling next();
    //   next();
    //},

    // Anything in this hash is globally available to all functions.
    // It is accessed as context.global.
    // eg:
    //    functionGlobalContext: { os:require('os') }
    // can be accessed in a function block as:
    //    context.global.os

    functionGlobalContext: {
        // os:require('os'),
        // octalbonescript:require('octalbonescript'),
        // jfive:require("johnny-five"),
        // j5board:require("johnny-five").Board({repl:false})
    },

    // The following property can be used to order the categories in the editor
    // palette. If a node's category is not in the list, the category will get
    // added to the end of the palette.
    // If not set, the following default order is used:
    //paletteCategories: ['subflows', 'input', 'output', 'function', 'social', 'mobile', 'storage', 'analysis', 'advanced'],

    // Configure the logging output
    logging: {
        // Only console logging is currently supported
        console: {
            // Level of logging to be recorded. Options are:
            // fatal - only those errors which make the application unusable should be recorded
            // error - record errors which are deemed fatal for a particular request + fatal errors
            // warn - record problems which are non fatal + errors + fatal errors
            // info - record information about the general running of the application + warn + error + fatal errors
            // debug - record information which is more verbose than info + info + warn + error + fatal errors
            // trace - record very detailed logging + debug + info + warn + error + fatal errors
            level: "info",
            // Whether or not to include metric events in the log output
            metrics: false,
            // Whether or not to include audit events in the log output
            audit: false
        }
    }
}
 ```

Find and uncomment the lines as bellow and place the generated password on the line.

    adminAuth: {
        type: "credentials",
        users: [{
           username: "admin",
            password: "your generated password",
            permissions: "*"
        }]
    },

Now save the "settings.js" and restart **node-red**

When you come back to:

    http://127.0.0.1:80/admin/

![alt tag](https://github.com/MarceloProjetos/react-bootstrap-exemplo/blob/master/images/node-red_login.png)

Put username: "admin" and password: 

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

The build folder is ready to be deployed.
You may also serve it locally with a static server:
```
  npm install -g pushstate-server
  pushstate-server build
```
Open http://localhost:9000

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
[10]:https://tortoisegit.org/
[11]:http://www.7-zip.org/
[12]:https://www.sublimetext.com/
[13]:https://packagecontrol.io/installation


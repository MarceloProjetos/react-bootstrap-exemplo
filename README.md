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
[{"id":"7682ced4.b2797","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/incluir/#","qos":"0","broker":"8c91fad3.2f359","x":202.36669921875,"y":133.36663818359375,"wires":[["12dfbf40.b03bc9"]]},{"id":"12dfbf40.b03bc9","type":"function","z":"121c01c2.e652c6","name":"Recupera topico ID","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro/cadastro/contas/incluido/' + msg.topic.split('/')[msg.topic.split('/').length - 1], //msg.payload._id,\n        payload: msg.payload\n    }\n];","outputs":"1","noerr":0,"x":471.36669921875,"y":133.36663818359375,"wires":[["81a78833.86e62","94c7a1b5.60b19"]]},{"id":"572ea40.fe662dc","type":"debug","z":"121c01c2.e652c6","name":"Incluir + ID","active":true,"console":"false","complete":"payload","x":1091.6166381835938,"y":135.11663818359375,"wires":[]},{"id":"ee7ddeb1.dd89e8","type":"inject","z":"121c01c2.e652c6","name":"Erros","topic":"","payload":"testando erros","payloadType":"str","repeat":"","crontab":"","once":false,"x":2062.31280708313,"y":442.2291774749756,"wires":[["23ff999.118ece6"]]},{"id":"23ff999.118ece6","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/erros/","topic":"financeiro/cadastro/contas/erros/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":2273.7585773468018,"y":442.5500087738037,"wires":[]},{"id":"83808054.abfb4","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/carregado/","topic":"financeiro/cadastro/contas/carregado/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":2268.092971801758,"y":328.09498405456543,"wires":[]},{"id":"ce65f1db.fa2d9","type":"inject","z":"121c01c2.e652c6","name":"Excluido","topic":"","payload":"testando excluido","payloadType":"str","repeat":"","crontab":"","once":false,"x":2067.8960971832275,"y":506.89590072631836,"wires":[["132b6521.9052fb"]]},{"id":"132b6521.9052fb","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/excluido/","topic":"financeiro/cadastro/contas/excluido/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":2261.3418674468994,"y":507.2167320251465,"wires":[]},{"id":"81a78833.86e62","type":"mqtt out","z":"121c01c2.e652c6","name":"incluido/+id","topic":"","qos":"0","retain":"","broker":"8c91fad3.2f359","x":705.8959655761719,"y":133.64584350585938,"wires":[]},{"id":"44ae7300.d74534","type":"function","z":"121c01c2.e652c6","name":"mudar 1 socio apenas","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $set: {\n \"parametros.encoder.fator\": 2225\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1696.0776901245117,"y":1986.1056880950928,"wires":[["f187b2b6.b6a63"]]},{"id":"f187b2b6.b6a63","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"update only one","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1956.0776748657227,"y":1986.5056819915771,"wires":[]},{"id":"2ae16da8.2847ea","type":"inject","z":"121c01c2.e652c6","name":"String vazia","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1398.110466003418,"y":2205.9500455856323,"wires":[["be2e0093.f34b"]]},{"id":"c32f3c3c.1db5c","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"contas","operation":"find","x":1917.07763671875,"y":2206.3055419921875,"wires":[["6ce4b274.6a857c"]]},{"id":"6ce4b274.6a857c","type":"debug","z":"121c01c2.e652c6","name":"resposta do MongoDB","active":true,"console":"false","complete":"payload","x":2201.188678741455,"y":2206.4166975021362,"wires":[]},{"id":"d3026044.f1e3a","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION cadastroErros","collection":"cadastroErros","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1816.8551559448242,"y":1609.3277130126953,"wires":[]},{"id":"967dd0c8.0294f8","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção cadastroErros","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1459.6087036132812,"y":1610.054768562317,"wires":[["d3026044.f1e3a"]]},{"id":"ed222d8d.ef127","type":"inject","z":"121c01c2.e652c6","name":"Editar socios","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1398.9112281799316,"y":1985.7723846435547,"wires":[["44ae7300.d74534"]]},{"id":"f2646d64.451328","type":"function","z":"121c01c2.e652c6","name":"indiceErros +1","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $inc: {\n \"os.produzido\": 1\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1729.2997360229492,"y":2112.883364677429,"wires":[["3c3923c3.dcd8dc"]]},{"id":"3c3923c3.dcd8dc","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"indiceErros","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1927.2997207641602,"y":2113.2833585739136,"wires":[]},{"id":"1a69f22c.9b41e6","type":"inject","z":"121c01c2.e652c6","name":"$inc: incrementa","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1406.1332740783691,"y":2112.550061225891,"wires":[["f2646d64.451328","cdd6978.b585ee8"]]},{"id":"be2e0093.f34b","type":"function","z":"121c01c2.e652c6","name":"Paginação ","func":"msg.limit = 5;\nmsg.skip = 0;\nreturn msg;","outputs":1,"noerr":0,"x":1715.5219898223877,"y":2206.3648252487183,"wires":[["c32f3c3c.1db5c"]]},{"id":"e5ec74d.d132f08","type":"comment","z":"121c01c2.e652c6","name":"Paginação e consulta MongoDB","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1434.2998237609863,"y":2170.216664791107,"wires":[]},{"id":"5db31b3.d297764","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura cadastroErros","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1449.7440872192383,"y":1852.633430480957,"wires":[["a2c74153.fb8b48"]]},{"id":"520a8e88.6cd96","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"cadastroErros","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1942.1019744873047,"y":1852.6842622756958,"wires":[]},{"id":"a2c74153.fb8b48","type":"function","z":"121c01c2.e652c6","name":"collection inicial cadastroErros","func":"msg.payload = {\n\t\"_id\": 1,\n\t\"log_mesagens\": {\n\t}\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1725.1109619140625,"y":1852.7890491485596,"wires":[["520a8e88.6cd96"]]},{"id":"94ee7df0.7d2bf","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"contas","operation":"find","x":1818.966344833374,"y":2286.8000688552856,"wires":[["e0e75b6.7a79528"]]},{"id":"fdb316d6.40a7f8","type":"function","z":"121c01c2.e652c6","name":"lê apenas uma conta","func":"// Para ler um registro primeiro especificar \"_id\" no payload\nmsg.payload = { \"_id\": \"AplanadoraN3\" }\n\n// No parametro projection 1 ou zero significa ler ou inguinorar resultado\nmsg.projection = { \"parametros.encoder.fator\": 1 }\n\n// Ler 1 valor\nmsg.limit = 1;\n\n// Pular 0 resultados\nmsg.skip = 0;\n\nreturn msg;","outputs":1,"noerr":0,"x":1606.0774154663086,"y":2286.6370992660522,"wires":[["94ee7df0.7d2bf"]]},{"id":"70f73b01.f2ce4c","type":"inject","z":"121c01c2.e652c6","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1386.0913257598877,"y":2286.3000497817993,"wires":[["fdb316d6.40a7f8"]]},{"id":"e0e75b6.7a79528","type":"function","z":"121c01c2.e652c6","name":"parse(contas)","func":"msg.payload=msg.payload[0].parametros.encoder.fator;\nreturn msg;","outputs":1,"noerr":0,"x":1992.1331615447998,"y":2287.2167682647705,"wires":[["1c544383.04b18c"]]},{"id":"1c544383.04b18c","type":"debug","z":"121c01c2.e652c6","name":"ler conta x","active":true,"console":"false","complete":"payload","x":2208.4665813446045,"y":2287.216649055481,"wires":[]},{"id":"69563f09.b28dc8","type":"comment","z":"121c01c2.e652c6","name":"Lê apenas um valor","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1391.2993774414062,"y":2251.216709136963,"wires":[]},{"id":"cdd6978.b585ee8","type":"function","z":"121c01c2.e652c6","name":"Delay 50ms","func":"setTimeout(function() {\n node.send(msg);\n}, 50);\nreturn null;","outputs":1,"noerr":0,"x":1718.6331405639648,"y":2148.327651977539,"wires":[["be2e0093.f34b"]]},{"id":"1d14800b.2f08d","type":"comment","z":"121c01c2.e652c6","name":"Contador Produzidos ++ ","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1411.29931640625,"y":2074.216621398926,"wires":[]},{"id":"d3f89ac0.12fba8","type":"comment","z":"121c01c2.e652c6","name":"Edita apenas 1 registro do banco com $set","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1464.077247619629,"y":1947.5500183105469,"wires":[]},{"id":"c8a29805.b6bb38","type":"comment","z":"121c01c2.e652c6","name":"2- Cria estrutura inicial das coleções","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1444.6328125,"y":1707.883355140686,"wires":[]},{"id":"1414b9c2.a6a716","type":"comment","z":"121c01c2.e652c6","name":"1- Apagar Cuidado","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1396.1882400512695,"y":1469.1055097579956,"wires":[]},{"id":"5016c318.c2149c","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION contas","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1796.2994003295898,"y":1561.105484008789,"wires":[]},{"id":"5c88fdd8.1acdac","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção contas","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1429.941551208496,"y":1561.0546875,"wires":[["5016c318.c2149c"]]},{"id":"ba044038.ba9fa8","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura indice erros","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1439.2660827636719,"y":1902.1501331329346,"wires":[["da3d3acc.a2778"]]},{"id":"70911be6.65ec7c","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"indiceErros","payonly":true,"upsert":false,"multi":true,"operation":"store","x":1942.1794624328613,"y":1901.645502090454,"wires":[]},{"id":"da3d3acc.a2778","type":"function","z":"121c01c2.e652c6","name":"collection inicial indice erros","func":"msg.payload = {\n\t\"_id\": \"indice\",\n\t\"indice_mesagens\": 0\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1714.632957458496,"y":1901.9723644256592,"wires":[["70911be6.65ec7c"]]},{"id":"60ab52aa.e6af4c","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção indice erros","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1449.7068710327148,"y":1657.9946022033691,"wires":[["1ee86819.31d6b"]]},{"id":"1ee86819.31d6b","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION indice erros","collection":"indiceErros","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1808.7068710327148,"y":1657.6612281799316,"wires":[]},{"id":"a6730d6d.bd0b98","type":"comment","z":"121c01c2.e652c6","name":"Consulta MongoDB por string","info":"$options => i for case insensitive search\n\nStart with string\n\ndb.collection.find({zip:{'$regex' : '^string', '$options' : 'i'}})\nEnd with string\n\ndb.collection.find({zip:{'$regex' : 'string$', '$options' : 'i'}})\nContains string\n\ndb.collection.find({zip:{'$regex' : 'string', '$options' : 'i'}})\nDoesn't Contains string\n\ndb.collection.find({zip:{'$regex' : '^((?!string).)*$', '$options' : 'i'}})\nKeep this as a bookmark, and a reference for any other alterations you may need. http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/","x":815.7826843261719,"y":1342.9333305358887,"wires":[]},{"id":"755700d0.fcf13","type":"function","z":"121c01c2.e652c6","name":"Exemplo de consulta","func":"msg.limit = parseInt(msg.req.query.size) || 10;\nmsg.skip = ((parseInt(msg.req.query.page) || 1) - 1) * (parseInt(msg.req.query.page) || 1);\nmsg.payload = {nome: {'$regex' : msg.payload.nome, '$options' : 'i'}}\nreturn msg;","outputs":1,"noerr":0,"x":793.5605010986328,"y":1305.1556816101074,"wires":[[]]},{"id":"45050a35.b86a3c","type":"http response","z":"121c01c2.e652c6","name":"","x":922.0000114440918,"y":1879.2333975897895,"wires":[]},{"id":"771652d0.cbdb84","type":"http in","z":"121c01c2.e652c6","name":"Index","url":"/","method":"get","swaggerDoc":"","x":175.44436899820948,"y":1880.3444595336914,"wires":[["44f20f94.f11c2"]]},{"id":"44f20f94.f11c2","type":"file in","z":"121c01c2.e652c6","name":"index.HTML","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/index.html","format":"utf8","x":449.5554847717285,"y":1880.4555722342598,"wires":[["8db30837.985d4"]]},{"id":"7861393f.592d6","type":"http response","z":"121c01c2.e652c6","name":"","x":926.4444974263515,"y":1951.9000464545356,"wires":[]},{"id":"7a70a71e.94008","type":"http in","z":"121c01c2.e652c6","name":"css/hmi.min.css","url":"/css/hmi.min.css","method":"get","swaggerDoc":"","x":205.88885498046875,"y":1952.0111083984375,"wires":[["551441d5.4b8ee8"]]},{"id":"551441d5.4b8ee8","type":"file in","z":"121c01c2.e652c6","name":"hmi.min","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/css/hmi.min.css","format":"utf8","x":440.6666030883789,"y":1951.8999777899849,"wires":[["69327f65.c3f428"]]},{"id":"69327f65.c3f428","type":"function","z":"121c01c2.e652c6","name":"Text/CSS","func":"msg.headers = { \"Content-type\" : \"text/css\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":786.9999084472656,"y":1951.7888995276558,"wires":[["7861393f.592d6"]]},{"id":"fd3797c0.8cc5c","type":"comment","z":"121c01c2.e652c6","name":"HTML","info":"","x":174.99999618530273,"y":1844.2333727942573,"wires":[]},{"id":"c281a342.a230d","type":"comment","z":"121c01c2.e652c6","name":"CSS","info":"","x":175.88880920410156,"y":1916.3446322547065,"wires":[]},{"id":"65b4a503.cbdf94","type":"comment","z":"121c01c2.e652c6","name":"JAVASCRIPT","info":"","x":195.33330917358398,"y":1990.7891465293037,"wires":[]},{"id":"e19ac9f.d6ad4b8","type":"http response","z":"121c01c2.e652c6","name":"","x":926.4444592793789,"y":2026.3444663153755,"wires":[]},{"id":"22de03c2.f8a3fc","type":"http in","z":"121c01c2.e652c6","name":"jquery.js","url":"/js/jquery.js","method":"get","swaggerDoc":"","x":185.8888168334961,"y":2027.4555282592773,"wires":[["44ddad52.b26d2c"]]},{"id":"44ddad52.b26d2c","type":"file in","z":"121c01c2.e652c6","name":"jquery.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.js","format":"utf8","x":440.66656494140625,"y":2027.3443976508247,"wires":[["e19ac9f.d6ad4b8"]]},{"id":"c1563bd7.070a38","type":"http response","z":"121c01c2.e652c6","name":"","x":926.8889172871914,"y":2063.4555808173286,"wires":[]},{"id":"d311c1d2.0b87e","type":"http in","z":"121c01c2.e652c6","name":"jquery-ui.js","url":"/js/jquery-ui.js","method":"get","swaggerDoc":"","x":186.3332748413086,"y":2064.5666427612305,"wires":[["7d0c33fd.ff6a1c"]]},{"id":"7d0c33fd.ff6a1c","type":"file in","z":"121c01c2.e652c6","name":"jquery-ui.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery-ui.js","format":"utf8","x":451.11102294921875,"y":2064.455512152778,"wires":[["c1563bd7.070a38"]]},{"id":"c3586623.dcdba","type":"http response","z":"121c01c2.e652c6","name":"","x":926.8889172871914,"y":2099.900038825141,"wires":[]},{"id":"400d41e2.c9ff38","type":"http in","z":"121c01c2.e652c6","name":"jquery.keyboard.js","url":"/js/jquery.keyboard.js","method":"get","swaggerDoc":"","x":216.3332748413086,"y":2101.011100769043,"wires":[["eab92516.41cb6"]]},{"id":"eab92516.41cb6","type":"file in","z":"121c01c2.e652c6","name":"jquery.keyboard.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.keyboard.js","format":"utf8","x":471.11102294921875,"y":2100.8999701605903,"wires":[["c3586623.dcdba"]]},{"id":"9c7f585d.600248","type":"http response","z":"121c01c2.e652c6","name":"","x":927.3333752950039,"y":2137.0111533270942,"wires":[]},{"id":"5dd5d24a.0749e4","type":"http in","z":"121c01c2.e652c6","name":"jquery.mousewheel.js","url":"/js/jquery.mousewheel.js","method":"get","swaggerDoc":"","x":226.7777328491211,"y":2138.122215270996,"wires":[["12c9bd94.3bfcca"]]},{"id":"12c9bd94.3bfcca","type":"file in","z":"121c01c2.e652c6","name":"jquery.mousewheel.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.mousewheel.js","format":"utf8","x":481.55548095703125,"y":2138.0110846625435,"wires":[["9c7f585d.600248"]]},{"id":"91a6296e.9e7e78","type":"http response","z":"121c01c2.e652c6","name":"","x":927.6666959126796,"y":2173.0111533270942,"wires":[]},{"id":"b83ad3b6.6462d8","type":"http in","z":"121c01c2.e652c6","name":"hmi.min.js","url":"/js/hmi.min.js","method":"get","swaggerDoc":"","x":187.11105346679688,"y":2174.122215270996,"wires":[["a462a8.38e04558"]]},{"id":"a462a8.38e04558","type":"file in","z":"121c01c2.e652c6","name":"hmi.min.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/hmi.min.js","format":"utf8","x":441.88880157470703,"y":2174.0110846625435,"wires":[["91a6296e.9e7e78"]]},{"id":"6ba887dc.f7ee08","type":"comment","z":"121c01c2.e652c6","name":"FONTS","info":"","x":177.3332176208496,"y":2211.899857627021,"wires":[]},{"id":"c12f668a.6e3ca","type":"http response","z":"121c01c2.e652c6","name":"","x":927.8889172871914,"y":2247.2333823310005,"wires":[]},{"id":"64ec1adb.3459ac","type":"http in","z":"121c01c2.e652c6","name":"fontawesome-webfont.woff","url":"/fonts/fontawesome-webfont.woff","method":"get","swaggerDoc":"","x":237.3332748413086,"y":2247.3444442749023,"wires":[["558c45f0.4b7cec"]]},{"id":"558c45f0.4b7cec","type":"file in","z":"121c01c2.e652c6","name":"fontawesome-webfont.woff","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/fonts/fontawesome-webfont.woff","format":"","x":502.11102294921875,"y":2247.2333136664497,"wires":[["f755189d.74271"]]},{"id":"4837b6cf.2cf9b","type":"http response","z":"121c01c2.e652c6","name":"","x":928.3333752950039,"y":2284.3444968329536,"wires":[]},{"id":"eb7c67ab.d3c08","type":"http in","z":"121c01c2.e652c6","name":"fontawesome-webfont.ttf","url":"/fonts/fontawesome-webfont.ttf","method":"get","swaggerDoc":"","x":237.7777328491211,"y":2284.4555587768555,"wires":[["840cfb2.7129008"]]},{"id":"840cfb2.7129008","type":"file in","z":"121c01c2.e652c6","name":"fontawesome-webfont.ttf","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/fonts/fontawesome-webfont.ttf","format":"","x":492.55548095703125,"y":2284.344428168403,"wires":[["994b9c8.51951e"]]},{"id":"f755189d.74271","type":"function","z":"121c01c2.e652c6","name":"webfont.woff","func":"msg.headers = { \"Content-type\" : \"application/font-webfont.woff\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":779.1110687255859,"y":2247.122269736396,"wires":[["c12f668a.6e3ca"]]},{"id":"994b9c8.51951e","type":"function","z":"121c01c2.e652c6","name":"webfont.ttf","func":"msg.headers = { \"Content-type\" : \"application/font-webfont.ttf\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":779.9999618530273,"y":2284.788924323188,"wires":[["4837b6cf.2cf9b"]]},{"id":"a57cc5ec.99d8c8","type":"http response","z":"121c01c2.e652c6","name":"","x":1011.2222747802734,"y":2363.344485388862,"wires":[]},{"id":"6ee85844.6a6f5","type":"http in","z":"121c01c2.e652c6","name":"Image Files","url":"/images/:file","method":"get","swaggerDoc":"","x":199.55550384521484,"y":2364.5666732788086,"wires":[["4e61d3b9.3952ac"]]},{"id":"f351d13e.33d8d8","type":"file in","z":"121c01c2.e652c6","name":"","filename":"","format":"","x":646.555492401123,"y":2364.4555083380806,"wires":[["69268eec.2ae81","8367c80b.bf68a"]]},{"id":"69268eec.2ae81","type":"function","z":"121c01c2.e652c6","name":"msg type","func":"msg.headers = { \"Content-type\" : \"image/png\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":831.8888854980469,"y":2363.7888632880317,"wires":[["a57cc5ec.99d8c8"]]},{"id":"12c9a2b5.ef01bd","type":"comment","z":"121c01c2.e652c6","name":"IMAGENS E ARQUIVOS","info":"","x":236.77741622924805,"y":2320.7886401282417,"wires":[]},{"id":"4e61d3b9.3952ac","type":"function","z":"121c01c2.e652c6","name":"files","func":"msg.filename = 'C:\\\\Desenvolvimento\\\\git\\\\HMI-controler-with-node-red\\\\gulp\\\\images\\\\' + msg.req.params.file;\n\nreturn msg;","outputs":1,"noerr":0,"x":432.7778129577637,"y":2365.1221362219917,"wires":[["f351d13e.33d8d8"]]},{"id":"8367c80b.bf68a","type":"debug","z":"121c01c2.e652c6","name":"","active":false,"console":"false","complete":"filename","x":841.4443969726562,"y":2410.233338461982,"wires":[]},{"id":"8db30837.985d4","type":"function","z":"121c01c2.e652c6","name":"Text/HTML","func":"msg.headers = { \"Content-type\" : \"text/html\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":773.8332633972168,"y":1879.2545462714302,"wires":[["45050a35.b86a3c"]]},{"id":"40c9249.2dfb7dc","type":"http response","z":"121c01c2.e652c6","name":"","x":1012.9333610534668,"y":2453.2333975897895,"wires":[]},{"id":"53e6d82f.c445d8","type":"http in","z":"121c01c2.e652c6","name":"Image Files","url":"/css/images/:file","method":"get","swaggerDoc":"","x":201.2665901184082,"y":2453.4555854797363,"wires":[["e5001b71.27a84"]]},{"id":"8b324f46.de1af8","type":"file in","z":"121c01c2.e652c6","name":"","filename":"","format":"","x":648.2665786743164,"y":2453.3444205390083,"wires":[["1328d58c.598102","1ce33135.5ff31f"]]},{"id":"1328d58c.598102","type":"function","z":"121c01c2.e652c6","name":"msg type","func":"msg.headers = { \"Content-type\" : \"image/png\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":833.5999717712402,"y":2453.6777754889595,"wires":[["40c9249.2dfb7dc"]]},{"id":"e5001b71.27a84","type":"function","z":"121c01c2.e652c6","name":"files","func":"msg.filename = 'C:\\\\Desenvolvimento\\\\git\\\\HMI-controler-with-node-red\\\\gulp\\\\css\\\\images\\\\' + msg.req.params.file;\n\nreturn msg;","outputs":1,"noerr":0,"x":434.48889923095703,"y":2454.0110484229194,"wires":[["8b324f46.de1af8"]]},{"id":"1ce33135.5ff31f","type":"debug","z":"121c01c2.e652c6","name":"","active":false,"console":"false","complete":"filename","x":843.1554832458496,"y":2499.1222506629097,"wires":[]},{"id":"1f6a9cd.33f20e3","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION socios","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1795.4048309326172,"y":1512.657214164734,"wires":[]},{"id":"4d2ced3a.88edfc","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção socios","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1429.0469818115234,"y":1512.6064176559448,"wires":[["1f6a9cd.33f20e3"]]},{"id":"ef2b2f16.3bbfc8","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura socios","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1428.8334197998047,"y":1755.300036430359,"wires":[["cd7da560.aece"]]},{"id":"47d5b4e3.ef65cc","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1940.191017150879,"y":1754.7952556610107,"wires":[]},{"id":"cd7da560.aece","type":"function","z":"121c01c2.e652c6","name":"collection inicial socios","func":"msg.payload = \n{\n\t\"_id\": \"cdd2f034-3ec9-4d8b-a8c4-b67af29ccc39\",\n\t\"selecionada\": false,\n\t\"banco\": \"NOSSA CAIXA\",\n\t\"conta\": \"00100020003-6\",\n\t\"agencia\": 1653,\n\t\"descricao\": \"Primeiro conta\"\n}\nreturn msg;","outputs":1,"noerr":0,"x":1695.2000045776367,"y":1754.9000425338745,"wires":[["47d5b4e3.ef65cc"]]},{"id":"13703ef7.e05651","type":"function","z":"121c01c2.e652c6","name":"mudar 1 conta apenas","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $set: {\n \"parametros.encoder.fator\": 2225\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1696.5476531982422,"y":2033.442858695984,"wires":[["799b44a4.371404"]]},{"id":"799b44a4.371404","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"update only one","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1956.5476379394531,"y":2033.8428525924683,"wires":[]},{"id":"e95fff65.de9758","type":"inject","z":"121c01c2.e652c6","name":"Editar Conta","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1399.381191253662,"y":2033.1095552444458,"wires":[["13703ef7.e05651"]]},{"id":"3f2c2d9e.bf3c12","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"socios","operation":"find","x":1818.8334197998047,"y":2338.0858030319214,"wires":[["57d3a69f.ce003"]]},{"id":"a47acbce.6461","type":"function","z":"121c01c2.e652c6","name":"lê apenas um socio","func":"// Para ler um registro primeiro especificar \"_id\" no payload\nmsg.payload = { \"_id\": \"AplanadoraN3\" }\n\n// No parametro projection 1 ou zero significa ler ou inguinorar resultado\nmsg.projection = { \"parametros.encoder.fator\": 1 }\n\n// Ler 1 valor\nmsg.limit = 1;\n\n// Pular 0 resultados\nmsg.skip = 0;\n\nreturn msg;","outputs":1,"noerr":0,"x":1595.9444904327393,"y":2337.922833442688,"wires":[["3f2c2d9e.bf3c12"]]},{"id":"15471534.58b6d3","type":"inject","z":"121c01c2.e652c6","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1385.9584007263184,"y":2337.585783958435,"wires":[["a47acbce.6461"]]},{"id":"57d3a69f.ce003","type":"function","z":"121c01c2.e652c6","name":"parse(socios)","func":"msg.payload=msg.payload[0].parametros.encoder.fator;\nreturn msg;","outputs":1,"noerr":0,"x":1992.0002365112305,"y":2338.5025024414062,"wires":[["56e1300f.7bb228"]]},{"id":"56e1300f.7bb228","type":"debug","z":"121c01c2.e652c6","name":"ler socios x","active":true,"console":"false","complete":"payload","x":2208.333656311035,"y":2338.5023832321167,"wires":[]},{"id":"72528bb3.c1a874","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/carregar/","qos":"0","broker":"8c91fad3.2f359","x":1541.894416809082,"y":327.4054889678955,"wires":[["cd6e3d75.575278"]]},{"id":"8da4fba5.386d6","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar conta","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1092.5719165802002,"y":193.1055393218994,"wires":[]},{"id":"94c7a1b5.60b19","type":"function","z":"121c01c2.e652c6","name":"carrega 20 contas","func":"msg.limit = parseInt(msg.payload.per_page) || 20;\nmsg.skip = ((msg.payload.page || 1) - 1) * (msg.payload.per_page || 1);\nreturn msg;","outputs":1,"noerr":0,"x":727.0165100097656,"y":192.16665649414062,"wires":[["b542c4b8.53737"]]},{"id":"b542c4b8.53737","type":"json","z":"121c01c2.e652c6","name":"","x":909.4498596191406,"y":192.64999389648438,"wires":[["8da4fba5.386d6","2a259b4f.f4d534","572ea40.fe662dc"]]},{"id":"e61d95fe.6546e","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/alterar/#","qos":"0","broker":"8c91fad3.2f359","x":199.2332763671875,"y":257.12226486206055,"wires":[["a0758df8.8447b"]]},{"id":"a0758df8.8447b","type":"function","z":"121c01c2.e652c6","name":"Recupera topico ID","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro/cadastro/contas/alterado/' + msg.topic.split('/')[msg.topic.split('/').length - 1], //msg.payload._id,\n        payload: msg.payload\n    }\n];","outputs":"1","noerr":0,"x":473.0110321044922,"y":257.1222724914551,"wires":[["1725919b.594b8e","94c7a1b5.60b19"]]},{"id":"1725919b.594b8e","type":"mqtt out","z":"121c01c2.e652c6","name":"alterado/+id","topic":"","qos":"0","retain":"","broker":"8c91fad3.2f359","x":703.0959053039551,"y":256.95704460144043,"wires":[]},{"id":"dba182aa.a02ac8","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"Carrega lista","collection":"contas","operation":"find","x":2059.388821072049,"y":328.44442600674097,"wires":[["83808054.abfb4","90aaeb73.435fa"]]},{"id":"cd6e3d75.575278","type":"function","z":"121c01c2.e652c6","name":"carrega 20 contas","func":"msg.limit = parseInt(msg.payload.per_page) || 20;\nmsg.skip = ((msg.payload.page || 1) - 1) * (msg.payload.per_page || 1);\nmsg.payload = \"carregar\";\nreturn msg;","outputs":1,"noerr":0,"x":1856.3703079223633,"y":328.57408714294434,"wires":[["dba182aa.a02ac8","c23d7952.229498"]]},{"id":"68bc63a3.f8cbac","type":"comment","z":"121c01c2.e652c6","name":"Adiciona um registro","info":"$options => i for case insensitive search\n\nStart with string\n\ndb.collection.find({zip:{'$regex' : '^string', '$options' : 'i'}})\nEnd with string\n\ndb.collection.find({zip:{'$regex' : 'string$', '$options' : 'i'}})\nContains string\n\ndb.collection.find({zip:{'$regex' : 'string', '$options' : 'i'}})\nDoesn't Contains string\n\ndb.collection.find({zip:{'$regex' : '^((?!string).)*$', '$options' : 'i'}})\nKeep this as a bookmark, and a reference for any other alterations you may need. http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/","x":210.57408142089844,"y":92.57408714294434,"wires":[]},{"id":"c3a0c9da.18962","type":"comment","z":"121c01c2.e652c6","name":"Atualiza pagina","info":"$options => i for case insensitive search\n\nStart with string\n\ndb.collection.find({zip:{'$regex' : '^string', '$options' : 'i'}})\nEnd with string\n\ndb.collection.find({zip:{'$regex' : 'string$', '$options' : 'i'}})\nContains string\n\ndb.collection.find({zip:{'$regex' : 'string', '$options' : 'i'}})\nDoesn't Contains string\n\ndb.collection.find({zip:{'$regex' : '^((?!string).)*$', '$options' : 'i'}})\nKeep this as a bookmark, and a reference for any other alterations you may need. http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/","x":1482.3520050048828,"y":288.3518943786621,"wires":[]},{"id":"2a259b4f.f4d534","type":"function","z":"121c01c2.e652c6","name":"Delay 100ms","func":"setTimeout(function() {\n node.send(msg);\n}, 100);\nreturn null;","outputs":1,"noerr":0,"x":1092.1482543945312,"y":250.35186767578125,"wires":[["4aaad440.6c36a4"]]},{"id":"4aaad440.6c36a4","type":"link out","z":"121c01c2.e652c6","name":"","links":["4b738820.c9a9d"],"x":1215.1666355133057,"y":250.00003623962402,"wires":[]},{"id":"4b738820.c9a9d","type":"link in","z":"121c01c2.e652c6","name":"Atualiza Registro","links":["4aaad440.6c36a4"],"x":1661.6109762191772,"y":287.92590141296387,"wires":[["cd6e3d75.575278"]]},{"id":"a12fe2ea.d3a968","type":"comment","z":"121c01c2.e652c6","name":"Modifica um registro","info":"$options => i for case insensitive search\n\nStart with string\n\ndb.collection.find({zip:{'$regex' : '^string', '$options' : 'i'}})\nEnd with string\n\ndb.collection.find({zip:{'$regex' : 'string$', '$options' : 'i'}})\nContains string\n\ndb.collection.find({zip:{'$regex' : 'string', '$options' : 'i'}})\nDoesn't Contains string\n\ndb.collection.find({zip:{'$regex' : '^((?!string).)*$', '$options' : 'i'}})\nKeep this as a bookmark, and a reference for any other alterations you may need. http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/","x":210.12957000732422,"y":217.01860809326172,"wires":[]},{"id":"5130ad31.cb2094","type":"inject","z":"121c01c2.e652c6","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1521.8124771118164,"y":224.3958282470703,"wires":[["cd6e3d75.575278"]]},{"id":"90aaeb73.435fa","type":"debug","z":"121c01c2.e652c6","name":"tes3","active":false,"console":"false","complete":"payload","x":2316.8124771118164,"y":242.12499618530273,"wires":[]},{"id":"c23d7952.229498","type":"debug","z":"121c01c2.e652c6","name":"tes2","active":false,"console":"false","complete":"payload","x":2070.5,"y":226.39584350585938,"wires":[]},{"id":"449cf7f5.b48cc","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/excluir/#","qos":"0","broker":"8c91fad3.2f359","x":199.01852416992188,"y":397.1852111816406,"wires":[["d159a9ea.c0f9","b7d4e611.3966e"]]},{"id":"b16401c4.b03d6","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"deletar conta","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1094.5740356445312,"y":397.4074001312256,"wires":[]},{"id":"56040e40.12b88","type":"function","z":"121c01c2.e652c6","name":"Indica o ID","func":"x = msg.payload._id\nmsg.payload.id = x;\nreturn msg;","outputs":1,"noerr":0,"x":783.9075012207031,"y":399.40746688842773,"wires":[["d1308727.fff16","b16401c4.b03d6"]]},{"id":"c245adad.55e1b","type":"function","z":"121c01c2.e652c6","name":"collection inicial socios","func":"msg.payload = \n{\n\t\"_id\": \"82e0de0d-49ac-40cd-bfe3-9710f0600aa9\",\n    \"selecionada\": false,\n    \"banco\": \"ALTAMIRA\",\n    \"conta\": \"9634\",\n    \"agencia\": \"1234\",\n    \"descricao\": \"ASD\"\n}\nreturn msg;","outputs":1,"noerr":0,"x":436.5185546875,"y":520.1851806640625,"wires":[["b16401c4.b03d6"]]},{"id":"ccb68be2.e81a38","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura socios","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":170.15196990966797,"y":520.5851745605469,"wires":[["c245adad.55e1b"]]},{"id":"d1308727.fff16","type":"debug","z":"121c01c2.e652c6","name":"","active":true,"console":"false","complete":"false","x":857.1666107177734,"y":333.64813232421875,"wires":[]},{"id":"d159a9ea.c0f9","type":"debug","z":"121c01c2.e652c6","name":"excluir","active":true,"console":"false","complete":"payload","x":518.7407836914062,"y":334.5740966796875,"wires":[]},{"id":"92e1db7e.f90ca8","type":"mqtt out","z":"121c01c2.e652c6","name":"incluido/+id","topic":"","qos":"0","retain":"","broker":"8c91fad3.2f359","x":673.1852416992188,"y":356.79632568359375,"wires":[]},{"id":"b7d4e611.3966e","type":"function","z":"121c01c2.e652c6","name":"Recupera topico ID","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro/cadastro/contas/alterado/' + msg.topic.split('/')[msg.topic.split('/').length - 1], //msg.payload._id,\n        payload: msg.payload\n    }\n];","outputs":"1","noerr":0,"x":485.4074401855469,"y":396.79632568359375,"wires":[["92e1db7e.f90ca8","d1308727.fff16"]]},{"id":"8c91fad3.2f359","type":"mqtt-broker","z":"121c01c2.e652c6","broker":"localhost","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"","willQos":"0","willPayload":"","birthTopic":"","birthQos":"0","birthPayload":""},{"id":"1ba03f37.e3ec11","type":"mongodb","z":"","hostname":"127.0.0.1","port":"27017","db":"db","name":""}]
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


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
[{"id":"7682ced4.b2797","type":"mqtt in","z":"121c01c2.e652c6","name":"","topic":"financeiro/cadastro/contas/incluir/#","qos":"0","broker":"8c91fad3.2f359","x":771.3667297363281,"y":294.36663818359375,"wires":[["12dfbf40.b03bc9"]]},{"id":"5fcabf38.e2dec","type":"inject","z":"121c01c2.e652c6","name":"Incluido","topic":"","payload":"testando incluido","payloadType":"str","repeat":"","crontab":"","once":false,"x":134.11669921875,"y":302.1166687011719,"wires":[["da8bfd23.0f1028"]]},{"id":"12dfbf40.b03bc9","type":"function","z":"121c01c2.e652c6","name":"Recupera topico ID","func":"return [\n    {\n        id: msg.id,\n        topic: 'financeiro/cadastro/contas/incluido/' + msg.topic.split('/')[msg.topic.split('/').length - 1], //msg.payload._id,\n        payload: msg.payload\n    }\n];","outputs":"1","noerr":0,"x":1045.3667297363281,"y":294.36663818359375,"wires":[["572ea40.fe662dc","81a78833.86e62"]]},{"id":"572ea40.fe662dc","type":"debug","z":"121c01c2.e652c6","name":"Incluir + ID","active":true,"console":"false","complete":"true","x":1261.3667602539062,"y":244.36663818359375,"wires":[]},{"id":"ea8107a7.2c9958","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"","collection":"duplicatas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1695.4443359375,"y":347.4920959472656,"wires":[]},{"id":"d6fbe76e.108e3","type":"link in","z":"121c01c2.e652c6","name":"fila_react","links":["a3841933.a3a358","c9dd8b01.6af208"],"x":1519.449951171875,"y":347.1166763305664,"wires":[["ea8107a7.2c9958"]]},{"id":"c9dd8b01.6af208","type":"link out","z":"121c01c2.e652c6","name":"","links":["d6fbe76e.108e3"],"x":1431.9501953125,"y":347.36663818359375,"wires":[]},{"id":"b45293d2.db863","type":"inject","z":"121c01c2.e652c6","name":"Alterado","topic":"","payload":"testando alterado","payloadType":"str","repeat":"","crontab":"","once":false,"x":143.89584350585938,"y":377.6458435058594,"wires":[["a9267c84.a3c97"]]},{"id":"a9267c84.a3c97","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/alterado/","topic":"financeiro/cadastro/contas/alterado/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":310.34161376953125,"y":377.9666748046875,"wires":[]},{"id":"ee7ddeb1.dd89e8","type":"inject","z":"121c01c2.e652c6","name":"Erros","topic":"","payload":"testando erros","payloadType":"str","repeat":"","crontab":"","once":false,"x":132.64584350585938,"y":166.89584350585938,"wires":[["23ff999.118ece6"]]},{"id":"23ff999.118ece6","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/erros/","topic":"financeiro/cadastro/contas/erros/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":299.09161376953125,"y":167.2166748046875,"wires":[]},{"id":"b86c7e09.ac246","type":"inject","z":"121c01c2.e652c6","name":"Search","topic":"","payload":"testando search","payloadType":"str","repeat":"","crontab":"","once":false,"x":345.42493438720703,"y":637.4250431060791,"wires":[["4e273e75.5ffae8"]]},{"id":"83808054.abfb4","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/search/","topic":"financeiro/cadastro/contas/search/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":801.8707084655762,"y":636.3172607421875,"wires":[]},{"id":"ce65f1db.fa2d9","type":"inject","z":"121c01c2.e652c6","name":"Excluido","topic":"","payload":"testando excluido","payloadType":"str","repeat":"","crontab":"","once":false,"x":138.89584350585938,"y":448.8958435058594,"wires":[["132b6521.9052fb"]]},{"id":"132b6521.9052fb","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/excluido/","topic":"financeiro/cadastro/contas/excluido/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":305.34161376953125,"y":449.2166748046875,"wires":[]},{"id":"81a78833.86e62","type":"mqtt out","z":"121c01c2.e652c6","name":"incluido/+id","topic":"","qos":"0","retain":"","broker":"8c91fad3.2f359","x":1262.89599609375,"y":293.6458435058594,"wires":[]},{"id":"162ac500.a9e103","type":"function","z":"121c01c2.e652c6","name":"carrega 20 contas","func":"msg.limit = parseInt(msg.payload.per_page) || 20;\nmsg.skip = ((msg.payload.page || 1) - 1) * (msg.payload.per_page || 1);\nmsg.payload = {}\nreturn msg;","outputs":1,"noerr":0,"x":1282.449951171875,"y":347.3333435058594,"wires":[["c9dd8b01.6af208"]]},{"id":"da8bfd23.0f1028","type":"mqtt out","z":"121c01c2.e652c6","name":"contas/incluido/","topic":"financeiro/cadastro/contas/incluido/","qos":"0","retain":"","broker":"8c91fad3.2f359","x":305.1166687011719,"y":302.1166687011719,"wires":[]},{"id":"fcaf24e.fef9a58","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura contas","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1231.7666015625,"y":890.2333374023438,"wires":[["878aab1a.ca86c8"]]},{"id":"8c5ca88a.6ec518","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1743.1241989135742,"y":889.7285566329956,"wires":[]},{"id":"44ae7300.d74534","type":"function","z":"121c01c2.e652c6","name":"mudar 1 socio apenas","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $set: {\n \"parametros.encoder.fator\": 2225\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1498.0776443481445,"y":1073.805651664734,"wires":[["f187b2b6.b6a63"]]},{"id":"f187b2b6.b6a63","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"update only one","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1758.0776290893555,"y":1074.2056455612183,"wires":[]},{"id":"2ae16da8.2847ea","type":"inject","z":"121c01c2.e652c6","name":"String vazia","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1200.1104202270508,"y":1293.6500091552734,"wires":[["be2e0093.f34b"]]},{"id":"c32f3c3c.1db5c","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"contas","operation":"find","x":1719.0775909423828,"y":1294.0055055618286,"wires":[["6ce4b274.6a857c"]]},{"id":"6ce4b274.6a857c","type":"debug","z":"121c01c2.e652c6","name":"resposta do MongoDB","active":true,"console":"false","complete":"payload","x":2003.188632965088,"y":1294.1166610717773,"wires":[]},{"id":"878aab1a.ca86c8","type":"function","z":"121c01c2.e652c6","name":"collection inicial contas","func":"msg.payload = [{\n\t\"_id\": \"01\",\n\t\"selecionada\": false,\n\t\"banco\": \"NOSSA CAIXA\",\n\t\"conta\": \"00100020003-6\",\n\t\"agencia\": 1653,\n\t\"descricao\": \"Primeiro conta\"\n}, {\n\t\"_id\": \"02\",\n\t\"selecionada\": false,\n\t\"banco\": \"BRADESCO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2667,\n\t\"descricao\": \"Segunda conta\"\n}, {\n\t\"_id\": \"03\",\n\t\"selecionada\": false,\n\t\"banco\": \"ITAU\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2669,\n\t\"descricao\": \"TERCEIRA conta\"\n}, {\n\t\"_id\": \"04\",\n\t\"selecionada\": false,\n\t\"banco\": \"BANCO DO BRASIL\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 6459,\n\t\"descricao\": \"Outra conta\"\n}, {\n\t\"_id\": \"05\",\n\t\"selecionada\": false,\n\t\"banco\": \"HSBC\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 1144,\n\t\"descricao\": \"Escreva qualquer coisa aqui que ajude!\"\n}, {\n\t\"_id\": \"44\",\n\t\"selecionada\": false,\n\t\"banco\": \"ALTAMIRA\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2600,\n\t\"descricao\": \"Empresa\"\n}, {\n\t\"_id\": \"33\",\n\t\"selecionada\": false,\n\t\"banco\": \"CELSO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 4343,\n\t\"descricao\": \"123456789012345678901234567890\"\n}]\nreturn msg;","outputs":1,"noerr":0,"x":1497.133186340332,"y":889.8333435058594,"wires":[["8c5ca88a.6ec518"]]},{"id":"d3026044.f1e3a","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION cadastroErros","collection":"cadastroErros","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1618.855110168457,"y":697.0276765823364,"wires":[]},{"id":"967dd0c8.0294f8","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção cadastroErros","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1261.608657836914,"y":697.754732131958,"wires":[["d3026044.f1e3a"]]},{"id":"ed222d8d.ef127","type":"inject","z":"121c01c2.e652c6","name":"Editar socios","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1200.9111824035645,"y":1073.4723482131958,"wires":[["44ae7300.d74534"]]},{"id":"f2646d64.451328","type":"function","z":"121c01c2.e652c6","name":"indiceErros +1","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $inc: {\n \"os.produzido\": 1\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1531.299690246582,"y":1200.5833282470703,"wires":[["3c3923c3.dcd8dc"]]},{"id":"3c3923c3.dcd8dc","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"indiceErros","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1729.299674987793,"y":1200.9833221435547,"wires":[]},{"id":"1a69f22c.9b41e6","type":"inject","z":"121c01c2.e652c6","name":"$inc: incrementa","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1208.133228302002,"y":1200.2500247955322,"wires":[["f2646d64.451328","cdd6978.b585ee8"]]},{"id":"be2e0093.f34b","type":"function","z":"121c01c2.e652c6","name":"Paginação ","func":"msg.limit = 5;\nmsg.skip = 0;\nreturn msg;","outputs":1,"noerr":0,"x":1517.5219440460205,"y":1294.0647888183594,"wires":[["c32f3c3c.1db5c"]]},{"id":"e5ec74d.d132f08","type":"comment","z":"121c01c2.e652c6","name":"Paginação e consulta MongoDB","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1236.2997779846191,"y":1257.9166283607483,"wires":[]},{"id":"5db31b3.d297764","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura cadastroErros","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1251.744041442871,"y":940.3333940505981,"wires":[["a2c74153.fb8b48"]]},{"id":"520a8e88.6cd96","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"cadastroErros","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1744.1019287109375,"y":940.3842258453369,"wires":[]},{"id":"a2c74153.fb8b48","type":"function","z":"121c01c2.e652c6","name":"collection inicial cadastroErros","func":"msg.payload = {\n\t\"_id\": 1,\n\t\"log_mesagens\": {\n\t}\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1527.1109161376953,"y":940.4890127182007,"wires":[["520a8e88.6cd96"]]},{"id":"94ee7df0.7d2bf","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"contas","operation":"find","x":1620.9662990570068,"y":1374.5000324249268,"wires":[["e0e75b6.7a79528"]]},{"id":"fdb316d6.40a7f8","type":"function","z":"121c01c2.e652c6","name":"lê apenas uma conta","func":"// Para ler um registro primeiro especificar \"_id\" no payload\nmsg.payload = { \"_id\": \"AplanadoraN3\" }\n\n// No parametro projection 1 ou zero significa ler ou inguinorar resultado\nmsg.projection = { \"parametros.encoder.fator\": 1 }\n\n// Ler 1 valor\nmsg.limit = 1;\n\n// Pular 0 resultados\nmsg.skip = 0;\n\nreturn msg;","outputs":1,"noerr":0,"x":1408.0773696899414,"y":1374.3370628356934,"wires":[["94ee7df0.7d2bf"]]},{"id":"70f73b01.f2ce4c","type":"inject","z":"121c01c2.e652c6","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1188.0912799835205,"y":1374.0000133514404,"wires":[["fdb316d6.40a7f8"]]},{"id":"e0e75b6.7a79528","type":"function","z":"121c01c2.e652c6","name":"parse(contas)","func":"msg.payload=msg.payload[0].parametros.encoder.fator;\nreturn msg;","outputs":1,"noerr":0,"x":1794.1331157684326,"y":1374.9167318344116,"wires":[["1c544383.04b18c"]]},{"id":"1c544383.04b18c","type":"debug","z":"121c01c2.e652c6","name":"ler conta x","active":true,"console":"false","complete":"payload","x":2010.4665355682373,"y":1374.916612625122,"wires":[]},{"id":"69563f09.b28dc8","type":"comment","z":"121c01c2.e652c6","name":"Lê apenas um valor","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1193.299331665039,"y":1338.916672706604,"wires":[]},{"id":"cdd6978.b585ee8","type":"function","z":"121c01c2.e652c6","name":"Delay 50ms","func":"setTimeout(function() {\n node.send(msg);\n}, 50);\nreturn null;","outputs":1,"noerr":0,"x":1520.6330947875977,"y":1236.0276155471802,"wires":[["be2e0093.f34b"]]},{"id":"1d14800b.2f08d","type":"comment","z":"121c01c2.e652c6","name":"Contador Produzidos ++ ","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1213.2992706298828,"y":1161.916584968567,"wires":[]},{"id":"d3f89ac0.12fba8","type":"comment","z":"121c01c2.e652c6","name":"Edita apenas 1 registro do banco com $set","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1266.0772018432617,"y":1035.249981880188,"wires":[]},{"id":"c8a29805.b6bb38","type":"comment","z":"121c01c2.e652c6","name":"2- Cria estrutura inicial das coleções","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1246.6327667236328,"y":795.5833187103271,"wires":[]},{"id":"1414b9c2.a6a716","type":"comment","z":"121c01c2.e652c6","name":"1- Apagar Cuidado","info":"#Resultados de paginação usando skip e limit\n\nMuitas vezes, ao lidar com conjuntos de resultados de dados, \nsó queremos recuperar um subconjunto por vez, talvez para fornecer \nresultados por página da Web. Em MySQL, em geral fazemos isso \nusando a palavra-chave LIMIT. \nÉ fácil replicar essa funcionalidade no MongoDB \nusando msg.skip e msg.limit. \nPara retornar os primeiros cinco documentos na \ncoleção, podemos executar a seguinte operação:\n> msg.limit = 5;<\n\nPara pular resultados, use o seguinte comando:\n\n> msg.skip = 5;<\n\nCom ele é possível iguinorar os primeiros cinco\nregistros. ","x":1198.1881942749023,"y":556.8054733276367,"wires":[]},{"id":"5016c318.c2149c","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION contas","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1598.2993545532227,"y":648.8054475784302,"wires":[]},{"id":"5c88fdd8.1acdac","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção contas","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1231.941505432129,"y":648.7546510696411,"wires":[["5016c318.c2149c"]]},{"id":"ba044038.ba9fa8","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura indice erros","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1241.2660369873047,"y":989.8500967025757,"wires":[["da3d3acc.a2778"]]},{"id":"70911be6.65ec7c","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"indiceErros","payonly":true,"upsert":false,"multi":true,"operation":"store","x":1744.1794166564941,"y":989.3454656600952,"wires":[]},{"id":"da3d3acc.a2778","type":"function","z":"121c01c2.e652c6","name":"collection inicial indice erros","func":"msg.payload = {\n\t\"_id\": \"indice\",\n\t\"indice_mesagens\": 0\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1516.632911682129,"y":989.6723279953003,"wires":[["70911be6.65ec7c"]]},{"id":"60ab52aa.e6af4c","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção indice erros","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1251.7068252563477,"y":745.6945657730103,"wires":[["1ee86819.31d6b"]]},{"id":"1ee86819.31d6b","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION indice erros","collection":"indiceErros","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1610.7068252563477,"y":745.3611917495728,"wires":[]},{"id":"a6730d6d.bd0b98","type":"comment","z":"121c01c2.e652c6","name":"Consulta MongoDB por string","info":"$options => i for case insensitive search\n\nStart with string\n\ndb.collection.find({zip:{'$regex' : '^string', '$options' : 'i'}})\nEnd with string\n\ndb.collection.find({zip:{'$regex' : 'string$', '$options' : 'i'}})\nContains string\n\ndb.collection.find({zip:{'$regex' : 'string', '$options' : 'i'}})\nDoesn't Contains string\n\ndb.collection.find({zip:{'$regex' : '^((?!string).)*$', '$options' : 'i'}})\nKeep this as a bookmark, and a reference for any other alterations you may need. http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/","x":815.7826843261719,"y":1342.9333305358887,"wires":[]},{"id":"755700d0.fcf13","type":"function","z":"121c01c2.e652c6","name":"Exemplo de consulta","func":"msg.limit = parseInt(msg.req.query.size) || 10;\nmsg.skip = ((parseInt(msg.req.query.page) || 1) - 1) * (parseInt(msg.req.query.page) || 1);\nmsg.payload = {nome: {'$regex' : msg.payload.nome, '$options' : 'i'}}\nreturn msg;","outputs":1,"noerr":0,"x":795.7826843261719,"y":1302.9333305358887,"wires":[[]]},{"id":"45050a35.b86a3c","type":"http response","z":"121c01c2.e652c6","name":"","x":1232.000015258789,"y":1557.2333984375,"wires":[]},{"id":"771652d0.cbdb84","type":"http in","z":"121c01c2.e652c6","name":"Index","url":"/","method":"get","swaggerDoc":"","x":485.44437281290675,"y":1558.3444603814019,"wires":[["44f20f94.f11c2"]]},{"id":"44f20f94.f11c2","type":"file in","z":"121c01c2.e652c6","name":"index.HTML","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/index.html","format":"utf8","x":759.5554885864258,"y":1558.4555730819702,"wires":[["8db30837.985d4"]]},{"id":"7861393f.592d6","type":"http response","z":"121c01c2.e652c6","name":"","x":1236.4445012410488,"y":1629.900047302246,"wires":[]},{"id":"7a70a71e.94008","type":"http in","z":"121c01c2.e652c6","name":"css/hmi.min.css","url":"/css/hmi.min.css","method":"get","swaggerDoc":"","x":515.888858795166,"y":1630.011109246148,"wires":[["551441d5.4b8ee8"]]},{"id":"551441d5.4b8ee8","type":"file in","z":"121c01c2.e652c6","name":"hmi.min","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/css/hmi.min.css","format":"utf8","x":750.6666069030762,"y":1629.8999786376953,"wires":[["69327f65.c3f428"]]},{"id":"69327f65.c3f428","type":"function","z":"121c01c2.e652c6","name":"Text/CSS","func":"msg.headers = { \"Content-type\" : \"text/css\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":1096.999912261963,"y":1629.7889003753662,"wires":[["7861393f.592d6"]]},{"id":"fd3797c0.8cc5c","type":"comment","z":"121c01c2.e652c6","name":"HTML","info":"","x":485,"y":1522.2333736419678,"wires":[]},{"id":"c281a342.a230d","type":"comment","z":"121c01c2.e652c6","name":"CSS","info":"","x":485.8888130187988,"y":1594.344633102417,"wires":[]},{"id":"65b4a503.cbdf94","type":"comment","z":"121c01c2.e652c6","name":"JAVASCRIPT","info":"","x":505.33331298828125,"y":1668.7891473770142,"wires":[]},{"id":"e19ac9f.d6ad4b8","type":"http response","z":"121c01c2.e652c6","name":"","x":1236.4444630940761,"y":1704.344467163086,"wires":[]},{"id":"22de03c2.f8a3fc","type":"http in","z":"121c01c2.e652c6","name":"jquery.js","url":"/js/jquery.js","method":"get","swaggerDoc":"","x":495.88882064819336,"y":1705.4555291069878,"wires":[["44ddad52.b26d2c"]]},{"id":"44ddad52.b26d2c","type":"file in","z":"121c01c2.e652c6","name":"jquery.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.js","format":"utf8","x":750.6665687561035,"y":1705.3443984985352,"wires":[["e19ac9f.d6ad4b8"]]},{"id":"c1563bd7.070a38","type":"http response","z":"121c01c2.e652c6","name":"","x":1236.8889211018886,"y":1741.455581665039,"wires":[]},{"id":"d311c1d2.0b87e","type":"http in","z":"121c01c2.e652c6","name":"jquery-ui.js","url":"/js/jquery-ui.js","method":"get","swaggerDoc":"","x":496.33327865600586,"y":1742.566643608941,"wires":[["7d0c33fd.ff6a1c"]]},{"id":"7d0c33fd.ff6a1c","type":"file in","z":"121c01c2.e652c6","name":"jquery-ui.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery-ui.js","format":"utf8","x":761.111026763916,"y":1742.4555130004883,"wires":[["c1563bd7.070a38"]]},{"id":"c3586623.dcdba","type":"http response","z":"121c01c2.e652c6","name":"","x":1236.8889211018886,"y":1777.9000396728516,"wires":[]},{"id":"400d41e2.c9ff38","type":"http in","z":"121c01c2.e652c6","name":"jquery.keyboard.js","url":"/js/jquery.keyboard.js","method":"get","swaggerDoc":"","x":526.3332786560059,"y":1779.0111016167534,"wires":[["eab92516.41cb6"]]},{"id":"eab92516.41cb6","type":"file in","z":"121c01c2.e652c6","name":"jquery.keyboard.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.keyboard.js","format":"utf8","x":781.111026763916,"y":1778.8999710083008,"wires":[["c3586623.dcdba"]]},{"id":"9c7f585d.600248","type":"http response","z":"121c01c2.e652c6","name":"","x":1237.3333791097011,"y":1815.0111541748047,"wires":[]},{"id":"5dd5d24a.0749e4","type":"http in","z":"121c01c2.e652c6","name":"jquery.mousewheel.js","url":"/js/jquery.mousewheel.js","method":"get","swaggerDoc":"","x":536.7777366638184,"y":1816.1222161187065,"wires":[["12c9bd94.3bfcca"]]},{"id":"12c9bd94.3bfcca","type":"file in","z":"121c01c2.e652c6","name":"jquery.mousewheel.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/jquery.mousewheel.js","format":"utf8","x":791.5554847717285,"y":1816.011085510254,"wires":[["9c7f585d.600248"]]},{"id":"91a6296e.9e7e78","type":"http response","z":"121c01c2.e652c6","name":"","x":1237.666699727377,"y":1851.0111541748047,"wires":[]},{"id":"b83ad3b6.6462d8","type":"http in","z":"121c01c2.e652c6","name":"hmi.min.js","url":"/js/hmi.min.js","method":"get","swaggerDoc":"","x":497.11105728149414,"y":1852.1222161187065,"wires":[["a462a8.38e04558"]]},{"id":"a462a8.38e04558","type":"file in","z":"121c01c2.e652c6","name":"hmi.min.js","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/js/hmi.min.js","format":"utf8","x":751.8888053894043,"y":1852.011085510254,"wires":[["91a6296e.9e7e78"]]},{"id":"6ba887dc.f7ee08","type":"comment","z":"121c01c2.e652c6","name":"FONTS","info":"","x":487.3332214355469,"y":1889.8998584747314,"wires":[]},{"id":"c12f668a.6e3ca","type":"http response","z":"121c01c2.e652c6","name":"","x":1237.8889211018886,"y":1925.233383178711,"wires":[]},{"id":"64ec1adb.3459ac","type":"http in","z":"121c01c2.e652c6","name":"fontawesome-webfont.woff","url":"/fonts/fontawesome-webfont.woff","method":"get","swaggerDoc":"","x":547.3332786560059,"y":1925.3444451226128,"wires":[["558c45f0.4b7cec"]]},{"id":"558c45f0.4b7cec","type":"file in","z":"121c01c2.e652c6","name":"fontawesome-webfont.woff","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/fonts/fontawesome-webfont.woff","format":"","x":812.111026763916,"y":1925.2333145141602,"wires":[["f755189d.74271"]]},{"id":"4837b6cf.2cf9b","type":"http response","z":"121c01c2.e652c6","name":"","x":1238.3333791097011,"y":1962.344497680664,"wires":[]},{"id":"eb7c67ab.d3c08","type":"http in","z":"121c01c2.e652c6","name":"fontawesome-webfont.ttf","url":"/fonts/fontawesome-webfont.ttf","method":"get","swaggerDoc":"","x":547.7777366638184,"y":1962.455559624566,"wires":[["840cfb2.7129008"]]},{"id":"840cfb2.7129008","type":"file in","z":"121c01c2.e652c6","name":"fontawesome-webfont.ttf","filename":"C:/Desenvolvimento/git/HMI-controler-with-node-red/gulp/fonts/fontawesome-webfont.ttf","format":"","x":802.5554847717285,"y":1962.3444290161133,"wires":[["994b9c8.51951e"]]},{"id":"f755189d.74271","type":"function","z":"121c01c2.e652c6","name":"webfont.woff","func":"msg.headers = { \"Content-type\" : \"application/font-webfont.woff\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":1089.1110725402832,"y":1925.1222705841064,"wires":[["c12f668a.6e3ca"]]},{"id":"994b9c8.51951e","type":"function","z":"121c01c2.e652c6","name":"webfont.ttf","func":"msg.headers = { \"Content-type\" : \"application/font-webfont.ttf\" }\n \nreturn msg;","outputs":1,"noerr":0,"x":1089.9999656677246,"y":1962.7889251708984,"wires":[["4837b6cf.2cf9b"]]},{"id":"a57cc5ec.99d8c8","type":"http response","z":"121c01c2.e652c6","name":"","x":1321.2222785949707,"y":2041.3444862365723,"wires":[]},{"id":"6ee85844.6a6f5","type":"http in","z":"121c01c2.e652c6","name":"Image Files","url":"/images/:file","method":"get","swaggerDoc":"","x":509.5555076599121,"y":2042.566674126519,"wires":[["4e61d3b9.3952ac"]]},{"id":"f351d13e.33d8d8","type":"file in","z":"121c01c2.e652c6","name":"","filename":"","format":"","x":956.5554962158203,"y":2042.455509185791,"wires":[["69268eec.2ae81","8367c80b.bf68a"]]},{"id":"69268eec.2ae81","type":"function","z":"121c01c2.e652c6","name":"msg type","func":"msg.headers = { \"Content-type\" : \"image/png\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":1141.8888893127441,"y":2041.7888641357422,"wires":[["a57cc5ec.99d8c8"]]},{"id":"12c9a2b5.ef01bd","type":"comment","z":"121c01c2.e652c6","name":"IMAGENS E ARQUIVOS","info":"","x":546.7774200439453,"y":1998.7886409759521,"wires":[]},{"id":"4e61d3b9.3952ac","type":"function","z":"121c01c2.e652c6","name":"files","func":"msg.filename = 'C:\\\\Desenvolvimento\\\\git\\\\HMI-controler-with-node-red\\\\gulp\\\\images\\\\' + msg.req.params.file;\n\nreturn msg;","outputs":1,"noerr":0,"x":742.7778167724609,"y":2043.1221370697021,"wires":[["f351d13e.33d8d8"]]},{"id":"8367c80b.bf68a","type":"debug","z":"121c01c2.e652c6","name":"","active":false,"console":"false","complete":"filename","x":1151.4444007873535,"y":2088.2333393096924,"wires":[]},{"id":"8db30837.985d4","type":"function","z":"121c01c2.e652c6","name":"Text/HTML","func":"msg.headers = { \"Content-type\" : \"text/html\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":1083.833267211914,"y":1557.2545471191406,"wires":[["45050a35.b86a3c"]]},{"id":"40c9249.2dfb7dc","type":"http response","z":"121c01c2.e652c6","name":"","x":1322.933364868164,"y":2131.2333984375,"wires":[]},{"id":"53e6d82f.c445d8","type":"http in","z":"121c01c2.e652c6","name":"Image Files","url":"/css/images/:file","method":"get","swaggerDoc":"","x":511.26659393310547,"y":2131.455586327447,"wires":[["e5001b71.27a84"]]},{"id":"8b324f46.de1af8","type":"file in","z":"121c01c2.e652c6","name":"","filename":"","format":"","x":958.2665824890137,"y":2131.3444213867188,"wires":[["1328d58c.598102","1ce33135.5ff31f"]]},{"id":"1328d58c.598102","type":"function","z":"121c01c2.e652c6","name":"msg type","func":"msg.headers = { \"Content-type\" : \"image/png\" }\n\nreturn msg;","outputs":1,"noerr":0,"x":1143.5999755859375,"y":2131.67777633667,"wires":[["40c9249.2dfb7dc"]]},{"id":"e5001b71.27a84","type":"function","z":"121c01c2.e652c6","name":"files","func":"msg.filename = 'C:\\\\Desenvolvimento\\\\git\\\\HMI-controler-with-node-red\\\\gulp\\\\css\\\\images\\\\' + msg.req.params.file;\n\nreturn msg;","outputs":1,"noerr":0,"x":744.4889030456543,"y":2132.01104927063,"wires":[["8b324f46.de1af8"]]},{"id":"1ce33135.5ff31f","type":"debug","z":"121c01c2.e652c6","name":"","active":false,"console":"false","complete":"filename","x":1153.1554870605469,"y":2177.12225151062,"wires":[]},{"id":"1f6a9cd.33f20e3","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"APAGAR TODA A COLLECTION socios","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"delete","x":1597.40478515625,"y":600.357177734375,"wires":[]},{"id":"4d2ced3a.88edfc","type":"inject","z":"121c01c2.e652c6","name":"LIMPAR coleção socios","topic":"","payload":"{}","payloadType":"json","repeat":"","crontab":"","once":false,"x":1231.0469360351562,"y":600.3063812255859,"wires":[["1f6a9cd.33f20e3"]]},{"id":"ef2b2f16.3bbfc8","type":"inject","z":"121c01c2.e652c6","name":"Criar estrutura socios","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1230.8333740234375,"y":843,"wires":[["cd7da560.aece"]]},{"id":"47d5b4e3.ef65cc","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"salvar","collection":"socios","payonly":true,"upsert":false,"multi":false,"operation":"store","x":1742.1909713745117,"y":842.4952192306519,"wires":[]},{"id":"cd7da560.aece","type":"function","z":"121c01c2.e652c6","name":"collection inicial socios","func":"msg.payload = \n\t[{\n\t\"_id\": \"01\",\n\t\"selecionada\": false,\n\t\"banco\": \"NOSSA CAIXA\",\n\t\"conta\": \"00100020003-6\",\n\t\"agencia\": 1653,\n\t\"descricao\": \"Primeiro conta\"\n}, {\n\t\"_id\": \"02\",\n\t\"selecionada\": false,\n\t\"banco\": \"BRADESCO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2667,\n\t\"descricao\": \"Segunda conta\"\n}, {\n\t\"_id\": \"03\",\n\t\"selecionada\": false,\n\t\"banco\": \"ITAU\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2669,\n\t\"descricao\": \"TERCEIRA conta\"\n}, {\n\t\"_id\": \"04\",\n\t\"selecionada\": false,\n\t\"banco\": \"BANCO DO BRASIL\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 6459,\n\t\"descricao\": \"Outra conta\"\n}, {\n\t\"_id\": \"05\",\n\t\"selecionada\": false,\n\t\"banco\": \"HSBC\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 1144,\n\t\"descricao\": \"Escreva qualquer coisa aqui que ajude!\"\n}, {\n\t\"_id\": \"44\",\n\t\"selecionada\": false,\n\t\"banco\": \"ALTAMIRA\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2600,\n\t\"descricao\": \"Empresa\"\n}, {\n\t\"_id\": \"33\",\n\t\"selecionada\": false,\n\t\"banco\": \"CELSO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 4343,\n\t\"descricao\": \"123456789012345678901234567890\"\n}]\n\nreturn msg;","outputs":1,"noerr":0,"x":1497.1999588012695,"y":842.6000061035156,"wires":[["47d5b4e3.ef65cc"]]},{"id":"13703ef7.e05651","type":"function","z":"121c01c2.e652c6","name":"mudar 1 conta apenas","func":"msg.query = { _id: 'AplanadoraN3' }\nmsg.payload = {\n $set: {\n \"parametros.encoder.fator\": 2225\n }\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":1498.547607421875,"y":1121.142822265625,"wires":[["799b44a4.371404"]]},{"id":"799b44a4.371404","type":"mongodb out","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"update only one","collection":"contas","payonly":true,"upsert":false,"multi":false,"operation":"update","x":1758.547592163086,"y":1121.5428161621094,"wires":[]},{"id":"e95fff65.de9758","type":"inject","z":"121c01c2.e652c6","name":"Editar Conta","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":1201.381145477295,"y":1120.809518814087,"wires":[["13703ef7.e05651"]]},{"id":"3f2c2d9e.bf3c12","type":"mongodb in","z":"121c01c2.e652c6","mongodb":"1ba03f37.e3ec11","name":"consulta","collection":"socios","operation":"find","x":1620.8333740234375,"y":1425.7857666015625,"wires":[["57d3a69f.ce003"]]},{"id":"a47acbce.6461","type":"function","z":"121c01c2.e652c6","name":"lê apenas um socio","func":"// Para ler um registro primeiro especificar \"_id\" no payload\nmsg.payload = { \"_id\": \"AplanadoraN3\" }\n\n// No parametro projection 1 ou zero significa ler ou inguinorar resultado\nmsg.projection = { \"parametros.encoder.fator\": 1 }\n\n// Ler 1 valor\nmsg.limit = 1;\n\n// Pular 0 resultados\nmsg.skip = 0;\n\nreturn msg;","outputs":1,"noerr":0,"x":1397.944444656372,"y":1425.622797012329,"wires":[["3f2c2d9e.bf3c12"]]},{"id":"15471534.58b6d3","type":"inject","z":"121c01c2.e652c6","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":1187.9583549499512,"y":1425.2857475280762,"wires":[["a47acbce.6461"]]},{"id":"57d3a69f.ce003","type":"function","z":"121c01c2.e652c6","name":"parse(socios)","func":"msg.payload=msg.payload[0].parametros.encoder.fator;\nreturn msg;","outputs":1,"noerr":0,"x":1794.0001907348633,"y":1426.2024660110474,"wires":[["56e1300f.7bb228"]]},{"id":"56e1300f.7bb228","type":"debug","z":"121c01c2.e652c6","name":"ler socios x","active":true,"console":"false","complete":"payload","x":2010.333610534668,"y":1426.2023468017578,"wires":[]},{"id":"4e273e75.5ffae8","type":"function","z":"121c01c2.e652c6","name":"collection inicial contas","func":"msg.payload = [{\n\t\"_id\": \"01\",\n\t\"selecionada\": false,\n\t\"banco\": \"NOSSA CAIXA\",\n\t\"conta\": \"00100020003-6\",\n\t\"agencia\": 1653,\n\t\"descricao\": \"Primeiro conta\"\n}, {\n\t\"_id\": \"02\",\n\t\"selecionada\": false,\n\t\"banco\": \"BRADESCO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2667,\n\t\"descricao\": \"Segunda conta\"\n}, {\n\t\"_id\": \"03\",\n\t\"selecionada\": false,\n\t\"banco\": \"ITAU\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2669,\n\t\"descricao\": \"TERCEIRA conta\"\n}, {\n\t\"_id\": \"04\",\n\t\"selecionada\": false,\n\t\"banco\": \"BANCO DO BRASIL\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 6459,\n\t\"descricao\": \"Outra conta\"\n}, {\n\t\"_id\": \"05\",\n\t\"selecionada\": false,\n\t\"banco\": \"HSBC\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 1144,\n\t\"descricao\": \"Escreva qualquer coisa aqui que ajude!\"\n}, {\n\t\"_id\": \"44\",\n\t\"selecionada\": false,\n\t\"banco\": \"ALTAMIRA\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 2600,\n\t\"descricao\": \"Empresa\"\n}, {\n\t\"_id\": \"33\",\n\t\"selecionada\": false,\n\t\"banco\": \"CELSO\",\n\t\"conta\": \"20256-9\",\n\t\"agencia\": 4343,\n\t\"descricao\": \"123456789012345678901234567890\"\n}]\n\nreturn msg;","outputs":1,"noerr":0,"x":565.5000381469727,"y":637.309552192688,"wires":[["83808054.abfb4"]]},{"id":"8c91fad3.2f359","type":"mqtt-broker","z":"121c01c2.e652c6","broker":"localhost","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"","willQos":"0","willPayload":"","birthTopic":"","birthQos":"0","birthPayload":""},{"id":"1ba03f37.e3ec11","type":"mongodb","z":"","hostname":"127.0.0.1","port":"27017","db":"db","name":""}]
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


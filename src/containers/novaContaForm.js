
import React, { Component } from 'react';

import { 
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel, 
  Col, 
  Row, 
  Grid,
  FormGroup,
  FormControl,
  Table,
  Checkbox,
  Tooltip,
  Modal
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import uuid from 'node-uuid';
import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';

export default class novaContaForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      _id: null,
      numero: '216558',
      pedido: '74655',
      emissao: new Date().toISOString(),
      entrega: new Date().toISOString(),
      cnpj: '63.394.915/0001-62',
      representante: '001',
      nome: 'ALEGRIA NA VIDA AGROINDUSTRIAL LTDA',
      parcelas: [
        {
          selecionada: false,
          vencto: new Date('2016-10-10').toISOString(),
          valor: 2198.74
        },
        {
          selecionada: false,
          vencto: new Date('2016-11-07').toISOString(),
          valor: 3572.96
        }        
      ],
      topics: {}
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleInsert = this.handleInsert.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleCalc = this.handleCalc.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.handleError = this.handleError.bind(this);
    this.handleSaveOk = this.handleSaveOk.bind(this);

  }

  /*componentWillMount() {
    const opts = {
      host: 'localhost', //'192.168.0.1', //'test.mosquitto.org'
      port: 61614,
      protocol: 'ws',
      qos: 0,
      retain: false,
      clean: true,
      keepAlive: 30, // 30 sec.
      clientId: this.props.clientId
    }

    this.client = mqtt.connect(opts);

    this.client.on('connect', function() {
      //let topics = {};

      this.client.subscribe(
        'financeiro/lancamento/erros/' + opts.clientId, 
        function(err, granted) { 
          !err ? 
            this.setState({
              topics: assign(this.state.topics, {[granted[0].topic]: this.handleError})}) : 
            console.log('Erro ao se inscrever no topico: ' + err)
        }.bind(this)
      );

    }.bind(this));
    
    this.client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      
      this.state.topics[topic] && this.state.topics[topic](message.toString());

    }.bind(this))

  }

  componentWillUnmount() {
    this.state.topics && Object.keys(this.state.topics).forEach( (key) =>
      this.client.unsubscribe(this.state.topics[key].topic, function(err) 
        { 
          err && console.log('Erro ao retirar a inscrição ao topico: ' + this.state.topics[key].topic)
        }
      )
    )
    this.client.end();
  }*/

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleClick() {
    this.setState({isLoading: true});

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }, 2000);
  }

  handleInsert() {
    this.setState({
      _id: uuid.v4(), 
      numero: '',
      pedido: '',
      emissao: new Date().toISOString(),
      entrega: new Date().toISOString(),
      cnpj: '',
      representante: '',
      nome: '',
      parcelas: []
    });
  }

  handleSave(data) {
    //alert(JSON.stringify(this.state, null, 2));
    this.client.subscribe('financeiro/lancamento/alterado/' + this.state._id, function(err, granted) {
      if (err) {
        console.log('Erro ao se inscrever no topico: ' + granted[0].topic)
      } else {
        this.setState(
          {topics: assign(this.state.topics, {[granted[0].topic]: this.handleSaveOk})},
          this.client.publish.bind(
            this.client, 
            'financeiro/lancamento/alterar/' + this.props.clientId, 
            JSON.stringify(omit(this.state, 'topics'))
          )  
        );
      }
      
    }.bind(this));    
  }

  handleSaveOk(msg) {
    alert('Salvo com sucesso: ' + msg);
  }

  handleDelete(id) {

  }

  handlePrint(data) {

  }

  handleCalc(data) {

  }

  handleSearch(data) {

  }

  handleChange(value) {
    // value is an ISO String. 
    this.setState({
      [value.target.id]: value.target.value
    });
  }

  render() {
    //const canSave = true;
    alert('testndo');
    return (
    	<div className="static-modal">
    	<Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Row>

        	<Button
              bsSize="large"
              disabled={!this.state.id}
              onClick={this.props.onClose && this.props.onClose}
              style={{width: 100}}
            >
              <Glyphicon glyph="pencil" />
              <div><span>Fechar</span></div>
            </Button>
        </Row>

       </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>

    </Modal.Dialog>  
    </div>
    );
  }
}


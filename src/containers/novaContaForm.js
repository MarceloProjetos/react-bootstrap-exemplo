import React, { Component } from 'react';
//import { string, func } from 'react-prop-types';

import { 
  Button, 
  ControlLabel,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';

import { assign, omit }   from 'lodash';
import mqtt               from 'mqtt/lib/connect';

export default class NovaContaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banco: '',
      agencia: '',
      conta: '',
      descricao: ''
    }

    this.handleSave             = this.handleSave.bind(this);
    this.handleChangeBanco      = this.handleChangeBanco.bind(this);
    this.handleChangeAgencia    = this.handleChangeAgencia.bind(this);
    this.handleChangeConta      = this.handleChangeConta.bind(this);
    this.handleChangeDescricao  = this.handleChangeDescricao.bind(this);

    this.handleError  = this.handleError.bind(this);
  }

  componentWillMount() {
    var opts = {
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
        'financeiro/cadastro/erros/' + opts.clientId, 
        function(err, granted) { 
          !err ? 
            this.setState({
              topics: assign(this.state.topics, {[granted[0].topic]: this.handleError})}) : 
            console.log('Erro ao se inscrever no topico: ' + err)
        }.bind(this)
      );

      //this.client.subscribe('financeiro/cadastro/inserir', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/cadastro/excluir',  function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/cadastro/nova',     function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
  
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
  }

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleChangeBanco(event) {
    this.setState({ banco: event.target.value })
  }

  handleChangeAgencia(event) {
    this.setState({ agencia: event.target.value })
  }

  handleChangeConta(event) {
    this.setState({ conta: event.target.value })
  }

  handleChangeDescricao(event) {
    this.setState({ descricao: event.target.value })
  }

  BancoValidationState() {
    var regex = /^\s*[A-Za-z]+(?:\s+[A-Za-z0-9]+)*\s*$/;
    const length = this.state.banco.length;
    //if (length < 3) {return 'error';}
    if (regex.test(this.state.banco)&&(length>3)){
      return 'success';
    } else {
      return 'error';
    }
  }

  AgenciaValidationState() {
    var regex = /^\$?[0-9]+((\-[0-9][0-9])|(\-[0-9]))?$/;
    const length = this.state.agencia.length;
    //if (length < 3) {return 'error';}
    if (regex.test(this.state.agencia)&&(length>3)&&((this.state.agencia)!==(this.state.conta))){
      return 'success';
    } else {
      return 'error';
    }
  }

  ContaValidationState() {
    var regex = /^\$?[0-9]+((\-[A-Z0-9][A-Z0-9])|(\-[A-Z0-9]))?$/;
    const length = this.state.conta.length;
    //console.log(regex.test(this.state.conta));
 //   if (length > 5) {
      if (regex.test(this.state.conta)&&(length>3)){
        //console.log('Chamou' + this.state.conta);
      return 'success';
    } else {
      return 'error';
    }
  }

  DescricaoValidationState() {
    var regex = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
    const length = this.state.descricao.length;
    //if (length < 30) {return 'success';}
    if (regex.test(this.state.descricao)&&(length<20)){
      //console.log('valor = ' + (this.state.descricao));
      return 'success';
    } else {
      return 'error';
    }
  }
  
  handleSave() {
    // enviar dados para fila
    // esta fila é o retorno da operação
    this.client.subscribe('financeiro/cadastro/alterado/' + this.state._id, function(err, granted) {
      if (err) {
        alert('Erro ao se inscrever no topico: ' + granted[0].topic)
      } else {
        this.setState(
          {topics: assign(this.state.topics, {[granted[0].topic]: this.handleSaveOk})},
          this.client.publish.bind(
            this.client, 
            'financeiro/cadastro/alterar/' + this.props.clientId, 
            JSON.stringify(omit(this.state, 'topics'))
          )  
        );
      }
      
    }.bind(this)); 
    this.props.onClose && this.props.onClose();
  }

  handleSaveOk(msg) {
    alert('Salvo com sucesso: ' + msg);
  }

  handleDelete(id) {

  }

  handleEdit(value) {
 // value is an ISO String. 
    this.setState({
      [value.target.id]: value.target.value
    });
  } 

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup controlId="Conta" validationState={this.BancoValidationState()}>
              <ControlLabel>Nome do Banco</ControlLabel>
              <FormControl ref="Banco" type="text" value={this.state.banco} onChange={this.handleChangeBanco} placeholder="Digite aqui o nome do Banco"/>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Conta" validationState={this.AgenciaValidationState()}>
              <ControlLabel>Agência</ControlLabel>
              <FormControl ref="Agencia" type="text" value={this.state.agencia} onChange={this.handleChangeAgencia} placeholder="Numero da Agência"/>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Conta" validationState={this.ContaValidationState()}>
              <ControlLabel>Conta</ControlLabel>
              <FormControl ref="Conta" type="text" value={this.state.conta} onChange={this.handleChangeConta} placeholder="Numero da conta com - para separar o digito"/>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Conta" validationState={this.DescricaoValidationState()}>
              <ControlLabel>Descrição</ControlLabel>
              <FormControl ref="descricao" type="text" value={this.state.descricao} onChange={this.handleChangeDescricao} placeholder="Digite aqui uma referencia para essa conta"/>
              <FormControl.Feedback />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose} >Close</Button>
            <Button bsStyle="primary" onClick={this.handleSave} disabled={(this.DescricaoValidationState() || this.ContaValidationState() || this.AgenciaValidationState())!=='success'}>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

NovaContaForm.propTypes = {
  clientId: React.PropTypes.string,
  onClose: React.PropTypes.func,
  banco: React.PropTypes.string,
  agencia: React.PropTypes.string,
  conta: React.PropTypes.string,
  descricao: React.PropTypes.string,
} 
import React, { Component } from 'react';
//import { string, func } from 'react-prop-types';

import { 
  Button, 
  ControlLabel,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';

export default class NovaContaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banco: '',
      agencia: '',
      conta: '',
      descricao: ''
    }

    this.handleSave = this.handleSave.bind(this);

    this.handleChangeBanco      = this.handleChangeBanco.bind(this);
    this.handleChangeAgencia    = this.handleChangeAgencia.bind(this);
    this.handleChangeConta      = this.handleChangeConta.bind(this);
    this.handleChangeDescricao  = this.handleChangeDescricao.bind(this);
  }

  componentWillMount() {
    this.setState(
      {
        clientId: this.props.clientId,
        banco: this.props.banco || '',
        agencia: this.props.agencia || '',
        conta: this.props.conta || '',
        descricao: this.props.descricao || ''
      }
    )
  }

  handleSave() {
    // enviar dados para fila
    this.props.onClose && this.props.onClose();
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
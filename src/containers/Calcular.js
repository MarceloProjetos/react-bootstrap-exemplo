import React, { Component } from 'react';

import { 
  Button, 
  ControlLabel,
   /*ListGroup, 
  ButtonToolbar, 
  Col, 
  Row, 
  Grid,*/
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';
//import DatePicker from 'react-bootstrap-date-picker';

export default class Calcular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banco: '',
      agencia: '',
      conta: ''
    }

    this.handleChangeBanco = this.handleChangeBanco.bind(this);
    this.handleChangeAgencia = this.handleChangeAgencia.bind(this);
    this.handleChangeConta = this.handleChangeConta.bind(this);
  }

  componentWillMount() {
    this.setState(
      {
        banco: this.props.banco || 'BRADESCO',
        agencia: this.props.agencia || '1234',
        conta: this.props.conta || '45678-9'
      }
    )
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

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Editar Conta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup controlId="Conta" validationState="success">
              <ControlLabel>Nome do Banco</ControlLabel>
              <FormControl ref="Banco" type="text" value={this.state.banco} onChange={this.handleChangeBanco} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Conta" validationState="success">
              <ControlLabel>Agencia</ControlLabel>
              <FormControl ref="Agencia" type="text" value={this.state.agencia} onChange={this.handleChangeAgencia} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Conta" validationState="success">
              <ControlLabel>Conta</ControlLabel>
              <FormControl ref="Conta" type="text" value={this.state.conta} onChange={this.handleChangeConta} />
              <FormControl.Feedback />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Close</Button>
            <Button bsStyle="primary" onClick={this.props.onSave.bind(null, this.state)}>Save changes</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}
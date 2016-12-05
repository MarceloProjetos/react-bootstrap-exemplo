
import React, { Component } from 'react';

import { 
  Button, 
  Glyphicon, 
  Panel, 
  Col, 
  Row, 
  Grid,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Radio
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import uuid from 'node-uuid';
import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';

export default class LancamentoForm extends Component {
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
      nome: 'ALEGRI NA VIDA AGROINDUSTRIAL LTDA',
      liquidado: false,
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

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.console_log = this.console_log.bind(this);

  }

  componentWillMount() {
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

      //this.client.subscribe('financeiro/lancamento/inserir', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/gravar', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/excluir', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/imprimir', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/listar', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/buscar', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/lancamento/calcular', function(err, granted) { !err ? topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});

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

  handleClick() {
    this.setState({isLoading: true});

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }, 2000);
  }

  console_log(msg) {
    console.log('Modou:' + this.state.liquidado)
  }

  handleCheckboxChange(value) {
    console.log('Antes: ' + this.state.liquidado)
    this.setState({liquidado: !this.state.liquidado}, 
      this.console_log)
    console.log('Depois: ' + this.state.liquidado)
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
    //alert('delete: ' + msg);
  }

  handlePrint(data) {
    //alert('print: ' + msg);
  }

  handleCalc(data) {
    //alert('calcular: ' + msg);
  }

  handleSearch(data) {
    alert('search: ' + data);
  }

  handleChange(value) {
    // value is an ISO String. 
    this.setState({
      [value.target.id]: value.target.value
    });
  }

/*
http://127.0.0.1:3000/
*/

  render() {
    //const canSave = true;

    return (
      <Grid>
        <Row>
        
          <Col md={1} />
          <Col md={10} >

            <Panel header={'Lançamentos em Conta "INCLUSÃO"'} bsStyle="primary" >

                {/*<Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Cadastrar uma Conta Corrente</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          onClick={this.handleInsert}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="plus" />
                          <div><span>Novo</span></div>
                        </Button>
                    </OverlayTrigger>

                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Salvar as Alterações</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          onClick={this.handleSave}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="floppy-disk" />
                          <div><span>Gravar</span></div>
                        </Button>

                    </OverlayTrigger>

                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Imprimir</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          disabled={!this.state.id}
                          onClick={this.handlePrint}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="print" />
                          <div><span>Imprimir</span></div>
                        </Button>

                    </OverlayTrigger>

                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Calcular Datas das Parcelas</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          onClick={this.handleCalc}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="calendar" />
                          <div><span>Calcular</span></div>
                        </Button>

                    </OverlayTrigger>
                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Consultar Conta</Tooltip>)}
                    >

                        <Button
                          bsSize="large"
                          onClick={this.handleSearch}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="search" />
                          <div><span>Buscar</span></div>
                        </Button>

                    </OverlayTrigger>
                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Excluir esta Conta</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          disabled={!this.state.id}
                          onClick={this.handleDelete}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="trash" />
                          <div><span>Excluir</span></div>
                        </Button>

                    </OverlayTrigger>

                  </Col>
                </Row>*/}

                <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
                  <Col md={6} >
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Seleciona a conta</ControlLabel>
                        <FormControl componentClass="select" placeholder="Bancos + Contas">
                          <option value="select">BRADESCO CC-04050-7</option>
                          <option value="select">ITAU CC-9672</option>
                          <option value="select">BANCO DO BRASIL CC-9672</option>

                        </FormControl>
                      </FormGroup>
                  </Col>
                  <Col md={6} >
                      <FormGroup>
                          <ControlLabel>Saldo Atual</ControlLabel>
                          <FormControl disabled type="text" placeholder="R$124.888,77" />
                      </FormGroup>
                  </Col>
                </Row>

                <Row style={{paddingTop: 20}} >
                  <Col xs={12} md={1}> DATA</Col>
                  <Col xs={12} md={3}> 
                    <FormGroup controlId="emissao" validationState="success">
                      {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                      {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                      {/*<FormControl.Feedback />*/}
                      <DatePicker ref="emissao" value={this.state.emissao} onChange={this.handleChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={1}>Cheque</Col>
                  <Col xs={12} md={3}>
                    <FormGroup controlId="numero" validationState="success">
                      {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                      <FormControl ref="numero" type="text" value={this.state.numero} onChange={this.handleChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={2}>
                    <FormGroup controlId="emissao" validationState="success">
                      <Checkbox validationState="success" id="liquidado" defaultChecked={this.state.liquidado} onChange={this.handleCheckboxChange} >
                        Liquidado ?
                      </Checkbox>     
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={1}>Valor</Col>
                  <Col xs={12} md={3}>
                    <FormGroup controlId="pedido" validationState="success">
                      {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                      <FormControl type="text" ref="pedido" value={this.state.pedido} onChange={this.handleChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={1}>Operação</Col>
                  <Col xs={12} md={3}>
                    <FormGroup>
                      <Radio inline>
                        1
                      </Radio>
                      {' '}
                      <Radio inline>
                        2
                      </Radio>
                      {' '}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={2} mdOffset={2}>
                        <Button
                          bsStyle="danger"
                          onClick={this.handleClick.bind(this, 'Editar')}
                        >
                          <div><Glyphicon glyph="remove" /><span>    Cancelar</span></div>
                        </Button>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={1}>Observação </Col>
                  <Col xs={12} md={7}>
                    <FormGroup controlId="nome" validationState="success">
                      {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                      <FormControl type="text" ref="nome" value={this.state.nome} onChange={this.handleChange} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={2} mdOffset={2}>
                        <Button
                          bsStyle="success"
                          onClick={this.handleClick.bind(this, 'Editar')}
                        >
                          <div><Glyphicon glyph="ok" /><span>  Confirmar</span></div>
                        </Button>
                  </Col>
                </Row>
           

            </Panel>

          </Col>
          <Col md={1} />

        </Row>
      </Grid>  
    );
  }
}

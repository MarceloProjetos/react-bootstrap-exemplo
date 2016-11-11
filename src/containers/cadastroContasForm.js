
import React, { Component } from 'react';

import {  
  Button,
  Panel,
  Glyphicon, 
  Row, 
  Col,
  Table,
  Radio,
  Tooltip,
  Alert,
  OverlayTrigger
} from 'react-bootstrap';

import uuid               from 'node-uuid';
import { assign, omit }   from 'lodash';
import mqtt               from 'mqtt/lib/connect';
import NovaContaForm      from './novaContaForm';
import EditarContaForm    from './EditarContaForm';
 
export default class LancamentoForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      _id: uuid.v4(),
      contas: [
        {
          selecionada: false,
          banco: 'NOSSA CAIXA',
          conta: '00100020003-6',
          agencia: '1653',
          descricao: 'Primeiro conta'
        },
        {
          selecionada: false,
          banco: 'BRADESCO',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Segunda conta'
        },
        {
          selecionada: false,
          banco: 'ITAU',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'TERCEIRA conta'
        },
        {
          selecionada: false,
          banco: 'BANCO DO BRASIL',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Outra conta'
        },
        {
          selecionada: false,
          banco: 'HSBC',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Escreva qualquer coisa aqui que ajude!'
        },
        {
          selecionada: false,
          banco: 'ALTAMIRA',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Empresa '
        },
        {
          selecionada: false,
          banco: 'CELSO',
          conta: '20256-9',
          agencia: '2667',
          descricao: '123456789012345678901234567890'
        }        
      ],
      topics: {}
    }

    this.handleClose  = this.handleClose.bind(this);
    this.handleClick  = this.handleClick.bind(this);
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
      let topics = {};

      alert('Conectou no MQTT. ClienteID = ' +  opts.clientId);

      this.client.subscribe(
        'financeiro/cadastro/erros/' + opts.clientId, 
        function(err, granted) { 
          !err ? 
            this.setState({
              topics: assign(this.state.topics, {[granted[0].topic]: this.handleError})}) : 
            console.log('Erro ao se inscrever no topico: ' + err)
        }.bind(this)
      );

      //this.client.subscribe('financeiro/cadastro/inserido', function(err, granted) { !err ? this.state.topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/cadastro/excluido', function(err, granted) { !err ? this.state.topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
      //this.client.subscribe('financeiro/cadastro/alterado', function(err, granted) { !err ? this.state.topics.push(granted) : console.log('Erro ao se inscrever no topico: ' + err)});
  
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

  handleClose() {
    this.setState({form: null});
  }

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleClick(e) {
    switch(e) {
      case 'Nova':
        this.setState(
          {
            form: 
              <NovaContaForm 
                clientId={this.props.clientId}
                title="Cadastrar nova Contas"
                onClose={this.handleClose.bind(this)} 
                //onSave={this.handleSave.bind(this)} 
                //{...this.state.lista[i]}
              >
                  <span>Algo deu errado para achar o form CadastroContas</span>
              </NovaContaForm> 
          }
        )
        break;
      case 'Editar':
        this.setState(
          {
            form: 
              <EditarContaForm 
                //clientId={this.state.clientId}
                title="Editar Conta cadastrada"
                onClose={this.handleClose.bind(this)} 
                //onSave={this.handleSave.bind(this)} 
                //{...this.state.lista[i]}
              >
                  <span>Algo deu errado para achar o form CadastroContas</span>
              </EditarContaForm> 
          }
        )
        break;
      case 'Delete':
        this.setState(
          {
            form: 
              <EditarContaForm 
                clientId={this.state.clientId}
                nome="Deletar Cadastro?"
                onClose={this.handleClose.bind(this)} 
                //onSave={this.handleSave.bind(this)} 
                //{...this.state.lista[i]}
              >
                  <span>Algo deu errado para achar o form CadastroContas</span>
              </EditarContaForm> 
          }
        )
        break;
      default:
        this.setState({
          form: 
          <div>
            <Alert bsStyle="danger" style={{margin: 200}} >
            <h4>Impossivel mas entramos no "default" do case principal!</h4>
              <p>Alguma coisa muito errada aconteceu, avise o responsavel.</p>
              <p>
                <Button onClick={this.handleClose}>Ok</Button>
              </p>
            </Alert>
          </div>
        });
    }
  }

  render() {
    const canSave = true;

    return (
      <div>
        <Row>
        
          <Col md={1} />
          <Col md={10} >

            <h4>ClientId: {this.props.clientId}</h4>

            <Panel header={'Cadastro de Conta Corrente'} bsStyle="primary" >


                <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
                  <Col xs={6} md={2} >

                    <div>
                      <span>  
                        <h2>Contas</h2>    
                      </span>
                    </div>

                  </Col>
                  <Col xs={6} md={2} >

                    <div>
                      <span>      
                      </span>
                    </div>

                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Editar conta</Tooltip>)}
                    >

                        <Button
                          bsSize="large"
                          disabled={!this.state.id}
                          onClick={this.handleClick.bind(this, 'Editar')}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="pencil" />
                          <div><span>Editar</span></div>
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
                          onClick={this.handleClick.bind(this, 'Delete')}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="trash" />
                          <div><span>Excluir</span></div>
                        </Button>

                    </OverlayTrigger>

                  </Col>
                  <Col xs={6} md={2} >
                    <div>
                      <span>      
                      </span>
                    </div>
                  </Col>
                  <Col xs={6} md={2} >

                    <OverlayTrigger 
                      placement="top" 
                      overlay={(<Tooltip id="tooltip">Cadastrar nova Contas</Tooltip>)}
                    >
                        <Button
                          bsSize="large"
                          onClick={this.handleClick.bind(this, 'Nova')}
                          style={{width: 100}}
                        >
                          <Glyphicon glyph="plus" />
                          <div><span>Nova</span></div>
                        </Button>
                    </OverlayTrigger>

                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12}>
                    <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th>Ação</th>
                          <th>Banco</th>
                          <th>Conta</th>
                          <th>Agência</th>
                          <th>Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.contas.map( (k, i) => 
                          <tr key={'tr-' + i} >
                            <td><Radio value={k.selecionada} /></td>
                            <td>{k.banco}</td>
                            <td>{k.conta}</td>
                            <td>{k.agencia}</td>
                            <td>{k.descricao}</td>
                          </tr>
                        )}
 

                      </tbody>
                    </Table>
                  </Col>
                </Row>
           

            </Panel>

          </Col>
          <Col md={1} />

        </Row>

      {this.state.form}

    </div>
    );
  }
}

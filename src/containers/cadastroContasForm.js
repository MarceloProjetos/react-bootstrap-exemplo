
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

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import uuid               from 'node-uuid';
import { assign}          from 'lodash';
import mqtt               from 'mqtt/lib/connect';
import NovaContaForm      from './novaContaForm';
import EditarContaForm    from './EditarContaForm';
 
export default class LancamentoForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      contas: [
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'NOSSA CAIXA',
          conta: '00100020003-6',
          agencia: '1653',
          descricao: 'Primeiro conta'
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'BRADESCO',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Segunda conta'
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'ITAU',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'TERCEIRA conta'
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'BANCO DO BRASIL',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Outra conta'
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'HSBC',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Escreva qualquer coisa aqui que ajude!'
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'ALTAMIRA',
          conta: '20256-9',
          agencia: '2667',
          descricao: 'Empresa '
        },
        {
          _id: uuid.v4(),
          selecionada: false,
          banco: 'CELSO',
          conta: '20256-9',
          agencia: '2667',
          descricao: '123456789012345678901234567890'
        }        
      ],
      topics: {}
    }

    this.handleClose    = this.handleClose.bind(this);
    this.handleClick    = this.handleClick.bind(this);
    this.handleError    = this.handleError.bind(this);
    this.handleSearch   = this.handleSearch.bind(this);
    this.handleIncluido = this.handleIncluido.bind(this);
    this.handleAlterado = this.handleAlterado.bind(this);
    this.handleExcluido = this.handleExcluido.bind(this);
  }

  componentWillMount() {
    let opts = {
      host: 'localhost', //'192.168.0.1', //'test.mosquitto.org'
      port: 61614,
      protocol: 'ws',
      qos: 0,
      retain: false,
      clean: true,
      keepAlive: 30, // 30 sec.
      clientId: 'CadastroConta_' +this.props.clientId
    }

    this.client = mqtt.connect(opts);

    this.client.on('connect', function() {

      this.client.subscribe(
        ['financeiro/cadastro/contas/erros/'   + this.props.clientId, 
        'financeiro/cadastro/contas/search/',
        'financeiro/cadastro/contas/incluido/', 
        'financeiro/cadastro/contas/alterado/', 
        'financeiro/cadastro/contas/excluido/'], 
         function(err, granted) { 
          !err ? 
            this.setState(
              {
                topics: assign(
                          this.state.topics, 
                          {
                            [granted[0].topic]: this.handleError,   
                            [granted[1].topic]: this.handleSearch,  
                            [granted[2].topic]: this.handleIncluido, 
                            [granted[3].topic]: this.handleAlterado, 
                            [granted[4].topic]: this.handleExcluido 
                          }
                        )
              }
            ) 
          : 
            alert('Erro ao se inscrever no topico: ' + err);
        }.bind(this)
      );  
    }.bind(this));
    
    this.client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      
      // this.state.topics[topic] && this.handleError(message.toString());
      this.state.topics[topic] && this.state.topics[topic](message.toString()); 

    }.bind(this))
  }

  componentWillUnmount() {
    this.state.topics && Object.keys(this.state.topics).forEach( (topic) =>
      this.client.unsubscribe(topic, function(err) 
        { 
          err && console.log('Erro ao retirar a inscrição ao topico: ' + topic)
        }
      )
    )
  }

  handleClose() {
    this.setState({form: null});
  }

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleSearch(msg) {
    alert('search: ' + msg);
  }

  handleIncluido(msg) {
    alert('incluido 2: ' + msg);
  }

  handleAlterado(msg) {
    alert('alterado: ' + msg);
  }

  handleExcluido(msg) {
    alert('excluido: ' + msg);
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
                clientId={this.state.clientId}
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
    //const canSave = true;
    function format(cell, row){
      return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }
    //Row select setting
    var selectRowProp = {
      mode: "checkbox",  //checkbox for multi select, radio for single select.
      clickToSelect: true,   //click row will trigger a selection on that row.
      bgColor: "rgb(238, 193, 213)"   //selected row background color
    };
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
                        <BootstrapTable
                          data={this.state.contas}
                          striped={true}
                          hover={true}
                          condensed={true}
                          pagination={true}
                          selectRow={selectRowProp}
                          insertRow={true}
                          deleteRow={true}
                          columnFilter={true}
                          search={true}>
                          <TableHeaderColumn dataField="_id" isKey={true} dataAlign="right" dataSort={true}>Product ID</TableHeaderColumn>
                          <TableHeaderColumn dataField="selecionada" dataAlign="right" dataSort={true}>Product ID</TableHeaderColumn>
                          <TableHeaderColumn dataField="banco" dataSort={true}>Product Name</TableHeaderColumn>
                          <TableHeaderColumn dataField="agencia" dataAlign="center" dataFormat={format}>Product Price</TableHeaderColumn>
                          <TableHeaderColumn dataField="conta" dataAlign="center" dataFormat={format}>Product Price</TableHeaderColumn>
                        </BootstrapTable>
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

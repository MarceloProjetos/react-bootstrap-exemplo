
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {  
  Grid,
  Navbar,
  Nav, 
  NavDropdown,
  MenuItem, 
  Jumbotron
} from 'react-bootstrap';

import BancoForm from './containers/cadastroContasForm';
import LancamentoForm from './containers/cadastroSociosForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: 'mqtt_' + (1 + Math.random() * 4294967295).toString(16),
      form: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({form: null});
  }

  handleClick(e) {
    //alert(JSON.stringify(e))
    switch(e) {
      case 'Socios':
        this.setState(
          {
            form: 
              <BancoForm 
                clientId={this.state.clientId}
                nome="Cadastro de Socios"
                onClose={this.handleClose.bind(this)} 
              >
                  <span>this is a children component</span>
              </BancoForm> 
          }
        )
        break;
      case 'Contas':
        this.setState(
          {
            form: 
              <LancamentoForm 
                nome="Cadastro de Contas"
                onClose={this.handleClose.bind(this)} 
              >
                  <span>this is a children component</span>
                   
              </LancamentoForm> 
          }
        )
        break;
      default:
        this.handleClose(this); // por que funciona assim?
        //this.setState({form: null}); // É conteudo de handleClose

        alert('abrir um formulario qualquer =' + e + "  " + (100/2));
    }

  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="http://www.uol.com.br/" target="_blank">Sair</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavDropdown eventKey={1} title="Cadastro" id="Cadastro-nav-dropdown">
                <MenuItem onClick={this.handleClick.bind(this, 'Socios')}   eventKey={1.1}>Socios</MenuItem>
                <MenuItem onClick={this.handleClick.bind(this, 'Contas')}   eventKey={1.2}>Conta Corrente</MenuItem>
                <MenuItem divider />
              </NavDropdown>

              <NavDropdown eventKey={2} title="Lançamentos" id="Lançamentos-nav-dropdown">
                <MenuItem onClick={this.handleClick.bind(this, 'MovimentoInclusao')} eventKey={2.1}>Inclusão</MenuItem>
                <MenuItem onClick={this.handleClick.bind(this, 'MovimentoSocios')}  eventKey={2.2}>Sócios</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.handleClick.bind(this, 'AtualizaMovimentos')}eventKey={2.3}>Atualiza Movimentos</MenuItem>
              </NavDropdown>

              <NavDropdown eventKey={3} title="Consulta" id="Consulta-nav-dropdown">
                <MenuItem onClick={this.handleClick.bind(this, 'PrevisaoDiaria')} eventKey={3.1}>Previsão diaria</MenuItem>
                <MenuItem onClick={this.handleClick.bind(this, 'PrevisaoMensal')} eventKey={3.2}>Previsão mensal</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.handleClick.bind(this, 'CalculoPrevisao')}eventKey={3.4}>Calculo Previsão</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.handleClick.bind(this, 'PosicaoBancaria')}eventKey={3.5}>Posição Bancaria</MenuItem>
                <MenuItem onClick={this.handleClick.bind(this, 'PosicaoPeriodo')} eventKey={3.5}>Posição por Periodo</MenuItem>
              </NavDropdown>
            </Nav>
          </Grid>

        </Navbar>
        <Jumbotron>
          <Grid>
            <p> 
            </p>
          </Grid>
        </Jumbotron>

        {this.state.form}

      </div>
    );
  }
}
/*            <h1>Bem vindo ao teste2</h1>
              <p> 
              <Button
                bsStyle="success" //estilo do botão
                bsSize="large" //tamanho do botão
                href="http://react-bootstrap.github.io/components.html" //link do botão, no caso a propria documentação
                target="_blank"> 
                Veja a Documentação do React Bootstrap 
              </Button>
            </p>
            */
import React, { Component } from 'react';

import { 
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  Well,
  ButtonGroup,
  SplitButton,
  MenuItem
} from 'react-bootstrap';

export default class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		if (this.props.onClose) this.props.onClose()
	}

	getValidationState() {
	    const length = this.state.value.length;
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else if (length > 0) return 'error';
  	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {

		return(
			<Grid>
				<Row>
					<Col xs={0} md={1} />
					<Col xs={12} md={10} >
						<div>
							<h1>{this.props.nome}</h1>
							<form>
								<FormGroup
									controlId="formBasicText"
									validationState={this.getValidationState()}
								>
									<ControlLabel>Working example with validation</ControlLabel>
									<FormControl
										type="text"
										value={this.state.value}
										placeholder="Enter text"
										onChange={this.handleChange}
									/>
									<FormControl.Feedback />
									<HelpBlock>Validation is based on string length.</HelpBlock>
								</FormGroup>
								<Button 
									bsStyle="primary"
									onClick={this.handleClick.bind(this)} 
									style={{margin: 10}}
								>
									Fechar
								</Button>
								<Button 
									bsStyle="info"
									bsSize="large"
									onClick={this.handleClick.bind(this)} 
									style={{margin: 10}}
									block
								>
									test
								</Button>
																<Button 
									bsStyle="success"
									bsSize="large"
									onClick={this.handleClick.bind(this)} 
									style={{margin: 10}}
									disabled
								>
									test2
								</Button>
								  <ButtonGroup>
								    <Button>1</Button>
								    <Button>2</Button>
								    <SplitButton bsStyle='danger' title="Dropdown" id="bg-nested-dropdown">
								      <MenuItem eventKey="1">Dropdown link</MenuItem>
								      <MenuItem eventKey="2">Dropdown link</MenuItem>
								    </SplitButton>
								  </ButtonGroup>
							</form>	
						</div>
						<div>
							<Well>
								<div><span>Os campos filhos passado como parametro vão aparecer aqui, se houver.</span></div>
								<HelpBlock>{this.props.children}</HelpBlock>
							</Well>
						</div>
						
					</Col>
					<Col xs={0} md={1} />	
				</Row>
			</Grid>		
		);

	}
}
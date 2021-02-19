import React, { Component } from "react";
import AllServices from '../../services/employee.service';
import {Form} from './style';

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.getAtualEmployee = this.getAtualEmployee.bind(this);   
    this.updateEmployee = this.updateEmployee.bind(this);
  
    this.handleChange = this.handleChange.bind(this);
    this.formatedCpf = this.formatedCpf.bind(this);
    this.formatedOnlyLetters = this.formatedOnlyLetters.bind(this);
    this.formatedBDate = this.formatedBDate.bind(this);
    this.formaterStartDate = this.formaterStartDate.bind(this);

    this.state = {
      currentEmployee: {
        name:'',
        bDate:'',
        gender:'',
        email:'',
        cpf:'',
        startDate:'',
        team:''
      },
      error:'',
      message: ""
    };
  }

  componentDidMount() {
    this.getAtualEmployee(this.props.match.params.id);
    window.scrollTo(0,0);
  }

  getAtualEmployee(id) {
    AllServices.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }




  handleChange(e){
    this.setState(function(prevState){
      return {
        currentEmployee:{
          ...prevState.currentEmployee,
          [e.target.name]: e.target.value
        }
      };
    });
  }
///--------------------------formated-input---------------------///

  formatedCpf( {target: {value} }){
    this.setState(prevState => ({ currentEmployee: {cpf: normalizeInput(value, prevState.cpf)} }));
    const normalizeInput = (value, previousValue) => {
      if (!value) return value;
      const currentValue = value.replace(/[^\d]/g, '');
      const cvLength = currentValue.length;
      
      if (!previousValue || value.length > previousValue.length) {
        if (cvLength < 3) return currentValue;
        if (cvLength < 6) return `${currentValue.slice(0, 3)}.${currentValue.slice(3, 6)}`;
        if (cvLength < 9) return `${currentValue.slice(0, 3)}.${currentValue.slice(3, 6)}.${currentValue.slice(6, 9)}`;
        return `${currentValue.slice(0, 3)}.${currentValue.slice(3, 6)}.${currentValue.slice(6,9)}-${currentValue.slice(9,11)}`;
      }
    };
}

  formatedOnlyLetters(e){
     let regExp = /[^A-Za-z]/g;
     let letter = e.target.value.replace(regExp, '');
     this.setState({currentEmployee: { name:letter} })
    }
  
  formatedBDate({target: {value} }){
    // let value = e.target.value
    
    const normalizeInput = (value, previousValue) => {
      if (!value) return value;
      const currentValue = value.replace(/[^\d]/g, '');
      const cvLength = currentValue.length;
      
      if (!previousValue || value.length > previousValue.length) {
        if (cvLength < 2) return currentValue;
        if (cvLength < 4) return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}`;
        if (cvLength < 8) return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}/${currentValue.slice(4, 8)}`;
        return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}/${currentValue.slice(4,8)}`;
      }
    };
    this.setState(prevState => ({ currentEmployee:{bDate: normalizeInput(value, prevState.bDate) } }));
  }
  
  formaterStartDate({target: {value} }){
    // let value = e.target.value
    
    const normalizeInput = (value, previousValue) => {
      if (!value) return value;
      const currentValue = value.replace(/[^\d]/g, '');
      const cvLength = currentValue.length;
      
      if (!previousValue || value.length > previousValue.length) {
        if (cvLength < 2) return currentValue;
        if (cvLength < 4) return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}`;
        if (cvLength < 8) return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}/${currentValue.slice(4, 8)}`;
        return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}/${currentValue.slice(4,8)}`;
      }
    };
    this.setState(prevState => ({ currentEmployee:{startDate: normalizeInput(value, prevState.startDate)} }));
  }

///--------------------------Update-form---------------------///

  updateEmployee(e) {
    e.preventDefault()
    const { name, bDate, gender, email, cpf, startDate, team } = this.state.currentEmployee;
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    if(name == '' || bDate == '' || gender == '' || email == '' || cpf =='' || startDate == '' || team == ''){
        this.setState({ error:'*Required Field is missing' })
      return false
    }
    if(cpf.length < 14){
        this.setState({error:'*CPF must have 11 characters'})
        return false
    }

    if(!regExp.test(email)){
      this.setState({error: '*Email is Invalid'})
      return false
    }

    AllServices.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      alert('Sucessfull Updated')
      this.props.history.push('/employees');
      window.location.reload(false);
  }

  
  renderForm(){  
    const { currentEmployee } = this.state;
    return(
        <Form>
         <form>
         
             <div>
                <button onClick={this.onClickCloseForm} className='closeBtn'>X</button>
             </div>
             <span className='editing'>Editing Mode</span>
       
                <span>Your Name: </span>
                    <input name='name' value={currentEmployee.name} onChange={ this.formatedOnlyLetters }></input>

                <span>Birth Date: </span>
                       <input name='bDate' value={currentEmployee.bDate}  onChange={ this.formatedBDate }>
                    </input>

                   
                <span>Gender: </span>
                    <select name='gender' value={currentEmployee.gender} onChange={ this.handleChange }>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                <span>Email: </span>
                    <input name='email'value={currentEmployee.email}  onChange={ this.handleChange }></input>

                <span>CPF: </span>
                    <input name='cpf' value={currentEmployee.cpf} onChange={ this.formatedCpf }></input>    

                <span>Start date: </span>
                    <input name='startDate' value={currentEmployee.startDate} onChange={ this.formaterStartDate }>

                    </input>

                <span>Team: </span>
                    <select name='team' value={currentEmployee.team}  onChange={ this.handleChange }>
                        <option></option>
                        <option>FrontEnd</option>
                        <option>BackEnd</option>
                        <option>Mobile</option>
                    </select>
              
                  
                {this.state.error && <span className='errorMsg'>{this.state.error}</span>}

                <div>

                        <button onClick={this.updateEmployee} className='sendBtn'>Sendthis!</button>
                </div>
            </form>      
        </Form>
    )
}

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee && (
          <div>
              {this.renderForm()}
          </div>
        )}
      </div>
    )
  }
}

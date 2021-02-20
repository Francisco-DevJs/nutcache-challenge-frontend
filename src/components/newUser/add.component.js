import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AllServices from '../../services/employee.service';
import {Form} from './style';

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
   
    this.handleChange = this.handleChange.bind(this);
    this.formatedCpf = this.formatedCpf.bind(this);
    this.formatedOnlyLetters = this.formatedOnlyLetters.bind(this);
    this.formatedBDate = this.formatedBDate.bind(this);
    this.formaterStartDate = this.formaterStartDate.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false,
      error:'',

      name:'',
      bDate:'',
      gender:'',
      email:'',
      cpf:'',
      startDate:'',
      team:''

    };
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }
  
  handleChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }


  ///--------------------------formated-input---------------------///
  formatedCpf( {target: {value} }){
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
    this.setState(prevState => ({ cpf: normalizeInput(value, prevState.cpf) }));
    }
  formatedOnlyLetters(e){
     let regExp = /[^A-Za-z]/g;
     let letter = e.target.value.replace(regExp, '');
     this.setState({ name:letter })
    }
  formatedBDate({target: {value} }){
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
    this.setState(prevState => ({ bDate: normalizeInput(value, prevState.bDate) }));
  }
  
  formaterStartDate({target: {value} }){    
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
    this.setState(prevState => ({ startDate: normalizeInput(value, prevState.startDate) }));
  }
  ///--------------------------Create-form---------------------///
  saveEmployee(e) {
    e.preventDefault()
    
    const { name, bDate, gender, email, cpf, startDate, team } = this.state;
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
  
    var data = {
      name: name,
      bDate: bDate,
      gender: gender,
      email:email,
      cpf:cpf,
      startDate:startDate,
      team: team 
    };

    AllServices.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          bDate: response.data.bDate,
          gender: response.data.gender,
          email:response.data.email,
          cpf:response.data.cpf,
          startDate:response.data.startDate,
          team: response.data.team,
          published: response.data.published,

          submitted: true
        });
  
      })
      .catch(e => {
        console.log(e);
      });
      alert('Register Sucessfull Created')
//       this.props.history.push('/employees');
//       window.location.reload(false);
  }

  
  renderForm(){  
    
    return(
      <Form>
         <form>
             <div>
                <button onClick={ () => {this.setState({submitted:true})} } className='closeBtn'>X</button>
             </div>
             
            
                <span>Your Name: </span>
                    <input name='name' value={this.state.name} onChange={ this.formatedOnlyLetters }></input>

                <span>Birth Date: </span>
                            
                       <input name='bDate' value={this.state.bDate}  onChange={ this.formatedBDate }>
                       </input>
                       
                    

                <span>Gender: </span>
                    <select name='gender' value={this.state.gender} onChange={ this.handleChange }>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                <span>Email: </span>
                    <input name='email'value={this.state.email}  onChange={ this.handleChange }></input>

                <span>CPF: </span>
                    <input name='cpf' value={this.state.cpf} onChange={ this.formatedCpf }></input>    

                <span>Start date: </span>
                    <input name='startDate' value={this.state.startDate} onChange={ this.formaterStartDate }>

                    </input>

                <span>Team: </span>
                    <select name='team'value={this.state.team}  onChange={ this.handleChange }>
                        <option></option>
                        <option>FrontEnd</option>
                        <option>BackEnd</option>
                        <option>Mobile</option>
                    </select>
                
                {this.state.error && <span className='error'>{this.state.error}</span>}

                <div>

                        <button onClick={this.saveEmployee} className='sendBtn'>Sendthis!</button>
                </div>
            </form> 
        </Form>
    )
}



  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div>
            <Redirect to='/employees'/>
          </div>
        ) : (
          <div>
            {this.renderForm()}
          </div>
          )
        }
      </div>
    );
  }
}

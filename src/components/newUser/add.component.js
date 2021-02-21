import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AllServices from '../../services/employee.service';
import {Form} from './style';
import { cpfMask } from '../../mask/cpfMask';
import { dateMask } from '../../mask/dateMask';

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.renderForm = this.renderForm.bind(this);
   
    this.handleChange = this.handleChange.bind(this);
    this.formatedCpf = this.formatedCpf.bind(this);
    this.formatedDate = this.formatedDate.bind(this);
    this.formatedOnlyLetters = this.formatedOnlyLetters.bind(this);


    this.state = {
      id: null,

      error:'',
      submitted:false,

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
  formatedCpf(e){
    const validCpf = cpfMask(e.target.value)
    this.setState(( { cpf: validCpf } ))
  }

  formatedOnlyLetters(e){
  const regExp = /[^A-Za-z ]/g;
  const letter = e.target.value.replace(regExp, '');
  this.setState(( { name: letter } ))
  }

  formatedDate(e){
  const validDate = dateMask(e.target.value)
  
  this.setState(( {[e.target.name]: validDate } ))
 
  }

  ///--------------------------Create-form---------------------///
  saveEmployee(e) {
    e.preventDefault()
    
    const { name, bDate, gender, email, cpf, startDate, team } = this.state;
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if(name === '' || bDate === '' || gender === '' || email === '' || cpf ==='' || startDate === '' || team === ''){
        this.setState({ error:'*Required Field is missing' })
      return false
    }
    if(cpf.length < 14){
        this.setState({error:'*CPF must have 11 characters'})
        return false
    }
    if(bDate.length < 10 || startDate.length < 10){
        this.setState({error:'*Date is Invalid'})
        return false
    }

    if(!regExp.test(email)){
      this.setState({error: '*Email is Invalid'})
      return false
    }
  
    const data = {
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
          submitted:true
        });
  
      })
      .catch(e => {
        console.log(e);
      });
      alert('Register Sucessfull Created')
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
                            
                       <input name='bDate' value={this.state.bDate}  onChange={ this.formatedDate }>
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
                    <input name='startDate' value={this.state.startDate} onChange={ this.formatedDate }>

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

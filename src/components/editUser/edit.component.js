import React, { Component } from "react";
import AllServices from '../../services/employee.service';
import { Form } from './style';
import { Redirect } from "react-router-dom";
import { cpfMask } from '../../mask/cpfMask';
import { dateMask } from '../../mask/dateMask';
export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.getAtualEmployee = this.getAtualEmployee.bind(this);   
    this.updateEmployee = this.updateEmployee.bind(this);
  
    this.handleChange = this.handleChange.bind(this);
    this.formatedCpf = this.formatedCpf.bind(this);
    this.formatedDate = this.formatedDate.bind(this);
    this.formatedOnlyLetters = this.formatedOnlyLetters.bind(this);


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
      message: "",
      redirect:false
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

  formatedCpf(e){
    const validCpf = cpfMask(e.target.value)
    this.setState(prevState => ({
                currentEmployee:{
                  ...prevState.currentEmployee,
                  cpf:validCpf
                }
    }))
  }

  formatedDate(e){
  const validDate = dateMask(e.target.value)
  this.setState(prevState => ({
              currentEmployee:{
                ...prevState.currentEmployee,
                [e.target.name]:validDate
              }
  }))
  }
  formatedOnlyLetters(e){
  let regExp = /[^A-Za-z ]/g;
  let letter = e.target.value.replace(regExp, '');
  this.setState(prevState => ({
              currentEmployee:{
              ...prevState.currentEmployee,
              [e.target.name]:letter
              }
    }))
 }

///--------------------------Update-form---------------------///

  updateEmployee(e) {
    e.preventDefault()
    const { name, bDate, gender, email, cpf, startDate, team } = this.state.currentEmployee;
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
                <button onClick={ () => {this.setState({redirect:true})} } className='closeBtn'>X</button>
             </div>
             <span className='editing'>Editing Mode</span>
       
                <span>Your Name: </span>
                    <input name='name' value={currentEmployee.name} onChange={ this.formatedOnlyLetters }></input>

                <span>Birth Date: </span>
                       <input name='bDate' value={currentEmployee.bDate}  onChange={ this.formatedDate }>
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
                    <input name='startDate' value={currentEmployee.startDate} onChange={ this.formatedDate }>

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
    const { currentEmployee, redirect } = this.state;

    return (
      <div>
        {currentEmployee && (
          <div>
              {this.renderForm()}
          </div>
        )},
      {redirect &&(
          <div>
            <Redirect to='/employees'/>
          </div>
        )}
      </div>
    )
  }
}

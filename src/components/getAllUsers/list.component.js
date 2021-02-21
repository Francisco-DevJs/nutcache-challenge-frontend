import React, { Component } from "react";
import AllServices from '../../services/employee.service';
import { Link } from "react-router-dom";
import {ContainerCard} from './style';
export default class GetEmployee extends Component {
  constructor(props) {
    super(props);
  
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);


    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      currentId:null,
      deletePopUp:false
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
    window.scrollTo(0,0);
  }

  //essencial
  retrieveEmployees() {
    AllServices.getAll()
      .then(response => {
        this.setState({
          employees: response.data,
        

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
//essencial
  refreshList() {
    this.retrieveEmployes();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }




  deleteEmployee(currentId) {    
    AllServices.delete(currentId)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/employees')
        window.location.reload(false)
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  render() {
    const { employees, deletePopUp } = this.state;

    return (
      <div>
       <ContainerCard>

            {employees.length === 0 && <div><span>No Employes Registred.</span></div>}
           {employees && 

             employees.map((employee, index) => (
             
             <div className='card' key={index}>
               <div className='item'>
                 
             <ul>
               <li >
                 <strong>Nome:</strong> {employee.name}
               </li>
               <li>
                 <strong>Email:</strong> {employee.email} 
               </li>
               <li>
                 <strong>Start Date:</strong> {employee.startDate}
               </li>
               <li>
                 <strong>Team:</strong> {employee.team}
               </li>
                 
                   <Link to={"/employees/" + employee.id}>
                 <button className="editBtn">
                     Edit
                 </button>
                   </Link>
                      <button onClick={() => {this.setState({ deletePopUp:!deletePopUp })}} className='deleteBtn'>Delete</button>
                 
                 
                  {deletePopUp && 
                  <div className='deletePopUp'>
                      <span>Are you sure to delete?</span>
                      <button className='goBackBtn' onClick={() => {this.setState({ deletePopUp:false})}}>Back</button>
                      <button onClick={this.deleteEmployee.bind(this,employee.id) }
                              className='realDelete'>Delete</button>
                  </div>}
                 {/* <button onClick={this.deleteEmployee.bind(this,employee.id) } 
                                       className='deleteBtn'>delete</button> */}
               </ul>
                 </div>    
               
               </div>
             ))
            }
       </ContainerCard>

            
         
               
          {/* fazer um maps no card, e colocar */}

         
    

      
      </div>
    );
  }
}

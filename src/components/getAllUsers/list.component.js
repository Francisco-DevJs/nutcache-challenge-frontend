import React, { Component } from "react";
import TutorialDataService from '../../services/employee.service';
import { Link, Redirect } from "react-router-dom";
import {ContainerCard} from './style';
export default class GetEmployee extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      currentId:null,
      conditinalRender: true
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
    window.scrollTo(0,0);
  }

  //essencial
  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data,
          conditinalRender:false

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
//essencial
  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }




  deleteTutorial(currentId) {    
    TutorialDataService.delete(currentId)
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
    const { tutorials } = this.state;

    return (
      <div>
       <ContainerCard>

            {tutorials.length == 0 && <div><span>No Employes Registred.</span></div>}
           {tutorials && 

             tutorials.map((tutorial, index) => (
             
             <div className='card' key={index}>
               <div className='item'>
                 
             <ul>
               <li >
                 <strong>Nome:</strong> {tutorial.name}
               </li>
               <li>
                 <strong>Email:</strong> {tutorial.email} 
               </li>
               <li>
                 <strong>Start Date:</strong> {tutorial.startDate}
               </li>
               <li>
                 <strong>Team:</strong> {tutorial.team}
               </li>
                 
                   <Link to={"/employees/" + tutorial.id}>
                 <button className="editBtn">
                     Edit
                 </button>
                   </Link>
                 <button onClick={this.deleteTutorial.bind(this,tutorial.id) } 
                                       className='deleteBtn'>delete</button>
               </ul>
                 </div>    
               
               </div>
             ))
            }
             
         
               
          {/* fazer um maps no card, e colocar */}

         
    

       </ContainerCard>
      
      </div>
    );
  }
}

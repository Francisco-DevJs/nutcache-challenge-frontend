import React from "react";
import logo from '../../assets/logo.png'
import { Container, Navigator } from './style';

import {NavLink} from 'react-router-dom';
export default function Header() {
  return (
    <div>

      <Container>
       

          <NavLink to={"/employees"} >
          <img
          src={logo}
          alt="Logo"
          />
            </NavLink>

        <h1>Employee Manager</h1>
        
      </Container>
      <Navigator>
        <div>
            
            <NavLink to='/add'>
                <button className='addBtn'> 
                  New Employee
                </button>
              </NavLink>
       
        </div>
      
      </Navigator>
        
           

    </div>  


  );
}
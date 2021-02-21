import styled from 'styled-components';

export const Container = styled.div`
     
   
      
     width:100%;
     position:absolute;
    .addBtn{
            position:absolute;  
            left:50%;
            transform: translateX(-50%);
            top:1rem;   
            text-decoration:none;
            box-sizing:border-box;
            font-size: 1.5rem;
            width:200px;
            height:40px;
            color:snow;
            margin-top:0.5rem;
            margin-bottom:0.5rem;
            background-color: #92bCE5;
            border-radius:80px;
            border:none;
             
      -webkit-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      -moz-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      box-shadow: 7px 12px 14px -2px rgba(104,106,122,1); 

        }
        .addBtn:hover{
            cursor: pointer;
            background-color: #70DCE8;
        }
        .addBtn:active{
            background-color:#22aCE5;
        }
   
       

`

export const Form = styled.div`
        display:flex;
        align-items:flex-start;
        align-content:space-between;
        justify-content:center;
        position:absolute;
        z-index:9999;
        width:100%;
        height:100%;
        top:14rem;
      
        form{
        left:auto;
        top:auto;
        transform: translateX(auto);
        transform: translateY(auto);
        position:absolute;
        background-color: #92bCE5;
        border-radius:10px;
      
        box-sizing:border-box;

        -webkit-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
        -moz-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
        box-shadow: 7px 12px 14px -2px rgba(104,106,122,1); 
        max-width:90%;
        max-height:85%;

    }
      span {
        
    display:block;
    margin: 0.5rem 0rem 0rem 1rem;
    font-size:1rem;
    
        
    } 
     select{
        margin: 0rem 2rem 0rem 1rem;
        font-size:0.9rem;
     
    
    }
     input{
    
        font-size: 1rem;
        border-radius:5px;
        border:none;
        padding-left:10px;
        margin: 0rem 2rem 0rem 1rem;
       
       
    }
 
    .closeBtn{
        text-align:center;
        position: absolute;
        cursor: pointer;
        width:1.2rem;
        font-size:0.8rem;
        border-radius:80px;
        border:none;
        color: white ;
        margin:0.4rem 1rem 0 12rem;
        background-color:red;
     
      
    
    }
    .sendBtn{
        border-radius:80px;
        border:none;
        color: white ;
        width:5rem;
        height:2rem;
        font-size:1rem;
        margin:1rem;
        background-color:rgb(51, 63, 72);
        -webkit-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      -moz-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      box-shadow: 7px 12px 14px -2px rgba(104,106,122,1); 

    }
    
    .errorMsg{  color:red; position:absolute; left:4rem; bottom:3rem;} 

    .calendar{position:fixed; position:relative;}
`

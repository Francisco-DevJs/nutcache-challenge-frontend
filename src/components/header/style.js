import styled from 'styled-components';

export const Container = styled.div`

      -webkit-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      -moz-box-shadow: 7px 12px 14px -2px rgba(104,106,122,1);
      box-shadow: 7px 4px 14px -2px rgba(104,106,122,1); 
      
      font-size:1.5rem;
      box-sizing:border-box;
      position:relative;
      img{
          position:relative;    
          margin:1rem;
          width: 20%;
          height:20%;
          
        }
        
        
        h1{
            position:relative;   
            bottom:1rem;
            left:50%;
            transform: translateX(-50%);
            text-align:center;
            font-size:2.4rem;
        } 
        
        
        `;
        
        export const Navigator = styled.div`
        width:100%;
        position:absolute;
        .addBtn{
            position:absolute;  
            left:50%;
            transform: translateX(-50%);
            top:0.4rem; 
            
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

        .showBtn{
            position:absolute;  
            left:50%;
            transform: translateX(-50%);
            top:5rem;   
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
        .showBtn:hover{
            cursor: pointer;
            background-color: #70DCE8;
        }
        .showBtn:active{
            background-color:#22aCE5;
        }

        
        
        
        
        
        `
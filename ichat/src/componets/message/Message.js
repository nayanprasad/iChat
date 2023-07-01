import React from 'react';
import "./Message.css"

const Message = (props) => {
  if(props.user){
    if(props.user === "Admin"){
      return(
        <div className= "messageBox middle">
        {`${props.user} : ${props.message}`}
     </div>
      )
    }
    else{
      return (
        <div className={`messageBox ${props.classs}`}>
           {`${props.user} : ${props.message}`}
        </div>
      )
    }
    
  }
  else{
    return (
      <div className={`messageBox ${props.classs}`}>
        {`You : ${props.message}`}
      </div>
    )
  }

}

export default Message
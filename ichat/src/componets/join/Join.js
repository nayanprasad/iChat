import React, { useState } from 'react'
import "./Join.css"
import iChatlogo from "../../images/ichat-logo.png";
import { Link } from 'react-router-dom';

const Join = (props) => {

  const [username, setUsername] = useState("");
  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleClick = () => {
    props.getName(username);
    setUsername("");
  }

  const handleClickLink = (e) => {
    if(!username){
      e.preventDefault() ;
      props.showAlert("Please Enter a Name", "warning")
    }
    else{
      props.showAlert(`Joinded as ${username}`, "success");
    }
  }

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={iChatlogo} alt="logo" />
        <h1>iCHAT</h1>
        <input type="text" id="joinInput" placeholder="Enter Your Name" onChange={handleChange} value={username}/>
        <Link to="/chat" onClick={handleClickLink} ><button onClick={handleClick} className="joinbtn">JOIN</button></Link>
      </div>
    </div>
  )
}

export default Join
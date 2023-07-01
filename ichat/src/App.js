import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Join from "./componets/join/Join";
import Chat from "./componets/chat/Chat";
import Alerts from "./componets/alert/Alert";


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }

  const [name, setname] = useState("")
  const getName = (n) => {
    setname(n);
  }

  return (
    <Router>
      <div >
        <Alerts alert={alert} />
        <Routes>
          <Route path="/" element={<Join getName={getName} showAlert={showAlert} />} />
          <Route path="/chat" element={<Chat name={name} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

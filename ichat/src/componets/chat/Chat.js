import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendIcon from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png"
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import sendSound from "../../sounds/send.mp3";
import receiveSound from "../../sounds/receive.mp3";
import exitSound from "../../sounds/exit.mp3";


let socket;
const ENDPOINT =   "https://ichat.nayan.radr.in/"
// const ENDPOINT =   "http://localhost:5000/"

const Chat = (props) => {

  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const prevMessages = usePrevious(messages);

  const sendAudio = new Audio(sendSound);
  const receiveAudio = new Audio(receiveSound);
  const exitAudio = new Audio(exitSound)

  const send = () => {
    let message = document.getElementById("chatInput").value;
    console.log(message);
    if (message) {
      sendAudio.play();
      socket.emit("message", { message: message, id: id });
      document.getElementById('chatInput').value = "";
    }
  }


  useEffect(() => {

    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {    // the first argument is event name (custom event also)
      setid(socket.id);
    });

    // console.log(socket);  // refers to each joined users

    socket.emit("joined", ({ user: props.name }));


    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data);
    })

    socket.on("welcome", (data) => {
      // console.log(data);
      if (!data.joindedUser) {   // this is to readirect to home page when page is refreshed (where page is refreshed the username will be "")
        navigate("/");
      }
      else {
        setMessages([...messages, data]);
      }

    });

    socket.on("leave", (data) => {
      exitAudio.play();
      setMessages([...messages, data]);
      // console.log(data);
    })

    return () => {
      // socket.emit('disconnect');   // https://stackoverflow.com/questions/67469795/error-disconnect-is-a-reserved-event-name-why-am-i-getting-this-error
      socket.disconnect();
      // socket.off();
    }
  }, [])

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data.id);
      // console.log(id);
      // if(id != data.id){

      // }
      // console.log(`${data.user} : ${data.message}`);
    })

    return () => {

      socket.off();
    }
  }, [messages])

  // Hook
  function usePrevious(value) {

    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  // console.log(messages);
  // console.log("pev", prevMessages);

  // messages = [...prevMessages];
  // messages = JSON.parse(JSON.stringify(prevMessages))

  const handleColseIcon = () => {
    exitAudio.play();
    const data = [{}];
    setMessages([...messages, data]);
  }


  // if(prevMessages && messages){
  //   if(messages.length <= 1 && prevMessages.length > 0){
  //     messages.map()
  //     // setMessages(...messages, [prevMessages]);
  //     console.log("previ" ,messages);
  //   }
  // }



  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>iChat</h2>
          <Link to="/" ><img onClick={handleColseIcon} src={closeIcon} alt="close" /></Link>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages ? messages.map((item, i) =>  // else it will show message.map is not a function if do not check condition
            <Message
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ) : null}

        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" onKeyPress={(event) => event.key === 'Enter'? send() : null }/>
          <button onClick={send} className="sendBtn"><img src={sendIcon} alt="logo" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat

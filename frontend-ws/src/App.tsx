
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket , setSocket] = useState<null | WebSocket>(null);
  const [latestMessage , setlatestMessage] = useState("");
  const [InputMessage , setInputMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081'); //connection establish with the web socker server
    socket.onopen = () => { //when the socket connetion is open set the state to that socket conn and log connected
      setSocket(socket); //set the status of the ws conn to connected that is opened
      console.log("connected!!");
    }
    //the thread reaches reaches here whenever there is a message being sent on the ws server 
    socket.onmessage = (message) => { //whenver there is a message on the socket connection then display the message 
      console.log("received message : ", message.data);
      setlatestMessage(message.data); //set the status to whatever the latest message that came from the server 
    }
  },[]);

  if(!socket){ //when ever there is no socket conn established it shows this message 
    return <div>
      Connecting to Socket Server Loading ...
    </div>
  }

  return (
    <div>

      <input onChange={((e) => {
        setInputMessage(e.target.value);
      })}></input>

      <button onClick={() => {
        socket.send(InputMessage)
      }}>Send</button>

      <div>
        {latestMessage}
      </div>

    </div>
  )
}

export default App;

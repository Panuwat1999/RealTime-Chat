import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="box">
          <h1 className="title">Chat Room</h1>
          <div className="Input-Box">
            <input
              className="Input-Chat"
              type="text"
              placeholder="chat..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />

            <input
              className="Input-Chat"
              type="text"
              placeholder="Room ID..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />

            <button type="button" className="Input-Button" onClick={joinRoom}>
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./style.css";

function Chat(props) {
  const { socket, userName, room } = props;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prvList) => [...prvList, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prvList) => [...prvList, data]);
    });
  }, [socket]);
  return (
    <div className="chat-Box">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList?.map((messageContent) => {
          return (
            <div
              className="message"
              id={userName === messageContent?.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent?.message}</p>
                </div>
                <div className="message-meta">
                  <p className="time">{messageContent?.time}</p>
                  <p className="user">{messageContent?.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <div className="input-Box">
          <input
            className="Input-message"
            type="text"
            placeholder="Hello..."
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button className="button-message" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

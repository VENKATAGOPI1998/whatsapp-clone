import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import React, { useState, useEffect } from "react";
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { helloId } = useParams();
  const [helloName, setHelloName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (helloId) {
      db.collection('hello')
      .doc(helloId)
      .onSnapshot((snapshot) => setHelloName
      (snapshot.data().name));

      db.collection("hello")
      .doc(helloId)
      .collection("messages")
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [helloId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [helloId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>", input);

    db.collection('hello').doc(helloId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div className="chat__headerInfo">
          <h3>{helloName}</h3>
          <p>Last Seen{" "}
          {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
          <span className="chat__name">{message.name}</span>{message.message}
          <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon></InsertEmoticon>
        <form>
          <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}></input>
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
}

export default Chat;

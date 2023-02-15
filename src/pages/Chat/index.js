import React, { useEffect } from "react";
import { Button, Input, Alert, Card, Spin } from "antd";
import { io } from "socket.io-client";

const { TextArea } = Input;

function Chat() {
  const [socket, setSocket] = React.useState(null);
  const [text, setText] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [messageList, setMessageList] = React.useState([]);
  const [error, setError] = React.useState(null);

  const addMessage = (message) => {
    setMessageList([...messageList, <p key={count}>{message}</p>]);
    setCount(count + 1);
  };

  useEffect(() => {
    const mySocket = io(window.location.origin.replace("3000", "3001"));

    mySocket.on("error", (message) => {
      setError(message);
      console.error(message);
    });

    mySocket.on("message", (message) => {
      addMessage(message);
    });

    mySocket.emit("identify", localStorage.getItem("token"));

    setSocket(mySocket);

    return () => mySocket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (socket) {
    socket.off("message");
    socket.on("message", (message) => {
      addMessage(message);
    });
  }

  const emitMessage = () => {
    socket.emit("message", text);
    setText("");
  };

  return (
    <Card>
      {error ? (
        <Alert
          message="Whoops!"
          description={error}
          type="error"
          closable
          onClose={setError(null)}
        />
      ) : null}
      <Card>{socket ? messageList : <Spin />}</Card>
      <TextArea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            emitMessage();
          }
        }}
      />
      <Button type="primary" onClick={emitMessage}>
        Send
      </Button>
    </Card>
  );
}

export default Chat;

import React, { useEffect } from "react";
import { Button, Input, Alert, Card, Spin } from "antd"; // Importing dependencies from Ant Design library
import { io } from "socket.io-client"; // Importing socket.io-client library

const { TextArea } = Input; // Destructuring Input component to use TextArea

function Chat() {
  const [socket, setSocket] = React.useState(null); // Initializing state variables
  const [text, setText] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [messageList, setMessageList] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Function to add message to the message list
  const addMessage = (message) => {
    setMessageList([...messageList, <p key={count}>{message}</p>]);
    setCount(count + 1);
  };

  // useEffect hook to handle socket connection and incoming messages
  useEffect(() => {
    // Creating a new socket connection
    const mySocket = io(window.location.origin.replace("3000", "3001"));

    // Setting up event listener for "error" event
    mySocket.on("error", (message) => {
      setError(message); // Setting the error state variable
      console.error(message); // Logging the error to the console
    });

    // Setting up event listener for "message" event
    mySocket.on("message", (message) => {
      addMessage(message); // Calling addMessage function with the received message
    });

    // Emitting "identify" event with user's token, if available
    mySocket.emit("identify", localStorage.getItem("token"));

    setSocket(mySocket); // Updating the socket state variable

    return () => mySocket.disconnect(); // Disconnecting the socket when the component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If block to remove previous "message" event listener and set up a new one
  if (socket) {
    socket.off("message"); // Removing the previous "message" event listener
    socket.on("message", (message) => {
      addMessage(message); // Calling addMessage function with the received message
    });
  }

  // Function to emit a message to the server
  const emitMessage = () => {
    socket.emit("message", text); // Emitting "message" event with the text state variable
    setText(""); // Resetting the text state variable
  };

  // JSX that defines the user interface of the component
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
            emitMessage(); // Calling emitMessage function when "Enter" key is pressed
          }
        }}
      />
      <Button type="primary" onClick={emitMessage}>
        Send
      </Button>
    </Card>
  );
}

export default Chat; // Exporting the Chat component as the default export of the module
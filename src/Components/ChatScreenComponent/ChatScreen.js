import React from "react";
import Chatkit from "@pusher/chatkit-client";

export class ChatScreen extends React.Component {
  componentDidMount() {
    const chatmanager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:1e1206f2-e97d-4146-ba57-e8b4225caf97",
      userId: this.props.currentUserName,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:4000/authenticate"
      })
    });

    chatmanager
      .connect()
      .then(currentUser => console.log(currentUser))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <h1>Chatscreen</h1>
        <p>Hello, {this.props.currentUserName}.</p>
      </div>
    );
  }
}

export default ChatScreen;

import React, { Component } from "react";
import "./App.css";
import UserNameForm from "./Components/usernameComponent/UserNameForm";
import ChatScreen from "./Components/ChatScreenComponent/ChatScreen";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentScreen: "WhatIsYourUserNameScreen",
      currentUserName: ""
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(userName) {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ userName })
    })
      .then(response => {
        console.log(`success`);
        this.setState({
          currentScreen: "ChatScreen",
          currentUserName: userName
        });
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  }

  render() {
    if (this.state.currentScreen === "WhatIsYourUserNameScreen") {
      return (
        <div className="App">
          <h1 className="text-center mt-5">Welcome!!</h1>
          <div className="d-flex p-3 justify-content-center uNameFormC">
            <UserNameForm onSubmit={this.onUsernameSubmitted} />
          </div>
        </div>
      );
    } else if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUserName={this.state.currentUserName}/>
    }
  }
}

export default App;

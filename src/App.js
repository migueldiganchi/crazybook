import React from "react";
import { Route } from "react-router-dom";

import Auth from "./components/Auth/Auth";

import Loading from "./components/Loading";
import Header from "./components/Header";
import Board from "./components/Board";
import Notifier from "./components/Notifier";
import BoardPanel from "./components/BoardPanel";

import PublicationManager from "./components/Publications/PublicationManager";

class App extends React.Component {
  state = {
    notification: null,
    waiting: null
  };

  notify = (message, messageType, messageTimeout, callback) => {
    this.setState({
      notification: {
        message: message,
        type: messageType ? messageType : "info"
      }
    });

    setTimeout(() => {
      this.stopNotify();
      if (callback) {
        callback();
      }
    }, messageTimeout || 3000);
  };

  notifyError = message => {
    this.notify(message, "error");
  };

  stopNotify = () => {
    this.setState({ notification: null });
  };

  wait = message => {
    this.setState({
      waiting: message,
      notification: {
        message: message
      }
    });
  };

  stopWait = () => {
    this.setState({
      waiting: null,
      notification: null
    });
  };

  wall = props => {
    return (
      <PublicationManager
        waiting={this.state.waiting}
        onNotify={this.notify}
        onWait={this.wait}
        onStopWait={this.stopWait}
        {...props}
      />
    );
  };

  auth = props => {
    return (
      <Auth
        waiting={this.state.waiting}
        onNotify={this.notify}
        onWait={this.wait}
        onStopWait={this.stopWait}
        {...props}
      />
    );
  };

  render() {
    let glassApp =
      this.state.isAuthorManagerVisible || this.state.waiting ? (
        <div className="App-glass" onClick={this.toggleManager} />
      ) : null;

    let loadingApp = this.state.waiting ? <Loading /> : null;
    return (
      <div className="App">
        {glassApp}
        {loadingApp}
        <Header title="Welcome to CrazyBook" {...this.props} />
        <Board>
          <BoardPanel>
            <Route path="/" exact render={this.wall} />
            <Route path="/auth" render={this.auth} />
          </BoardPanel>
        </Board>

        <Notifier
          notification={this.state.notification}
          waiting={this.state.waiting}
        />
      </div>
    );
  }
}

export default App;

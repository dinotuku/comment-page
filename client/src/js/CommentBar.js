import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Message from 'material-ui/svg-icons/communication/message';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import '../css/CommentBar.css';

class CommentBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      logoutOpen: false
    }
  }

  handleChange = (ev) => {
    this.props.onUserChange(ev.target.value);
  }

  handleKeySubmit = (ev) => {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.handleLogin();
    }
  }

  handleLoginOpen = () => {
    this.setState({ loginOpen: true });
  };

  handleLoginClose = () => {
    this.props.onUserCancel();
    this.setState({ loginOpen: false });
  };

  handleLogin = () => {
    this.props.onUserLogin();
    if (this.props.inputUser.trim() !== '') this.setState({ loginOpen: false });
  };

  handleLogoutOpen = () => {
    this.setState({ logoutOpen: true });
  };

  handleLogoutClose = () => {
    this.setState({ logoutOpen: false });
  };

  handleLogout = () => {
    this.props.onUserLogout();
    this.setState({ logoutOpen: false });
  };

  render() {
    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleLoginClose }
      />,
      <FlatButton
        label="Login"
        primary={ true }
        onTouchTap={ this.handleLogin }
      />
    ];

    const logoutActions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleLogoutClose }
      />,
      <FlatButton
        label="Logout"
        primary={ true }
        onTouchTap={ this.handleLogout }
      />,
    ];

    return(
      <div>
        <AppBar
          title={ this.props.logged ? `Hi ${ this.props.inputUser }` : "Comment" }
          iconElementLeft={
            <IconButton><Message /></IconButton>
          }
          iconElementRight={
            this.props.logged ?
            <FlatButton label="Logout" onTouchTap={ this.handleLogoutOpen } /> :
            <FlatButton label="Login" onTouchTap={ this.handleLoginOpen }/>
          }
          zDepth={ 2 }
        />
        <Dialog
          title="Type your name"
          actions={ loginActions }
          open={ this.state.loginOpen }
          onRequestClose={ this.handleLoginClose }
        >
          <TextField
            className="Login-input-bar"
            hintText="My name"
            value={ this.props.inputUser }
            onChange={ this.handleChange }
            onKeyPress={ this.handleKeySubmit }
            errorText={ this.props.loginError }
            autoFocus
          />
        </Dialog>
        <Dialog
          actions={ logoutActions }
          open={ this.state.logoutOpen }
          onRequestClose={ this.handleLogoutClose }
        >
          Are you sure you want to logout?
        </Dialog>
      </div>
    );
  }
}

export default CommentBar;

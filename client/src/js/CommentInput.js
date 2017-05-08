import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check'
import Close from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField';
import '../css/CommentInput.css'

class CommentInput extends Component {
  handleChange = (ev) => {
    this.props.onInputChange(ev.target.value);
  }

  handleKeySubmit = (ev) => {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.props.onInputSubmit();
    }
  }

  handleSubmit = () => {
    this.props.onInputSubmit();
  }

  handleCancel = () => {
    this.props.onInputCancel();
  }

  render() {
    return(
      <Paper 
        className="Comment-input"
        zDepth={ 2 }
      >
        <Card>
          <CardText>
            <TextField
              className="Comment-input-bar"
              hintText={ this.props.replyToIdx ? `Reply to ${this.props.replyToUser}` : "Leave a comment" }
              value={ this.props.value }
              onChange={ this.handleChange }
              onKeyPress={ this.handleKeySubmit }
              errorText={ this.props.inputError }
            />
            <span className="Comment-input-button-wrapper">
              { this.props.replyToIdx ? 
                  <IconButton
                    className="Comment-input-button"
                    onTouchTap={ this.handleCancel }
                  >
                    <Close className="Comment-input-button-svg"/>
                  </IconButton> :
                  <span /> 
              }
              <IconButton 
                className="Comment-input-button"
                onTouchTap={ this.handleSubmit }
              >
                <Check className="Comment-input-button-svg"/>
              </IconButton>
            </span>
          </CardText>
        </Card>
      </Paper>
    );
  }
}

export default CommentInput;

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlipMove from 'react-flip-move';
import Scroll from 'react-scroll';
import CommentBar from './CommentBar'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem';
import '../css/CommentApp.css';

injectTapEventPlugin();

const scroller = Scroll.scroller;

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
  }
});

class CommentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      logged: false,
      inputUser: '',
      inputComment: '',
      replyToIdx: '',
      loginError: '',
      inputError: '',
      editCount: 0
    };
  }

  setItem = (tmp) => {
    let items = tmp;
    items = items.map((item) => {
      const tmpItem = item;
      tmpItem.time = new Date(item.time);
      return tmpItem;
    });
    return this.setState({ items });
  }

  handleEditCount = () => {
    const editCount = this.state.editCount + 1;
    this.setState({ editCount });
  }

  handleUserChange = (input) => {
    this.setState({ inputUser: input });
  }

  handleUserLogin = () => {
    if (this.state.inputUser.trim() === '') this.setState({ loginError: 'Need something here' });
    else {
      this.setState({ 
        logged: true,
        logginError: ''
      });
    }
  }

  handleUserLoginCancel = () => {
    this.setState({ inputUser: '' });
  }

  handleUserLogout = () => {
    this.setState({
      logged: false,
      inputUser: ''
    });
  }

  handleCommentChange = (input) => {
    this.setState({ inputComment: input });
  }

  handleCommentSubmit = () => {
    if (this.state.inputComment.trim() !== '') {
      const parent = this.state.replyToIdx ? true : false;
      const level = this.state.replyToIdx ? this.state.items[this.state.replyToIdx].level + 1 : 1;

      fetch('/api/comments', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          user: this.state.inputUser,
          content: this.state.inputComment,
          parent,
          level,
        })
      })
        .catch(err => console.error(err));

      if (this.state.replyToIdx) {
        fetch('api/comments', {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            idx: this.state.items.length,
            parentIdx: this.state.replyToIdx
          })
        })
          .catch(err => console.error(err));
      }

      fetch('/api')
        .then(res => res.json())
        .then((items) => this.setItem(items))
        .then(() => {
          this.setState({ 
            inputComment: '',
            replyToIdx: '',
            inputError: ''
          });

          scroller.scrollTo(`${ this.state.items.length - 1 }-comment-item`, {
            duration: 400,
            delay: 100,
            smooth: "easeInOutQuad",
            isDynamic: true
          })
        })
        .catch(err => console.error(err));
    } else {
      this.setState({ inputError: 'Need something here' })
    }
  }

  handleCommentCancel = () => {
    this.setState({ 
      inputComment: '',
      replyToIdx: '',
    });
  }

  handleReplyTap = (item) => {
    if (this.state.logged) this.setState({ replyToIdx: String(item.idx) });
  }

  handleRemoveTap = (item) => {
    // Not finished
  }

  renderCommentItem = (item, idx, allReplys) => {
    const replys = allReplys.filter((i) => item.replys.indexOf(i.idx) > -1);
    return (
      <CommentItem
        key={ `${ item["idx"] }-comment-item` }
        name={ `${ item["idx"] }-comment-item` }
        item={ item }
        replys={ replys }
        allReplys={ allReplys }
        editCount={ this.state.editCount }
        onReplyTap={ (item) => this.handleReplyTap(item) }
        onRemoveTap={ (item) => this.handleRemoveTap(item) }
      />
    );
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((items) => this.setItem(items))
      .catch(err => console.error(err));
  }

  render() {
    const comments = this.state.items.filter((i) => !i.parent);
    const allReplys = this.state.items.filter((i) => i.parent);

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div className="App">
          <div className="App-content">
            <CommentBar
              items={ this.state.items }
              logged={ this.state.logged }
              inputUser={ this.state.inputUser }
              loginError={ this.state.loginError }
              onUserChange={ (input) => this.handleUserChange(input) }
              onUserLogin={ this.handleUserLogin }
              onUserCancel={ this.handleUserLoginCancel }
              onUserLogout={ this.handleUserLogout }
              onIconTouch={ this.handleEditCount }
            />
            <FlipMove
              duration={400}
              staggerDelayBy={350}
              easing="cubic-bezier(0.455, 0.030, 0.515, 0.955)"
              appearAnimation="accordionVertical"
              enterAnimation="accordionVertical"
              leaveAnimation="accordionVertical"
            >
              { comments.map((item, idx) => this.renderCommentItem(item, idx, allReplys)) }
            </FlipMove>
            {
              this.state.logged ?
              <CommentInput 
                value={ this.state.inputComment }
                replyToIdx={ this.state.replyToIdx }
                replyToUser={ this.state.replyToIdx ? this.state.items[this.state.replyToIdx].user : ''}
                inputError={ this.state.inputError }
                onInputChange={ (input) => this.handleCommentChange(input) }
                onInputSubmit={ this.handleCommentSubmit }
                onInputCancel={ this.handleCommentCancel }
              /> :
              <span></span> 
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CommentApp;

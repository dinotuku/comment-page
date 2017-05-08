import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../css/CommentItem.css';

const Element = Scroll.Element;

class CommentItem extends Component {
  handleReply = () => {
    this.props.onReplyTap(this.props.item);
  }

  renderReply = (replys, allReplys) => {
    if (replys.length > 0) {
      return (
        <CardText
          className={ this.props.item.level < 7 ? "reply-comment" : "deep-reply-comment"}
          expandable
        >
          { replys.map((item, idx) => this.renderCommentItem(item, idx, allReplys)) }
        </CardText>
      );
    }
    return;
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
        onReplyTap={ (item) => this.props.onReplyTap(item) }
      />
    );
  }

  render() {
    const time = `${ this.props.item.time.getFullYear() }/${ this.props.item.time.getMonth() + 1 }/${ this.props.item.time.getDate() } ${ this.props.item.time.getHours() }:${ ('0' + this.props.item.time.getMinutes()).slice(-2) }`;
    return (
      <Element name={ this.props.name }>
        <Card 
          initiallyExpanded
          zDepth={ 2 }
        >
          <CardHeader
            title={ this.props.item.user }
            subtitle={ time }
            actAsExpander
            showExpandableButton
          />
          <CardText
            className="comment-content"
            expandable
          >
            { this.props.item.content }
          </CardText>
          <CardActions expandable>
            <FlatButton 
              label="Reply"
              onTouchTap={ this.handleReply }
            />
          </CardActions>
          { this.renderReply(this.props.replys, this.props.allReplys) }
        </Card>
      </Element>
    );
  }
}

CommentItem.defaultProps = {
  replys: [],
  allReplys: []
};

export default CommentItem;

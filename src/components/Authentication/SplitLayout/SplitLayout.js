import React, { Component } from 'react';

import { Col, Row } from 'antd';

class SplitLayout extends Component {
  constructor() {
    super();
  }

  render() {
    let left = null,
      right = null;
    const img = (
      <img className="sl_photo" src={this.props.src} alt="photo"></img>
    );
    const content = this.props.children;
    if (this.props.content === 'right') {
      left = img;
      right = content;
    } else {
      right = img;
      left = content;
    }

    return (
      <div className="sl_container">
        <div
          id="sl_left"
          className={this.props.content === 'right' ? '' : 'sl_content'}
        >
          {left}
        </div>
        <div
          id="sl_right"
          className={this.props.content === 'right' ? 'sl_content' : ''}
        >
          {right}
        </div>
      </div>
    );
  }
}

export default SplitLayout;

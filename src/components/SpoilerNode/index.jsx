import React, { Component } from 'react';

export default class SpoilerNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }
  show = () => {
    this.setState({ display: true });
  };

  render() {
    const { display } = this.state;
    const { children } = this.props;

    return (
      <span className={`spoiler ${!display ? 'hide' : ''}`} onClick={this.show}>
        <span className={`${!display ? 'event-none' : ''}`}>{children}</span>
      </span>
    );
  }
}

import React, { Component,PureComponent } from 'react'

export default class Pure extends Component {
    render() {
        console.log("Pure called");
    return (
      <div>
        <h2>Pure components</h2>
        <h3>Count: {this.props.val}</h3>
      </div>
    )
  }
}

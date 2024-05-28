import React, { Component } from 'react'

export default class Regular extends Component {
  render() {
    console.log("Regular component called")
    return (
      <div>
        <h2>Regular components</h2>
        <h3>Count : {this.props.val}</h3>
      </div>
    )
  }
}

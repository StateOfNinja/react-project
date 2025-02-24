import React, { Component } from "react";

import "./newTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  state = {
    value: "",
  };

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            onChange={this.onValueChange}
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

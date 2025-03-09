import React, { Component } from 'react';
import './newTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      text: formData.get('text'),
      min: formData.get('min') || '0',
      sec: formData.get('sec') || '0',
    };
    if (formValues.text === '') {
      alert('Please enter a task name!');
      return;
    }

    this.props.addTask(formValues);

    e.target.reset();
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input name="text" type="text" className="new-todo" placeholder="What needs to be done?" autoFocus />
          <input name="min" type="number" min={0} className="new-todo-form__timer" placeholder="Min" />
          <input name="sec" type="number" min={0} className="new-todo-form__timer" placeholder="Sec" />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

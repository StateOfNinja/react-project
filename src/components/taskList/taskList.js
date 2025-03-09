import React from 'react';
import PropTypes from 'prop-types';

import './taskList.css';

import Task from '../task/task';

function TaskList({ todos, onToggleCompleted, onDeleted, toggleTimer }) {
  const elements = todos.map((item) => {
    const { id, formValues, dateStamp, completed, timer, isRunning } = item;

    return (
      <Task
        key={id}
        id={id}
        text={formValues.text}
        min={formValues.min}
        sec={formValues.sec}
        isRunning={isRunning}
        timer={timer}
        timeStamp={dateStamp}
        completed={completed}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDeleted={() => onDeleted(id)}
        toggleTimer={() => toggleTimer(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      formValues: PropTypes.shape({
        text: PropTypes.string.isRequired,
        min: PropTypes.string.isRequired,
        sec: PropTypes.string.isRequired,
      }).isRequired,
      dateStamp: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
      timer: PropTypes.number.isRequired,
      isRunning: PropTypes.bool.isRequired,
    })
  ),
  toggleTimer: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: [],
};

export default TaskList;

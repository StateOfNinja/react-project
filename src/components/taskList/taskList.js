import React from 'react';
import PropTypes from 'prop-types';

import './taskList.css';

import Task from '../task/task';

function TaskList({ todos, onToggleCompleted, onDeleted, toggleTimer, onChangeEditStatus, onEditTask }) {
  const elements = todos.map((item) => {
    const { id, min, sec, text, dateStamp, completed, timer, isRunning, isEdit } = item;

    return (
      <Task
        key={id}
        id={id}
        text={text}
        min={min}
        sec={sec}
        isRunning={isRunning}
        timer={timer}
        timeStamp={dateStamp}
        completed={completed}
        isEdit={isEdit}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDeleted={() => onDeleted(id)}
        toggleTimer={() => toggleTimer(id)}
        onEditTask={onEditTask}
        onChangeEditStatus={() => onChangeEditStatus(id)}
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

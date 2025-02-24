import React from "react";
import PropTypes from "prop-types";

import "./taskList.css";

import Task from "../task/task";

const TaskList = ({ todos, onToggleCompleted, onDeleted }) => {
  const elements = todos.map((item) => {
    const { id, text, dateStamp, completed } = item;
    return (
      <Task
        key={id}
        id={id}
        text={text}
        timeStamp={dateStamp}
        completed={completed}
        onToggleCompleted={() => onToggleCompleted(id)}
        onDeleted={() => onDeleted(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      timeStamp: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

export default TaskList;

import React from "react";
import PropTypes from "prop-types";

import "./footer.css";

import TasksFilter from "../tasksFilter/tasksFilter";

const Footer = ({
  clearAllCompletedTasks,
  filter,
  onFilterChange,
  countTasks,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countTasks} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearAllCompletedTasks}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  clearAllCompletedTasks: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  countTasks: PropTypes.number,
};

Footer.defaultProps = {
  countTasks: 0,
};

export default Footer;

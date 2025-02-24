import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Task({ id, text, timeStamp, onToggleCompleted, onDeleted, completed }) {
  let className = '';
  if (completed) {
    className += 'completed';
  }

  const timeCreated = formatDistanceToNow(timeStamp, { includeSeconds: true });

  return (
    <li className={className}>
      <div className="view">
        <input id={id} className="toggle " type="checkbox" checked={completed} onChange={onToggleCompleted} />
        <label htmlFor={id}>
          <span className="description">{text}</span>
          <span className="created">created {timeCreated}</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  timeStamp: PropTypes.instanceOf(Date),
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
};

Task.defaultProps = {
  text: '',
  completed: false,
  timeStamp: new Date(),
};

export default Task;

import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onEditTask(this.props.id, e.target.value);
    } else if (e.key === 'Escape') {
      this.props.onEditTask(this.props.id, this.props.text);
    }
  };

  render() {
    const {
      id,
      text,
      min,
      sec,
      timeStamp,
      timer,
      isRunning,
      onToggleCompleted,
      onDeleted,
      completed,
      toggleTimer,
      isEdit,
      onChangeEditStatus,
    } = this.props;

    let className = '';

    if (completed) {
      className += 'completed ';
      if (isRunning) {
        toggleTimer(id);
      }
    }
    if (isEdit) {
      className += 'editing ';
    }

    const conversionTime = (timer) => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer - minutes * 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timeCreated = formatDistanceToNow(timeStamp, { includeSeconds: true });

    return (
      <li className={className}>
        <div className="view">
          <input id={id} className="toggle " type="checkbox" checked={completed} onChange={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            {(min !== '0' || sec !== '0' || completed) && (
              <span className="description">
                <button className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer}></button>
                {conversionTime(timer)}
              </span>
            )}
            <span className="created">created {timeCreated}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onChangeEditStatus} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input className="edit" autoFocus defaultValue={text} onKeyDown={this.handleKeyDown} />
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  min: PropTypes.string,
  sec: PropTypes.string,
  timeStamp: PropTypes.instanceOf(Date),
  timer: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  toggleTimer: PropTypes.func.isRequired,
};

Task.defaultProps = {
  text: '',
  min: '0',
  sec: '0',
  timeStamp: new Date(),
  completed: false,
};

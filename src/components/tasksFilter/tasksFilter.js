import PropTypes from 'prop-types';

import './tasksFilter.css';

export default function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ];

  const filters = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const classButton = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button type="button" className={classButton} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{filters}</ul>;
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
};

TasksFilter.defaultProps = {
  filter: 'All',
};

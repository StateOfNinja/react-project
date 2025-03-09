import React, { Component } from 'react';

import './app.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

export default class App extends Component {
  maxId = 0;

  state = {
    todoData: [],
    filter: 'All',
  };

  intervals = {};

  tick = (taskId) => {
    this.setState(({ todoData }) => {
      const updateTask = todoData.map((task) => {
        if (task.id === taskId) {
          if (task.isRunning && task.timer > 0) {
            const newTimer = task.timer - 1;
            return { ...task, timer: newTimer };
          } else {
            this.stopTimer(taskId);
            return { ...task, isRunning: false };
          }
        }
        return task;
      });

      return {
        todoData: updateTask,
      };
    });
  };

  toggleTimer = (taskId) => {
    this.setState(({ todoData }) => {
      const updateTask = todoData.map((task) => {
        if (task.id === taskId) {
          if (!task.isRunning && task.timer > 0) {
            this.intervals[taskId] = setInterval(() => this.tick(taskId), 1000);
            return { ...task, isRunning: true };
          } else {
            this.stopTimer(taskId);
            return { ...task, isRunning: false };
          }
        }
        return task;
      });

      return {
        todoData: updateTask,
      };
    });
  };

  stopTimer = (taskId) => {
    clearInterval(this.intervals[taskId]);
    delete this.intervals[taskId];
  };

  clearAllCompletedTasks = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }));
  };

  createTask(formValues) {
    const totalSeconds = parseInt(formValues.min, 10 || 0) * 60 + parseInt(formValues.sec, 10 || 0);
    return {
      formValues,
      timer: totalSeconds,
      isRunning: false,
      isActive: false,
      completed: false,
      id: this.maxId++,
      dateStamp: Date.now(),
    };
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const updateTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: updateTodoData,
      };
    });
  };

  addTask = (formValues) => {
    const newTask = this.createTask(formValues);
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask];
      return {
        todoData: newTodoData,
      };
    });
  };

  filters = (filter, items) => {
    switch (filter) {
      case 'All':
        return items;
      case 'Active':
        return items.filter((el) => !el.completed);
      case 'Completed':
        return items.filter((el) => el.completed);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, filter } = this.state;

    const renderedTask = this.filters(filter, todoData);

    const completedTasks = todoData.filter((el) => el?.completed).length;
    const remainingTasks = todoData.length - completedTasks;

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todos={renderedTask}
          toggleTimer={this.toggleTimer}
          onToggleCompleted={this.onToggleCompleted}
          onDeleted={this.onDeleted}
        />
        <Footer
          countTasks={remainingTasks}
          clearAllCompletedTasks={this.clearAllCompletedTasks}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}

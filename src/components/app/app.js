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

  intervalsRef = React.createRef();
  intervalsRef = { current: {} };

  onEditTask = (id, newText) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, text: newText, isEdit: false } : task)),
    }));
  };

  onChangeEditStatus = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'isEdit'),
    }));
  };

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
    const { todoData } = this.state;
    const task = todoData.find((item) => item.id === taskId);
    if (!task.isRunning && task.timer > 0) {
      this.startTimer(taskId);
      this.setState({
        todoData: this.toggleProperty(todoData, taskId, 'isRunning'),
      });
    } else {
      this.stopTimer(taskId);
      this.setState({
        todoData: this.toggleProperty(todoData, taskId, 'isRunning'),
      });
    }
  };

  startTimer = (taskId) => {
    clearInterval(this.intervalsRef.current[taskId]);
    this.intervalsRef.current[taskId] = setInterval(() => this.tick(taskId), 1000);
  };

  stopTimer = (taskId) => {
    clearInterval(this.intervalsRef.current[taskId]);
    delete this.intervalsRef.current[taskId];
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
    const totalSeconds = parseInt(formValues.min, 10) * 60 + parseInt(formValues.sec, 10);
    return {
      text: formValues.text,
      min: formValues.min,
      sec: formValues.sec,
      timer: totalSeconds,
      isRunning: false,
      completed: false,
      isEdit: false,
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
          onEditTask={this.onEditTask}
          onChangeEditStatus={this.onChangeEditStatus}
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

import React, { Component } from "react";

import "./app.css";

import NewTaskForm from "../newTaskForm/newTaskForm";
import TaskList from "../taskList/taskList";
import Footer from "../footer/footer";

export default class App extends Component {
  maxId = 0;

  state = {
    todoData: [
      this.createTask("Z"),
      this.createTask("O"),
      this.createTask("V"),
    ],
    filter: "All",
  };

  clearAllCompletedTasks = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, "completed"),
    }));
  };

  createTask(text) {
    return {
      text,
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
      const updateTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: updateTodoData,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask];
      return {
        todoData: newTodoData,
      };
    });
  };

  filters = (filter, items) => {
    switch (filter) {
      case "All":
        return items;
      case "Active":
        return items.filter((el) => !el.completed);
      case "Completed":
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

    const completedTasks = todoData.filter((el) => el.completed).length;
    const remainingTasks = todoData.length - completedTasks;

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todos={renderedTask}
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

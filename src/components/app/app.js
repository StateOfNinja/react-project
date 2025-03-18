import { useRef, useState } from 'react';

import './app.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

export default function App() {
  const maxId = useRef(0);
  const intervalsRef = useRef({});
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('All');

  function onEditTask(id, newText) {
    setTodoData((todoData) => todoData.map((task) => (task.id === id ? { ...task, text: newText, isEdit: false } : task)));
  }

  function onChangeEditStatus(id) {
    setTodoData((todoData) => toggleProperty(todoData, id, 'isEdit'));
  }

  function tick(taskId) {
    setTodoData((todoData) => {
      const updateTask = todoData.map((task) => {
        if (task.id === taskId) {
          if (task.isRunning && task.timer > 0) {
            const newTimer = task.timer - 1;
            return { ...task, timer: newTimer };
          } else {
            stopTimer(taskId);
            return { ...task, isRunning: false };
          }
        }
        return task;
      });
      return updateTask;
    });
  }

  function toggleTimer(taskId) {
    setTodoData((todoData) => {
      const updatedTodoData = todoData.map((task) => {
        if (task.id === taskId)
          if (!task.isRunning && task.timer > 0) {
            startTimer(taskId);
            return { ...task, isRunning: true };
          } else {
            stopTimer(taskId);
            return { ...task, isRunning: false };
          }
        return task;
      });
      return updatedTodoData;
    });
  }

  function startTimer(taskId) {
    clearInterval(intervalsRef.current[taskId]);
    intervalsRef.current[taskId] = setInterval(() => tick(taskId), 1000);
  }

  function stopTimer(taskId) {
    clearInterval(intervalsRef.current[taskId]);
    delete intervalsRef.current[taskId];
  }

  function clearAllCompletedTasks() {
    setTodoData((todoData) => todoData.filter((el) => !el.completed));
  }

  function onToggleCompleted(id) {
    setTodoData((todoData) => toggleProperty(todoData, id, 'completed'));
  }

  function createTask(formValues) {
    const totalSeconds = parseInt(formValues.min, 10) * 60 + parseInt(formValues.sec, 10);
    const newTask = {
      text: formValues.text,
      min: formValues.min,
      sec: formValues.sec,
      timer: totalSeconds,
      isRunning: false,
      completed: false,
      isEdit: false,
      id: maxId.current,
      dateStamp: Date.now(),
    };
    maxId.current += 1;
    setTodoData((todoData) => [...todoData, newTask]);
  }

  function toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  function onDeleted(id) {
    setTodoData((todoData) => todoData.filter((task) => task.id !== id));
  }

  function filters(filter, items) {
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
  }

  function onFilterChange(filter) {
    setFilter(filter);
  }

  const renderedTask = filters(filter, todoData);

  const completedTasks = todoData.filter((el) => el?.completed).length;

  const remainingTasks = todoData.length - completedTasks;

  return (
    <div className="todoapp">
      <NewTaskForm createTask={createTask} />
      <TaskList
        todos={renderedTask}
        toggleTimer={toggleTimer}
        onToggleCompleted={onToggleCompleted}
        onDeleted={onDeleted}
        onEditTask={onEditTask}
        onChangeEditStatus={onChangeEditStatus}
      />
      <Footer
        countTasks={remainingTasks}
        clearAllCompletedTasks={clearAllCompletedTasks}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

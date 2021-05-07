import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import { TasksCollection } from "../api/TaskCollection";

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);
//comments here

export const App = () => {
  //completed tasks filter
  const hideCompletedFilter = { isChecked: { $ne: true } };
  //initializing state
  const [hideCompleted, setHideCompleted] = useState(false);
  //fetch tasks from DB
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>
        </div>
        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

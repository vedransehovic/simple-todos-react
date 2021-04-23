import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import { TasksCollection } from "../api/TaskCollection";

export const App = () => {
  //fetch tasks from DB
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

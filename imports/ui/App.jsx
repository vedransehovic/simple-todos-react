import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import { TasksCollection } from "../api/TaskCollection";

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

export const App = () => {
  //fetch tasks from DB
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
      { tasks.map(task => <Task key={ task._id } task={ task } onCheckboxClick={toggleChecked} />) }
  </ul>
    </div>
  );
};

import React from "react";

const Task = ({ task }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      {task.text}
    </li>
  );
};

export default Task;

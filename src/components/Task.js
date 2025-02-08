import React from "react";

const Task = ({task, toggleTask, onDelete, onEdit }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p>Please log in to view tasks.</p>; // Display a login prompt if no user is logged in
    }
    
    return(
        <div
            className='task-item'
        >
            <p 
                className={`${task?.completed? "completed" : ""}`}
                onClick={() => toggleTask(task?._id)}
            >{task?.text}</p>
            <div>
                <input
                    className="btn btn-danger"
                    type="button"
                    value="Delete"
                    name="Delete"
                    onClick={() =>  onDelete(task?._id)}
                />
                <input
                    className="btn btn-warning"
                    type="button"
                    value="Edit"
                    name="Edit"
                    onClick={() =>  onEdit(task?._id, task?.text)}
                />
            </div>
        </div>
    );
}

export default Task;
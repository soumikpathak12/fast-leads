import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export function Todo() {
    const [tasks, setTasks] = useState([] as Object[]);
    const [taskInput, setTaskInput] = useState('');
    const [completedTask, setCompletedTask] = useState(0);
    function FunctionName() {

    }

    const handleInputChange = (event: any) => {
        setTaskInput(event.target.value);
    }
    const addTask = () => {
        setTasks([...tasks, { taskName: taskInput, isDone: false }]);
        console.log(tasks)
        // setTaskInput('');
    }
  
    const handleCheckbox = (index: number) => {
        console.log(index);
        tasks.map((data: any, i: number) => {
            if (index === i) {
                data.isDone = !data.isDone;
            }
            console.log(tasks)
        })

        let tempvar = tasks.filter((data: any) => data.isDone === true)
        console.log(tempvar.length)
        setCompletedTask(tempvar.length)
    }


    return (
        <>
            <div>
                <h1> Todo list</h1>
                <input type="text" value={taskInput} onChange={handleInputChange} placeholder="Enter here"></input>
                <Button onClick={addTask}>Add task</Button>

                <ul>
                    {tasks.map((task: any, index: number) => <li key={index}>{task.taskName}<input type="checkbox" onChange={() =>handleCheckbox(index)}></input></li>)}

           



                </ul>
                <h1>Count: {completedTask}</h1>


            </div>
        </>
    )
}


import AddTodo from "./AddTodo";
import Task from "./Task";
import Selection from "./Selection";
import { useState, useEffect } from "react";
import { updateTasks } from "../helpers/updateTasks";

function Todo() {
  const [tasks, setTasks] = useState(null);
  const [sortType, setSortType] = useState('');
  const [selectedButton, setSelectedButton] = useState('all')

  useEffect(() => {
    updateTasks(selectedButton,  sortType, setTasks);
  }, [sortType, selectedButton])

  return (
    <div className="todo_wrapper">
       <h1 className='main-title'>To-do List for <span className="span_girls">girls</span> </h1>
      <AddTodo setTasks={setTasks} selectedButton={selectedButton} sortType={sortType}/>
      <Selection sortType={sortType} setSortType={setSortType} selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>
      {tasks && tasks.map(item => <Task key={item.id} item={item} setTasks={setTasks}  sortType={sortType} selectedButton={selectedButton} />)}
    </div>
  );
}

export default Todo;
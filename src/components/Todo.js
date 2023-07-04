import AddTodo from "./AddTodo";
import Task from "./Task";
import Selection from "./Selection";
import { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(null);
  const [sortType, setSortType] = useState('');
  const [selectedButton, setSelectedButton] = useState('all')
  
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const result = await fetch('https://todo-redev.herokuapp.com/api/todos', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await result.json();
     
   let updatedTasks = [...data];

   switch(selectedButton){
      case "completed": 
      console.log('+++')
        updatedTasks = updatedTasks.filter(item=> item.isCompleted === true);
        break;
      case "incompleted": 
      console.log('---')
        updatedTasks = updatedTasks.filter(item=> item.isCompleted === false);
     
        break;
    }
 
   switch(sortType) {
    case "date_new": 
     updatedTasks.sort((a, b) => b.id - a.id); 
      break;
    case "date_old": 
    updatedTasks.sort((a, b) => a.id - b.id);
      break;      
    case "alphabet_AZ": 
    updatedTasks.sort((a, b) => a.title.localeCompare(b.title));
      break; 
    case "alphabet_ZA": 
    updatedTasks.sort((a, b) => b.title.localeCompare(a.title));
      break; 
   }
       setTasks(updatedTasks);
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [sortType, selectedButton])

  return (
    <div className="todo_wrapper">
       <h1 className='main-title'>To-do List for <span className="span_girls">girls</span> </h1>
      <AddTodo fetchData={fetchData} />
      <Selection sortType={sortType} setSortType={setSortType} selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>
      {tasks && tasks.map(item => <Task key={item.id} item={item} fetchData={fetchData} />)}
    </div>
  );
}

export default Todo;
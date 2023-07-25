import { useState } from "react";
import { fetchTasks } from "../helpers/fetchTasks";
import { updateTasks } from "../helpers/updateTasks";


function AddTodo({setTasks, selectedButton, sortType}) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
 
    try {
        const result = await fetch(process.env.REACT_APP_URL_TODOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
            })
        })

      const data = await result.json();
      const res =  await fetchTasks();
      updateTasks(selectedButton,  sortType, setTasks);
      setTitle('');
    } catch (error) {
        alert(error)
    }
  }

  return (
    <form onSubmit={event => handleSubmit(event)} className='new-task_block'>
        <input value={title} onChange={event => setTitle(event.target.value)} className='new-task' />
        <button type="submit" className='button-add' >add</button>
    </form>
  );
}

export default AddTodo;
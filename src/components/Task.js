import { useState, useEffect } from "react";
import { fetchTasks } from "../helpers/fetchTasks";
import { updateTasks } from "../helpers/updateTasks";

function Task({ item, setTasks,  selectedButton, sortType }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_TODOS}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      const data = await result.json();
      const res = await fetchTasks();
      updateTasks(selectedButton,  sortType, setTasks);
     } catch (error) {
      alert(error)
    } }

  const handleEdit = async (newTitle, id) => {
    const token = localStorage.getItem('token');
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_TODOS}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
        body: JSON.stringify({
          title: newTitle
      })
      })
      const data = await result.json();
      const res = await fetchTasks();
      updateTasks(selectedButton,  sortType, setTasks);
    } catch (error) {
      alert(error)
    }  }

  const toggle = (id) => {
    if (!isEdit) {
       setIsEdit(true);
    } else {
      handleEdit(newTitle, id);
      setTimeout(()=>setIsEdit(false), 500 );
    }
  }

  const handleCompleted =  async (id, isCompleted) => {
   const token = localStorage.getItem('token');
    try {
      const result = await fetch(`${process.env.REACT_APP_URL_TODOS}/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
        body: JSON.stringify({
          isCompleted: isCompleted
      })
      })
      const data = await result.json();
      const res = await fetchTasks();
      updateTasks(selectedButton,  sortType, setTasks);
     } catch (error) {
      alert(error)
    }
  }

  return <div  className="task-wrap">
    <input type="checkbox" className='checkbox' onChange={() => handleCompleted(item.id, item.isCompleted)} 
           checked={item.isCompleted } />
    {isEdit ? <input onChange={event => setNewTitle(event.target.value)} value={newTitle}
              className={item.isCompleted ? "input-task-title decor" : "input-task-title"} /> :
      <p className={item.isCompleted ? "task-title decor" : "task-title"}>{item.title}</p>}
    <button type="submit" onClick={() => toggle(item.id)} className="button-edit">{isEdit ? "✔" : "✎"}</button>
    <button type="submit" onClick={(event) => handleDelete(event, item.id)} className="button-close">✖</button>
  </div>}

export default Task;
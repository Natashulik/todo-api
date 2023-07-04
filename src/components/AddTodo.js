import { useState } from "react";

function AddTodo({ fetchData }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
        const result = await fetch('https://todo-redev.herokuapp.com/api/todos', {
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
        console.log(data);
        fetchData();
        setTitle('');

    } catch (error) {
        alert(error)
    }
  }

  return (
    <form onSubmit={event => handleSubmit(event)} className='new-task_block'>
        <input value={title} onChange={event => setTitle(event.target.value)} className='new-task' />
        <button type="submit" className='button-add'>add</button>
    </form>
  );
}

export default AddTodo;
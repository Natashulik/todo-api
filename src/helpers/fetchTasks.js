
export const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const result = await fetch(process.env.REACT_APP_URL_TODOS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await result.json();
    return data; 
  }
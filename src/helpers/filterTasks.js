export  const filterTasks = (tasks, selectedButton) => {
    switch(selectedButton){
      case "completed": 
        return tasks.filter(item => item.isCompleted === true);
      case "incompleted": 
        return tasks.filter(item => item.isCompleted === false);
      default:
        return tasks;
    }
  }
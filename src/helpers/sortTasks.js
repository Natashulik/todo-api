export const sortTasks = (tasks, sortType) => {
    switch(sortType) {
      case "date_new": 
        return tasks.sort((a, b) => b.id - a.id); 
      case "date_old": 
        return tasks.sort((a, b) => a.id - b.id);
      case "alphabet_AZ": 
        return tasks.sort((a, b) => a.title.localeCompare(b.title));
      case "alphabet_ZA": 
        return tasks.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return tasks;
    }
  }
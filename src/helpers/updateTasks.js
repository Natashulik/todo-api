import { fetchTasks } from "./fetchTasks";
import { filterTasks } from "./filterTasks";
import { sortTasks } from "./sortTasks";

export const updateTasks = async (selectedButton,  sortType, setTasks) => {
  const res = await fetchTasks();
  let updatedTasks = [...res];
  updatedTasks = filterTasks(updatedTasks, selectedButton);
  updatedTasks = sortTasks(updatedTasks, sortType);
  setTasks(updatedTasks);
}
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Todo from "./components/Todo";
import PrivateRoute from "./hoc/PrivateRoute";
import Registration from "./components/Registration";

function App() {
  return (
    <div >
       <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/todo-api" element={<PrivateRoute> 
             <Todo/>
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;

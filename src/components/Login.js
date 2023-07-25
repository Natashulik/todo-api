//  email: "fdsvjnoi@mail.ru"
//  password: "jfghdik_kd4TT"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);  //стейт для отображения  неверного пароля или почты

    console.log(process.env.REACT_APP_URL_LOGIN)

const handleSubmit = async(event) => {
    event.preventDefault();
  
    try {
        const result = await fetch(process.env.REACT_APP_URL_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
              })
        })
    
        const data= await result.json();
        console.log(data)

        if(!data.token) {
          throw new Error(data.message);
        } else {
            localStorage.setItem("token", data.token);
            navigate("/todo-api");
        }

       }  catch(error) {
        console.log(error.message)
        setIsError(true);
    }
  }
   
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div className="form_login"> 
        <h2 className="form_title">LOGIN</h2>
        <div className="email_block">
            <p className="field_name"> email</p>
            <input  value={email} onChange={event=> setEmail(event.target.value)} className="log_input"/> 
        </div> 
        
        <div className="password_block">
            <p className="field_name"> password</p>
            <input  
                value={password}
                type="password"
                onChange={event=> setPassword(event.target.value)} className="log_input"/> 
            
        </div>

            <button type="submit" className="button_login">LOGIN</button>  

        <div className="redirect_block">
            <p>Don't have an account yet?</p>
            <Link to="/register" className="redirect_link"> register </Link>
        </div>

        <div className="error_block">
          {isError && (<p className="error-message"> Invalid email or password!</p> )}
        </div>
      </div>    
    </form>
  );
}

export default Login;
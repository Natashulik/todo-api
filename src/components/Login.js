//  email: "fdsvjnoi@mail.ru"
//  password: "jfghdik_kd4TT"
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZkc3Zqbm9pQG1haWwucnUiLCJpZCI6ODMsImlhdCI6MTY4ODA2OTAzNn0.rkdpxJQ9ecvmhPnlOWLt2MGqFlGwC0tcBOdTAWs_V9E

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);  //стейт для отображения  неверного пароля или почты

const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('--handleSubmit--');
    console.log(email)
    console.log(password)

    try {
        const result = await fetch('https://todo-redev.herokuapp.com/api/auth/login', {
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
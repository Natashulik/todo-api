import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [value, setValue] = useState('male');
    const [isError, setIsError] = useState(false); //стейт для отображения ошибки
       
    const navigate = useNavigate();
 
const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const result = await fetch('https://todo-redev.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                gender: value,
                age: age
             })
        })
    
        const data= await result.json();

        if(!data.id) {
          throw new Error(data.message);
        } else {
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
        localStorage.setItem("token", data.token);
              navigate("/todo-api");
        }
        
    } catch(error) {
        setIsError(true);
      }
 
}

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div className="form_register"> 
      <h2 className="form_title">SIGN UP</h2>

      <div className="username_block"> 
        <p className="field_name"> username</p>
        <input  value={username} onChange={event=> setUsername(event.target.value)} className="log_input"/>
       </div>

       <div className="email_block"> 
         <p className="field_name"> email</p>
         <input  value={email} onChange={event=> setEmail(event.target.value)} className="log_input"/>
        </div>

       <div className="password_block"> 
        <p className="field_name"> password*</p> 
        <input  value={password} type="password" onChange={event=> setPassword(event.target.value)} className="log_input"/>
        </div>
      
        <div className="age_block"> 
          <p className="field_name"> age</p>
          <input  value={age} onChange={event=> setAge(event.target.value)} className="log_input"/>
        </div>

        <div className="gender_block"> 
        <p className="field_name"> gender</p>
        <label className="radio_button"> 
             <input  value="male" checked={value === 'male'} onChange={event=> setValue(event.target.value)} type="radio" name="gender" 
             /> male </label>
        <label className="radio_button"> 
            <input  value="female" checked={value === 'female'}  onChange={event=> setValue(event.target.value)} type="radio" name="gender" /> female </label>
        </div>

         <button type="submit" className="button_register">SIGN UP</button>  
         <p className="password_info">*minimum 8 characters, 1 capital, 1 lowercase, 1 number and 1 symbol</p>
        <div className="error_block"> 
            {isError && (<p className="error-message"> Invalid information!</p> )}   
         </div>    
      </div> 
    </form>
  );

}

export default Registration;
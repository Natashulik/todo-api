import { useState } from "react"

const Selection = ({sortType, setSortType, selectedButton, setSelectedButton}) => {
     const handleSort = (event) => {
     setSortType(event.target.value);
    }

    const handleButton = buttonType => {
      setSelectedButton(buttonType);
    }
    
    return ( <>
        <button  onClick={() => handleButton("all")}
                 className={`button-all ${selectedButton === "all" ? "selected" : ""}`}> all tasks </button>
        <button  onClick={() => handleButton("completed")}
                 className={`button-private ${selectedButton === "completed" ? "selected" : ""}`}> completed </button>
        <button  onClick={() => handleButton("incompleted")} 
                 className={`button-private ${selectedButton === "incompleted" ? "selected" : ""}`}> incompleted </button>
       <select className='select' onChange={handleSort} defaultValue="default">
          <option value="default" disabled >Sort</option>
          <option value='date_new'>date (new to old)</option>
          <option value='date_old'>date (old to new) </option>
          <option value='alphabet_AZ'>alphabet (a-z)</option>
          <option value='alphabet_ZA'>alphabet (z-a)</option>
        </select>
      </> 
      )
  }
  
  export default Selection;
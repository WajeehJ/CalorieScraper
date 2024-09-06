import { useState } from "react"
import './styles.css'

function CalorieInputForm({onSubmit}) {

  const [newCalories, setNewCalories] = useState('');  

    async function getCalories(e) {
      e.preventDefault(); 

      if(newCalories === "") {return}  
      try {
        let response = await fetch("/api", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: newCalories }), 
        });
    
        const jsonResponse = await response.json(); 
        console.log(jsonResponse);
        onSubmit(jsonResponse.recipes) 
        
      } catch (error) {
        console.log("Error", error); 
      }


      setNewCalories("");
    }

    return (
      <form onSubmit={getCalories} className='new-item-form'>
        <div className='form-row'>
          <input 
            className="calorie-input"
            type="text" 
            value={newCalories} 
            onChange = {e=> { 
              if(!isNaN(e.target.value)){ setNewCalories(e.target.value) }
            }} 
            id="input"></input>
        </div>
        <button className='btn'>Add</button>
      </form>
    )
}

export default CalorieInputForm;
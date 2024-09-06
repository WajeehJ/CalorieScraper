import CalorieInputForm from './CalorieInputForm';
import RecipeList from './RecipeList'; 
import './styles.css'
import {useEffect, useState} from "react"; 

function App() {
  const [isInput, setInput] = useState(true); 
  const [recipes, setRecipes] = useState([]); 

  function createNewRequest() {
    setInput(false);
    setRecipes(arguments[0]);
  }

  function returnHome() {
    setInput(true); 
  }

  return (
    <div className="webpage-container">
      <header className="website-title">
        Calorie Scraper
      </header>
      {isInput ? 
      <CalorieInputForm onSubmit={createNewRequest}></CalorieInputForm> : 
      <>
        <RecipeList recipes={recipes}></RecipeList>
        <button onClick={returnHome}>Return Home</button>
      </>
      }
    </div>
  );
}

export default App;

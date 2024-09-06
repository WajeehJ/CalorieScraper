import { useState } from "react"
import './styles.css'
import Lasagna from "./images/lasagna.jpg"

function RecipeList({recipes}) {


  return (
    <>
    <list>
      {
            <>
              {recipes.length === 0 && "No Recipes"}

              {recipes.map(recipe => {
                return (
                <div className='card'>
                  <a href={recipe.recipeLink} target="_blank" >{recipe.title}
                  <img className="card-image" src={recipe.imageLink}></img>
                  </a>

                  <h1 className="card-title">{recipe.caloriesNumber} calories</h1>
                </div>
                )
              })}
            </>
      }
    </list>
    </>
  ); 
}

export default RecipeList; 
import React,{useEffect, useState} from 'react';  //useEffect runs when page rerenders and useState is for state management
import Recipe from './Recipe';  //Recipe card
import './App.css';

function App() {

  // Credentials from Edamam API
  // Better stored as envionment variables
  const APP_ID = '539f2da4';
  const APP_KEY = '18ae04569964ec21aa21fddf6291185a';

  // Initializig state using array destructuring
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // To be run for every rerender
  useEffect( () => {
    getRecipes();
  }, [query]);  //2nd param mentions what values when changed should run the useEffect

  // Get recipes async func
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  }

  // Func to update the search state
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  // Func to store the user search value
  const getSearch = e => {
    e.preventDefault(); //Prevent page reload
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          // Recipe component with props
          <Recipe 
            key={recipe.recipe.url}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

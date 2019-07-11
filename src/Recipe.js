import React from 'react';
import style from './recipe.module.css';	//css module import

// Recipe component accepting props
const Recipe = ({title, calories, image, ingredients}) => {
	return(
		<div className={style.recipe}>
			<h1>{title}</h1>
			<ul className={style.ingredients}>
				{ingredients.map(ingredient => (
					<li>{ingredient.text}</li>
				))}
			</ul>
			<p><b>{calories.toString().substring(0, 4)} Calories</b></p>
			<img className={style.image} src={image} alt=""/>
		</div>
	);
}

export default Recipe;
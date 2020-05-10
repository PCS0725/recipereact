import React from "react";
import style from './recipe.module.css';

export class Recipe extends React.Component {

    render() {
        return (
          <div className={style.recipe}>
              <h1>{this.props.title}</h1>
              <p>{this.props.calories}</p>
              <ol>
                  {this.props.ingredients.map( ingredient => (
                      <li>{ingredient.text}</li>
                      )
                  )}
              </ol>
              <img className={style.image} src={this.props.image} alt ={this.props.title}/>
          </div>
        );
    }
}
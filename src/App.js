import React, {useEffect, useState} from 'react';
import './App.css';
import {Recipe} from "./Recipe";

/*
* In production, use environment variables instead of hardcoding the values into the code.
 */
const APP_ID = "4f7f0b2a";
const APP_KEY = "805fe4f340155a051f39eea3b364d68a";

const exampleCall = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

export class App extends React.Component{

  //Maintain all the recipes as state of class App and pass the properties
  //of recipes to Recipe class as props. There will be as many recipe components
  //as there are elements in the recipe array(fetched from API).
  constructor(props) {
      super(props);
      this.state = {recipes : [], query : "Put something here"};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateRecipes = this.updateRecipes.bind(this);
  }
//Just if we want to do something on component mount.
  // componentDidMount() {
  //  // this will be undefined if we do not save its previous meaning here.
  //     const that = this;
  //     fetch(exampleCall)
  //         .then(function (response) {
  //             return response.json();
  //         })
  //         .then(function (response) {
  //          that.setState({recipes : response.hits});
  //         });
  // }
// //Remember to provide unique keys to elements in a list.

    updateRecipes(){
        const that = this;
        fetch(`https://api.edamam.com/search?q=${this.state.query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                that.setState({recipes : response.hits});
            });
    }
    handleSubmit(event){
      this.updateRecipes();
      event.preventDefault();
    }

    handleChange(event){
      this.setState({query : event.target.value});
    }

    render() {
      return (
          <div className="App">
              <form className="search-form" onSubmit={this.handleSubmit}>
                  <input className="search-bar" type="text"  value={this.state.query} onChange={this.handleChange}/>
                  <button
                      className="search-button"
                      type='submit'
                  >
                      Search
                  </button>
              </form>
              <div className ="recipes">
              {this.state.recipes.map(recipe =>(
                  <Recipe title={recipe.recipe.label} calories = {recipe.recipe.calories}
                    image = {recipe.recipe.image}
                    key = {recipe.recipe.label}
                    ingredients = {recipe.recipe.ingredients}
                  />
              ))}
              </div>
          </div>
      );
  }
}

export default App;

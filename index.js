import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import Likes from './models/Likes.js';
//import renderItem from './uploadView.js';

import * as recipeView from './models/recipeview.js';
import * as searchView from './searchVeiw.js'; 
import * as likesView from './likesView.js'; 
import { elements, clearLoader } from './searchViewBase.js';          //renderLoader,


 /** Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 *  */ 


const state = {};


    // THIS IS THE SEARCH CONTROLLER
const controlSearch = async () => {
      // 1 get query from veiw
      const query = searchView.getInput();
      //console.log(query); //todo

    if (query) {
          // 2 new search object and add to state
          state.search = new Search(query);

          // 3 preper UI for results
            searchView.clearInput();
            searchView.clearResults();
           // renderLoader(elements.searchRes);
            
          // 4 search for rescipes
          await state.search.getResult();

          // 5 render results on UI
          clearLoader();
          searchView.renderResults(state.search.data.recipes);
      }
}
elements.searchForm.addEventListener('submit', e => {
          e.preventDefault();
          controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
        if (btn) {
            const goTopage = parseInt(btn.dataset.goto, 10);
            searchView.clearResults();
            searchView.renderResults(state.search.data.recipes, goTopage);
        }
});



/***
 * THIS IS THE RECIPE CONTROLLER
 **/

const controlRecipe = async () => {
    // get ID from url
    const id = window.location.hash.replace('#', '');
   

   if (id) {
        // prepare ui for changes
        recipeView.clearRecipe();
        //renderLoader(elements.recipe);
       
        //highlight selected search item  // not working now.
        if (state.Search) { searchView.highlightSelected(id); }

        //create new recipe object
        state.recipe = new Recipe(id);
        try {
              //get recipe data and parse ingredients
              await state.recipe.getRecipe();
              state.recipe.parseIngredients();

              //calculate serving and time
              state.recipe.calcTime();
              state.recipe.calcServings();
      
              //render recipe
              //console.log(state.recipe);
              clearLoader();
              recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
      
          } catch (err) {
              alert('Error processing recipe!');
          }
      
      }
  };
  
  // here we created a method using one eventlistener to call multiple method;
  //window.addEventListener('hashchange', controlRecipe);
  // window.addEventListener('load', controlRecipe);
   ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/***
 * LIKES CONTROLLER
 */
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
     const currentID = state.recipe.id;
     likesView.showComment();

   // User has not yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
          // clear the bookmark comment
          likesView.clearComment();

          // add likes to the state
           const newLike = state.likes.addLiked(
             currentID,
             state.recipe.title,
             state.recipe.author,
             state.recipe.img
           );

            // toggle the like button
            likesView.toggleLikeBtn(true);
            //add like to UI LIST
            likesView.renderLike(newLike);
            console.log(state.recipe);
             // User has liked current recipe
          } else if(!state.likes ) {
             // likesView.showComment();
          } else {
                // remove likes to the state
                state.likes.deleteLike(currentID)
                
                likesView.clearComment();
                // toggle the like button
                likesView.toggleLikeBtn(false);
                //remove like to UI LIST
                likesView.deleteLike(currentID);
                console.log(state.recipe);
        } 
  
        likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Restore liked recipe on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    //restore likes
    state.likes.readStorage();
    
    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //remove comment
    likesView.clearComment();

    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});
   
   // here we handle recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn--decrease-servings, .btn--decrease-servings *')) {
          //decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
          }
          
    } else if (e.target.matches('.btn--increase-servings, .btn--increase-servings *')) {
          //increase button is clicked
          state.recipe.updateServings('inc');
          recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.btn--round, .btn--round *')) {
          // like controller
          controlLike();
    } 
});


document.querySelector('.nav__list').addEventListener('click', e => {
  const btn = e.target.closest('.nav__btn--add-recipe, .nav__btn--add-recipe *');
    if (btn) {
      displayUpload();
    } 
});
const displayUpload = () => {
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.add-recipe-window').classList.remove('hidden');
};

document.querySelector('.add-recipe-window').addEventListener('click', e => {
  const btnBack = e.target.closest('.btn--close-modal');
if (btnBack) {
    removeUpload();
}
  
});
const removeUpload = () => {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.add-recipe-window').classList.add('hidden');
};

//removeAttribute("hidden");














 
/**import axios from './node_modules/axios';

async function getResult(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  try {
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    //const recipes = res.data.recipes
    const data = await res.json();   
    console.log( data.recipes);
  } catch(error) {
    alert(error)
  }
}
getResult('pizza'); 
***/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRecipe = exports.clearRecipe = void 0;

var _searchViewBase = require("../searchViewBase.js");

var clearRecipe = function clearRecipe() {
  _searchViewBase.elements.recipe.innerHTML = '';
}; //THIS PROPERTY IS TO CONVERT THE FRACTION NUMBERS INTO WHOLE NUMBERS i.e 4.5 ---> (4 1/2) 

/*** 
const formatCount = count => {
    if (count) {
        // count = 2.5 --> 2 1/2
        // count = 0.5 --> 1/2
const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

       if (!dec) return count;

       if (int === 0) {
           const fr = new Fraction(count);
           return `${fr.numerator}/${fr.denominator}`;
       } else {
           const fr = new Fraction(count - int);
           return `${int} ${fr.numerator}/${fr.denomnaitor}`;
       }
    }
      return '?';
};
****/


exports.clearRecipe = clearRecipe;

var createIngredient = function createIngredient(ingredient) {
  return "\n        <li class=\"recipe__ingredient\">\n        <svg class=\"recipe__icon\">\n        <use href=\"src/img/icons.svg#icon-check\"></use>\n        </svg>\n        <div class=\"recipe__quantity\">  ".concat(ingredient.count, "</div>\n        <div class=\"recipe__description\">\n        <span class=\"recipe__unit\">").concat(ingredient.unit, "</span>\n       ").concat(ingredient.ingredient, "\n        </div>\n        </li>\n");
};

var renderRecipe = function renderRecipe(recipe) {
  var markup = "\n    \n  <figure class=\"recipe__fig\">\n    <img src=\"".concat(recipe.img, "\" alt=\"").concat(recipe.title, "\" class=\"recipe__img\">\n    <h1 class=\"recipe__title\">\n      <span>").concat(recipe.title, "</span>\n    </h1>\n  </figure>\n\n  <div class=\"recipe__details\">\n    <div class=\"recipe__info\">\n      <svg class=\"recipe__info-icon\">\n        <use href=\"src/img/icons.svg#icon-clock\"></use>\n      </svg>\n      <span class=\"recipe__info-data recipe__info-data--minutes\">").concat(recipe.time, "</span>\n      <span class=\"recipe__info-text\">minutes</span>\n    </div>\n    <div class=\"recipe__info\">\n      <svg class=\"recipe__info-icon\">\n        <use href=\"src/img/icons.svg#icon-users\"></use>\n      </svg>\n      <span class=\"recipe__info-data recipe__info-data--people\">").concat(recipe.servings, "</span>\n      <span class=\"recipe__info-text\">servings</span>\n      <div class=\"recipe__info-buttons\">\n        <button class=\"btn--tiny btn--decrease-servings\">\n          <svg version=\"1.1\" baseProfile=\"full\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">\n            <use href=\"src/img/icons.svg#icon-minus-circle\"></use>\n          </svg>\n        </button>\n        <button class=\"btn--tiny btn--increase-servings\">\n          <svg version=\"1.1\" baseProfile=\"full\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">\n            <use href=\"src/img/icons.svg#icon-plus-circle\"></use>\n          </svg>\n        </button>\n      </div>\n    </div>\n    <div class=\"recipe__user-generated\">\n      <svg>\n        <use href=\"src/img/icons.svg#icon-user\"></use>\n      </svg>\n    </div>\n    <button class=\"btn--round\">\n      <svg class=\"\">\n        <use href=\"src/img/icons.svg#icon-bookmark-fill\"></use>\n      </svg>\n    </button>\n  </div>\n  <div class=\"recipe__ingredients\">\n    <h2 class=\"heading--2\">Recipe ingredients</h2>\n    <ul class=\"recipe__ingredient-list\">\n       ").concat(recipe.ingredients.map(function (el) {
    return createIngredient(el);
  }).join(''), "\n\n      \n     \n    </ul>\n  </div>\n  <div class=\"recipe__directions\">\n    <h2 class=\"heading--2\">How to cook it</h2>\n    <p class=\"recipe__directions-text\">\n      This recipe was carefully designed and tested by\n      <span class=\"recipe__publisher\">").concat(recipe.author, "</span>. Please check out\n      directions at their website.\n    </p>\n    <a\n      class=\"btn--small recipe__btn\"\n      href=\"").concat(recipe.url, "\"\n      target=\"_blank\"\n    >\n      <span>Directions</span>\n      <svg class=\"search__icon\">\n        <use href=\"src/img/icons.svg#icon-arrow-right\"></use>\n      </svg>\n    </a>\n  </div>\n    ");

  _searchViewBase.elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

exports.renderRecipe = renderRecipe;
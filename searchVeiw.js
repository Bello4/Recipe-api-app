import { elements } from './searchViewBase.js';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
     const resultsArry = Array.from(document.querySelectorAll('.preview__link'));
     resultsArry.forEach(el => {
      el.classList.remove('preview__link--active');
     });
     document.querySelector(`.preview__link[href*="#${id}"]`).classList.add('preview__link--active');
};
/**
 * //making out title text look small to occupy all names if too long
 * 'pasta with tomato and spinach'
 * acc: 0 / acc + cur.lenght = 5 / newTitle = ['pasta']
 * acc: 5 / acc + cur.lenght = 9 / newTitle = ['pasta', with]
 * acc: 9 / acc + cur.lenght = 15 / newTitle = ['pasta', 'with', 'tomato']
 * acc: 15 / acc + cur.lenght = 18 / newTitle = ['pasta', 'with', 'tomato']
 * acc: 18 / acc + cur.lenght = 24 / newTitle = ['pasta', 'with', 'tomato', 'spinash']
 */
/** */
const limitRecipetitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.lenght > limit) {
    title.split(' ').reduce((acc, cur) => {
     if (acc + cur.length <= limit) {
       newTitle.push(cur);
     }
    }, 0);

    // return the result
       return `${newTitle.join(' ')}...`
  }
  return title;
}

const renderRecipe = reading => {
    const markup = `
    <li class="preview">
            <a class="preview__link" href="#${reading.recipe_id}">
              <figure class="preview__fig">
                <img src="${reading.image_url}" alt="${reading.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${limitRecipetitle(reading.title)}</h4>
                <p class="preview__publisher">${reading.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use xlink:href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `; 
     elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
  <button class="btn--inline pagination__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
              <use xlink:href="src/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
  </button>

`;

const renderButtons = (page, numResults, resPerpage) => {
  const pages = Math.ceil(numResults / resPerpage);
  
  let button;
  if (page === 1 && pages > 1) {
   //only button to go to next page
     button = createButton(page, 'next');
  } else if (page < pages) {
    // both button
    button = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // only button to go to prev page
    button = createButton(page, 'prev');
  }
   elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

//IMPLIMENTING A METHOD TO DISPLAY RECIPES RESULT SUCH AS e.i 10 in a roll display
export  const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //render result of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  
  recipes.slice(start, end).forEach(el => renderRecipe(el));

  //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

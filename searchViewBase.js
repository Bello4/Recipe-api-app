export const elements = {
   searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.search-results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.pagination'),
    recipe: document.querySelector('.recipe'),
    likesMenu: document.querySelector('.message'),
    likesList: document.querySelector('.bookmarks__list'),
    likeComment: document.querySelector('.message')
};

// this is a function created for my loading spinner
export const elementStrings = {
    loader: 'loader'
};
//${elementStrings.loader}
export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
    <svg>
        <use :href="src/img/icons.svg#icon-ccw"></use>
    </svg>
    </div>
    `;
      parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader); 
};
 

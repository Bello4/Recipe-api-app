import { elements } from './searchViewBase.js';

export const clearComment = () => {
  elements.likeComment.style.display = 'none';
};

export const showComment = () => {
  elements.likeComment.style.display = 'block';
};
/**document.getElementById('dice-2').style.display = 'none';
 * 
 * export const showComment = () => {
   markup = `
   <div class="message">
   <div>
     <svg>
       <use xlink:href="src/img/icons.svg#icon-smile"></use>
     </svg>
   </div>
   <p class="bookmark__comment">
     No bookmarks yet. Find a nice recipe and bookmark it :)
   </p>
 </div>
   `;
   elements.likeComment.insertAdjacentHTML('beforeend', markup);
};
 */

  
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart-outlined' : 'icon-open-book';
    document.querySelector('.btn--round use').setAttribute('href', `src/img/icons.svg#${iconString}`);
    // icons 
}; 


export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibilty = numLikes > 0 ? 'visible' : 'hidden'; 
};

export const renderLike = like => {
     const markup = `
     <li class="preview">
       <a class="preview__link" href="#${like.id}">
             <figure class="preview__fig">
                   <img src="${like.img}" alt="${like.title}" />
             </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                        ${like.title}
                        </h4>
                        <p class="preview__publisher">${like.author}</p>
                      </div>
                    </a>
         </li>
     `;
           elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
     const el = document.querySelector(`.preview__link[href*="${id}"]`).parentElement;
     if (el) el.parentElement.removeChild(el);
}



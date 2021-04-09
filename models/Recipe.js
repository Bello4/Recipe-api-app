//import axios from "axios/dist/axios.min.js"

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        const data = await res.json();
        //const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title= data.recipe.title;
        this.author= data.recipe.publisher;
        this.img= data.recipe.image_url;
        this.url= data.recipe.source_url;
        this.ingredients= data.recipe.ingredients;
         
       
        //console.log(this.title);
        } catch (error) {
          console.log(error);
        }
    }

        calcTime() {
            const numing = this.ingredients.length;
            const periods = Math.ceil(numing / 3);
            this.time = periods * 15;
        }

        calcServings() {
            this.servings = 4;
        }

        parseIngredients() {
            const unitsLong = ['tablespoons', 'tablespoons', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
            const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
            const units = [...unitsShort, 'kg', 'g'];

            const newIngredients = this.ingredients.map(el => {
                // 1 uniform units
                    let ingredient = el.toLowerCase();
                    unitsLong.forEach((unit, i) => {
                        ingredient = ingredient.replace(unit, unitsShort[i]);
                    });

                // 2 how to remove parentheses
                     ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

                // 3 parse ingredients into count, unit and ingredient
                     const arrIng = ingredient.split(' ');
                     const unitIndex = arrIng.findIndex(el2 => units.includes(el));
      
                      let objIng;
                     if (unitIndex > -1) {
                         //there is a unit
                         // ex. 4 1/2 cups, arrcount is [4, 1/2] ---> eval('4+1/2'); = 4.5
                         // ex. 4 cups, arrCount is [4]
                         const arrCount = arrIng.slice(0, unitIndex);
                         
                         let count;
                         if (arrCount.length === 1) {
                             count = eval(arrIng[0].replace('-', '+'));
                         } else {
                             count = eval(arrIng.slice(0, unitIndex).join('+'));
                         }

                            objIng = {
                              count,
                              unit: arrIng[unitIndex],
                              indgredient: arrIng.slice(unitIndex + 1).join(' ')
                            };
                     } else if (parseInt(arrIng[0], 10)) {
                       //there is NO unit, but 1st element is number
                          objIng = {
                            count: (parseInt(arrIng[0], 10)),
                            unit: '',
                            ingredient: arrIng.slice(1).join(' ')
                          }
                     } else if (unitIndex === -1) {
                         //there is NO unit and NO number in 1st position
                         objIng = {
                            count: 1,
                            unit: '',
                            ingredient
                         }
                     }

                     
                     return objIng;
            });
            this.ingredients = newIngredients;
        }

            updateServings (type) {
                 // servings
                  const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

                  // ingredients
                  this.ingredients.forEach(ing => {
                      ing.count = ing.count * (newServings / this.servings);
                  });

                   this.servings = newServings;
            }
}  
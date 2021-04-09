//import axios from './dist/axios';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        try {
           const res = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
          this.data = await res.json();   
         // console.log( this.data.recipes );
          //this.result = await res.data.recipe;
         // console.log( this.result);
        } catch(error) {
          alert(error)
        }

    }
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Recipe =
/*#__PURE__*/
function () {
  function Recipe(id) {
    _classCallCheck(this, Recipe);

    this.id = id;
  }

  _createClass(Recipe, [{
    key: "getRecipe",
    value: function getRecipe() {
      var res, data;
      return regeneratorRuntime.async(function getRecipe$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(fetch("https://forkify-api.herokuapp.com/api/get?rId=".concat(this.id)));

            case 3:
              res = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(res.json());

            case 6:
              data = _context.sent;
              this.title = data.recipe.title;
              this.author = data.recipe.publisher;
              this.img = data.recipe.image_url;
              this.url = data.recipe.source_url;
              this.ingredients = data.recipe.ingredients; //console.log(this.title);

              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 14]]);
    }
  }, {
    key: "calcTime",
    value: function calcTime() {
      var numing = this.ingredients.length;
      var periods = Math.ceil(numing / 3);
      this.time = periods * 15;
    }
  }, {
    key: "calcServings",
    value: function calcServings() {
      this.servings = 4;
    }
  }, {
    key: "parseIngredients",
    value: function parseIngredients() {
      var unitsLong = ['tablespoons', 'tablespoons', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
      var unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
      var units = [].concat(unitsShort, ['kg', 'g']);
      var newIngredients = this.ingredients.map(function (el) {
        // 1 uniform units
        var ingredient = el.toLowerCase();
        unitsLong.forEach(function (unit, i) {
          ingredient = ingredient.replace(unit, unitsShort[i]);
        }); // 2 how to remove parentheses

        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // 3 parse ingredients into count, unit and ingredient

        var arrIng = ingredient.split(' ');
        var unitIndex = arrIng.findIndex(function (el2) {
          return units.includes(el);
        });
        var objIng;

        if (unitIndex > -1) {
          //there is a unit
          // ex. 4 1/2 cups, arrcount is [4, 1/2] ---> eval('4+1/2'); = 4.5
          // ex. 4 cups, arrCount is [4]
          var arrCount = arrIng.slice(0, unitIndex);
          var count;

          if (arrCount.length === 1) {
            count = eval(arrIng[0].replace('-', '+'));
          } else {
            count = eval(arrIng.slice(0, unitIndex).join('+'));
          }

          objIng = {
            count: count,
            unit: arrIng[unitIndex],
            indgredient: arrIng.slice(unitIndex + 1).join(' ')
          };
        } else if (parseInt(arrIng[0], 10)) {
          //there is NO unit, but 1st element is number
          objIng = {
            count: parseInt(arrIng[0], 10),
            unit: '',
            ingredient: arrIng.slice(1).join(' ')
          };
        } else if (unitIndex === -1) {
          //there is NO unit and NO number in 1st position
          objIng = {
            count: 1,
            unit: '',
            ingredient: ingredient
          };
        }

        return objIng;
      });
      this.ingredients = newIngredients;
    }
  }, {
    key: "updateServings",
    value: function updateServings(type) {
      var _this = this;

      // servings
      var newServings = type === 'dec' ? this.servings - 1 : this.servings + 1; // ingredients

      this.ingredients.forEach(function (ing) {
        ing.count = ing.count * (newServings / _this.servings);
      });
      this.servings = servings;
    }
  }]);

  return Recipe;
}();

exports["default"] = Recipe;
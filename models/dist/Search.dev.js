"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import axios from './dist/axios';
var Search =
/*#__PURE__*/
function () {
  function Search(query) {
    _classCallCheck(this, Search);

    this.query = query;
  }

  _createClass(Search, [{
    key: "getResult",
    value: function getResult() {
      var proxy, res;
      return regeneratorRuntime.async(function getResult$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              proxy = 'https://cors-anywhere.herokuapp.com/';
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(fetch("https://forkify-api.herokuapp.com/api/search?&q=".concat(this.query)));

            case 4:
              res = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(res.json());

            case 7:
              this.data = _context.sent;
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              alert(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 10]]);
    }
  }]);

  return Search;
}();

exports["default"] = Search;
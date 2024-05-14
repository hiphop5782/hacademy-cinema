"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _SeatGroup = _interopRequireDefault(require("./SeatGroup"));
require("./SeatCreator.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SeatCreator = _ref => {
  let {
    rows,
    cols,
    fields = {
      no: 'no',
      row: 'row',
      col: 'col',
      price: 'price',
      grade: 'grade',
      reserved: 'reserved',
      disabled: 'disabled',
      direction: 'direction',
      checked: 'checked'
    },
    images
  } = _ref;
  const [map, setMap] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const array = [];
    let seq = 1;
    for (let i = 0; i < rows.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        array.push({
          [fields.no]: seq++,
          [fields.row]: rows[i],
          [fields.col]: cols[k],
          [fields.grade]: '일반',
          [fields.price]: 0,
          [fields.reserved]: false,
          [fields.disabled]: false,
          [fields.checked]: false
        });
      }
    }
    setMap(array);
  }, [rows, cols]);
  const [checkState, setCheckState] = (0, _react.useState)(false);
  const checkAll = (0, _react.useCallback)(e => {
    setCheckState(e.target.checked);
  }, [map, checkState]);
  (0, _react.useEffect)(() => {
    setMap(prev => prev.map(seat => ({
      ...seat,
      [fields["checked"]]: checkState
    })));
  }, [checkState]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "hacademy-cinema-seat-creator",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "checkbox",
      className: "hacademy-cinema-seat-checker",
      checked: checkState,
      onChange: e => checkAll(e)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "checkbox",
      className: "hacademy-cinema-seat-checker",
      checked: checkState,
      onChange: e => checkAll(e)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "checkbox",
      className: "hacademy-cinema-seat-checker",
      checked: checkState,
      onChange: e => checkAll(e)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "checkbox",
      className: "hacademy-cinema-seat-checker",
      checked: checkState,
      onChange: e => checkAll(e)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeatGroup.default, {
      map: map,
      setMap: setMap,
      fields: fields,
      rows: rows,
      cols: cols,
      controls: true,
      images: true
    })]
  });
};

//Required
SeatCreator.propTypes = {
  rows: _propTypes.default.array.isRequired,
  cols: _propTypes.default.array.isRequired
};
var _default = exports.default = SeatCreator;
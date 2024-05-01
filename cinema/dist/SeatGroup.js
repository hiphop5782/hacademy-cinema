"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./SeatGroup.css");
var _react = require("react");
var _throttle = _interopRequireDefault(require("lodash/throttle"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Seat = _interopRequireDefault(require("./Seat"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SeatGroup = _ref => {
  let {
    map = [],
    setMap,
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
    className,
    rows = [],
    cols = [],
    showNames = true,
    controls = false,
    popup = true
  } = _ref;
  const [rowList, setRowList] = (0, _react.useState)(rows);
  const [colList, setColList] = (0, _react.useState)(cols);
  const calculateRowAndCols = (0, _react.useCallback)(() => {
    if (rows.length > 0) {
      setRowList(rows);
    } else {
      const row = new Set();
      map.forEach(seat => {
        row.add(seat[fields.row]);
      });
      setRowList(Array.from(row));
    }
    if (cols.length > 0) {
      setColList(cols);
    } else {
      const col = new Set();
      map.forEach(seat => {
        col.add(seat[fields.col]);
      });
      setColList(Array.from(col));
    }
  }, [rows, cols, map]);
  (0, _react.useEffect)(calculateRowAndCols, [showNames, rows, cols, rowList, colList]);
  const wrapper = (0, _react.useRef)();
  const [size, setSize] = (0, _react.useState)(0);
  const [unitSize, setUnitSize] = (0, _react.useState)(16);
  (0, _react.useEffect)(() => {
    setUnitSize(size / (colList.length || 1)); //NaN 방지
  }, [size, showNames, colList]);
  const calculate = (0, _react.useCallback)((0, _throttle.default)(e => {
    const width = parseInt(wrapper.current.getBoundingClientRect().width);
    setSize(width);
  }, 50), [wrapper, showNames, controls, rowList, colList]);
  (0, _react.useEffect)(calculate, [wrapper, showNames, controls, rowList, colList]);
  (0, _react.useEffect)(() => {
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  });
  const checkSeat = (0, _react.useCallback)((e, target) => {
    //console.log(e.target, e.target.checked, map.flatMap(seat=>seat.checked === true).join(","));
    setMap(prev => prev.map(seat => {
      if (seat[fields.no] === target[fields.no]) {
        return {
          ...seat,
          [fields["checked"]]: e.target.checked
        };
      }
      return seat;
    }));
  }, [map]);

  // const checkAllSeat = useCallback(()=>{
  //     setMap(seat=>{
  //         if(seat.disabled || seat.reserved) return {...seat};
  //         return {...seat, checked:true};
  //     });
  // }, [map]);

  //unitSize에 기반하여 names 크기 계산
  const fontSize = (0, _react.useMemo)(() => unitSize / 3, [unitSize]);

  //check event
  const checkSeatRow = (0, _react.useCallback)((row, checked) => {
    if (controls !== true) return;
    setMap(prev => prev.map(seat => {
      if (seat[fields.row] === row) {
        return {
          ...seat,
          [fields["checked"]]: checked
        };
      }
      return {
        ...seat
      };
    }));
  }, [map]);
  const checkSeatColumn = (0, _react.useCallback)((col, checked) => {
    if (controls !== true) return;
    setMap(prev => prev.map(seat => {
      if (seat[fields.col] === col) {
        return {
          ...seat,
          [fields["checked"]]: checked
        };
      }
      return {
        ...seat
      };
    }));
  }, [map]);

  //dispatch resize event once
  (0, _react.useEffect)(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  //popup
  const [popupSeat, setPopupSeat] = (0, _react.useState)(null);
  const [popupPos, setPopupPos] = (0, _react.useState)({
    top: 0,
    left: 0
  });
  const enter = (0, _react.useCallback)((e, seat) => {
    const rectStyle = e.target.parentNode.style;
    const top = parseInt(rectStyle.top) + parseInt(rectStyle.fontSize) + fontSize * 1.5;
    const left = parseInt(rectStyle.left) /*+ parseInt(rectStyle.fontSize) */ + fontSize * 1.5;
    setPopupPos({
      top: top,
      left: left
    });
    setPopupSeat(seat);
  }, [map, popupSeat, popupPos]);
  const leave = (0, _react.useCallback)((e, seat) => {
    setPopupSeat(null);
  }, [map, popupSeat, popupPos]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "hacademy-cinema-seat-group-controls",
      style: {
        fontSize: fontSize,
        padding: showNames === true ? '1.5em' : 0
      },
      children: [showNames === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: rowList.map((row, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "hacademy-cinema-seat-group-numbers",
          style: {
            top: (index + 1) * unitSize,
            left: 0,
            transform: "translate(0, -50%)",
            cursor: controls === true ? "pointer" : "default"
          },
          onClick: e => checkSeatRow(row, true),
          children: row
        }, index))
      }), showNames === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: colList.map((col, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "hacademy-cinema-seat-group-numbers",
          style: {
            top: 0,
            left: (index + 1) * unitSize,
            transform: "translate(-50%, 0)",
            cursor: controls === true ? "pointer" : "default"
          },
          onClick: e => checkSeatColumn(col, true),
          children: col
        }, index))
      }), showNames === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: rowList.map((row, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "hacademy-cinema-seat-group-numbers",
          style: {
            top: (index + 1) * unitSize,
            right: 0,
            transform: "translate(0, -50%)",
            cursor: controls === true ? "pointer" : "default"
          },
          onClick: e => checkSeatRow(row, false),
          children: row
        }, index))
      }), showNames === true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: colList.map((col, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "hacademy-cinema-seat-group-numbers",
          style: {
            bottom: 0,
            left: (index + 1) * unitSize,
            transform: "translate(-50%, 0)",
            cursor: controls === true ? "pointer" : "default"
          },
          onClick: e => checkSeatColumn(col, false),
          children: col
        }, index))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ref: wrapper,
        className: "hacademy-cinema-seat-group ".concat(className === undefined ? '' : className),
        style: {
          width: '100%',
          height: unitSize * rowList.length
        },
        children: map.map(seat => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Seat.default, {
          data: seat,
          fields: fields,
          size: unitSize,
          x: colList.indexOf(seat[fields.col]) * unitSize,
          y: rowList.indexOf(seat[fields.row]) * unitSize,
          onChange: e => checkSeat(e, seat),
          onMouseEnter: e => enter(e, seat),
          onMouseLeave: e => leave(e, seat)
        }, seat[fields.no]))
      }), popup === true && popupSeat !== null && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "hacademy-cinema-seat-info",
        style: popupPos,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["\uC88C\uC11D : ", popupSeat[fields.row], "-", popupSeat[fields.col]]
        }), fields.grade !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["\uB4F1\uAE09 : ", popupSeat[fields.grade]]
        }), fields.price !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["\uAC00\uACA9 : ", popupSeat[fields.price], "\uC6D0"]
        }), popupSeat[fields.reserved] !== true && popupSeat[fields.disabled] !== true ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "text-valid",
          children: "\uC608\uC57D \uAC00\uB2A5"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "text-invalid",
          children: "\uC608\uC57D \uBD88\uAC00"
        })]
      })]
    })
  });
};

//Required
SeatGroup.propTypes = {
  map: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onChange: _propTypes.default.func
};
var _default = exports.default = SeatGroup;
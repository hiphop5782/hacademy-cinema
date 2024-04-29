"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
require("./Seat.css");
const Seat = _ref => {
  let {
    className = "",
    data,
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
    name = "seat",
    size = 50,
    x = 0,
    y = 0,
    onChange
  } = _ref;
  //state
  const [angle, setAngle] = (0, _react.useState)(0);
  const image = (0, _react.useMemo)(() => {
    if (data[fields.disabled] === true) return "".concat(process.env.PUBLIC_URL, "/images/seat-disabled.png");
    if (data[fields.reserved] === true) return "".concat(process.env.PUBLIC_URL, "/images/seat-reserved.png");
    if (data[fields.checked]) return "".concat(process.env.PUBLIC_URL, "/images/seat-checked.png");
    return "".concat(process.env.PUBLIC_URL, "/images/seat-default.png");
  }, [data]);

  //callback
  const checkSeat = (0, _react.useCallback)(e => {
    if (data[fields.reserved] === true) return; //예약완료 좌석 체크불가
    if (data[fields.disabled] === true) return; //사용불가 좌석 체크불가

    if (onChange) {
      onChange(e);
    }
  }, [image]);
  const rotateSeat = (0, _react.useCallback)(e => {
    e.preventDefault();
    if (data[fields.edit] === false) return; //관리 모드가 아닐 경우 차단

    const newAngle = (angle + 90) % 360;
    setAngle(newAngle);
  }, [image, angle]);

  //초기 각도 설정
  (0, _react.useEffect)(() => {
    const angles = {
      up: 0,
      right: 90,
      down: 180,
      left: 270
    };
    setAngle(angles[data[fields.direction]]);
  }, [data[fields.direction]]);
  return /*#__PURE__*/React.createElement("label", {
    className: "hacademy-cinema-seat ".concat(className, "}"),
    style: {
      fontSize: size,
      left: x,
      top: y
    },
    onContextMenu: rotateSeat
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: name,
    value: "".concat(data[fields.row], "-").concat(data[fields.col]),
    disabled: data[fields.reserved],
    onChange: checkSeat,
    checked: data[fields.checked] === true ? true : false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      backgroundImage: "url(".concat(image, ")"),
      transform: "rotate(".concat(angle, "deg)")
    }
  }));
};
var _default = exports.default = Seat;
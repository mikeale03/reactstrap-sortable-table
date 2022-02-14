"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function TestComponent(_ref) {
  var _tableProp$thead;

  var _ref$tableProp = _ref.tableProp,
      tableProp = _ref$tableProp === void 0 ? {} : _ref$tableProp,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$setData = _ref.setData,
      setData = _ref$setData === void 0 ? function () {} : _ref$setData,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      _ref$setColumns = _ref.setColumns,
      setColumns = _ref$setColumns === void 0 ? function () {} : _ref$setColumns,
      sortIconAsc = _ref.sortIconAsc,
      sortIconDesc = _ref.sortIconDesc,
      _ref$dateColumns = _ref.dateColumns,
      dateColumns = _ref$dateColumns === void 0 ? [] : _ref$dateColumns,
      _ref$noSortColumns = _ref.noSortColumns,
      noSortColumns = _ref$noSortColumns === void 0 ? [] : _ref$noSortColumns,
      firstColumnRender = _ref.firstColumnRender,
      firstColumnLabel = _ref.firstColumnLabel,
      _ref$firstColumnProp = _ref.firstColumnProp,
      firstColumnProp = _ref$firstColumnProp === void 0 ? {} : _ref$firstColumnProp,
      lastColumnRender = _ref.lastColumnRender,
      lastColumnLabel = _ref.lastColumnLabel,
      _ref$columnRender = _ref.columnRender,
      columnRender = _ref$columnRender === void 0 ? [] : _ref$columnRender;

  var sortByColumn = function sortByColumn(columnName) {
    var isDate = dateColumns.includes(columnName);

    var sorterAsc = function sorterAsc(a, b) {
      if (isDate) return new Date(a[columnName]) - new Date(b[columnName]);

      var isNumber = function isNumber(v) {
        return (+v).toString() === v;
      };

      var aPart = a[columnName] ? a[columnName].toString().match(/\d+|\D+/g) : '';
      var bPart = b[columnName] ? b[columnName].toString().match(/\d+|\D+/g) : '';
      var i = 0;
      var len = Math.min(aPart.length, bPart.length);

      while (i < len && aPart[i] === bPart[i]) {
        i++;
      }

      if (i === len) {
        return aPart.length - bPart.length;
      }

      if (isNumber(aPart[i]) && isNumber(bPart[i])) {
        return aPart[i] - bPart[i];
      }

      return aPart[i].localeCompare(bPart[i]);
    };

    var sorterDesc = function sorterDesc(a, b) {
      if (isDate) return new Date(b[columnName]) - new Date(a[columnName]);

      var isNumber = function isNumber(v) {
        return (+v).toString() === v;
      };

      var aPart = a[columnName] ? a[columnName].toString().match(/\d+|\D+/g) : '';
      var bPart = b[columnName] ? b[columnName].toString().match(/\d+|\D+/g) : '';
      var i = 0;
      var len = Math.min(aPart.length, bPart.length);

      while (i < len && aPart[i] === bPart[i]) {
        i++;
      }

      if (i === len) {
        return bPart.length - aPart.length;
      }

      if (isNumber(aPart[i]) && isNumber(bPart[i])) {
        return bPart[i] - aPart[i];
      }

      return bPart[i].localeCompare(aPart[i]);
    };

    if (data.length) {
      var _columns$columnIndex;

      if (noSortColumns.includes(columnName)) return;
      var _columns = columns;

      var columnIndex = _columns.findIndex(function (x) {
        return x.value === columnName;
      });

      var sortOrder = ((_columns$columnIndex = _columns[columnIndex]) === null || _columns$columnIndex === void 0 ? void 0 : _columns$columnIndex.sortOrder) === 'asc' ? 'desc' : 'asc';

      var _data = _toConsumableArray(data);

      _data.sort(sortOrder === 'asc' ? sorterAsc : sorterDesc);

      setData(_data);
      _columns[columnIndex]['sortOrder'] = sortOrder;
      setColumns(_columns);
    }
  };

  var renderData = function renderData(data, column, columnRender) {
    for (var i = 0; i < columnRender.length; i++) {
      if (column.value === columnRender[i].column) {
        return columnRender[i].render(data);
      }
    }

    return data;
  };

  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Table, tableProp, /*#__PURE__*/_react["default"].createElement("thead", tableProp === null || tableProp === void 0 ? void 0 : tableProp.thead, /*#__PURE__*/_react["default"].createElement("tr", tableProp === null || tableProp === void 0 ? void 0 : (_tableProp$thead = tableProp.thead) === null || _tableProp$thead === void 0 ? void 0 : _tableProp$thead.tr, firstColumnRender && /*#__PURE__*/_react["default"].createElement("th", firstColumnProp, firstColumnLabel), columns.map(function (col, index) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      onClick: function onClick() {
        return sortByColumn(col.value);
      },
      key: "columnheader-".concat(index),
      style: {
        cursor: 'pointer'
      }
    }, col.label, !noSortColumns.includes(col.value) && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ms-1"
    }, col.sortOrder === undefined ? sortIconAsc || '↓' : col.sortOrder === 'desc' ? sortIconAsc || '↓' : sortIconDesc || '↑'));
  }), lastColumnRender && /*#__PURE__*/_react["default"].createElement("th", null, lastColumnLabel))), /*#__PURE__*/_react["default"].createElement("tbody", tableProp === null || tableProp === void 0 ? void 0 : tableProp.tbody, data.map(function (d, index1) {
    var _tableProp$tbody;

    return /*#__PURE__*/_react["default"].createElement("tr", _extends({}, tableProp === null || tableProp === void 0 ? void 0 : (_tableProp$tbody = tableProp.tbody) === null || _tableProp$tbody === void 0 ? void 0 : _tableProp$tbody.tr, {
      key: "trIndex-".concat(index1)
    }), firstColumnRender && /*#__PURE__*/_react["default"].createElement("td", null, firstColumnRender(d)), columns.map(function (col, index2) {
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: "index-".concat(index2)
      }, renderData(d[col.value], col, columnRender));
    }), lastColumnRender && /*#__PURE__*/_react["default"].createElement("td", null, lastColumnRender(d)));
  })));
}

TestComponent.propTypes = {
  tableProp: _propTypes["default"].object,
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  setData: _propTypes["default"].func,
  setColumns: _propTypes["default"].func,
  sortIconAsc: _propTypes["default"].node,
  sortIconDesc: _propTypes["default"].node,
  dateColumns: _propTypes["default"].arrayOf(_propTypes["default"].object),
  noSortColumns: _propTypes["default"].arrayOf(_propTypes["default"].string),
  firstColumnRender: _propTypes["default"].func,
  firstColumnLabel: _propTypes["default"].string,
  firstColumnProp: _propTypes["default"].object,
  lastColumnRender: _propTypes["default"].func,
  lastColumnLabel: _propTypes["default"].string,
  columnRender: _propTypes["default"].arrayOf(_propTypes["default"].object),
  columns: _propTypes["default"].arrayOf(function (propValue, key, componentName, location, propFullName) {
    console.log(propValue);
    console.log(key);

    if (_typeof(propValue[key]) !== 'object') {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "Columns" prop should be an array of object with "value" and "label" property.');
    }

    if (propValue[key].value === undefined || propValue[key].label === undefined) {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "Columns" prop should be an array of object with "value" and "label" property.');
    }
  })
};
var _default = TestComponent;
exports["default"] = _default;

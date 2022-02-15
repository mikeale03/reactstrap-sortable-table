"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data", "setData", "columns", "setColumns", "sortIconAsc", "sortIconDesc", "dateColumns", "noSortColumns", "firstColumnRender", "firstColumnLabel", "firstColumnHeaderProp", "lastColumnRender", "lastColumnLabel", "lastColumnHeaderProp", "columnRender", "addProps"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SortableTable(_ref) {
  var _ref$data = _ref.data,
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
      _ref$firstColumnHeade = _ref.firstColumnHeaderProp,
      firstColumnHeaderProp = _ref$firstColumnHeade === void 0 ? {} : _ref$firstColumnHeade,
      lastColumnRender = _ref.lastColumnRender,
      lastColumnLabel = _ref.lastColumnLabel,
      _ref$lastColumnHeader = _ref.lastColumnHeaderProp,
      lastColumnHeaderProp = _ref$lastColumnHeader === void 0 ? {} : _ref$lastColumnHeader,
      _ref$columnRender = _ref.columnRender,
      columnRender = _ref$columnRender === void 0 ? [] : _ref$columnRender,
      addProps = _ref.addProps,
      rest = _objectWithoutProperties(_ref, _excluded);

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

  var renderData = function renderData(value, column, columnIndex, data, dataIndex, columnRender) {
    for (var i = 0; i < columnRender.length; i++) {
      if (column.value === columnRender[i].column) {
        return columnRender[i].render(value, column, columnIndex, data, dataIndex);
      }
    }

    return value;
  };

  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Table, rest, /*#__PURE__*/_react["default"].createElement("thead", addProps === null || addProps === void 0 ? void 0 : addProps.tHead, /*#__PURE__*/_react["default"].createElement("tr", addProps === null || addProps === void 0 ? void 0 : addProps.tHeadRow, firstColumnRender && /*#__PURE__*/_react["default"].createElement("th", firstColumnHeaderProp, firstColumnLabel), columns.map(function (col, index) {
    return /*#__PURE__*/_react["default"].createElement("th", _extends({
      onClick: function onClick() {
        return sortByColumn(col.value);
      },
      key: "columnheader-".concat(index),
      style: {
        cursor: 'pointer'
      }
    }, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tHeading) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tHeading(col, index) : addProps === null || addProps === void 0 ? void 0 : addProps.tHeading), col.label, !noSortColumns.includes(col.value) && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ms-1"
    }, col.sortOrder === undefined ? sortIconAsc || '↓' : col.sortOrder === 'desc' ? sortIconAsc || '↓' : sortIconDesc || '↑'));
  }), lastColumnRender && /*#__PURE__*/_react["default"].createElement("th", lastColumnHeaderProp, lastColumnLabel))), /*#__PURE__*/_react["default"].createElement("tbody", addProps === null || addProps === void 0 ? void 0 : addProps.tBody, data.map(function (d, index1) {
    return /*#__PURE__*/_react["default"].createElement("tr", _extends({
      key: "trIndex-".concat(index1)
    }, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow(d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow), firstColumnRender && /*#__PURE__*/_react["default"].createElement("td", null, firstColumnRender(d, index1)), columns.map(function (col, index2) {
      return /*#__PURE__*/_react["default"].createElement("td", _extends({
        key: "index-".concat(index2)
      }, addProps === null || addProps === void 0 ? void 0 : addProps.tData, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tData) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tData(d[col.value], col, index2, d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.tData), renderData(d[col.value], col, index2, d, index1, columnRender));
    }), lastColumnRender && /*#__PURE__*/_react["default"].createElement("td", null, lastColumnRender(d, index1)));
  })));
}

SortableTable.propTypes = {
  /**
   An array of data objects. Must be a react state.
  */
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,

  /**
   A Setter function. Must be a setter for 'data' state.
  */
  setData: _propTypes["default"].func.isRequired,

  /**
    An array of objects. Use as table columns. Must be a react state. Objects must contain 'value' and 'label' properties
  */
  columns: _propTypes["default"].arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (propValue === undefined || propValue === null) {
      return new Error('"columns" prop is required');
    }

    if (_typeof(propValue[key]) !== 'object') {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "columns" prop should be an array of object with "value" and "label" property.');
    }

    if (propValue[key].value === undefined || propValue[key].label === undefined) {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "columns" prop should be an array of object with "value" and "label" property.');
    }

    if (typeof propValue[key].value !== 'string' || typeof propValue[key].label !== 'string') {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "value" and "label" property must be a string.');
    }
  }),

  /**
    A Setter function. Must be a setter for 'columns' state.
  */
  setColumns: _propTypes["default"].func.isRequired,

  /**
    Icon use to sort as ascending. Could be a component, element or text.
  */
  sortIconAsc: _propTypes["default"].node,

  /**
    Icon use to sort as descending. Could be a component, element or text.
  */
  sortIconDesc: _propTypes["default"].node,

  /**
    Specify if the columns data is a Date in order to properly sort the data. This should contain strings which represent the property of the objects.
  */
  dateColumns: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /**
    Specify the columns that you dont want to be sorted. This should contain strings which represent the property of the objects.
  */
  noSortColumns: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /**
    A callback function if you want to render additional element in the first column
  */
  firstColumnRender: _propTypes["default"].func,

  /**
    A label for first column. 'firstColumnRender' should be defined for this to be visible.
  */
  firstColumnLabel: _propTypes["default"].string,

  /**
    Add props to first column rendered by firstColumnRender callback
  */
  firstColumnHeaderProps: _propTypes["default"].object,

  /**
   A callback function if you want to render additional element in the last column
  */
  lastColumnRender: _propTypes["default"].func,

  /**
    A label for last column. 'lastColumnRender' should be defined for this to be visible.
  */
  lastColumnLabel: _propTypes["default"].string,

  /**
    Add props to last column header rendered by lastColumnRender callback
  */
  lastColumnHeaderProps: _propTypes["default"].object,

  /**
    A callback function if you want a custom rendered element within a column.
  
    eg: 
    { 
      column: 'header2',
      render: (data) => 
        <CustomButton>{ data }</CustomButton> 
    } 
  */
  columnRender: _propTypes["default"].arrayOf(_propTypes["default"].object),

  /**
    Use for adding props for Table inner components like 'tr' and 'td'.
      valid props are: 
    { tHeadRow: { prop: 'value'} }
    { tBodyRow: { prop: 'value'} }
    { tHeading: { prop: 'value'} }
    { tData: { prop: 'value'} }
    { tHeading: (data) => ({prop: 'value'}) }
    { tBodyRow: (data) => ({prop: 'value'}) }
    { tData: (data) => ({prop: 'value'}) }
   */
  addProps: _propTypes["default"].object
};
var _default = SortableTable;
exports["default"] = _default;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data", "setData", "columns", "sortIconAsc", "sortIconDesc", "dateColumns", "noSortColumns", "firstColumnRender", "firstColumnLabel", "firstColumnHeaderProp", "lastColumnRender", "lastColumnLabel", "lastColumnHeaderProp", "columnRender", "addProps", "isSortable"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var toTitleCase = function toTitleCase(text) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./, function (match) {
    return match.toUpperCase();
  });
};

var initColumns = function initColumns(data) {
  if (data !== null && data !== void 0 && data.length) {
    var firstItem = data[0];
    var columns = Object.keys(firstItem).map(function (prop) {
      return {
        value: prop,
        label: toTitleCase(prop)
      };
    });
    return columns;
  }

  return [];
};

var sorter = function sorter(isAsc, columnName, isDate) {
  return function (a, b) {
    if (isDate) return isAsc ? new Date(a[columnName]) - new Date(b[columnName]) : new Date(b[columnName]) - new Date(a[columnName]);

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
      return isAsc ? aPart.length - bPart.length : bPart.length - aPart.length;
    }

    if (isNumber(aPart[i]) && isNumber(bPart[i])) {
      return isAsc ? aPart[i] - bPart[i] : bPart[i] - aPart[i];
    }

    return isAsc ? aPart[i].localeCompare(bPart[i]) : bPart[i].localeCompare(aPart[i]);
  };
};

var renderData = function renderData(value, column, columnIndex, data, dataIndex, columnRender) {
  for (var i = 0; i < columnRender.length; i++) {
    if (column.value === columnRender[i].column) {
      return columnRender[i].render(value, column, columnIndex, data, dataIndex);
    }
  }

  return value;
};

function SortableTable(_ref) {
  var data = _ref.data,
      _ref$setData = _ref.setData,
      setData = _ref$setData === void 0 ? function () {} : _ref$setData,
      columns = _ref.columns,
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
      _ref$isSortable = _ref.isSortable,
      isSortable = _ref$isSortable === void 0 ? true : _ref$isSortable,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      cols = _useState2[0],
      setCols = _useState2[1];

  var isAscendingMap = (0, _react.useRef)({});
  (0, _react.useEffect)(function () {
    if (columns) {
      setCols(columns.map(function (col) {
        return typeof col === 'string' ? {
          value: col,
          label: toTitleCase(col)
        } : col;
      }));
    }
  }, [columns]);
  (0, _react.useEffect)(function () {
    if ((columns === undefined || columns === null) && data && cols.length === 0) {
      setCols(initColumns(data));
    }
  }, [data]);

  var sortByColumn = function sortByColumn(columnName) {
    var isDate = dateColumns.includes(columnName);

    if (isSortable && data.length) {
      if (noSortColumns.includes(columnName)) return;
      isAscendingMap.current[columnName] = isAscendingMap.current[columnName] ? false : true;

      var _data = _toConsumableArray(data);

      _data.sort(sorter(isAscendingMap.current[columnName], columnName, isDate));

      setData(_data);
    }
  };

  return _react["default"].createElement(_reactBootstrap.Table, rest, _react["default"].createElement("thead", addProps === null || addProps === void 0 ? void 0 : addProps.tHead, _react["default"].createElement("tr", addProps === null || addProps === void 0 ? void 0 : addProps.tHeadRow, firstColumnRender && _react["default"].createElement("th", firstColumnHeaderProp, firstColumnLabel), cols.map(function (col, index) {
    return _react["default"].createElement("th", _extends({
      onClick: function onClick() {
        return sortByColumn(col.value);
      },
      key: "columnheader-".concat(index),
      style: {
        cursor: 'pointer'
      }
    }, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tHeading) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tHeading(col, index) : addProps === null || addProps === void 0 ? void 0 : addProps.tHeading), col.label, isSortable && !noSortColumns.includes(col.value) && _react["default"].createElement("span", {
      className: "ms-1"
    }, isAscendingMap.current[col.value] === undefined ? sortIconAsc || '↓' : !isAscendingMap.current[col.value] ? sortIconAsc || '↓' : sortIconDesc || '↑'));
  }), lastColumnRender && _react["default"].createElement("th", lastColumnHeaderProp, lastColumnLabel))), _react["default"].createElement("tbody", addProps === null || addProps === void 0 ? void 0 : addProps.tBody, data && data.map(function (d, index1) {
    return _react["default"].createElement("tr", _extends({
      key: "trIndex-".concat(d.id || index1)
    }, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow(d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.tBodyRow), firstColumnRender && _react["default"].createElement("td", _extends({}, addProps === null || addProps === void 0 ? void 0 : addProps.firstColumn, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.firstColumn) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.firstColumn(d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.firstColumn), firstColumnRender(d, index1)), cols.map(function (col, index2) {
      return _react["default"].createElement("td", _extends({
        key: "index-".concat(index2)
      }, addProps === null || addProps === void 0 ? void 0 : addProps.tData, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.tData) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.tData(d[col.value], col, index2, d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.tData), renderData(d[col.value], col, index2, d, index1, columnRender));
    }), lastColumnRender && _react["default"].createElement("td", _extends({}, addProps === null || addProps === void 0 ? void 0 : addProps.lastColumn, typeof (addProps === null || addProps === void 0 ? void 0 : addProps.lastColumn) === 'function' ? addProps === null || addProps === void 0 ? void 0 : addProps.lastColumn(d, index1) : addProps === null || addProps === void 0 ? void 0 : addProps.lastColumn), lastColumnRender(d, index1)));
  })));
}

SortableTable.propTypes = {
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  setData: _propTypes["default"].func,
  columns: _propTypes["default"].arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (_typeof(propValue[key]) === 'object') {
      if (propValue[key].value === undefined || propValue[key].label === undefined) {
        return new Error("Invalid prop ".concat(propFullName, " supplied to ").concat(componentName, ". Object property 'value' or 'label' is undefined."));
      }

      if (typeof propValue[key].value !== 'string' || typeof propValue[key].label !== 'string') {
        return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. "value" and "label" property must be a string.');
      }
    }
  }),
  sortIconAsc: _propTypes["default"].node,
  sortIconDesc: _propTypes["default"].node,
  dateColumns: _propTypes["default"].arrayOf(_propTypes["default"].string),
  noSortColumns: _propTypes["default"].arrayOf(_propTypes["default"].string),
  firstColumnRender: _propTypes["default"].func,
  firstColumnLabel: _propTypes["default"].string,
  firstColumnHeaderProps: _propTypes["default"].object,
  lastColumnRender: _propTypes["default"].func,
  lastColumnLabel: _propTypes["default"].string,
  lastColumnHeaderProps: _propTypes["default"].object,
  columnRender: _propTypes["default"].arrayOf(_propTypes["default"].object),
  addProps: _propTypes["default"].object,
  isSortable: _propTypes["default"].bool
};
var _default = SortableTable;
exports["default"] = _default;

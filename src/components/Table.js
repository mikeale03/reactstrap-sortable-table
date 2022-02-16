import React from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types';

function SortableTable({
  data = [],
  setData = () => {},
  columns = [],
  setColumns = () => {},
  sortIconAsc,
  sortIconDesc,
  dateColumns = [],
  noSortColumns = [],
  firstColumnRender,
  firstColumnLabel,
  firstColumnHeaderProp = {},
  lastColumnRender,
  lastColumnLabel,
  lastColumnHeaderProp = {},
  columnRender = [],
  addProps,
  ...rest
}) {

  const sortByColumn = (columnName) => {

    const isDate = dateColumns.includes(columnName)

    const sorterAsc = (a, b) => {
        if(isDate) return new Date(a[columnName]) - new Date(b[columnName])

        const isNumber = (v) => (+v).toString() === v
        const aPart = a[columnName] ? a[columnName].toString().match(/\d+|\D+/g) : ''
        const bPart = b[columnName] ? b[columnName].toString().match(/\d+|\D+/g): ''
        let i = 0; let len = Math.min(aPart.length, bPart.length)
        while (i < len && aPart[i] === bPart[i]) { 
            i++
        }
        if (i === len) {
              return aPart.length - bPart.length
        }
        if (isNumber(aPart[i]) && isNumber(bPart[i])) {
           return aPart[i] - bPart[i]
        }
        return aPart[i].localeCompare(bPart[i])
    }

    const sorterDesc = (a, b) => {
        if(isDate) return new Date(b[columnName]) - new Date(a[columnName])

        const isNumber = (v) => (+v).toString() === v
        const aPart = a[columnName] ? a[columnName].toString().match(/\d+|\D+/g) : ''
        const bPart = b[columnName] ? b[columnName].toString().match(/\d+|\D+/g): ''
        let i = 0; let len = Math.min(aPart.length, bPart.length)
        while (i < len && aPart[i] === bPart[i]) { 
            i++
        }
        if (i === len) {
              return bPart.length - aPart.length
        }
        if (isNumber(aPart[i]) && isNumber(bPart[i])) {
           return bPart[i] - aPart[i];
        }
        return bPart[i].localeCompare(aPart[i])
    }

    if (data.length) {
        if (noSortColumns.includes(columnName)) return

        let _columns = columns
        const columnIndex = _columns.findIndex(x => x.value === columnName)
        const sortOrder = _columns[columnIndex]?.sortOrder === 'asc' ? 'desc' : 'asc'
        let _data = [...data]
        
        _data.sort(sortOrder === 'asc' ? sorterAsc : sorterDesc)
        setData(_data)

        _columns[columnIndex]['sortOrder'] = sortOrder
        setColumns(_columns)
    }
  }

  const renderData = function(value, column, columnIndex, data, dataIndex, columnRender) {
    for(let i=0; i < columnRender.length; i++) {
      if(column.value === columnRender[i].column) {
          return columnRender[i].render(value, column, columnIndex, data, dataIndex)
      }
    }
    return value
  }

  return (
    <Table {...rest} >
      <thead {...addProps?.tHead} >
        <tr {...addProps?.tHeadRow}>

          { firstColumnRender && <th {...firstColumnHeaderProp}>{firstColumnLabel}</th> }

          {columns.map((col, index) => (
            <th onClick={() => sortByColumn(col.value)} key={`columnheader-${index}`} style={{cursor: 'pointer'}} 
              {...(typeof addProps?.tHeading === 'function' ? addProps?.tHeading(col, index) : addProps?.tHeading)}
            >
                {col.label}
                { !noSortColumns.includes(col.value) &&
                <span className='ms-1' >
                  { 
                    col.sortOrder === undefined ? sortIconAsc || '↓' :
                    col.sortOrder === 'desc' ? sortIconAsc || '↓' : 
                    sortIconDesc || '↑'  
                  }
                </span>
                }
            </th>
          ))}

          { lastColumnRender && <th {...lastColumnHeaderProp}>{lastColumnLabel}</th> }

        </tr>
      </thead>
      <tbody {...addProps?.tBody}>

        { data.map( (d, index1) =>
        <tr key={`trIndex-${index1}`} {...(typeof addProps?.tBodyRow === 'function' ? addProps?.tBodyRow(d, index1) : addProps?.tBodyRow)}>
          
          { firstColumnRender &&
            <td>
              {firstColumnRender(d, index1)}
            </td>
          }

          { columns.map( (col, index2) =>
            <td key={`index-${index2}`} 
              {...addProps?.tData} {...(typeof addProps?.tData === 'function' ? addProps?.tData(d[col.value], col, index2, d, index1) : addProps?.tData)}
            >
              { renderData(d[col.value], col, index2, d, index1, columnRender) }
            </td> 
          )}

          { lastColumnRender &&
            <td>
              {lastColumnRender(d, index1)}
            </td>
          }
        </tr>
        )}

      </tbody>
    </Table>
  )
}

SortableTable.propTypes = {
  /**
   An array of data objects. Must be a react state.
  */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   A Setter function. Must be a setter for 'data' state.
  */
  setData: PropTypes.func.isRequired,

  /**
    An array of objects. Use as table columns. Must be a react state. Objects must contain 'value' and 'label' properties
  */
   columns: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    
    if(propValue === undefined || propValue === null) {
      return new Error(
        '"columns" prop is required'
      );
    }
    if(typeof propValue[key] !== 'object') {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. "columns" prop should be an array of object with "value" and "label" property.'
      );
    }
    if (propValue[key].value === undefined || propValue[key].label === undefined) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. "columns" prop should be an array of object with "value" and "label" property.'
      );
    }
    if (typeof propValue[key].value !== 'string' || typeof propValue[key].label !== 'string') {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. "value" and "label" property must be a string.'
      );
    }
  }),
  /**
    A Setter function. Must be a setter for 'columns' state.
  */
  setColumns: PropTypes.func.isRequired,

  /**
    Icon use to sort as ascending. Could be a component, element or text.
  */
  sortIconAsc: PropTypes.node,

  /**
    Icon use to sort as descending. Could be a component, element or text.
  */
  sortIconDesc: PropTypes.node,

  /**
    Specify if the columns data is a Date in order to properly sort the data. This should contain strings which represent the property of the objects.
  */
  dateColumns: PropTypes.arrayOf(PropTypes.string),

  /**
    Specify the columns that you dont want to be sorted. This should contain strings which represent the property of the objects.
  */
  noSortColumns: PropTypes.arrayOf(PropTypes.string),

  /**
    A callback function if you want to render additional element in the first column

    eg:
      (data, index) => <Component> display something... </Component>
  */
  firstColumnRender: PropTypes.func,

  /**
    A label for first column. 'firstColumnRender' should be defined for this to be visible.
  */
  firstColumnLabel: PropTypes.string,

  /**
    Add props to first column rendered by firstColumnRender callback
  */
  firstColumnHeaderProps: PropTypes.object,

   /**
    A callback function if you want to render additional element in the last column

    eg:
      (data, index) => <Component> display something... </Component>
  */
  lastColumnRender: PropTypes.func,

  /**
    A label for last column. 'lastColumnRender' should be defined for this to be visible.
  */
  lastColumnLabel: PropTypes.string,

  /**
    Add props to last column header rendered by lastColumnRender callback
  */
  lastColumnHeaderProps: PropTypes.object,

  /**
    An array of objects specifying a column value and a render callback function if you want a custom rendered element within a column.
  
    eg: 
    [
      { 
        column: 'header2',
        render: (value, column, columnIndex, data, dataIndex) => 
          <Component> something... </Component> 
      },
      { 
        column: 'header4',
        render: (value, column, columnIndex, data, dataIndex) => 
          <Component> another something... </Component> 
      },
    ] 
  */
  columnRender: PropTypes.arrayOf(PropTypes.object),

  /**
    Use for adding props for Table inner components like 'tr' and 'td'.

    eg. of valid props are: 
    { 
      tHeadRow: { prop: 'value'} 
    }
    --
    { 
      tBodyRow: { prop: 'value'} 
    }
    --
    { 
      tHeading: { prop: 'value'} 
    }
    --
    { 
      tData: { prop: 'value'} 
    }
    --
    { 
      tHeading: (column, columnIndex) => ({prop: 'value'}) 
    }
    --
    { 
      tBodyRow: (data, index) => ({prop: 'value'}) 
    }
    --
    { 
      tData: (value, column, columnIndex, data, dataIndex) => 
        ({prop: 'value'}) 
    }
  */
  addProps:PropTypes.object

}

export default SortableTable
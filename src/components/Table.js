import React, { useEffect, useState, useRef } from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types';

const toTitleCase = (text) => 
  text.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase())


const initColumns = (data) => {
  if(data?.length) {
    const firstItem = data[0]
    const columns = Object.keys(firstItem).map( prop => {
      return {
        value: prop,
        label: toTitleCase(prop)
      }
    })
    return columns
  }
  return []
}

const sorter = (isAsc, columnName, isDate) => {
  return (a, b) => {
    
    if(isDate) 
      return isAsc ? new Date(a[columnName]) - new Date(b[columnName]) : new Date(b[columnName]) - new Date(a[columnName])
  
    const isNumber = (v) => (+v).toString() === v
    const aPart = a[columnName] ? a[columnName].toString().match(/\d+|\D+/g) : ''
    const bPart = b[columnName] ? b[columnName].toString().match(/\d+|\D+/g): ''
    let i = 0; let len = Math.min(aPart.length, bPart.length)
    while (i < len && aPart[i] === bPart[i]) { 
        i++
    }
    if (i === len) {
          return isAsc ? (aPart.length - bPart.length) : (bPart.length - aPart.length)
    }
    if (isNumber(aPart[i]) && isNumber(bPart[i])) {
       return isAsc ? (aPart[i] - bPart[i]) : (bPart[i] - aPart[i])
    }
    return isAsc ? aPart[i].localeCompare(bPart[i]) : bPart[i].localeCompare(aPart[i])
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

function SortableTable({
  data,
  setData = () => {},
  columns,
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
  isSortable = true,
  ...rest
}) {

  const [cols, setCols] = useState([])
  const isAscendingMap = useRef({})

  useEffect(() => {
    if(columns) {
      setCols(columns.map( col =>
        typeof col === 'string' ?
          { value: col, label: toTitleCase(col) } :
          col        
      ))
    }
  }, [columns])

  useEffect(() => {
    if( (columns === undefined || columns === null) && data && cols.length === 0 ) {
      setCols(initColumns(data))
    }
  }, [data])

  const sortByColumn = (columnName) => {

    const isDate = dateColumns.includes(columnName)
  
    if (isSortable && data.length) {
        if (noSortColumns.includes(columnName)) return
        // toggle sortOrder
        isAscendingMap.current[columnName] = isAscendingMap.current[columnName] ? false : true
        let _data = [...data]
        _data.sort( sorter(isAscendingMap.current[columnName], columnName, isDate) )
        setData(_data)
    }
  }

  return (
    <Table {...rest} >
      <thead {...addProps?.tHead} >
        <tr {...addProps?.tHeadRow}>

          { firstColumnRender && <th {...firstColumnHeaderProp}>{firstColumnLabel}</th> }

          {cols.map((col, index) => (
            <th onClick={() => sortByColumn(col.value)} key={`columnheader-${index}`} style={{cursor: 'pointer'}}
              {...(typeof addProps?.tHeading === 'function' ? addProps?.tHeading(col, index) : addProps?.tHeading)}
            >
                {col.label}
                { isSortable && !noSortColumns.includes(col.value) &&
                <span className='ms-1' >
                  { 
                    isAscendingMap.current[col.value] === undefined ? sortIconAsc || '↓' :
                    !isAscendingMap.current[col.value] ? sortIconAsc || '↓' : 
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

        { data && data.map( (d, index1) =>
        <tr key={`trIndex-${d.id || index1}`} {...(typeof addProps?.tBodyRow === 'function' ? addProps?.tBodyRow(d, index1) : addProps?.tBodyRow)}>
          
          { firstColumnRender &&
            <td {...addProps?.firstColumn} {...(typeof addProps?.firstColumn === 'function' ? addProps?.firstColumn(d, index1) : addProps?.firstColumn)}>
              {firstColumnRender(d, index1)}
            </td>
          }

          { cols.map( (col, index2) =>
            <td key={`index-${index2}`} 
              {...addProps?.tData} {...(typeof addProps?.tData === 'function' ? addProps?.tData(d[col.value], col, index2, d, index1) : addProps?.tData)}
            >
              { renderData(d[col.value], col, index2, d, index1, columnRender) }
            </td> 
          )}

          { lastColumnRender &&
            <td {...addProps?.lastColumn} {...(typeof addProps?.lastColumn === 'function' ? addProps?.lastColumn(d, index1) : addProps?.lastColumn)}>
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
  setData: PropTypes.func,

  /**
    An array of of strings or objects. Use as table columns. If it is string, it must be a property of data objects. If it is an object, it must contain 'value' and 'label' properties
  */
   columns: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    
    if(typeof propValue[key] === 'object') {
    
      if (propValue[key].value === undefined || propValue[key].label === undefined) {
        return new Error(
          `Invalid prop ${propFullName} supplied to ${componentName}. Object property 'value' or 'label' is undefined.`
        );
      }
      if (typeof propValue[key].value !== 'string' || typeof propValue[key].label !== 'string') {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. "value" and "label" property must be a string.'
        );
      }
    }
  }),
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
    --
    { 
      firstColumn: ({ prop: 'value'} 
    }
    --
    { 
      firstColumn: (data, index) => 
        ({prop: 'value'}) 
    }
    --
    { 
      lastColumn: ({ prop: 'value'} 
    }
    --
    { 
      lastColumn: (data, index) => 
        ({prop: 'value'}) 
    }
  */
  addProps:PropTypes.object,

  /**
   *  Set if table is sortable or not. Value should be boolean
   */
  isSortable: PropTypes.bool

}

export default SortableTable
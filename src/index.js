import React from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types';

function TestComponent({
  tableProp = {},
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
  firstColumnProp = {},
  lastColumnRender,
  lastColumnLabel,
  columnRender = [],
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

  const renderData = function(data, column, columnRender) {
    for(let i=0; i < columnRender.length; i++) {
      if(column.value === columnRender[i].column) {
          return columnRender[i].render(data)
      }
    }
    return data
  }

  return (
    <Table {...tableProp} >
      <thead { ...tableProp?.thead }>
        <tr {...tableProp?.thead?.tr}>

          { firstColumnRender && <th {...firstColumnProp}>{firstColumnLabel}</th> }

          {columns.map((col, index) => (
            <th onClick={() => sortByColumn(col.value)} key={`columnheader-${index}`} style={{cursor: 'pointer'}}>
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

          { lastColumnRender && <th>{lastColumnLabel}</th> }

        </tr>
      </thead>
      <tbody {...tableProp?.tbody}>

        { data.map( (d, index1) =>
        <tr {...tableProp?.tbody?.tr} key={`trIndex-${index1}`}>
          
          { firstColumnRender &&
            <td>
              {firstColumnRender(d)}
            </td>
          }

          { columns.map( (col, index2) =>
            <td key={`index-${index2}`}>
              { renderData(d[col.value], col, columnRender) }
            </td> 
          )}

          { lastColumnRender &&
            <td>
              {lastColumnRender(d)}
            </td>
          }
        </tr>
        )}

      </tbody>
    </Table>
  )
}

TestComponent.propTypes = {
  tableProp: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func,
  setColumns: PropTypes.func,
  sortIconAsc: PropTypes.node,
  sortIconDesc: PropTypes.node,
  dateColumns: PropTypes.arrayOf(PropTypes.object),
  noSortColumns: PropTypes.arrayOf(PropTypes.string),
  firstColumnRender: PropTypes.func,
  firstColumnLabel: PropTypes.string,
  firstColumnProp: PropTypes.object,
  lastColumnRender: PropTypes.func,
  lastColumnLabel: PropTypes.string,
  columnRender: PropTypes.arrayOf(PropTypes.object),

  columns: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    console.log(propValue)
    console.log(key)
    if(typeof propValue[key] !== 'object') {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. "Columns" prop should be an array of object with "value" and "label" property.'
      );
    }
    if (propValue[key].value === undefined || propValue[key].label === undefined) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. "Columns" prop should be an array of object with "value" and "label" property.'
      );
    }
  })
}

export default TestComponent
import SortableTable from "../components/Table";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";

export default {
    title: "Sortable Table",
    component: SortableTable
}

export const SampleTable = () => {

    const [columns, setColumns] = useState([
        {
            value: 'header1',
            label: 'HEADER 1'
        },
        {
            value: 'header2',
            label: 'HEADER 2'
        },
        {
            value: 'header3',
            label: 'HEADER 3'
        },
        {
            value: 'header4',
            label: 'HEADER 4'
        },
    ])

    const [data, setData] = useState([
        {
            header1: 'mike', header2: '531', header3: '10/12/2001', header4: 'kigz'
        },
        {
            header1: 'ale', header2: 'mike', header3: '12/12/2000', header4: 'W3Schools'
        },
        {
            header1: 'ale', header2: '214', header3: '9/12/2000', header4: 'jake'
        },
        {
            header1: '1leddf', header2: '12', header3: '1/12/2011', header4: 'kwaks'
        },
        {
            header1: '1leddf', header2: '12', header3: '1/12/2011', header4: 'kwaks'
        },
    ])

    return (
        <SortableTable 
            bordered
            variant='dark'
            data={data}
            setData={setData}
            columns={columns}
            setColumns={setColumns}
            addProps={ { tData: {className:'text-danger'} } }
            dateColumns={['header3']}
            noSortColumns={['header2', 'header4']}
            firstColumnRender={(data, index) => {
                return index % 2 && <Button>{data.header2}</Button>
            }}
            firstColumnLabel="first column"
            firstColumnHeaderProp={ { style:{width: '50px'} } }
            lastColumnRender={(data, index) => {
                return index % 2 === 0 ? <Button>{data.header3}</Button> : undefined
            }}
            lastColumnLabel="last column"
            lastColumnHeaderProp={ { style:{width: '1000px'} } }
            columnRender={[
                {
                    column: 'header4',
                    render: (value, column, columnIndex, data, dataIndex) => 
                        value ==="W3Schools" ? <a href="https://www.w3schools.com/" target="_blank">Visit {value}!</a> : value
                }
            ]}
            addProps={
                {
                    tBodyRow: (data, index) => index % 2 && {className: 'text-primary'},
                    tData: (value, column, columnIndex, data, dataIndex) => value === 'jake' && {className: 'text-success'},
                    tHeading: (column, columnIndex) => column.value === 'header2' && {className: 'text-success'}
                }
            }
        />
    )
}
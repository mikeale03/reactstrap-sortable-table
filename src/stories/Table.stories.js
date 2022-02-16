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
            header1: 'Jack21', header2: 4486, header3: '10/12/2001', header4: 'Kigz'
        },
        {
            header1: 'Jack12', header2: 5896, header3: '12/12/2000', header4: 'W3Schools'
        },
        {
            header1: 'Cole', header2: 348, header3: '9/12/2000', header4: 'Jake'
        },
        {
            header1: 'Hugh', header2: 452, header3: '1/12/2011', header4: 'Mike'
        },
        {
            header1: 'Ryan', header2: 467, header3: '1/12/2011', header4: 'Ale'
        },
    ])

    return (
        <SortableTable 
            bordered
            striped
            data={data}
            setData={setData}
            columns={columns}
            setColumns={setColumns}
            dateColumns={['header3']}
            noSortColumns={['header4']}

            firstColumnRender={(data, index) => {
                return index % 2 ? <Button>{index + 1}</Button> : <Button variant="secondary">{index + 1}</Button>
            }}

            firstColumnLabel="first column"
            firstColumnHeaderProp={ { style:{width: '100px'} } }

            lastColumnRender={(data, index) => {
                return index % 2 === 0 ? 
                <div className="d-flex justify-content align-items-center flex-column">
                    <Button>{data.header1}</Button>
                </div>
                 : 
                undefined
            }}

            lastColumnLabel="last column"
            lastColumnHeaderProp={ { className: 'bg-primary text-center' } }

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
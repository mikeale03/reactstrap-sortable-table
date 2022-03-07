import SortableTable from "../components/Table";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";

export default {
    title: "Sortable Table",
    component: SortableTable
}

export const SampleTable = () => {

    const [data, setData] = useState([
        {
            headerOne: 'Jack21', headerTwo: 4486, headerThree: '10/12/2001', headerFour: 'Kigz'
        },
        {
            headerOne: 'Jack12', headerTwo: 5896, headerThree: '12/12/2000', headerFour: 'W3Schools'
        },
        {
            headerOne: 'Cole', headerTwo: 348, headerThree: '9/12/2000', headerFour: 'Jake'
        },
        {
            headerOne: 'Hugh', headerTwo: 452, headerThree: '1/12/2011', headerFour: 'Mike'
        },
        {
            headerOne: 'Ryan', headerTwo: 467, headerThree: '1/12/2011', headerFour: 'Ale'
        },
    ])

    return (
        <SortableTable 
            bordered
            striped
            data={data}
            setData={setData}
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
                    <Button>{data.headerOne}</Button>
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
                    tHeading: (column, columnIndex) => column.value === 'header2' && {className: 'text-success'},
                    firstColumn: ({className: 'bg-success'})
                }
            }
        />
    )
}
import SortableTable from "./Table";

export default {
    title: "Table",
    component: SortableTable
}

export const Columns = () => <SortableTable columns={[
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
    ]} 
    data={[
        {
            header1: 'mike', header2: 'ale', header3: 'jake', header4: 'kigz'
        },
        {
            header1: 'ale', header2: 'mike', header3: 'kigz', header4: 'jake'
        },
    ]}
/>
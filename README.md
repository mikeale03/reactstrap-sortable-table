# Reactstrap-Sortable-Table

**Reactstrap-Sortable-Table** is sortable table component build with **[React-Bootstrap](https://react-bootstrap.github.io/)** 

## Installation

Use the npm package manager to install Reactstrap-Sortable-Table.

```bash
npm install reactstrap-sortable-table
```

## Peer Dependencies

This package needs this libraries to be installed.

```bash
"peerDependencies": {
    "bootstrap": "^5.1.3",
    "react": "^17.0.2",
    "react-bootstrap": "^2.1.2",
    "react-dom": "^17.0.2"
}
```

## Usage

```javascript
import SortableTable from 'reactstrap-sortable-table'

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Component() {

  const [data, setData] = useState([
    {header1: 'Michael', header2: 'James', header3: 'Tran', header4: 'Hill'},
    {header1: 'Jack', header2: 'Cole', header3: 'Naix', header4: 'Sia'},
    {header1: 'Lina', header2: 'Trent', header3: 'Jug', header4: 'Shane'},
    {header1: 'Moss', header2: 'Creed', header3: 'Goons', header4: 'Dhale'},
    {header1: 'Bike', header2: 'Troll', header3: 'Need', header4: 'Groot'},
  ])

  return (

     <SortableTable 
       data={data}
       setData={setData}
     />

  );
}

export default Component;

```
## Documentation
Check the **[props documentation](https://mikeale03.github.io/reactstrap-sortable-table/?path=/story/sortable-table--sample-table)** for more information

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

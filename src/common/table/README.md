# Table component

### Overview

The `Table` component is built using [React Table](https://react-table.tanstack.com/).

The scope of the component is to be a wrapper and adapt all functionalities that React Table offers to our needs (sorting, filtering etc) reducing boilerplate.

### Column declaration

The most important thing when using `Table` is declaring the array of columns correctly.

Example of correct declaration:

```javascript
const COLUMNS = [
  {
    id: "COLUMN_ID_1",
    Header: "Column title",
    accessor: (record) => record.propertyName,
    Cell: (rowInfo) => <Decorator value={rowInfo} />,
  },
  {
    id: "COLUMN_ID_2",
    Header: "Column title",
    accessor: (record) => record.propertyName,
  },
  {
    id: "COLUMN_ID_3",
    Header: "Column title",
    accessor: (record) => record.propertyName,
    sortable: false,
    filterable: false,
  },
  {
    id: "COLUMN_ID_4",
    Header: "Column title",
    accessor: (record) => record.propertyName,
    Filter: <ColumnFilter />,
  },
];
```

#### Required properties

1. `id : int | string` - Id of a column
2. `Header : string | Component` - Column header
3. `accessor : function` - The property is responsible for returning the value from the row data object (record parameter). We have to access the correct property for each column.

#### Optional properties

1. `sortable : boolean` - Disable sorting on the column
2. `filterble : boolean` - Disable filtering on the column
3. `Filter : Component` - Component that handles the filtering
4. `Cell : function` - The property acts as a decorator for the accessor value. The property has the responsability to format or render a component based on the column value (rowInfo.value). As part of rowInfo we also have access to the original backend response and other useful properties about the row / column.

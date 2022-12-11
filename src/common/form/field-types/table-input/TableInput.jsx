import React, { useState } from "react";
import { PencilFill, PlusCircle, TrashFill } from "react-bootstrap-icons";
import _ from "lodash";

function TableInput({
  value = [],
  columns,
  onChange,
  inputForm: InputForm,
  inputProps,
  deleteDisabled,
  editDisabled,
  addDisabled,
  sortConfig,
}) {
  const [editPayload, setEditPayload] = useState({});
  const [showAddRow, setAddRow] = useState(false);
  let data = value;

  const toggleForm = () => {
    setAddRow(!showAddRow);
  };

  const handleAddRow = (values) => {
    onChange([...value, values]);
    setAddRow(!showAddRow);
  };

  const handleRowDelete = (index) => {
    const rows = [...value];

    rows.splice(index, 1);
    onChange(rows);
  };

  const handleEditRow = (row, index) => {
    setAddRow(false);
    setEditPayload({
      ...row,
      index,
    });
  };

  const editTableEntry = (values) => {
    const newValues = [...data];
    newValues[editPayload.index] = values;

    onChange(newValues);
    setEditPayload({});
  };

  const getCellValue = (row, columns, index) => {
    const { accessor, decorator = (value) => value } = columns[index];

    return decorator(_.get(row, accessor, null));
  };

  if (sortConfig) {
    data = _.orderBy(data, [sortConfig.columnId], [sortConfig.direction]);
  }

  return (
    <React.Fragment>
      <table className="table table-input">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.keys(columns).map((cell, index) => (
                <td key={index}>{getCellValue(row, columns, index)}</td>
              ))}
              <td>
                <div className="actions">
                  {!editDisabled && (
                    <PencilFill
                      className="mr-2"
                      onClick={() => handleEditRow(row, index)}
                      color={"green"}
                    />
                  )}
                  {!deleteDisabled && (
                    <TrashFill
                      color="red"
                      onClick={() => handleRowDelete(index)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddRow ? (
        <InputForm handleAddRow={handleAddRow} />
      ) : (
        !addDisabled &&
        _.isEmpty(editPayload) && (
          <div className="add-button ml-2" onClick={toggleForm}>
            <PlusCircle
              size={16}
              color={"blue"}
              className="mr-2"
            />
            Add
          </div>
        )
      )}
      {!_.isEmpty(editPayload) && (
        <InputForm initialValues={editPayload} handleAddRow={editTableEntry} />
      )}
    </React.Fragment>
  );
}

export { TableInput };

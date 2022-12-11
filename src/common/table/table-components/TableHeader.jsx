import React from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

function TableHeader({ headerGroups = [] }) {
  return (
    <thead>
      {headerGroups.map((headerGroup, key) => (
        <tr key={key} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, index) => (
            <th
              key={index}
              {...column.getHeaderProps()}
              style={column.customStyles}
            >
              <div
                {...column.getSortByToggleProps()}
                className="column-header flex"
              >
                {/* Render the actual Header */}
                {column.render("Header")}

                {/* Render the sorting indicator */}
                {column.isSorted && (
                  <span className="align-self-end">
                    {column.isSortedDesc ? (
                      <ChevronDown className="ml-small" />
                    ) : (
                      <ChevronUp className="ml-small" />
                    )}
                  </span>
                )}
              </div>

              {/* Render the columns filter UI */}
              <div>{column.canFilter && column.render("Filter")}</div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export { TableHeader };

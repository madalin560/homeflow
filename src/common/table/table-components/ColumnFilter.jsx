import React from "react";
import { TEXT } from "constants/dictionary";

function ColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      className="text-input-field max-width"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={TEXT.searchField}
    />
  );
}

export { ColumnFilter };

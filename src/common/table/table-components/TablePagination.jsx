import React from "react";
import {
  ChevronRight,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronDoubleLeft,
} from "react-bootstrap-icons";
import { TEXT } from "constants/dictionary";

const TABLE_PAGE_SIZES = [10, 25, 50, 100];

function TablePagination(props) {
  return (
    <div className="pagination">
      <select
        value={props.pageSize}
        onChange={(e) => {
          props.setPageSize(Number(e.target.value));
        }}
      >
        {TABLE_PAGE_SIZES.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {TEXT.visualiseData} {pageSize}
          </option>
        ))}
      </select>
      <div className="page-controls">
        <ChevronDoubleLeft
          onClick={() => props.gotoPage(0)}
          disabled={!props.canPreviousPage}
        />
        <ChevronLeft
          onClick={() => props.previousPage()}
          disabled={!props.canPreviousPage}
        />
        <div className="displayed-page">
          Pagina{" "}
          <strong>
            {props.pageIndex + 1} din{" "}
            {props.pageOptions.length === 0 ? 1 : props.pageOptions.length}
          </strong>
        </div>
        <ChevronRight
          onClick={() => props.nextPage()}
          disabled={!props.canNextPage}
        />
        <ChevronDoubleRight
          onClick={() => props.gotoPage(props.pageCount - 1)}
          disabled={!props.canNextPage}
        />
      </div>
    </div>
  );
}

export { TablePagination };

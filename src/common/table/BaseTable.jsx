import React from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  usePagination,
  useExpanded,
  useFilters,
} from "react-table";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

import { TablePagination } from "./table-components/TablePagination";
import { TableHeader } from "./table-components/TableHeader";

import "./BaseTable.scss";

function BaseTable(props) {
  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter needed by React Table
      Filter: "",
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    flatHeaders,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageCount,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      initialState: {
        pageSize: props.pageSize,
        pageIndex: 0,
        ...(props.defaultFilters && {
          filters: props.defaultFilters,
        }),
        ...(props.defaultSort && {
          sortBy: [props.defaultSort],
        }),
      },
      autoResetPage: false,
      autoResetExpanded: false,
      autoResetFilters: false,
      disableSortRemove: true,
      defaultColumn,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <React.Fragment>
      <div className="overflow-container">
        <table className="table max-width" {...getTableProps()}>
          <TableHeader headerGroups={headerGroups} />
          <tbody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <React.Fragment key={key}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, key) => {
                      return (
                        <td key={key} {...cell.getCellProps()}>
                          <EllipsisWithTooltip placement="bottom">
                            {cell.render("Cell")}
                          </EllipsisWithTooltip>
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                        {props.renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination
        pageCount={pageCount}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
      />
    </React.Fragment>
  );
}

BaseTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  defaultSort: PropTypes.shape({
    id: PropTypes.string,
    desc: PropTypes.bool,
  }),
  defaultFilters: PropTypes.array,
};

export { BaseTable };

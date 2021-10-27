import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import SearchField from "./SearchField";
import { makeStyles } from "@material-ui/styles";

import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
} from "react-table";

// import search from "../assets/icons/search.svg";
import PaginationControlled from "../components/Pagination";
import Actions from "./Actions";

const HeaderText = withStyles({
  root: {
    color: "#a19b9d",
  },
})(Typography);

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: "1rem",
  },
  noOfItems: {
    fontSize: "14px",
    color: "#A19B9D",
    fontWeight: "500",
    margin: "1rem",
  },
  lastRow: {
    display: "flex",
    justifyContent: "space-between",
    // alignContent: "center",
  },
}));

const Table = ({ columns, data, placeholder = "Search for a product" }) => {
  // Use the state and functions returned from useTable to build your UI
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     // Let's make a column for selection
    //     {
    //       id: "selection",
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  // Global search function
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);
    return (
      <span className="px-2 font-normal focus:outline-none relative">
        <img src="" alt="search" className="absolute left-3 top-1 w-4 h-4" />
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="w-4/5 text-TITLE text-xs outline-none bg-BUTTON_FILLED rounded-md pl-6 p-3"
        />
      </span>
    );
  }

  // Checkbox function
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  //   const { TblPagination } = useTable(records, headCells, filterFn);

  return (
    <Box sx={{ width: "100%", border: "12px" }}>
      {/* <SearchField /> */}
      <div>
        <div className="w-4/5">
          {/* <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          /> */}
        </div>
        {/* <div>
          <Actions />
        </div> */}
      </div>

      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead className="w-full">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ textAlign: "left" }}>
                  <HeaderText variant="sub">
                    {column.render("Header")}
                  </HeaderText>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{ textAlign: "left" }}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="table-style" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <>
                      <td
                        style={{
                          borderBottom: "1px solid #E0E0E0",
                          //   padding: "0 5px",
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.lastRow}>
        <p className={classes.noOfItems}>20 Items Found</p>
        <div className={classes.pagination}>
          <PaginationControlled />
        </div>
      </div>
    </Box>
  );
};

export default Table;

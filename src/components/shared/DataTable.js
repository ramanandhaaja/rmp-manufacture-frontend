import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Table, Pagination, Select } from "components/ui"
import TableRowSkeleton from "./loaders/TableRowSkeleton"
import Loading from "./Loading"
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table"
import classNames from "classnames"
import { NoDataSvg } from "assets/svg"

const { Tr, Th, Td, THead, TBody, Sorter } = Table

// const IndeterminateCheckbox = forwardRef((props, ref) => {
//   const {
//     indeterminate,
//     onChange,
//     onCheckBoxChange,
//     onIndeterminateCheckBoxChange,
//     ...rest
//   } = props;

//   const defaultRef = useRef();
//   const resolvedRef = ref || defaultRef;

//   useEffect(() => {
//     resolvedRef.current.indeterminate = indeterminate;
//   }, [resolvedRef, indeterminate]);

//   const handleChange = (e) => {
//     onChange(e);
//     onCheckBoxChange?.(e);
//     onIndeterminateCheckBoxChange?.(e);
//   };

//   return (
//     <Checkbox
//       className="mb-0"
//       ref={resolvedRef}
//       onChange={(_, e) => handleChange(e)}
//       {...rest}
//     />
//   );
// });

const DataTable = (props) => {
  const {
    skeletonAvatarColumns,
    columns,
    data,
    loading,
    // onCheckBoxChange,
    // onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes,
    selectable,
    skeletonAvatarProps,
    pagingData,
    autoResetSelectedRows,
    wrapClass,
    borderlessRow,
    showPagination,
    showLimitPerPage,
    showHeader,
    rowClassName,
  } = props

  const { pageSize, pageIndex, total } = pagingData

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map((number) => ({ value: number, label: `${number} / page` })),
    [pageSizes]
  )

  // const handleCheckBoxChange = (checked, row, is_loading) => {
  //   if (!is_loading) {
  //     onCheckBoxChange?.(checked, row);
  //   }
  // };

  // const handleIndeterminateCheckBoxChange = (checked, rows, is_loading) => {
  //   if (!is_loading) {
  //     onIndeterminateCheckBoxChange?.(checked, rows);
  //   }
  // };

  const getStickyStyle = (column, index, allColumns, isHeader = false) => {
    if (!column.sticky) return {}

    const baseStyle = {
      position: "sticky",
      zIndex: 2,
      backgroundColor: isHeader
        ? "rgba(245, 247, 250, 1)" // dark:bg-gray-700 : bg-gray-50
        : "rgb(255 255 255)", // dark:bg-gray-900 : white
      transition: "background-color 150ms ease-in-out",
    }

    // Add hover styles
    const hoverSelector = isHeader ? "" : "&:hover"
    baseStyle[hoverSelector] = {
      backgroundColor: "rgba(243, 244, 246, 0.5)", // bg-gray-100/50
    }

    if (column.sticky === "right") {
      let offset = 0
      for (let i = allColumns.length - 1; i > index; i--) {
        if (allColumns[i].sticky === "right") {
          offset += parseInt(allColumns[i].width) || 100
        }
      }

      return {
        ...baseStyle,
        right: `${offset}px`,
        boxShadow: "-2px 0 4px -2px rgba(0, 0, 0, 0.15)",
      }
    }

    if (column.sticky === "left") {
      let offset = 0
      for (let i = 0; i < index; i++) {
        if (allColumns[i].sticky === "left") {
          offset += parseInt(allColumns[i].width) || 100
        }
      }

      return {
        ...baseStyle,
        left: `${offset}px`,
        boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.15)",
      }
    }

    return {}
  }

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        manualPagination: true,
        manualSortBy: true,
        autoResetSelectedRows,
        is_loading: loading,
      },
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        if (selectable) {
          hooks.visibleColumns.push((columns) => [
            // {
            //   id: "selection",
            //   width: 80,
            //   Header: (props) => {
            //     return (
            //       <div>
            //         <IndeterminateCheckbox
            //           {...props.getToggleAllRowsSelectedProps()}
            //           onIndeterminateCheckBoxChange={(e) =>
            //             handleIndeterminateCheckBoxChange(
            //               e.target.checked,
            //               props.rows,
            //               props.is_loading
            //             )
            //           }
            //         />
            //       </div>
            //     );
            //   },
            //   Cell: ({ row, is_loading }) => (
            //     <div>
            //       {/* <IndeterminateCheckbox
            //         {...row.getToggleRowSelectedProps()}
            //         onCheckBoxChange={(e) =>
            //           handleCheckBoxChange(
            //             e.target.checked,
            //             row.original,
            //             is_loading
            //           )
            //         }
            //       /> */}
            //     </div>
            //   ),
            //   sortable: false,
            // },
            ...columns,
          ])
        }
      }
    )

  const handlePaginationChange = (page) => {
    if (!loading) {
      onPaginationChange?.(page)
    }
  }

  const handleSelectChange = (value) => {
    if (!loading) {
      onSelectChange?.(Number(value))
    }
  }

  const handleSort = (column) => {
    if (!loading) {
      const { id, isSortedDesc, toggleSortBy, clearSortBy } = column
      const sortOrder = isSortedDesc ? "desc" : "asc"
      toggleSortBy(!isSortedDesc)
      onSort?.({ order: sortOrder, key: id }, { id, clearSortBy })
    }
  }

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <Table
        {...getTableProps({
          wrapClass: wrapClass,
          borderlessRow: borderlessRow,
        })}
      >
        {showHeader && (
          <THead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps({
                      style: {
                        minWidth: column.minWidth,
                        width: column.width,
                        ...getStickyStyle(
                          column,
                          index,
                          headerGroup.headers,
                          true
                        ),
                      },
                    })}
                  >
                    {column.render("Header") &&
                      (column.sortable ? (
                        <div
                          className={classNames(
                            "cursor-pointer text-blue-999 text-sm font-bold leading-[21px] uppercase",
                            column.headerClassName
                          )}
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}{" "}
                            <Sorter sort={column.isSortedDesc} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={classNames(
                            "text-blue-999 text-sm font-bold leading-[21px] uppercase",
                            column.headerClassName
                          )}
                        >
                          {column.render("Header")}
                        </div>
                      ))}
                  </Th>
                ))}
              </Tr>
            ))}
          </THead>
        )}
        {loading && data.length === 0 ? (
          <TableRowSkeleton
            columns={columns.length}
            rows={pagingData.pageSize}
            avatarInColumns={skeletonAvatarColumns}
            avatarProps={skeletonAvatarProps}
          />
        ) : (
          <TBody {...getTableBodyProps()}>
            {page.length === 0 ? (
              <Tr>
                <Td colSpan={100}>
                  <div className="flex  flex-col justify-center items-center flex-1 min-h-[calc(100vh-400px)]">
                    <NoDataSvg />

                    <div className="flex flex-col gap-1 items-center mt-[21px]">
                      <p className="text-blue-999 text-lg font-bold">
                        No Data Available
                      </p>
                      <p className="text-blue-999">
                        There is no data to show right now
                      </p>
                    </div>
                  </div>
                </Td>
              </Tr>
            ) : (
              page.map((row, i) => {
                prepareRow(row)
                return (
                  <Tr
                    {...row.getRowProps()}
                    className={`${rowClassName?.(row.original) || ""}`}
                  >
                    {row.cells.map((cell, index) => {
                      const type =
                        cell?.column?.Header === "Email" ||
                        cell?.column?.Header === "Description"
                          ? false
                          : true
                      return (
                        <Td
                          {...cell.getCellProps({
                            style: {
                              ...getStickyStyle(
                                cell.column,
                                index,
                                row.cells.map((c) => c.column),
                                false
                              ),
                            },
                          })}
                          className={classNames(
                            `${
                              type && "uppercase"
                            } text-blue-999 border-b border-slate-300`,
                            "group-hover:bg-gray-100/50 dark:group-hover:bg-gray-700/40"
                          )}
                        >
                          {cell.render("Cell")}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })
            )}
          </TBody>
        )}
      </Table>

      <div className="px-5 py-3 flex justify-end mb-5 z-0">
        {showPagination && (
          <Pagination
            pageSize={pageSize}
            currentPage={pageIndex}
            total={total}
            onChange={handlePaginationChange}
          />
        )}

        {showLimitPerPage && (
          <div style={{ minWidth: 130 }}>
            <Select
              className="m-2 text-blue-999"
              size="sm"
              menuPlacement="top"
              isSearchable={false}
              value={pageSizeOption.filter(
                (option) => option.value === pageSize
              )}
              options={pageSizeOption}
              onChange={(option) => handleSelectChange(option.value)}
            />
          </div>
        )}
      </div>
    </Loading>
  )
}

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
  onIndeterminateCheckBoxChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onSort: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  selectable: PropTypes.bool,
  skeletonAvatarColumns: PropTypes.arrayOf(PropTypes.number),
  skeletonAvatarProps: PropTypes.object,
  pagingData: PropTypes.shape({
    total: PropTypes.number,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  autoResetSelectedRows: PropTypes.bool,
  wrapClass: PropTypes.string,
  borderlessRow: PropTypes.bool,
  showPagination: PropTypes.bool,
  showLimitPerPage: PropTypes.bool,
  showHeader: PropTypes.bool,
  rowClassName: PropTypes.func,
}

DataTable.defaultProps = {
  pageSizes: [10, 25, 50, 100, 300, 500, 1000],
  pagingData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  },
  data: [],
  columns: [],
  selectable: false,
  loading: false,
  autoResetSelectedRows: true,
  wrapClass: "",
  borderlessRow: false,
  showPagination: true,
  showLimitPerPage: true,
  showHeader: true,
  rowClassName: () => "",
}

export default DataTable

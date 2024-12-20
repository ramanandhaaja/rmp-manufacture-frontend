import { useCallback, useMemo, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { DataTable, ConfirmDialog } from "components/shared";

import useThemeClass from "utils/hooks/useThemeClass";
import { apiDestroy } from "./api";
import { Button, Dialog, Dropdown, Notification, toast } from "components/ui";
import { FormData } from "./form";
import { PageConfig } from "./config";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FileIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Details } from "./details";
import { useNavigate } from "react-router-dom"
import CardStatus from "components/custom/CardStatus"
import { STATUSCOLORDIVISI } from "constants/status.constant"

dayjs.extend(utc)

const ActionColumn = ({
  row,
  setDialogDeleteOpen,
  setDialogEditOpen,
  setDialogDetailsOpen,
  setRow,
  index,
  length,
}) => {
  const { textTheme } = useThemeClass()

  const onEdit = () => {
    setRow(row)
    setDialogEditOpen(true)
  }

  const onDetails = () => {
    setRow(row)
    setDialogDetailsOpen(true)
  }

  const onDelete = () => {
    setRow(row)
    setDialogDeleteOpen(true)
  }

  const dropdownItems = []

  if (PageConfig.enableDetails) {
    dropdownItems.push({
      key: "Details",
      label: "See Details",
      icon: <FileIcon />,
      className: "hover:" + textTheme,
      onClick: onDetails,
    })
  }

  if (PageConfig.enableEdit) {
    dropdownItems.push({
      key: "Edit",
      label: "Edit",
      icon: <Pencil1Icon />,
      className: "hover:" + textTheme,
      onClick: onEdit,
    })
  }

  if (PageConfig.enableEdit) {
    dropdownItems.push({
      key: "Delete",
      label: "Delete",
      icon: <TrashIcon />,
      className: "hover:text-red-500",
      onClick: onDelete,
    })
  }

  const Btn = (
    <Button
      type="button"
      variant="plain"
      icon={<HiOutlineDotsHorizontal />}
      size="sm"
    />
  )

  return (
    <div>
      {PageConfig.enableActions && (
        <Dropdown
          renderTitle={Btn}
          placement={
            index > 1 && index >= length - PageConfig.maxBottomIndexDropdown
              ? "top-end"
              : "bottom-end"
          }
        >
          {dropdownItems.map((item) => (
            <Dropdown.Item
              key={item.key}
              eventKey={item.key}
              onSelect={item.onClick}
            >
              <div className={`flex gap-2 items-center ${item.className}`}>
                <span className="text-xl opacity-50">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
    </div>
  )
}

export const PageTable = (props) => {
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)
  const [dialogEditOpen, setDialogEditOpen] = useState(false)
  const [dialogDetailsOpen, setDialogDetailsOpen] = useState(false)

  const navigate = useNavigate()

  const [row, setRow] = useState({})
  const { getData, localState } = props

  const columns = useMemo(() => {
    const cols = []

    for (let index = 0; index < PageConfig.listFields.length; index++) {
      const el = PageConfig.listFields[index]
      if (props.checkboxList.includes(el.key)) {
        if (
          ["created_at", "updated_at", "email_verified_at"].includes(el.key)
        ) {
          cols.push({
            Header: el.label,
            accessor: el.key,
            sortable: el.sortable,
            width: el.width,
            sticky: el.sticky,
            Cell: (props) => {
              const row = props.row.original
              return (
                <span>
                  {dayjs.utc(row[el.key]).local().format("YYYY-MM-DD H:mm")}{" "}
                </span>
              )
            },
          })
        } else if (el.type === "id") {
          cols.push({
            Header: el.label,
            accessor: el.key,
            sortable: el.sortable,
            width: el.width,
            sticky: el.sticky,
            Cell: (props) => {
              const row = props.row.original
              return (
                <span
                  className="text-sky-600 text-sm font-bold leading-[21px] cursor-pointer"
                  onClick={() => {
                    navigate(`${PageConfig.url}/detail/${row["id"]}`)
                  }}
                >
                  {row[el.key]}
                </span>
              )
            },
          })
        } else if (el.type === "status") {
          cols.push({
            Header: el.label,
            accessor: el.key,
            sortable: el.sortable,
            width: el.width,
            sticky: el.sticky,
            Cell: (props) => {
              const row = props.row.original
              return (
                <div>
                  <CardStatus
                    className={STATUSCOLORDIVISI[row[el.key]]}
                    title={row[el.key] ? "ACTIVE" : "INACTIVE"}
                    width={152}
                    classMain="w-[152px]"
                  />
                </div>
              )
            },
          })
        } else {
          cols.push({
            Header: el.label,
            accessor: el.key,
            sortable: el.sortable,
            width: el.width,
            sticky: el.sticky,
          })
        }
      }
    }

    if (PageConfig.enableActions) {
      cols.push({
        Header: "",
        id: "action",
        accessor: (row) => row,
        width: "50px",
        // sticky: "right",
        Cell: (props) => {
          return (
            <ActionColumn
              row={props.row.original}
              index={props.row.index}
              length={props.rows.length}
              setRow={setRow}
              setDialogDeleteOpen={setDialogDeleteOpen}
              setDialogEditOpen={setDialogEditOpen}
              setDialogDetailsOpen={setDialogDetailsOpen}
            />
          )
        },
      })
    }

    return cols
  }, [props.checkboxList])

  const metaTable = {
    total: props.localState.meta?.total || 0,
    pageIndex: props.localState.meta?.current_page || 1,
    pageSize: props.localState.meta?.per_page || 10,
  }

  const onPaginationChange = (page) => {
    props.getData({ ...props.localState.params, page: page })
  }

  const onSelectChange = (value) => {
    props.getData({ ...props.localState.params, limit: value, page: 1 })
  }

  const onSort = (sort, sortingColumn) => {
    props.getData({
      ...props.localState.params,
      order_by: sort.key,
      sort_by: sort.order,
      page: 1,
    })
  }

  const onAllRowSelect = useCallback(
    (checked, rows) => {
      if (checked) {
        const originalRows = rows.map((row) => row.original)
        const selectedIds = []

        for (let index = 0; index < originalRows.length; index++) {
          const el = originalRows[index]
          selectedIds.push(el[PageConfig.primaryKey])
        }

        props.setIds(selectedIds)
      } else {
        props.setIds([])
      }
    },
    [props]
  )

  const onCheckBoxChange = (checked, row) => {
    props.setIds((s) => {
      let x = [...s]
      if (checked) {
        x.push(row[PageConfig.primaryKey])
      } else {
        for (let index = 0; index < x.length; index++) {
          const el = x[index]

          if (row[PageConfig.primaryKey] === el) {
            x.splice(index, 1)
          }
        }
      }

      return x
    })
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={props.localState.data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={props.localState?.loading || false}
        pagingData={metaTable}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
        selectable={PageConfig.enableBulkDelete}
        wrapClass="min-h-[360px]"
        onCheckBoxChange={onCheckBoxChange}
        onIndeterminateCheckBoxChange={onAllRowSelect}
        showPagination={PageConfig.enablePagination}
        showLimitPerPage={PageConfig.enableLimitPerPage}
      />
      <ConfirmDialog
        isOpen={dialogDeleteOpen}
        onClose={() => {
          setDialogDeleteOpen(false)
        }}
        onRequestClose={() => {
          setDialogDeleteOpen(false)
        }}
        type="danger"
        title="Delete data"
        onCancel={() => {
          setDialogDeleteOpen(false)
        }}
        onConfirm={async () => {
          try {
            await apiDestroy(row[PageConfig.primaryKey])
            getData({ ...localState.params, page: 1 })
            setDialogDeleteOpen(false)

            toast.push(
              <Notification
                title={"Successfuly Deleted"}
                type="success"
                duration={2500}
              >
                Data successfuly deleted
              </Notification>,
              {
                placement: "top-center",
              }
            )
          } catch (error) {
            toast.push(
              <Notification title={"Error"} type="danger">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong"}
              </Notification>,
              {
                placement: "top-center",
              }
            )
          }
        }}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this data? All record related to this
          data will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>

      <Dialog
        isOpen={dialogDetailsOpen}
        onClose={() => {
          setDialogDetailsOpen(false)
        }}
        onRequestClose={() => {
          setDialogDetailsOpen(false)
        }}
        width={700}
        bodyOpenClassName="dialog-scroll"
      >
        <div className="flex flex-col h-full justify-between">
          <Details
            item={row}
            onDialogClose={() => {
              setDialogDetailsOpen(false)
            }}
          />
        </div>
      </Dialog>

      <Dialog
        isOpen={dialogEditOpen}
        onClose={() => {
          setDialogEditOpen(false)
        }}
        onRequestClose={() => {
          setDialogEditOpen(false)
        }}
        width={700}
        bodyOpenClassName="dialog-scroll"
      >
        <div className="flex flex-col h-full justify-between">
          <FormData
            onDialogClose={() => {
              setDialogEditOpen(false)
            }}
            title="Edit Data"
            getData={props.getData}
            localState={props.localState}
            item={row}
          />
        </div>
      </Dialog>
    </>
  )
}

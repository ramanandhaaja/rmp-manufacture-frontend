import { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button } from "components/ui";
import { formatDate, getCapitalizeType } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import SearchBar from "components/custom/SearchBar";

const AddPoGoodsList = ({
  dataDetailPurchaseOrder,
  setIsOpen,
  dataTableItems,
  handleDeleteItem,
}) => {
  const columns = [
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "goods_id",
      Cell: ({ row }) => row.original.goods_id || "-",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
      Cell: ({ row }) => row.original.goods_name || "-",
    },
    {
      Header: "Departemen",
      accessor: "department_name",
      Cell: ({ row }) => "-",
    },
    {
      Header: "QTY",
      accessor: "quantity",
      Cell: ({ row }) => row.original.quantity || "-",
    },
    {
      Header: "UOM",
      accessor: "measurement",
      Cell: ({ row }) => row.original.measurement || "-",
    },
    {
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <button
            onClick={() => handleDeleteItem(row.original.goods_id)}
            className="cursor-pointer"
          >
            <FiTrash size={24} color="red" />
          </button>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between mt-4">
        <div className="py-3 pt-6">
          <div className="space-y-6 mb-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Nama PO</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchaseOrder.po_name || "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Tipe </p>
                <p className="text-sm text-gray-700">
                  {getCapitalizeType(dataDetailPurchaseOrder.po_type) || "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Kategori</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchaseOrder.category_name || "-"}
                </p>
              </div>
              <div className="flex items-center gap-[37px]">
                <p className="text-sm text-gray-500 w-42">Tanggal Request PO</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchaseOrder.po_date
                    ? formatDate(dataDetailPurchaseOrder.po_date)
                    : "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Departemen</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchaseOrder.departement || "-"}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <p className="text-sm text-gray-500 w-32">Catatan</p>
                <p className="text-sm text-gray-700">
                  {dataDetailPurchaseOrder.note || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-4">
          <div className="flex justify-between my-4">
            <SearchBar placeholder="cari barang" />
            <Button type="button" onClick={() => setIsOpen(true)}>
              <span className="gap-2 flex items-center">
                <FiPlus />
                Tambah Barang
              </span>
            </Button>
          </div>
          <CustomTable data={dataTableItems} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AddPoGoodsList;

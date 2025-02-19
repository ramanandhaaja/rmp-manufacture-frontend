import { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button } from "components/ui";
import { formatDate, getCapitalizeType } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import SearchBar from "components/custom/SearchBar";
import ModalAddDetailProduk from "./ModalAddDetailProduk";

const ListAddDetailProduk = ({
  dataDetailPurchaseOrder,
  setIsOpen,
  dataTableItems,
  handleDeleteItem,
}) => {

  const columns = [
    {
      Header: "Zat Aktif",
      accessor: "zatAktif",
    },
    {
      Header: "Kekuatan",
      accessor: "Kekuatan",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Bentuk Sediaan",
      accessor: "bentukSediaan",
    },
    {
      Header: "Kemasan",
      accessor: "Kemasan",
    },
    {
      Header: "Dosis",
      accessor: "Dosis",
    },
    {
      Header: "Target HNA",
      accessor: "HNA",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <button
            //onClick={() => handleDeleteItem(row.original.goods_id)}
            className="cursor-pointer"
          >
            <FiTrash size={24} color="red" />
          </button>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values) => {
    // Add your logic to handle the new detail produk data
    console.log(values);
  };

  return (
    <>
      <div>
        <div className="py-4">
          <div className="flex justify-between my-4">
          <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
          Detail Produk
        </h2>
            <Button type="button" onClick={() => setIsModalOpen(true)}>
              <span className="gap-2 flex items-center">
                <FiPlus />
                Isi Detail Produk
              </span>
            </Button>
          </div>
          <CustomTable data={dataTableItems} columns={columns} />
        </div>
        <ModalAddDetailProduk
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default ListAddDetailProduk;

import { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button } from "components/ui";
import { formatDate, getCapitalizeType } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import SearchBar from "components/custom/SearchBar";
import ModalAddDetailProduk from "./ModalAddDetailProduk";
import { useSelector } from "react-redux";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";

const ListAddDetailProduk = ({
  dataDetailPurchaseOrder,
  setIsOpen,
  dataTableItems,
  handleDeleteItem,
}) => {
  const { rndRequestId } = useSelector((state) => state.rnd);
  const { getRndProductSubstances, dataRndProductSubstances } =
    useCreateRndReq();
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingSubstance, setIsLoadingSubstance] = useState(false);

  const columns = [
    {
      Header: "Zat Aktif",
      accessor: "active_substance",
    },
    {
      Header: "Kekuatan",
      accessor: "strength",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Bentuk Sediaan",
      accessor: "form",
    },
    {
      Header: "Kemasan",
      accessor: "packaging",
    },
    {
      Header: "Dosis",
      accessor: "dose",
    },
    {
      Header: "Target HNA",
      accessor: "hna_target",
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

  const fetchSubstance = async () => {
    try {
      setIsLoadingSubstance(true);
      const resp = await getRndProductSubstances({
        rnd_request_id: rndRequestId,
      });
      console.log(resp);
      setIsLoadingSubstance(false);
    } catch (error) {
      console.log(error);
      setIsLoadingSubstance(false);
    }
  };

  useEffect(() => {
    if (rndRequestId) fetchSubstance();
  }, [rndRequestId]);

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
          <CustomTable
            data={dataRndProductSubstances}
            columns={columns}
            isLoading={isLoadingSubstance}
          />
        </div>
        <ModalAddDetailProduk
          fetchData={fetchSubstance}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          idRequestRnd={rndRequestId}
        />
      </div>
    </>
  );
};

export default ListAddDetailProduk;

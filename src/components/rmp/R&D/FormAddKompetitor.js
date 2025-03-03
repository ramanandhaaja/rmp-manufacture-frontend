import { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import SearchBar from "components/custom/SearchBar";
import ModalAddKompetitor from "./ModalAddKompetitor";
import { useSelector } from "react-redux";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { toast, Notification } from "components/ui";

const ListAddKompetitor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rndRequestId } = useSelector((state) => state.rnd);
  const [isLoading, setIsLoading] = useState(false);
  const { getCompetitorRndRequest, dataKompetitor, deleteRndCompetitor } =
    useCreateRndReq();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [itemId, setItemId] = useState(null);

  const columns = [
    {
      Header: "Nama",
      accessor: "name",
    },

    {
      Header: "Kekuatan",
      accessor: "strength",
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
      Header: "Aksi",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <button
            onClick={() => {
              setItemId(row.original.id);
              setIsOpenConfirmation(true);
            }}
            className="cursor-pointer"
          >
            <FiTrash size={24} color="red" />
          </button>
        );
      },
    },
  ];

  const fectDataKompetitor = async () => {
    try {
      setIsLoading(true);
      await getCompetitorRndRequest(rndRequestId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fectDataKompetitor();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      setIsLoadingDelete(true);
      const response = await deleteRndCompetitor(id);

      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title={"Kompetitor berhasil dihapus "}
          />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          fectDataKompetitor();
        }, 1000);
      } else {
        toast.push(
          <Notification type="danger" title={"Kompetitor berhasil dihapus "} />,
          {
            placement: "top-center",
          }
        );
        setTimeout(() => {
          fectDataKompetitor();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoadingDelete(false);
        setIsOpenConfirmation(false);
      }, 1000);
    }
  };
  return (
    <>
      <div>
        <div className="py-4">
          <div className="flex justify-between my-4">
            <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
              Kompetitor
            </h2>
            <Button type="button" onClick={() => setIsModalOpen(true)}>
              <span className="gap-2 flex items-center">
                <FiPlus />
                Tambah Kompetitor
              </span>
            </Button>
          </div>
          <CustomTable
            data={dataKompetitor ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        </div>
        <ConfirmationCustom
          isOpen={isOpenConfirmation}
          onClose={() => setIsOpenConfirmation(false)}
          onConfirm={() => handleDeleteItem(itemId)}
          title="Delete Confirmation"
          text="Anda yakin akan menghapus data ini?"
          confirmText="Hapus"
          isLoading={isLoadingDelete}
        />
        <ModalAddKompetitor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          idRequestRnd={rndRequestId}
          fetchData={fectDataKompetitor}
        />
      </div>
    </>
  );
};

export default ListAddKompetitor;

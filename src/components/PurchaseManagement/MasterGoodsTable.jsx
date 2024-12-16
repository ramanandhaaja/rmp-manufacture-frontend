import { MoreVertical, LoaderCircle } from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useState, useEffect } from "react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useSelector } from "react-redux";
import { fetchTipeBarang } from "../../store/vendorManagement/kategoriBarangSlice";
import { useDispatch } from "react-redux";
import useGoods from "../../utils/hooks/useGoods";

const MasterGoodsPurchaseTable = () => {
  const { getGoods, dataMasterGoods, deleteGoods } = useGoods();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.kategoriBarang);

  useEffect(() => {
    const fetchMasterGoodsData = async () => {
      setIsLoading(true);
      const response = await getGoods();

      if (response.status === "failed") {
        setStatus(response.status);
      }
      setIsLoading(false);
    };
    fetchMasterGoodsData();
  }, []);
  useEffect(() => {
    dispatch(fetchTipeBarang({ page: 1, perPage: 20 }));
  }, [dispatch]);

  // useEffect(() => {
  //   // Set totalPages when data changes
  //   if (dataMasterGoods && data.last_page) {
  //     setTotalPages(data.last_page);
  //   }
  // }, [data]);

  const getCategoryValueById = (id) => {
    const category = data?.data?.find((item) => item.id === id);
    return category ? category.name : null;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleDelete = async (id) => {
    setIsLoadingDelete(true);
    try {
      const response = await deleteGoods(id);
      console.log(response);

      if (response.status === "success") {
        setTimeout(() => {
          window.location.reload();
          setIsModalOpen(false);
        }, 1000);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Failed to delete goods:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        Loading <LoaderCircle className="animate-spin" />
      </div>
    );
  if (status === "failed") return <div>{error}</div>;
  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-2 text-left text-indigo-900 text-sm">ID</th>
            <th className="py-3 px-2 text-left text-indigo-900 text-sm">
              Nama Barang
            </th>
            <th className="py-3 px-2 text-left text-indigo-900 text-sm">
              Kategori Barang
            </th>

            <th className="py-3 px-2 text-left text-indigo-900 text-sm">
              Measurement
            </th>
            <th className="py-3 px-2 text-left text-indigo-900 text-sm">
              Deskripsi
            </th>
            <th className="py-3 px-2 text-left text-indigo-900 text-sm"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {dataMasterGoods &&
            dataMasterGoods?.map((goods) => (
              <tr key={goods.id} className="hover:bg-gray-50">
                <td className="py-3 px-2 text-sm">{goods.id}</td>
                <td className="py-3 px-2 text-sm">{goods.name}</td>
                <td className="py-3 px-2 text-sm">
                  {getCategoryValueById(goods.goods_category_id)}
                </td>

                <td className="py-3 px-2 text-sm">{goods.measurement}</td>
                <td className="py-3 px-2 text-sm">{goods.description}</td>

                <td className="py-3 px-2">
                  <PopupMenu
                    items={[
                      {
                        label: "Edit",
                        onClick: () => {
                          navigate(
                            `/purchase-management/edit-master-data-goods/${goods.id}`
                          );
                        },
                      },
                      {
                        label: "Hapus",
                        onClick: () => {
                          setId(goods.id);
                          setIsModalOpen(true);
                        },
                      },
                    ]}
                  >
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </PopupMenu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm">
        <PaginationBtn
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <ConfirmationModal
        title="Anda yakin ingin menghapus barang ini?"
        subtitle="Klik Konfirmasi untuk melanjutkan"
        icon={<Trash size={48} />}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => id && handleDelete(id)}
        loading={isLoadingDelete}
      />
    </div>
  );
};
export default MasterGoodsPurchaseTable;

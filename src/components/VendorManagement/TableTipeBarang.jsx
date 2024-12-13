import { useState, useEffect } from "react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTipeBarang,
  deleteTipeBarang,
} from "../../store/vendorManagement/kategoriBarangSlice";
import ConfirmationModal from "../modal/ConfirmationModal";
import { capitalizeFirstLetter } from "../../utils/helpers";
import usePagination from "../../utils/hooks/usePagination";

const TableTipeBarang = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.kategoriBarang);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(1, 10, totalPages);

  useEffect(() => {
    // Fetch data whenever currentPage or itemsPerPage changes
    dispatch(fetchTipeBarang({ page: currentPage, perPage: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    // Set totalPages when data changes
    if (data && data.last_page) {
      setTotalPages(data.last_page);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTipeBarang(id));
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
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
              Status Barang
            </th>
            <th className="py-3 px-2 text-left text-indigo-900 text-sm"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.data &&
            data.data.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-3 px-2 text-sm">{category.id}</td>
                <td className="py-3 px-2 text-sm">{category.name}</td>
                <td className="py-3 px-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      category.status === "active"
                        ? " bg-green-100 text-green-800"
                        : " bg-gray-100 "
                    }`}
                  >
                    {" "}
                    {capitalizeFirstLetter(category.status)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <PopupMenu
                    items={[
                      {
                        label: "Edit",
                        onClick: () => {
                          navigate(
                            `/vendor-management/edit-tipe-barang/${category.id}`
                          );
                        },
                      },
                      {
                        label: "Hapus",
                        onClick: () => {
                          setId(category.id);
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
      />
    </div>
  );
};

export default TableTipeBarang;

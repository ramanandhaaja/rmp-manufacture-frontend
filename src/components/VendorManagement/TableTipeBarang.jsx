import { useState, useEffect } from "react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTipeBarang } from "../../store/vendorManagement/tipeBarangSlice";
import { deleteTipeBarang } from "../../services/TipeBarangService";
import ConfirmationModal from "../modal/ConfirmationModal";

const TableTipeBarang = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.tipeBarang);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  console.log(id);

  useEffect(() => {
    dispatch(fetchTipeBarang());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteTipeBarang(id);
      dispatch(fetchTipeBarang());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                          console.log("Edit vendor:", category.id);
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
          setCurrentPage={setCurrentPage}
          itemsPerPage={20}
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

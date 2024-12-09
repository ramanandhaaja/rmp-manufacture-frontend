import { useState, useEffect } from "react";
import { MoreVertical, Trash } from "lucide-react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorList } from "../../store/vendorManagement/vendorSlice";
import { deleteVendor } from "../../store/vendorManagement/vendorSlice";
import ConfirmationModal from "../modal/ConfirmationModal";

const VendorTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [vendorId, setVendorId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data, status, error, deleteError } = useSelector(
    (state) => state.vendorList
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data whenever currentPage or itemsPerPage changes
    dispatch(fetchVendorList({ page: currentPage, perPage: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    // Set totalPages when data changes
    if (data && data.last_page) {
      setTotalPages(data.last_page);
    }
  }, [data]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteVendor(id));
      if (response.payload === 204) {
        window.location.reload();
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete vendor:", deleteError);
        alert(`Failed to delete vendor: ${deleteError}`);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete vendor:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">ID</th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Nama Vendor
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Kategori
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">PIC</th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Kontak PIC
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Email PIC
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Status Approval
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data?.data?.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50">
              <td className="py-6 px-4 text-sm">{vendor.id}</td>
              <td className="py-6 px-4 text-sm">{vendor.name}</td>
              <td className="py-6 px-4 text-sm">
                {vendor.goods_category?.join(", ")}
              </td>
              <td className="py-6 px-4 text-sm">{vendor.pic_email}</td>
              <td className="py-6 px-4 text-sm">{vendor.pic_phone}</td>
              <td className="py-6 px-4 text-sm">{vendor.pic_email}</td>
              <td className="py-6 px-4 text-sm ">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                  ${
                    vendor.verification_status === "Menunggu Persetujuan"
                      ? "bg-gray-100 text-gray-800"
                      : vendor.verification_status === "Disetujui"
                      ? "bg-green-100 text-green-800"
                      : vendor.verification_status === "Ditolak"
                      ? "bg-red-100 text-red-800"
                      : vendor.verification_status === "verified"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {vendor.verification_status}
                </span>
              </td>
              <td className="py-3 px-4">
                {/* {vendor.statusApproval == "Menunggu Persetujuan" ? (
                  <PopupMenu
                    items={[
                      {
                        label: "Edit",
                        onClick: () => {
                          console.log("Edit vendor:", vendor.id);
                        },
                      },
                      {
                        label: "Hapus",
                        onClick: () => {
                          console.log("Delete vendor:", vendor.id);
                        },
                      },
                      {
                        label: "Lihat Detail",
                        onClick: () => {
                          navigate(
                            `/vendor-management/detail-vendor/${vendor.id}`
                          );
                        },
                      },
                    ]}
                  >
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </PopupMenu>
                ) : ( */}
                <PopupMenu
                  items={[
                    {
                      label: "Lihat Detail",
                      onClick: () => {
                        navigate(
                          `/vendor-management/detail-vendor/${vendor.id}`
                        );
                      },
                    },
                    {
                      label: "Hapus",
                      onClick: () => {
                        setVendorId(vendor.id);
                        setIsModalOpen(true);
                      },
                    },
                    {
                      label: "Edit",
                      // onClick: () => {
                      //   navigate(
                      //     `/vendor-management/detail-vendor/${vendor.id}`
                      //   );
                      // },
                    },
                  ]}
                >
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </PopupMenu>
                {/* // )} */}
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
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(vendorId)}
          title="Hapus Vendor"
          subtitle="Anda yakin ingin menghapus vendor ini?"
          icon={<Trash size={48} />}
        />
      </div>
    </div>
  );
};

export default VendorTable;

import { useState, useEffect } from "react";
import { MoreVertical, Trash } from "lucide-react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";
import usePurchaseReq from "../../utils/hooks/usePurchaseReq";
import { getPermissionApi } from "../../services/AuthService";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/helpers";

const TablePurchaseRequest = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [vendorId, setVendorId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPurchaseReqList } = usePurchaseReq();
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth.user);
  const userId = 4;
  const userRole = "procurement";
  const pageUrl = "purchase-request";

  // const fetchPurchaseReqData = async () => {
  //   console.log("Fetching purchase request data...");
  //   try {
  //     const response = await getPurchaseReqList();
  //     if (response.data) {
  //       setDataset(response.data);
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.message || errors.toString(),
  //     };
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPurchaseReqList();
      setData(response.data);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchPermissions = async () => {
  //     try {
  //       const params = { userId, userRole, pageUrl };
  //       const response = await getPermissionApi(params);

  //       if (response.success) {
  //         console.log(response.data);
  //         // setPermissions(response.data.permissions); // Adjust based on actual response structure
  //       } else {
  //         setError(response.message || "Failed to fetch permissions");
  //       }
  //     } catch (err) {
  //       setError(err.message || "An error occurred while fetching permissions");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPermissions();
  // }, [userId, userRole, pageUrl]);

  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">ID</th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Item Permintaan
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Tanggal Permintaan
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Tanggal Persetujuan
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Status
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((item, index) => (
            <tr className="hover:bg-gray-50">
              <td className="py-6 px-4 text-sm">{item.id}</td>
              <td className="py-6 px-4 text-sm">{item.total_items}</td>
              <td className="py-6 px-4 text-sm">
                {formatDate(item.request_date)}
              </td>
              <td className="py-6 px-4 text-sm">
                {formatDate(item.approval_date)}
              </td>
              <td className="py-6 px-4 text-sm ">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <PopupMenu
                  items={[
                    {
                      label: "Lihat Detail",
                      onClick: () => {
                        navigate(`#`);
                      },
                    },
                    {
                      label: "Hapus",
                      onClick: () => {},
                    },
                    {
                      label: "Edit",
                      onClick: () => {
                        navigate(`#`);
                      },
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
          onPageChange={"#"}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={"#"}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(vendorId)}
          title="Hapus Permintaan Pembelian"
          subtitle="Anda yakin ingin menghapus permintaan pembelian ini?"
          icon={<Trash size={48} />}
        />
      </div>
    </div>
  );
};

export default TablePurchaseRequest;

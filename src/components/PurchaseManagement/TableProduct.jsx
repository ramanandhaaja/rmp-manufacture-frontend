import { useState, useEffect } from "react";
import { MoreVertical, Trash } from "lucide-react";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";

const TableProduct = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Kode</th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Barang
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              Jenis Barang
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              QTY</th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm">
              UOM
            </th>
            <th className="py-3 px-4 text-left text-indigo-900 text-sm"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          
            <tr className="hover:bg-gray-50">
              <td className="py-6 px-4 text-sm">1</td>
              <td className="py-6 px-4 text-sm">1</td>
              <td className="py-6 px-4 text-sm">11/12/2024</td>
              <td className="py-6 px-4 text-sm">-</td>
              <td className="py-6 px-4 text-sm ">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    Menunggu Persetujuan
                </span>
              </td>
              <td className="py-3 px-4">
                
                <PopupMenu
                  items={[
                    {
                      label: "Lihat Detail",
                      onClick: () => {
                        navigate(
                          `#`
                        );
                      },
                    },
                    {
                      label: "Hapus",
                      onClick: () => {
                      },
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
        </tbody>
      </table>
      
      <div className="mt-4 text-sm">
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

export default TableProduct;

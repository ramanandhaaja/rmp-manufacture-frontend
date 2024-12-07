import { useState } from "react";
import { MoreVertical } from "lucide-react";
import PaginationBtn from "../PaginationBtn";
import PopupMenu from "../PopUpMenu";
import { useNavigate } from "react-router-dom";

const VendorTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dummy data vendor
  const vendors = [
    {
      id: "6266754",
      namaVendor: "PT Krakatau",
      kategori: "Material",
      pic: "Rio Reynaldi",
      kontakPIC: "+62 812 3456 7890",
      emailPIC: "jackson.graham@example.com",
      statusApproval: "Menunggu Persetujuan",
    },
    {
      id: "5236850",
      namaVendor: "PT Merapi",
      kategori: "Material",
      pic: "Mufidah Li Silmi",
      kontakPIC: "+62 823 4567 8901",
      emailPIC: "georgia.young@example.com",
      statusApproval: "Disetujui",
    },
    {
      id: "5262267",
      namaVendor: "PT Gunung Sindur",
      kategori: "Material",
      pic: "Nur Asriah Maysi",
      kontakPIC: "+62 821 2345 6789",
      emailPIC: "deanna.curtis@example.com",
      statusApproval: "Unverified",
    },
    {
      id: "3562756",
      namaVendor: "PT Merbabu",
      kategori: "Non Material",
      pic: "Agung Apriyanto",
      kontakPIC: "+62 822 3456 7890",
      emailPIC: "felicia.reid@example.com",
      statusApproval: "Unverified",
    },
    {
      id: "5637657",
      namaVendor: "PT Rinjani",
      kategori: "Non Material",
      pic: "Iqbal Muzakki",
      kontakPIC: "+62 812 3456 7890",
      emailPIC: "nathan.roberts@example.com",
      statusApproval: "Verified",
    },
    {
      id: "8466754",
      namaVendor: "PT Simelue",
      kategori: "Non Material",
      pic: "Rachmi Isna Fauzia",
      kontakPIC: "+62 823 4567 8901",
      emailPIC: "michelle.rivera@example.com",
      statusApproval: "Verified",
    },
    {
      id: "3545756",
      namaVendor: "PT Barisan",
      kategori: "Non Material",
      pic: "Haliza Rizkianti",
      kontakPIC: "+62 821 2345 6789",
      emailPIC: "jessica.hanson@example.com",
      statusApproval: "Ditolak",
    },
  ];
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
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50">
              <td className="py-6 px-4 text-sm">{vendor.id}</td>
              <td className="py-6 px-4 text-sm">{vendor.namaVendor}</td>
              <td className="py-6 px-4 text-sm">{vendor.kategori}</td>
              <td className="py-6 px-4 text-sm">{vendor.pic}</td>
              <td className="py-6 px-4 text-sm">{vendor.kontakPIC}</td>
              <td className="py-6 px-4 text-sm">{vendor.emailPIC}</td>
              <td className="py-6 px-4 text-sm ">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                  ${
                    vendor.statusApproval === "Menunggu Persetujuan"
                      ? "bg-gray-100 text-gray-800"
                      : vendor.statusApproval === "Disetujui"
                      ? "bg-green-100 text-green-800"
                      : vendor.statusApproval === "Ditolak"
                      ? "bg-red-100 text-red-800"
                      : vendor.statusApproval === "Verified"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {vendor.statusApproval}
                </span>
              </td>
              <td className="py-3 px-4">
                {vendor.statusApproval == "Menunggu Persetujuan" ? (
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
                          navigate("/vendor-management/detail-vendor");
                        },
                      },
                    ]}
                  >
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </PopupMenu>
                ) : (
                  <PopupMenu
                    items={[
                      {
                        label: "Lihat Detail",
                        onClick: () => {
                          navigate("/vendor-management/detail-vendor");
                        },
                      },
                    ]}
                  >
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </PopupMenu>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm">
        <PaginationBtn
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default VendorTable;

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import PaginationBtn from "../PaginationBtn";

const VendorTable = () => {
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-left text-indigo-900">ID</th>
            <th className="py-3 px-4 text-left text-indigo-900">Nama Vendor</th>
            <th className="py-3 px-4 text-left text-indigo-900">Kategori</th>
            <th className="py-3 px-4 text-left text-indigo-900">PIC</th>
            <th className="py-3 px-4 text-left text-indigo-900">Kontak PIC</th>
            <th className="py-3 px-4 text-left text-indigo-900">Email PIC</th>
            <th className="py-3 px-4 text-left text-indigo-900">
              Status Approval
            </th>
            <th className="py-3 px-4 text-left text-indigo-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50">
              <td className="py-6 px-4">{vendor.id}</td>
              <td className="py-6 px-4">{vendor.namaVendor}</td>
              <td className="py-6 px-4">{vendor.kategori}</td>
              <td className="py-6 px-4">{vendor.pic}</td>
              <td className="py-6 px-4">{vendor.kontakPIC}</td>
              <td className="py-6 px-4">{vendor.emailPIC}</td>
              <td className="py-6 px-4 ">
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
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
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

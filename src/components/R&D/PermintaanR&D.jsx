import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import PaginationBtn from "../PaginationBtn";

const PermintaanRnD = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
    <div>
      {/* Table */}
      <table className="w-full ">
        <thead>
          <tr className="bg-gray-50 rounded-lg">
            <th className="py-3 px-4 text-left text-indigo-900 first:rounded-l-lg last:rounded-r-lg">
              PRD
            </th>
            <th className="py-3 px-4 text-left text-indigo-900">Permintaan</th>
            <th className="py-3 px-4 text-left text-indigo-900">Tanggal</th>
            <th className="py-3 px-4 text-left text-indigo-900">Disetujui</th>
            <th className="py-3 px-4 text-left text-indigo-900">Status</th>
            <th className="py-3 px-4 text-left text-indigo-900 first:rounded-l-lg last:rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            {
              id: "109281",
              name: "Vipalbulmin",
              date: "10/03/2023",
              status: "3 / 7",
            },
            {
              id: "109282",
              name: "Heparmin",
              date: "01/02/2023",
              status: "3 / 7",
            },
            {
              id: "109283",
              name: "Vipachol",
              date: "03/10/2023",
              status: "3 / 7",
            },
            {
              id: "109284",
              name: "Astavip",
              date: "08/06/2023",
              status: "3 / 7",
            },
            {
              id: "109285",
              name: "VipaCal",
              date: "02/10/2023",
              status: "Selesai",
            },
            {
              id: "109286",
              name: "ImunoVip",
              date: "04/07/2023",
              status: "Selesai",
            },
            {
              id: "109287",
              name: "Vipiron",
              date: "22/12/2023",
              status: "Selesai",
            },
            {
              id: "109288",
              name: "Kan Gabus",
              date: "16/09/2023",
              status: "Selesai",
            },
          ].map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-4 px-4 text-blue-600">{item.id}</td>
              <td className="py-4 px-4">{item.name}</td>
              <td className="py-4 px-4">{item.date}</td>
              <td className="py-4 px-4">{item.date}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <PaginationBtn
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => setItemsPerPage(value)}
      />
    </div>
  );
};

export default PermintaanRnD;

import React from "react";
import TimelineCustom from "components/custom/TimelineCustom";

//dummy data timeline
const steps = [
  {
    date: "2024-05-19",
    title: "PO [PO0001] ATK Kantor - Bermasalah",
    description: "Lorem Ipsum",
    completed: true,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0002] ATK Kantor - Bermasalah",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0003] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-14",
    title: "PO [PO0004] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-13",
    title: "PO [PO0005] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
  {
    date: "2024-04-12",
    title: "PO [PO0006] ATK Kantor - Baik",
    description: "Lorem Ipsum",
    completed: false,
  },
];

const InformasiPembelian = () => {
  return (
    <>
      <div className="border-b border-gray-500 mb-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Informasi Pembelian
        </h1>
      </div>
      <TimelineCustom />
    </>
  );
};
export default InformasiPembelian;

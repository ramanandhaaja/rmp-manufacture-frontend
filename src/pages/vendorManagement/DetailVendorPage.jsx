import React, { useState, useEffect } from "react";
import Tabs from "../../components/Tabs";

import LayoutRightSpace from "../../components/layout/LayoutRightSpace";
import Timeline from "../../components/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorById } from "../../store/vendorManagement/vendorSlice";
import { useParams } from "react-router-dom";

const DetailVendorPage = () => {
  const [activeTab, setActiveTab] = useState("detail");
  const dispatch = useDispatch();
  const { vendorDetails, status, error } = useSelector(
    (state) => state.vendorList
  );
  const { id } = useParams();

  const documents = [
    { id: 1, name: "Document 1", filename: "dokumen_kelengkapan.pdf" },
    { id: 2, name: "Document 2", filename: "dokumen_kelengkapan.pdf" },
    { id: 3, name: "Document 3", filename: "dokumen_kelengkapan.pdf" },
  ];

  const tabData = [
    { name: "detail", label: "Detail Vendor" },
    { name: "history", label: "Riwayat Vendor" },
  ];
  useEffect(() => {
    dispatch(fetchVendorById(id));
  }, [dispatch, id]);
  console.log(vendorDetails);

  return (
    <LayoutRightSpace>
      <div className="flex gap-2 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          PT Gunung Sindur
        </h1>
        <div className="bg-gray-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
          Menunggu Persetujuan
        </div>
      </div>

      <div className="p-6">
        <Tabs
          tabData={tabData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content */}
        {activeTab === "detail" && (
          <div>
            {/* Vendor Details */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">ID</p>
                  <p className="text-sm">{vendorDetails.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">Nama Vendor</p>
                  <p className="text-sm">{vendorDetails.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">
                    Tipe Barang Vendor
                  </p>
                  <p className="text-sm">{vendorDetails.vendor_type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">PIC</p>
                  <p className="text-sm">{vendorDetails.pic_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">Kontak PIC</p>
                  <p className="text-sm">{vendorDetails.pic_phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">Email PIC</p>
                  <p className="text-sm">{vendorDetails.pic_email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">Alamat</p>
                  <p className="text-sm">{vendorDetails.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-32">Kategori Barang</p>
                  <p className="text-sm">
                    {vendorDetails.goods_category?.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h2 className="text-lg font-medium mb-4">Dokumen Pendukung</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vendorDetails.documents?.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="font-medium">Document{index + 1}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {doc.file_name}
                      </p>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() =>
                          console.log(`Downloading ${doc.file_name}`)
                        }
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <Timeline />
          </div>
        )}
      </div>
    </LayoutRightSpace>
  );
};

export default DetailVendorPage;

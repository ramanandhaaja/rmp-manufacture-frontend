import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import Tabs from "components/ui/Tabs";
import LayoutRightSpace from "components/layout/LayoutRightSpace";
import ModalMock from "components/custom/ModalMock";
import { Notification, toast, Button } from "components/ui";
import useUser from "utils/hooks/useUser";
import { getCapitalizeType } from "utils/helpers";
export const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DetailVendor = () => {
  const [activeTab, setActiveTab] = useState("detail");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { getVendorDetail, dataDetailVendor, setStatusVendor } = useVendor();
  const { userRole } = useUser();
  const { id } = useParams();

  useEffect(() => {
    getVendorDetail(id);
  }, []);

  const handleOptions = () => {
    if (dataDetailVendor.verification_status === "verified") {
      return [
        { label: "Verified", value: "verified" },
        { label: "Not Verified", value: "not_verified" },
      ];
    }
    return [{ label: "Verified", value: "verified" }];
  };

  const handleVerify = async (values) => {
    const payload = values.verification_status?.value;
    const response = await setStatusVendor(id, {
      verification_status: payload,
    });
    if (response.status === "error") {
      toast.push(
        <Notification
          type="danger"
          title={"Terjadi kesalahan. Gagal verifikasi vendor"}
        />,
        {
          placement: "top-center",
        }
      );
      setIsModalOpen(false);
    }
    toast.push(
      <Notification type="success" title={"Berhasil verifikasi vendor"} />,
      {
        placement: "top-center",
      }
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // const handleSave = (values) => {
  //   console.log(values);
  //   console.log("Selected status:", values.verification_status?.value);
  //   setIsModalOpen(false);
  // };

  return (
    <LayoutRightSpace>
      <div className="flex gap-2 mt-2 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          {dataDetailVendor.name}
        </h1>

        {dataDetailVendor.verification_status === "verified" && (
          <div className="bg-blue-200 text-blue-800 h-8 px-3 py-1 rounded-lg text-sm">
            Verified
          </div>
        )}
        {dataDetailVendor.verification_status === "unverified" && (
          <div className="bg-gray-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
            Unverified
          </div>
        )}
      </div>
      <div className="relative">
        <div className="absolute -top-10 right-20">
          {/* <Button
            onClick={() => setIsModalOpen(true)}
            title={
              dataDetailVendor.verification_status === "verified"
                ? "Ubah Verifikasi"
                : "Verifikasi Vendor"
            }
            color="bg-indigo-900 text-white"
          /> */}
          {userRole.includes("procurement") && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="solid"
              className="text-white"
            >
              {dataDetailVendor.verification_status === "verified"
                ? "Ubah Verifikasi"
                : "Verifikasi Vendor"}
            </Button>
          )}
        </div>
      </div>

      <div className="p-3">
        <Tabs value={activeTab} onChange={setActiveTab} variant="underline">
          <Tabs.TabList>
            <Tabs.TabNav value="detail">Detail Vendor</Tabs.TabNav>
            <Tabs.TabNav value="history">Riwayat Vendor</Tabs.TabNav>
          </Tabs.TabList>
          <Tabs.TabContent value="detail">
            {activeTab === "detail" && (
              <div className="pt-4">
                {/* Vendor Details */}
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">ID</p>
                      <p className="text-sm">{dataDetailVendor.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">Nama Vendor</p>
                      <p className="text-sm">{dataDetailVendor.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">
                        Tipe Barang Vendor
                      </p>
                      <p className="text-sm">
                        {getCapitalizeType(dataDetailVendor.vendor_type)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">PIC</p>
                      <p className="text-sm">{dataDetailVendor.pic_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">Kontak PIC</p>
                      <p className="text-sm">{dataDetailVendor.pic_phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">Email PIC</p>
                      <p className="text-sm">{dataDetailVendor.pic_email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">Alamat</p>
                      <p className="text-sm">{dataDetailVendor.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 w-32">
                        Kategori Barang
                      </p>
                      <p className="text-sm">
                        {dataDetailVendor.goods_category?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div>
                  <h2 className="text-lg font-medium mb-4">
                    Dokumen Pendukung
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dataDetailVendor.documents?.map((doc, index) => (
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
                            {doc.file_name.split("/").pop().length > 20
                              ? `${doc.file_name
                                  .split("/")
                                  .pop()
                                  .substring(0, 20)}...`
                              : doc.file_name.split("/").pop()}
                          </p>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => {
                              const fileName = doc.file_name.split("/").pop();
                              const link = document.createElement("a");
                              link.href = `${REACT_APP_BASE_URL}/${doc.file_name}`;
                              link.download = fileName;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
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
          </Tabs.TabContent>
          <Tabs.TabContent value="history">
            {activeTab === "history" && <div>{/* <Timeline /> */}</div>}
          </Tabs.TabContent>
        </Tabs>
        {/* Content */}
      </div>
      <ModalMock
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleVerify}
        title="Update Status"
        options={handleOptions()}
        fieldName="verification_status"
        label="Status"
      />
    </LayoutRightSpace>
  );
};

export default DetailVendor;

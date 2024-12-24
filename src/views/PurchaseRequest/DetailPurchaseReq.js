import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "utils/helpers";
import CustomTable from "components/custom/CustomTable";
import useMasterGoods from "utils/hooks/useMasterGoods";
import { findDepartement } from "utils/helpers";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";

const DetailPurchaseReq = () => {
  const navigate = useNavigate();
  const { dataDetailPurchase, getDetailPurchaseReq } = usePurchaseReq();
  const { getGoodsDetail, detailGoods } = useMasterGoods();
  const { id } = useParams();

  const columns = [
    {
      Header: "Kode",
      accessor: "id",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
    },
    {
      Header: "Kategori Barang",
      accessor: "goods_category_name",
    },
    {
      Header: "QTY",
      accessor: "quantity",
    },
    {
      Header: "UOM",
      accessor: "measurement",
    },
  ];

  useEffect(() => {
    getDetailPurchaseReq(id);
  }, [id]);

  return (
    <LayoutRightSpace>
      <div className="flex justify-between">
        <div className="flex gap-2  ">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Permintaan Pembelian Detail
          </h1>

          {dataDetailPurchase.status === "approved" && (
            <div className="bg-blue-200 text-blue-800 h-8 px-3 py-1 rounded-lg text-sm">
              Disetujui
            </div>
          )}
          {dataDetailPurchase.status === "unverified" && (
            <div className="bg-red-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
              Ditolak
            </div>
          )}
          {dataDetailPurchase.status === "waiting" && (
            <div className="bg-gray-200 text-gray-700 h-8 px-3 py-1 rounded-lg text-sm">
              Menunggu Persetujuan
            </div>
          )}
        </div>
        <Button
          onClick={() =>
            navigate(`/purchase/request/detail/informasi-pembelian/${id}`)
          }
          variant="solid"
          className="text-white"
        >
          Informasi Pembelian
        </Button>
      </div>
      <div className="border-b border-gray-400 my-2"></div>

      <div className="py-3 pt-6">
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-10">
              <p className="text-sm text-gray-500 w-32">ID</p>
              <p className="text-sm text-gray-700">
                {dataDetailPurchase.id || "-"}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-sm text-gray-500 w-32">Departemen</p>
              <p className="text-sm text-gray-700">
                {findDepartement(dataDetailPurchase.department_id) || "-"}
              </p>
            </div>
            <div className="flex items-center gap-11">
              <p className="text-sm text-gray-500 w-42">Tanggal Pengajuan</p>
              <p className="text-sm text-gray-700">
                {dataDetailPurchase.request_date
                  ? formatDate(dataDetailPurchase.request_date)
                  : "-"}
              </p>
            </div>
            <div className="flex items-center gap-[37px]">
              <p className="text-sm text-gray-500 w-42">Tanggal Persetujuan</p>
              <p className="text-sm text-gray-700">
                {dataDetailPurchase.approval_date
                  ? formatDate(dataDetailPurchase.approval_date)
                  : "-"}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-sm text-gray-500 w-32">Dibeli Oleh</p>
              <p className="text-sm text-gray-700">
                {dataDetailPurchase.buyer || "-"}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-sm text-gray-500 w-32">Catatan</p>
              <p className="text-sm text-gray-700">
                {dataDetailPurchase.notes || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CustomTable columns={columns} data={dataDetailPurchase.items} />
      </div>
    </LayoutRightSpace>
  );
};

export default DetailPurchaseReq;

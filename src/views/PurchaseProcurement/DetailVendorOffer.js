import LayoutRightSpace from "components/layout/LayoutRightSpace";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { Notification, toast } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import DetailOfferPayment from "views/PurchaseProcurement/DetailOfferPayment";
import { formatNumber } from "utils/helpers";

const DetailVendorOffer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { getDetailVendorOffer, dataOfferPoVendors, dataDetailPurchaseOrder } =
    usePurchaseOrder(id);
  const vendorDetail = dataOfferPoVendors?.vendor_detail;
  const vendorItems = dataOfferPoVendors?.items;
  const deliveryCost = dataOfferPoVendors?.delivery_cost;
  const totalOfferedPrice = vendorItems.reduce(
    (sum, item) => sum + item.offered_price,
    0
  );
  const totalAdditionalCost = dataOfferPoVendors?.costs?.reduce(
    (sum, item) => sum + item.cost_value,
    0
  );
  const grandTotal = totalOfferedPrice + totalAdditionalCost + deliveryCost;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getDetailVendorOffer(id);

        if (response.status === "failed") {
          toast.push(
            <Notification
              type="danger"
              title="Terjadi gangguan, gagal memuat data"
              description={response.message}
            />,
            {
              placement: "top-center",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching PO details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getPayementMethod = (method) => {
    if (method === "pay_in_full") {
      return "Bayar Lunas";
    } else {
      return "Bayar Sebagian";
    }
  };

  const columns = [
    {
      Header: "ID Pembelian",
      accessor: "purchase_request_id",
    },
    {
      Header: "Kode",
      accessor: "goods_id",
    },
    {
      Header: "Barang",
      accessor: "goods_name",
    },
    {
      Header: "QTY",
      accessor: "quantity",
    },
    {
      Header: "UOM",
      accessor: "measurement",
    },
    {
      Header: "Harga Penawaran",
      accessor: "offered_price",
      Cell: ({ row }) => {
        return formatNumber(row.original.offered_price);
      },
    },
  ];

  return (
    <LayoutRightSpace>
      <div className=" px-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Detail PO: {dataDetailPurchaseOrder?.po_number} -{" "}
          {dataDetailPurchaseOrder?.po_name}
        </h1>
        <div className="border-b border-gray-400 my-2"></div>

        <div className="flex justify-between">
          <div className="py-3 pt-6">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
              Detail Penawaran
            </h2>
            <div className="space-y-6 mb-8">
              {isLoading ? (
                <TextBlockSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">
                      Metode Pembayaran
                    </p>
                    <p className="text-sm text-gray-700">
                      {dataOfferPoVendors?.payments?.map((item) =>
                        getPayementMethod(item.payment_method)
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">
                      Alamat Pengiriman
                    </p>
                    <p className="text-sm text-gray-700">
                      {dataOfferPoVendors?.delivery_address || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">PIC</p>
                    <p className="text-sm text-gray-700">
                      {vendorDetail.vendor_pic_name || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Kontak PIC</p>
                    <p className="text-sm text-gray-700">
                      {vendorDetail.vendor_pic_phone || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Email PIC</p>
                    <p className="text-sm text-gray-700">
                      {vendorDetail.vendor_pic_email || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Departemen</p>
                    <p className="text-sm text-gray-700">
                      {dataOfferPoVendors?.department || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500 w-32">Alamat</p>
                    <p className="text-sm text-gray-700">
                      {vendorDetail.vendor_address || "-"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-4">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Dokumen Penawaran
          </h2>
          {dataOfferPoVendors?.offering_document ? (
            <div className="border border-gray-400 rounded-lg p-2 w-[320px]">
              {dataOfferPoVendors?.offering_document}
            </div>
          ) : (
            <p className="text-sm text-gray-700">Belum ada dokumen penawaran</p>
          )}
        </div>
        <div className="py-4">
          <CustomTable data={vendorItems} columns={columns} />
        </div>
        <div className="border-b border-gray-400 my-2"></div>

        <div className="py-4">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Detail Pembayaran
          </h2>
          <div>
            {isLoading ? (
              <TextBlockSkeleton />
            ) : (
              <DetailOfferPayment
                dataOfferPoVendors={dataOfferPoVendors}
                totalOfferedPrice={totalOfferedPrice}
                deliveryCost={deliveryCost}
                totalAdditionalCost={totalAdditionalCost}
                grandTotal={grandTotal}
              />
            )}
          </div>
        </div>
      </div>
    </LayoutRightSpace>
  );
};

export default DetailVendorOffer;

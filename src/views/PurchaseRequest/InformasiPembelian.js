import { useEffect, useState } from "react";
import TimelineCustom from "components/custom/TimelineCustom";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { NoDataSvg } from "assets/svg";

const InformasiPembelian = () => {
  const { getProcurementLog } = usePurchaseOrder();
  const [logData, setLogData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProcurementLog({ purchase_request_id: id });
      console.log(response.data);
      setLogData(response.data);
    };
    fetchData();
  }, []);

  const transformLogsToTimelineData = (logs) => {
    return logs.map((log) => ({
      date: log.created_at,
      title: log.log_name,
      description: log.log_description,
      completed: true,
    }));
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg min-h-full">
        <div className="border-b border-gray-500 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Informasi Pembelian
          </h1>
        </div>
        {logData.length === 0 && (
          <div className="flex  flex-col justify-center items-center ">
            <NoDataSvg />

            <div className="flex flex-col gap-1 items-center mt-[21px]">
              <p className="text-blue-999 text-lg font-bold">Belum Ada Data</p>
              <p className="text-blue-999">
                Data informasi pembelian belum tersedia
              </p>
            </div>
          </div>
        )}
        <TimelineCustom steps={transformLogsToTimelineData(logData)} />
      </div>
    </>
  );
};
export default InformasiPembelian;

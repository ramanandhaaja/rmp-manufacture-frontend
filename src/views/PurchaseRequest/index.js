import PurchaseRequestList from "components/rmp/PurchaseRequest/PurchaseRequestList";
import usePurchaseReq from "utils/hooks/PurchaseRequest/usePurchaseRequest";

const Page = () => {
  const { getPurchaseReqList, dataPurchase } = usePurchaseReq();

  return (
    <div>
      <div className="border-b border-gray-500 mb-4">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Purchase Request
        </h1>
      </div>
      <PurchaseRequestList />
    </div>
  );
};

export default Page;

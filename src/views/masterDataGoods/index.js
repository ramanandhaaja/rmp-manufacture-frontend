import PurchaseGoodsList from "components/rmp/masterDataGoods/PurchaseGoodsList";

const Page = () => {
  return (
    <div>
      <div className="border-b border-gray-500 mb-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Master Barang
        </h1>
      </div>
      <PurchaseGoodsList />
    </div>
  );
};

export default Page;

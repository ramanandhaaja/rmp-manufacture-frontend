import GoodsCategoryList from "components/rmp/masterDataGoodsCategory/GoodsCategoryList";

const Page = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="border-b border-gray-500 mb-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Master Kategori Barang
        </h1>
      </div>
      <GoodsCategoryList />
    </div>
  );
};

export default Page;

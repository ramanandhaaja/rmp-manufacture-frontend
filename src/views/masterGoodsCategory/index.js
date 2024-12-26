import GoodsCategoryList from "components/rmp/masterDataGoodsCategory/GoodsCategoryList";

const Page = () => {
  return (
    <div>
      <div className="border-b border-gray-500 mb-4 ">
        <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
          Master KategoriBarang
        </h1>
      </div>
      <GoodsCategoryList />
    </div>
  );
};

export default Page;

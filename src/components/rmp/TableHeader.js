import { Button } from "components/ui";
import SearchBar from "components/custom/SearchBar";

const TableHeader = ({
  onClickAdd,
  onClickFilter,
  onClickImport,
  onClickExport,
  addBtnTitle,
  showBtnAdd = true,
}) => {
  return (
    <div className="flex justify-between mb-6">
      <div className="flex items-center gap-2">
        <SearchBar placeholder="Search vendor" />
        <Button onClick={onClickFilter}>Filter</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onClickImport}>Import</Button>
        <Button onClick={onClickExport}>Export</Button>
        {showBtnAdd && (
          <Button onClick={onClickAdd} variant="solid" className="text-white">
            {addBtnTitle} <span className="text-lg">+</span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default TableHeader;

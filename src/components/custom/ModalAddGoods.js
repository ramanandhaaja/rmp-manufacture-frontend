import SearchBar from "components/custom/SearchBar";
import CustomTable from "components/custom/CustomTable";
import { Dialog } from "components/ui";
import Notification from "components/ui/Notification";
import { getCapitalizeType } from "utils/helpers";

const ModalAddGoods = ({ ...props }) => {
  const {
    isOpen,
    onClose,
    data,
    column,
    category,
    type,
    showNotification,
    dataItemAdded,
  } = props;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={900}
      contentClassName="p-4"
    >
      <div className="py-5">
        <div className="py-2">
          <h2 className="text-xl font-semibold">Tambah Barang</h2>
          <div className="py-2">
            <p className="text-base text-gray-500">Kategori: {category} </p>
            <p className="text-base text-gray-500">
              {" "}
              Tipe: {getCapitalizeType(type)}
            </p>
          </div>
        </div>
        <div className="flex justify-center pb-3">
          {showNotification && (
            <Notification
              duration={5000}
              //   onClose={showNotification}
              type="info"
              closable={true}
              width={780}
              className="text-gray-700 text-base"
            >
              {dataItemAdded.goods_id}-{dataItemAdded.goods_name} berhasil
              ditambahkan ke {dataItemAdded.po_number}-{dataItemAdded.po_name}
            </Notification>
          )}
        </div>
        <div className="flex justify-between my-4">
          <SearchBar placeholder="cari barang" />
        </div>
        <CustomTable data={data} columns={column} />
      </div>
    </Dialog>
  );
};

export default ModalAddGoods;

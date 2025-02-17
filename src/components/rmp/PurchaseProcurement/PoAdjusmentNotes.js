import TextBlockSkeleton from "components/shared/loaders/TextBlockSkeleton";
import { formatDate } from "utils/helpers";

const PoAdjusmentNotes = ({ data, isLoading }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {isLoading ? (
        <TextBlockSkeleton />
      ) : (
        <>
          {data?.map((item, index) => (
            <>
              <div className="flex items-center">
                <p className="text-sm font-bold mb-2">
                  {formatDate(item.created_at)}
                </p>
              </div>
              <div>
                <div className="p-4">
                  <p className="text-sm font-bold text-gray-500">
                    Catatan Adjustment
                  </p>
                  <p className=" text-gray-700 mt-2">{item.note}</p>
                  {/* <p className=" text-xs text-gray-700 mt-2">BOD user</p> */}
                </div>
              </div>
              <div>
                <div className="p-4 mb-4">
                  <p className="text-sm font-bold text-gray-500">Balasan</p>
                  <p className="text-gray-700">
                    baik bu, untuk harganya sudah di negosiasikan kembali,
                    silahkan di cek
                  </p>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default PoAdjusmentNotes;

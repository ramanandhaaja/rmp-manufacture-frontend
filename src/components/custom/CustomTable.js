import TableRowSkeleton from "components/shared/loaders/TableRowSkeleton";
import { NoDataSvg } from "assets/svg";

const CustomTable = ({ data, columns, onEdit, onDelete, isLoading }) => {
  return (
    <table className="w-full">
      {isLoading ? (
        TableRowSkeleton
      ) : (
        <>
          <thead>
            <tr className="bg-gray-50">
              {columns?.map((column) => (
                <th
                  key={column.accessor}
                  className="py-3 px-4 text-center text-indigo-900 text-sm"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white w-full">
            {(!data || data.length === 0) && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 px-4 text-center text-gray-700"
                >
                  <div className="flex  flex-col justify-center items-center ">
                    <NoDataSvg />

                    <div className="flex flex-col gap-1 items-center mt-[21px]">
                      <p className="text-blue-999">Belum Ada Data</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {data?.length > 0 &&
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="py-6 px-4 text-gray-700 text-sm text-center"
                    >
                      {column.Cell
                        ? column.Cell({ row: { original: item } })
                        : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </>
      )}
    </table>
  );
};

export default CustomTable;

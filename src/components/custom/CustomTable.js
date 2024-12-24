const CustomTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          {columns?.map((column) => (
            <th
              key={column.accessor}
              className="py-3 px-4 text-left text-indigo-900 text-sm"
            >
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white w-full">
        {data?.map((item, index) => (
          <tr key={item.id} className="hover:bg-gray-50 ">
            {columns.map((column) => (
              <td
                key={column.accessor}
                className="py-6 px-4 text-gray-700 text-sm text-left"
              >
                {column.Cell
                  ? column.Cell({ row: { original: item } })
                  : item[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CustomTable;

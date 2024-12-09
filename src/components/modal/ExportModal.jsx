import { File, X } from "lucide-react";

const ExportModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[450px] flex flex-col p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-gray-900">Export Data</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={15} />
          </button>
        </div>

        <p className="text-gray-600 my-6 text-center">
          Payment data is about to Exported. You can Choose PDF or XLS format
        </p>

        <div className="flex flex-col gap-3">
          <div className="mb-4 space-y-2">
            <button
              onClick={() => onConfirm("pdf")}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Download PDF</span>
              <File size={20} />
            </button>

            <button
              onClick={() => onConfirm("xls")}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Download XLS</span>
              <File size={20} />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 mt-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;

import { CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/statusErrorSlice";

const ErrorModal = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.errorStatus);

  const handleClose = () => {
    dispatch(clearError());
  };
  if (!isError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[450px] h-[326px] flex flex-col items-center justify-center p-8">
        <div className="mb-4">
          <CircleX size={48} />
        </div>

        <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
          Maaf terjadi kesalahan
        </h2>

        <p className="text-gray-600 text-center mb-8">{message}</p>

        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className="w-[186px]  py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

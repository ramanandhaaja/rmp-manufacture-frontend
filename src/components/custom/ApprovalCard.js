import { FiCalendar, FiUser, FiRefreshCcw } from "react-icons/fi";
import { Button } from "components/ui";
import { useRef } from "react";

const ApprovalCard = ({
  handleStatusUpdate,
  isLoading = false,
  onOpenConfirmModal,
  onOpenNoteModal,
  data,
}) => {
  const buttonConfig = {
    revision: {
      label: "Ajukan Revisi",
      status: "revised",
      modalTitle:
        "Apakah Anda yakin ingin mengirim kembali permintaan ini sebagai revisi?",
      className:
        "w-full mb-4 py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50",
      requiresNote: true,
    },
    reject: {
      label: "Menolak",
      status: "rejected",
      modalTitle: "Apakah anda yakin ingin menolak data ini?",
      className:
        "flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50",
      requiresNote: true,
    },

    approve: {
      label: "Setuju",
      status: "approved",
      modalTitle: "Apakah Anda yakin ingin menyetujui data ini?",
      className:
        "flex-1 py-2 px-4  text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50",
      requiresNote: false,
    },
  };
  const handleButtonClick = (config) => {
    if (config.requiresNote) {
      onOpenNoteModal({
        title: config.modalTitle,
        subtitle: config.modalMessage,
        icon: config.icon,
        status: config.status,
        onSave: (values) => handleStatusUpdate(config.status, values.note),
      });
    } else {
      onOpenConfirmModal(config.modalTitle, config.modalMessage, () =>
        handleStatusUpdate(config.status)
      );
    }
  };

  return (
    <div className="max-w-sm p-3 rounded-lg border border-gray-200 shadow-sm bg-white">
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <FiCalendar size={16} />
        <span className="text-sm">Pembaruan Terakhir : </span>
      </div>

      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <FiUser size={16} />
        <span className="text-sm">PIC : </span>
      </div>

      <Button
        size="sm"
        onClick={() => handleButtonClick(buttonConfig.revision)}
        className={buttonConfig.revision.className}
      >
        <FiRefreshCcw size={10} />
        <span>Ajukan Revisi</span>
      </Button>

      <div className="flex gap-1">
        <Button
          size="sm"
          onClick={() => handleButtonClick(buttonConfig.reject)}
          className={buttonConfig.reject.className}
        >
          {buttonConfig.reject.label}
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => handleButtonClick(buttonConfig.approve)}
          className={buttonConfig.approve.className}
        >
          {buttonConfig.approve.label}
        </Button>
      </div>
    </div>
  );
};

export default ApprovalCard;

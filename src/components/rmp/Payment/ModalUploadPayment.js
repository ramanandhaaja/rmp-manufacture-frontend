import { useState } from "react";
import { Button, Dialog, toast, Notification } from "components/ui";
import Upload from "components/ui/Upload";
import { AiOutlineUpload } from "react-icons/ai";

const ModalUploadPayment = ({
  title = "Upload Bukti Pembayaran & Delivery Order",
  subtitle = "Silahkan upload bukti pembayaran yang sah beserta dengan Delivery Order yang sudah di tanda tangan",
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  disableCancel = false,
  buttonType = "button",
  width = 500,
  contentClassName = "p-8 rounded-2xl bg-white",
  paymentMethod = "",
  closable = false,
}) => {
  const [files, setFiles] = useState({
    payment: null,
    delivery: null,
    sales: null,
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleFileChange = (type) => (e) => {
    const file = e[0];
    if (file) {
      // 20MB limit
      if (file.size > 20 * 1024 * 1024) {
        toast.push(
          <Notification type="danger" title="File tidak boleh melebihi 20MB" />
        );
        return;
      }

      const allowedTypes = ["application/pdf", "pdf", ".pdf"];
      const fileExtension = file.name.toLowerCase().split(".").pop();
      const isValidType =
        allowedTypes.includes(file.type) || fileExtension === "pdf";

      if (!isValidType) {
        toast.push(
          <Notification
            type="danger"
            title="Hanya file PDF yang diperbolehkan"
          />
        );
        return;
      }

      setFiles((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleFileRemove = (type) => {
    setFiles((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleConfirm = () => {
    if (!files.payment) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    onConfirm(files);
  };

  const renderUploadField = (type, label) => (
    <div className="mb-6">
      <p className="font-medium mb-2 text-black">
        {label == "Bukti Pembayaran" ? "Bukti Pembayaran*" : label}
      </p>
      <Upload
        accept=".pdf"
        multiple={false}
        fileList={files[type] ? [files[type]] : []}
        uploadLimit={1}
        onChange={handleFileChange(type)}
        onFileRemove={() => handleFileRemove(type)}
        draggable={!files[type]}
        showList={files[type]}
        showUploadButton={false}
      >
        {!files[type] && (
          <div className="flex flex-col items-center justify-center h-32  hover:bg-gray-50 transition-colors">
            <AiOutlineUpload className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm mb-2">
              Unggah File (PDF max 20mb)
            </p>
            <Button size="sm" className="w-28">
              Telusuri File
            </Button>
          </div>
        )}
      </Upload>
    </div>
  );

  return (
    <Dialog
      closable={closable}
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={width}
      contentClassName={contentClassName}
    >
      <div className="flex flex-col h-full">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2 text-sm">{subtitle}</p>
        </div>

        <div className="flex-1">
          {showWarning && (
            <span className="text-xs text-red-500">
              Bukti pembayaran harus di upload
            </span>
          )}
          {renderUploadField("payment", "Bukti Pembayaran")}

          {paymentMethod == "Bayar Sebagian" && (
            <>
              {renderUploadField("sales", "Sales Order")}
              {renderUploadField("delivery", "Delivery Order")}
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 pt-4">
          <Button
            type="button"
            onClick={onClose}
            disabled={disableCancel}
            className="w-32 h-10"
          >
            Batal
          </Button>
          <Button
            loading={isLoading}
            type={buttonType}
            variant="solid"
            onClick={handleConfirm}
            className="w-32 h-10"
          >
            {isLoading ? "Loading..." : "Konfirmasi"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalUploadPayment;

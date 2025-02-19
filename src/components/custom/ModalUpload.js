import { useState } from "react";
import { Button, Dialog, toast, Notification } from "components/ui";
import Upload from "components/ui/Upload";
import { AiOutlineUpload } from "react-icons/ai";

const ModalUpload = ({
  title,
  subtitle,
  showDownloadTitle,
  isOpen,
  onClose,
  isMultiple = false,
  onConfirm,
  isLoading = false,
  disableCancel = false,
  buttonType = "button",
  width = 500,
  contentClassName = "p-5 rounded-2xl bg-white",
  showDownload = false,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e[0];

    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB limit
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

      setUploadedFile(file);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={width}
      contentClassName={contentClassName}
    >
      <div className="flex flex-col h-full">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        {showDownload && (
          <div className="mb-4">
            <Button className="w-full">{showDownloadTitle}</Button>
          </div>
        )}
        <div className="flex-1">
          <Upload
            accept=".pdf"
            multiple={isMultiple}
            fileList={uploadedFile ? [uploadedFile] : []}
            uploadLimit={1}
            onChange={handleFileChange}
            onFileRemove={handleFileRemove}
            draggable={true}
            showList={uploadedFile}
          >
            <div className="flex flex-col items-center justify-center h-[200px] rounded-lg hover:bg-gray-100 transition-colors">
              <AiOutlineUpload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">Unggah File (PDF max 20mb)</p>
              <Button size="sm" className="w-32">
                Telusuri File
              </Button>
            </div>
          </Upload>
        </div>
        <div className="flex justify-center items-center gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
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
            onClick={() => onConfirm(uploadedFile)}
            className="w-32 h-10"
          >
            {isLoading ? "Loading..." : "Konfirmasi"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalUpload;

import { useState } from "react";
import { Button, Dialog } from "components/ui";
import Upload from "components/ui/Upload";
import { AiOutlineUpload } from "react-icons/ai";

const ModalUpload = ({
  isOpen,
  onClose,
  isMultiple = false,
  onConfirm,
  isLoading = false,
  disableCancel = false,
  buttonType = "button",
  width = 500,
  contentClassName = "p-5 rounded-2xl",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (newFiles, oldFiles) => {
    setUploadedFiles(newFiles);
  };

  const handleFileRemove = (removedFiles) => {
    setUploadedFiles(removedFiles);
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={width}
      contentClassName={contentClassName}
    >
      <div className="p-2 h-[300px]">
        <div className="flex flex-col justify-center items-center py-4 ">
          <h2 className="text-xl font-semibold ">Unggah Bukti Pembayaran</h2>
          <p>Silahkan unggah bukti pembayaran yang sah</p>
        </div>

        <Upload
          accept=".jpg,.png,.pdf"
          multiple={isMultiple}
          fileList={uploadedFiles}
          uploadLimit={5}
          onChange={handleFileChange}
          onFileRemove={handleFileRemove}
          draggable={true}
        >
          <div className=" flex flex-col justify-center items-center h-[200px] gap-2">
            <AiOutlineUpload size={40} />
            <p> Unggah File (PDF max 20mb)</p>
            <Button size="sm"> Telusuri File </Button>
          </div>
        </Upload>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <Button
          type="button"
          variant="default"
          onClick={onClose}
          disabled={disableCancel}
          className="ltr:mr-2 rtl:ml-2 !bg-transparent !w-[120px] !h-10"
        >
          Batal
        </Button>
        <Button
          loading={isLoading}
          type={buttonType}
          size="md"
          variant="solid"
          onClick={onConfirm}
          className="!w-[120px] !h-10"
        >
          Konfirmasi
        </Button>
      </div>
    </Dialog>
  );
};

export default ModalUpload;

import { Upload, Button, toast, Notification } from "components/ui";
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { beforeUploadFile } from "utils/helpers";

const PraFormulasi = ({
  title,
  subtitle,
  btnNext = "Selanjutnya",
  btnPrev = "Batal",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const { id, idProcess } = useParams();
  const { postRndPraFormulasi } = useProcessRnd();
  const navigate = useNavigate();
  const location = useLocation();
  const [documentName, setDocumentName] = useState("");

  const handleNextNavigate = () => {
    const isQttp = location.pathname.includes("qttp");
    const isCma = location.pathname.includes("cma");
    const isCqa = location.pathname.includes("cqa");
    const isCpp = location.pathname.includes("cpp");
    const isTechnicalFeasibility = location.pathname.includes(
      "technical-feasibility"
    );

    if (isQttp) {
      navigate(
        `/research-development/pra-formulasi/cma/${id}/process/${idProcess}`
      );
    }
    if (isCma) {
      navigate(
        `/research-development/pra-formulasi/cqa/${id}/process/${idProcess}`
      );
    }
    if (isCqa) {
      navigate(
        `/research-development/pra-formulasi/cpp/${id}/process/${idProcess}`
      );
    }
    if (isCpp) {
      navigate(
        `/research-development/pra-formulasi/technical-feasibility/${id}/process/${idProcess}`
      );
    }
    if (isTechnicalFeasibility) {
      navigate(`/research-development/detail-permintaan/${id}`);
    }
  };

  const handleFileChange = (newFiles) => {
    // Validate files before setting them
    const validationResult = beforeUploadFile(newFiles);

    if (validationResult !== true) {
      toast.push(<Notification type="danger" title={validationResult} />, {
        placement: "top-center",
        width: 600,
      });
      return;
    }

    setFiles(newFiles);
  };

  // Handle next button click
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const validationResult = beforeUploadFile(files);
    if (validationResult !== true) {
      toast.push(<Notification type="danger" title={validationResult} />, {
        placement: "top-center",
        width: 600,
      });
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append each file to FormData
      formData.append("rnd_request_id", Number(id));
      formData.append("rnd_process_detail_id", Number(idProcess));
      files.forEach((file, index) => {
        formData.append(`document_file`, file);
        formData.append(`document_name`, documentName);
      });

      const response = await postRndPraFormulasi(formData);

      if (response.status == "failed") {
        toast.push(
          <Notification
            title={"Maaf terjadi kesalahan, gagal unggah dokumen"}
            type="danger"
          />,
          {
            placement: "top-center",
          }
        );
        return;
      }

      toast.push(
        <Notification title={"Berhasil unggah dokumen"} type="success" />,
        {
          placement: "top-center",
        }
      );

      console.log("Files uploaded successfully");
      setTimeout(() => {
        handleNextNavigate();
      }, 2000);

      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    navigate(`/research-development/detail-permintaan/${id}`);
  };

  return (
    <>
      <div className="border-b border-gray-500 mb-4 ">
        <div className=" flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-indigo-900 mb-4">
            Pra Formulasi - {title}
          </h1>
          <Button
            disabled={isSubmitting || !files.length}
            onClick={handleSubmit}
            variant="solid"
            color="blue-500"
            size="md"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="block space-y-4 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{subtitle}</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-semibold">Dokumentasi {title}</p>
            <Upload
              buttonText="Unggah"
              multiple={true}
              uploadLimit={3}
              onChange={handleFileChange}
              showList={true}
              accept="image/jpeg,image/png"
            />
            <p className="text-gray-400">
              Format: PNG, JPG, or JPEG maksimal 20 MB
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold">Nama Dokumentasi </p>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Masukkan nama dokumen"
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end mt-20 gap-2">
        <Button onClick={handlePrev}>{btnPrev}</Button>
        <Button
          variant="solid"
          onClick={handleNextNavigate}
          loading={isSubmitting}
          disabled={isSubmitting || !files.length}
        >
          {btnNext}
        </Button>
      </div>
    </>
  );
};

export default PraFormulasi;

import { Formik, Form } from "formik";
import {
  Upload,
  Button,
  FormItem,
  FormContainer,
  Input,
  Notification,
  toast,
} from "components/ui";
import { RiFileLine } from "react-icons/ri";
import * as Yup from "yup";
import useRnd from "utils/hooks/Rnd/useCreateRndReq";
import { forwardRef } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  documents: Yup.array()
    // .min(1, "Minimal satu dokumen harus diunggah")
    .max(3, "Maksimal tiga dokumen"),
});

const FormDokumenReferensi = forwardRef(({ onSubmit, isLoading }, ref) => {
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        documents: [],
        name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => {
        const handleFileChange = (files) => {
          // Convert FileList or array to array for consistent handling
          const fileArray = Array.isArray(files) ? files : [files[0]];

          // Early return if no files
          if (!fileArray.length) return;

          // File validation
          for (const file of fileArray) {
            // Size validation (20MB limit)
            if (file.size > 20 * 1024 * 1024) {
              toast.push(
                <Notification
                  type="danger"
                  title="File tidak boleh melebihi 20MB"
                />,
                {
                  placement: "top-center",
                }
              );
              return;
            }

            // PDF type validation
            const allowedTypes = ["application/pdf", "pdf", ".pdf"];
            const fileExtension = file.name.toLowerCase().split(".").pop();
            const isValidType =
              allowedTypes.includes(file.type) || fileExtension === "pdf";

            if (!isValidType) {
              toast.push(
                <Notification
                  type="danger"
                  title="Hanya file PDF yang diperbolehkan"
                />,
                {
                  placement: "top-center",
                }
              );
              return;
            }
          }

          // Check for existing files to prevent duplicates
          const existingFileNames =
            values.documents?.map((doc) => doc.fileName) || [];

          // Filter out duplicates
          const uniqueNewFiles = fileArray.filter(
            (file) => !existingFileNames.includes(file.name)
          );

          // Calculate remaining slots (3 file limit)
          const currentDocuments = values.documents || [];
          const remainingSlots = 3 - currentDocuments.length;
          const filesToAdd = uniqueNewFiles.slice(0, remainingSlots);

          if (filesToAdd.length === 0) return;

          // Process files with additional metadata
          const filesWithMetadata = filesToAdd.map((file) => ({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            documentName: values.name,
            file: file,
          }));

          // Update form values - create a new array instead of spreading
          const updatedDocuments = [...currentDocuments];
          filesWithMetadata.forEach((newFile) => {
            // Double-check for duplicates before adding
            if (
              !updatedDocuments.some((doc) => doc.fileName === newFile.fileName)
            ) {
              updatedDocuments.push(newFile);
            }
          });

          setFieldValue("documents", updatedDocuments);
          setFieldValue("name", "");
        };

        const handleRemoveDocument = (index) => {
          const newDocuments = values.documents.filter((_, i) => i !== index);
          setFieldValue("documents", newDocuments);
        };

        return (
          <Form>
            <FormContainer className="mt-10">
              <h2 className="text-xl font-semibold text-indigo-900 mt-4 mb-4">
                Upload Dokumen Referensi
              </h2>
              <FormItem
                label="Nama Dokumen"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Masukan nama dokumen"
                  value={values.name}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                />
              </FormItem>
              <FormItem
                invalid={errors.documents && touched.documents}
                errorMessage={errors.documents}
              >
                <Upload
                  disabled={values.name.length === 0}
                  accept=".pdf"
                  multiple={true}
                  uploadLimit={3}
                  draggable={true}
                  onChange={handleFileChange}
                  showList={false}
                >
                  <div className="flex flex-col items-center justify-center h-48 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="text-gray-600 mb-2">
                      Unggah File (PDF max 20mb)
                    </p>
                    <Button size="sm" className="w-32">
                      Telusuri File
                    </Button>
                  </div>
                </Upload>
              </FormItem>

              <div className="flex flex-wrap gap-4 py-4">
                {values.documents.map((doc, index) => (
                  <div key={index} className="py-4">
                    <h2 className="text-base font-semibold mb-4">
                      {doc.documentName || "Dokumen Referensi"}
                    </h2>
                    <div className="relative border border-gray-400 rounded-lg p-2 w-80 flex items-center gap-1 group">
                      <RiFileLine size={18} />
                      <span className="truncate">{doc.fileName}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(index)}
                        className="absolute right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
});

export default FormDokumenReferensi;

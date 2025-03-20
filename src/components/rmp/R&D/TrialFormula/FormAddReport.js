import { Formik, Form, Field } from "formik";
import { useEffect, useState, useMemo } from "react";
import {
  Notification,
  toast,
  Button,
  Input,
  FormItem,
  FormContainer,
  Upload,
} from "components/ui";
import * as Yup from "yup";
import useProcessRnd from "utils/hooks/Rnd/useProcessRnd";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ConfirmationCustom from "components/custom/ConfirmationCustom";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  reports: Yup.array().of(
    Yup.object().shape({
      raw_material_id: Yup.number().required("Raw Material is required"),
      percentage: Yup.number()
        .required("Percentage is required")
        .min(0, "Percentage must be at least 0")
        .max(100, "Percentage cannot exceed 100"),
      mi: Yup.number().required("MI is required"),
      smallest_unit: Yup.number().required("Smallest Unit is required"),
      weight: Yup.number().required("Weight is required"),
    })
  ),
  procedures: Yup.array().of(
    Yup.object().shape({
      procedure: Yup.string().required("Procedure is required"),
    })
  ),
  specifications: Yup.array()
    .of(
      Yup.object().shape({
        quality_parameter: Yup.string().required(
          "Quality Parameter is required"
        ),
        condition: Yup.string().required("Condition is required"),
        result: Yup.string().required("Result is required"),
      })
    )
    .min(1, "At least one specification is required"),
  conclusion: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required("Kesimpulan is required"),
    })
  ),
});

const FormAddReport = ({ dataTrial, isEdit }) => {
  const dataMaterial = dataTrial?.rnd_trial_formulation_details;
  const [documentInputs, setDocumentInputs] = useState([]);
  const { postTrialFormulationReports, getDetailTrialFormulationsReport } =
    useProcessRnd();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [dataReport, setDataReport] = useState(null);

  const fecthDataReport = async () => {
    const response = await getDetailTrialFormulationsReport(id);
    setDataReport(response.data);
  };
  console.log(dataReport);
  useEffect(() => {
    if (isEdit) {
      fecthDataReport();
    }
  }, [isEdit]);

  const initialValues = useMemo(() => {
    if (isEdit) {
      return {
        reports: dataMaterial?.map((material) => ({
          raw_material_id: material.raw_material_id,
          percentage: null,
          mi: null,
          smallest_unit: null,
          weight: null,
        })),
        procedures: [
          {
            procedure: "",
          },
        ],
        specifications: [
          {
            quality_parameter: "",
            condition: "",
            result: "",
          },
        ],
        conclusion: [
          {
            text: "",
          },
        ],
        documents: [{ file: "", description: "" }],
      };
    }
    return {
      reports: dataMaterial?.map((material) => ({
        raw_material_id: material.raw_material_id,
        percentage: null,
        mi: null,
        smallest_unit: null,
        weight: null,
      })),
      procedures: [
        {
          procedure: "",
        },
      ],
      specifications: [
        {
          quality_parameter: "",
          condition: "",
          result: "",
        },
      ],
      conclusion: [
        {
          text: "",
        },
      ],
      documents: [{ file: "", description: "" }],
    };
  }, [dataTrial]);

  const removeDocumentInput = (index) => {
    setDocumentInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const validateFiles = (files) => {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    // Convert FileList or array to Array for easier processing
    const filesArray = Array.from(files);

    // Check each file
    for (const file of filesArray) {
      console.log("Validating file:", file.name, "Type:", file.type);

      if (!allowedTypes.includes(file.type)) {
        return `File "${file.name}" is not supported. Please upload PDF, DOC, DOCX, or XLSX files only.`;
      }

      if (file.size > maxSize) {
        return `File "${file.name}" exceeds 5MB limit.`;
      }
    }

    return true;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      let requestData;

      if (values.documents && values.documents.length > 0) {
        // If there are documents, use FormData
        const formData = new FormData();

        // Append the trial formulation ID
        formData.append("rnd_trial_formulation_id", id);

        // Append arrays as individual items instead of JSON strings
        values.reports.forEach((report, index) => {
          Object.keys(report).forEach((key) => {
            formData.append(`reports[${index}][${key}]`, report[key]);
          });
        });

        values.procedures.forEach((procedure, index) => {
          formData.append(
            `procedures[${index}][procedure]`,
            procedure.procedure
          );
        });

        values.specifications.forEach((spec, index) => {
          Object.keys(spec).forEach((key) => {
            formData.append(`specifications[${index}][${key}]`, spec[key]);
          });
        });

        values.conclusion.forEach((item, index) => {
          formData.append(`conclusion[${index}][text]`, item.text);
        });

        // Append documents
        values.documents.forEach((doc, index) => {
          if (doc.file) {
            formData.append(`documents[${index}][file]`, doc.file);
          }
          if (doc.description) {
            formData.append(
              `documents[${index}][description]`,
              doc.description
            );
          }
        });

        requestData = formData;
      } else {
        // If no documents, send as JSON
        requestData = {
          rnd_trial_formulation_id: id,
          reports: values.reports,
          procedures: values.procedures,
          specifications: values.specifications,
          conclusion: values.conclusion,
        };
      }

      const response = await postTrialFormulationReports(
        requestData,
        // Add config object for FormData requests
        values.documents?.length > 0
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : undefined
      );

      if (response.status === "success") {
        toast.push(
          <Notification title="Berhasil menambahkan laporan" type="success" />,
          { placement: "top-center" }
        );
        setTimeout(() => {
          setIsOpen(false);
          navigate(-1);
        }, 1500);
      } else {
        toast.push(
          <Notification title="Gagal menambahkan laporan" type="danger" />,
          { placement: "top-center" }
        );
        throw new Error("Response status was not success");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.push(
        <Notification
          title="Maaf terjadi kesalahan, gagal ajukan laporan"
          type="danger"
        />,
        { placement: "top-center" }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        submitForm,
        values,
      }) => {
        useEffect(() => {
          // Set raw_material_id values after component mounts
          if (dataMaterial && dataMaterial.length > 0) {
            dataMaterial.forEach((material, index) => {
              setFieldValue(
                `reports[${index}].raw_material_id`,
                material.raw_material_id
              );
            });
          }
        }, [dataMaterial, setFieldValue]);

        const handleFileChange = (newFiles, setFieldValue) => {
          // Validate files before setting them
          const validationResult = validateFiles(newFiles);
          console.log(validationResult);
          if (validationResult !== true) {
            toast.push(
              <Notification type="danger" title={validationResult} />,
              {
                placement: "top-center",
                width: 600,
              }
            );
            return;
          }

          // Set the files in the document inputs state
          setDocumentInputs(newFiles);

          // Important: Update Formik's documents field
          const documentsArray = newFiles.map((file) => ({
            file: file,
            description: "",
          }));

          setFieldValue("documents", documentsArray);
        };

        return (
          <Form>
            <FormContainer className="w-full max-w-3xl mx-auto p-4  bg-white rounded shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-medium text-gray-700">Formula</h2>
                </div>
              </div>

              {dataMaterial?.map((data, index) => (
                <div key={index} className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Bahan Aktif
                  </h3>
                  <div className="mb-6">
                    <div className="flex flex-wrap -mx-2 mb-3">
                      <div className="w-full px-2 mb-3 text-base space-y-1">
                        <p className="font-medium text-gray-700">
                          {data.raw_material.raw_material_name}
                        </p>
                        <p>{data.raw_material.raw_material_code}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-2 items-center">
                      <div className="w-full md:w-1/4 px-2 mb-3">
                        <FormItem
                          label="Persentase (%)"
                          className="w-full"
                          invalid={
                            touched.reports?.[index]?.percentage &&
                            errors.reports?.[index]?.percentage
                          }
                          errorMessage={errors.reports?.[index]?.percentage}
                        >
                          <Field
                            name={`reports[${index}].percentage`}
                            type="number"
                            placeholder="Input"
                            component={Input}
                          />
                        </FormItem>
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-3">
                        <FormItem
                          label="MI"
                          className="w-full"
                          invalid={
                            touched.reports?.[index]?.mi &&
                            errors.reports?.[index]?.mi
                          }
                          errorMessage={errors.reports?.[index]?.mi}
                        >
                          <Field
                            name={`reports[${index}].mi`}
                            type="number"
                            placeholder="Input"
                            component={Input}
                          />
                        </FormItem>
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-3">
                        <FormItem
                          label="Satuan Terkecil"
                          className="w-full"
                          invalid={
                            touched.reports?.[index]?.smallest_unit &&
                            errors.reports?.[index]?.smallest_unit
                          }
                          errorMessage={errors.reports?.[index]?.smallest_unit}
                        >
                          <Field
                            name={`reports[${index}].smallest_unit`}
                            type="number"
                            placeholder="Input"
                            component={Input}
                          />
                        </FormItem>
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-3">
                        <FormItem
                          label="Bobot"
                          className="w-full"
                          invalid={
                            touched.reports?.[index]?.weight &&
                            errors.reports?.[index]?.weight
                          }
                          errorMessage={errors.reports?.[index]?.weight}
                        >
                          <Field
                            name={`reports[${index}].weight`}
                            type="text"
                            placeholder="Input"
                            component={Input}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Prosedur
                </h3>

                {values.procedures.map((_, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex -mx-2 mb-3">
                      <FormItem
                        label=""
                        className="w-full"
                        invalid={
                          touched.procedures?.[index]?.procedure &&
                          errors.procedures?.[index]?.procedure
                        }
                        errorMessage={errors.procedures?.[index]?.procedure}
                      >
                        <Field
                          name={`procedures[${index}].procedure`}
                          type="text"
                          placeholder="Input prosedur"
                          component={Input}
                        />
                      </FormItem>
                      <Button
                        size="sm"
                        variant="plain"
                        onClick={() => {
                          const newProcedures = values.procedures.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("procedures", newProcedures);
                        }}
                      >
                        <FiTrash size={18} color="red" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pb-4">
                  <Button
                    type="button"
                    className="w-full"
                    icon={<FiPlus />}
                    onClick={() => {
                      const currentValues = values.procedures;
                      setFieldValue(`procedures`, [
                        ...currentValues,
                        { procedure: "" },
                      ]);
                    }}
                  >
                    Tambah Prosedur
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Spesifikasi
                </h3>

                {values?.specifications.map((_, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex flex-wrap mx-2 items-center">
                      <FormItem
                        label="Parameter Mutu"
                        className="px-2"
                        invalid={
                          touched.specifications?.[index]?.quality_parameter &&
                          errors.specifications?.[index]?.quality_parameter
                        }
                        errorMessage={
                          errors.specifications?.[index]?.quality_parameter
                        }
                      >
                        <Field
                          name={`specifications[${index}].quality_parameter`}
                          type="text"
                          placeholder="Input"
                          component={Input}
                        />
                      </FormItem>

                      <FormItem
                        label="Persyaratan"
                        className="px-2"
                        invalid={
                          touched.specifications?.[index]?.condition &&
                          errors.specifications?.[index]?.condition
                        }
                        errorMessage={errors.specifications?.[index]?.condition}
                      >
                        <Field
                          name={`specifications[${index}].condition`}
                          type="text"
                          placeholder="Input"
                          component={Input}
                        />
                      </FormItem>

                      <FormItem
                        label="Hasil"
                        className="px-2"
                        invalid={
                          touched.specifications?.[index]?.result &&
                          errors.specifications?.[index]?.result
                        }
                        errorMessage={errors.specifications?.[index]?.result}
                      >
                        <Field
                          name={`specifications[${index}].result`}
                          type="text"
                          placeholder="Input"
                          component={Input}
                        />
                      </FormItem>
                      <Button
                        size="sm"
                        variant="plain"
                        onClick={() => {
                          const newSpecs = values.specifications.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("specifications", newSpecs);
                        }}
                      >
                        <FiTrash size={18} color="red" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pb-4">
                  <Button
                    type="button"
                    className="w-full"
                    icon={<FiPlus />}
                    onClick={() => {
                      const currentValues = values.specifications;
                      setFieldValue(`specifications`, [
                        ...currentValues,
                        { quality_parameter: "", condition: "", result: "" },
                      ]);
                    }}
                  >
                    Tambah Spesifikasi
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Kesimpulan
                </h3>

                {values.conclusion.map((_, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex -mx-2 mb-3">
                      <FormItem
                        label=""
                        className="w-full px-2"
                        invalid={
                          touched.conclusion?.[index]?.text &&
                          errors.conclusion?.[index]?.text
                        }
                        errorMessage={errors.conclusion?.[index]?.text}
                      >
                        <Field
                          name={`conclusion[${index}].text`}
                          type="text"
                          placeholder="Input kesimpulan"
                          component={Input}
                        />
                      </FormItem>
                      <Button
                        size="sm"
                        variant="plain"
                        onClick={() => {
                          const newSpecs = values.conclusion.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("conclusion", newSpecs);
                        }}
                      >
                        <FiTrash size={18} color="red" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pb-4">
                  <Button
                    type="button"
                    className="w-full"
                    icon={<FiPlus />}
                    onClick={() => {
                      const currentValues = values.conclusion;
                      setFieldValue(`conclusion`, [
                        ...currentValues,
                        { text: "" },
                      ]);
                    }}
                  >
                    Tambah Kesimpulan
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Upload Lampiran Pendukung
                </h3>
                <Upload
                  buttonText="Unggah"
                  multiple={true}
                  onChange={(files) => handleFileChange(files, setFieldValue)}
                  max={3}
                  //   fileList={documentInputs ? [documentInputs] : []}
                  showList={true}
                  accept=".pdf,.doc,.docx,.xlsx"
                  onFileRemove={(index) => {
                    const newDocuments = values.documents.filter(
                      (_, i) => i !== index
                    );
                    setFieldValue("documents", newDocuments);
                    removeDocumentInput(index);
                  }}
                />
                <p>Format: pdf,doc,docx,xlsx maksimal 5 MB</p>
              </div>
            </FormContainer>
            <div className="flex justify-end gap-2 pt-6">
              <Button type="button">Batal</Button>
              <Button
                variant="solid"
                type="button"
                onClick={() => setIsOpen(true)}
              >
                Ajukan
              </Button>
            </div>
            <ConfirmationCustom
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              showCancelBtn
              showSubmitBtn
              onConfirm={() => {
                submitForm();
              }}
              confirmText="Konfirmasi"
              title={"Ajukan Report Trial Formula?"}
              titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
              text="Pastikan data yang anda masukan sudah benar"
              textClass="text-slate-500 text-base"
              isLoading={isSubmitting}
              disableCancel={false}
              buttonType="submit"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormAddReport;

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import capitalize from "components/ui/utils/capitalize";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the vendor name"),
  vendor_type: Yup.string()
    .min(1, "Please select at least one vendor type")
    .required("Please select a vendor type"),
  pic_name: Yup.string().required("Please enter the PIC name"),
  pic_phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Please enter the PIC phone"),
  pic_email: Yup.string()
    .email("Invalid email")
    .required("Please enter the PIC email"),
  address: Yup.string().required("Please enter the address"),
  goods_category: Yup.array()
    .min(1, "Please select at least one category")
    .required("Please select at least one category"),
});

const INITIAL_VALUES = {
  name: "",
  vendor_type: "",
  pic_name: "",
  pic_phone: "",
  pic_email: "",
  address: "",
  goods_category: [],
  documents: [],
};

const FormVendor = forwardRef(({ setFormData, initialData, isEdit }, ref) => {
  const [documentInputs, setDocumentInputs] = useState([]);
  const formikRef = useRef();
  const { getGoodsCategory, dataGoodsCategory } = useGoodsCategory();
  const [key, setKey] = useState(0);

  const addDocumentInput = () => {
    if (documentInputs.length < 5) {
      setDocumentInputs((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          file: null,
        },
      ]);
    }
  };

  const removeDocumentInput = (index) => {
    setDocumentInputs((prev) => prev.filter((_, i) => i !== index));

    const currentValues = formikRef.current.values;

    const formData = new FormData();

    const updatedDocuments = documentInputs.filter((_, i) => i !== index);

    formikRef.current.setFieldValue(
      "documents",
      updatedDocuments.map((doc) => ({
        file: doc.file,
        description: doc.description,
        file_name: doc.existingFile,
      }))
    );
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB limit
        alert("File size should not exceed 20MB");
        return;
      }
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed");
        return;
      }

      setDocumentInputs((prevInputs) => {
        const newInputs = [...prevInputs];
        newInputs[index] = { ...newInputs[index], file: file };
        return newInputs;
      });

      // Update Formik form values
      const currentDocuments = formikRef.current.values.documents || [];
      const updatedDocuments = [...currentDocuments];
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        file: file,
      };
      formikRef.current.setFieldValue("documents", updatedDocuments);
    }
  };

  const handleDescriptionChange = (index, value) => {
    setDocumentInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = {
        ...newInputs[index],
        description: value,
      };
      return newInputs;
    });
    const currentDocuments = formikRef.current.values.documents || [];
    const updatedDocuments = [...currentDocuments];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      description: value,
    };
    formikRef.current.setFieldValue("documents", updatedDocuments);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        // For edit, create a JSON structure
        const payload = {
          id: values.id,
          name: values.name,
          goods_category: values.goods_category,
          vendor_type: values.vendor_type,
          pic_name: values.pic_name,
          pic_phone: values.pic_phone,
          pic_email: values.pic_email,
          address: values.address,
          status: values.status,
          verification_status: values.verification_status,

          documents: documentInputs
            .map((input) => {
              if (input.file) {
                // For new files
                return {
                  file_name: `vendor_documents/${input.file.name}`,
                  description: input.description || "",
                };
              } else if (input.existingFile) {
                // For existing files
                return {
                  file_name: input.existingFile,
                  description: input.description || "",
                };
              }
              return null;
            })
            .filter(Boolean), // Remove null entries
        };

        // If there are new files, we need to send as FormData
        const hasNewFiles = documentInputs.some((input) => input.file);

        if (hasNewFiles) {
          const formData = new FormData();

          // Add the JSON payload
          formData.append("payload", JSON.stringify(payload));

          // Add new files separately
          documentInputs.forEach((input, index) => {
            if (input.file) {
              formData.append(`files[${index}]`, input.file);
            }
          });

          setFormData(formData);
        } else {
          // If no new files, just send the JSON payload
          setFormData(payload);
        }
      } else {
        // For create (POST), use FormData as before
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "documents" && !Array.isArray(values[key])) {
            formData.append(key, values[key]);
          } else if (Array.isArray(values[key]) && key !== "documents") {
            values[key].forEach((item) => {
              formData.append(`${key}[]`, item);
            });
          }
        });

        documentInputs.forEach((input, index) => {
          if (input.file) {
            formData.append(`documents[${index}][file]`, input.file);
            formData.append(
              `documents[${index}]`,
              JSON.stringify({
                file_name: `vendor_documents/${input.file.name}`,
                description: input.description || "",
              })
            );
          }
        });

        setFormData(formData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      if (formikRef.current) {
        formikRef.current.submitForm();
      }
    },
  }));

  useEffect(() => {
    getGoodsCategory({ all: true });
  }, []);

  // Reset the form when initialData changes
  useEffect(() => {
    if (formikRef.current && initialData) {
      // Initialize form values
      formikRef.current.resetForm({
        values: {
          ...initialData,
          // Ensure documents array is properly initialized
          documents: initialData.documents || [],
        },
      });

      // Initialize document inputs for edit mode
      if (isEdit && initialData?.documents) {
        const documentInputsData = initialData.documents.map((doc, index) => ({
          id: index + 1,
          file: null, // No file initially since it's existing
          description: doc.description || "",
          existingFile: doc.file_name, // Store the existing file name
        }));
        setDocumentInputs(documentInputsData);
      }

      setKey((prev) => prev + 1);
    }
  }, [initialData, isEdit]);

  const vendorTypeOptions = [
    { value: "material", label: "Material" },
    { value: "non-material", label: "Non-Material" },
  ];

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialData ? initialData : INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, isSubmitting, values }) => (
        <Form className="space-y-6">
          <FormContainer>
            {/* Vendor Name */}
            <FormItem
              label={
                <span>
                  Nama Vendor <span>*</span>
                </span>
              }
              invalid={errors.name && touched.name}
              errorMessage={errors.name}
            >
              <Field
                type="text"
                name="name"
                placeholder="Masukan nama vendor"
                component={Input}
                uppercase={false}
              />
            </FormItem>

            {/* Goods Category */}
            <FormItem
              label={
                <span>
                  Kategori Barang <span>*</span>
                </span>
              }
              invalid={errors.goods_category && touched.goods_category}
              errorMessage={errors.goods_category}
            >
              <Select
                name="goods_category"
                options={dataGoodsCategory?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                isMulti
                value={values.goods_category?.map((category) => ({
                  value: category,
                  label: category,
                }))}
                placeholder="Pilih kategori barang"
                onChange={(options) => {
                  const labels = options.map((option) => option.label);
                  setFieldValue("goods_category", labels);
                }}
              />
            </FormItem>

            {/* Vendor Type */}
            <FormItem
              label={
                <span>
                  Tipe Barang Vendor <span>*</span>
                </span>
              }
              invalid={errors.vendor_type && touched.vendor_type}
              errorMessage={errors.vendor_type}
            >
              <Select
                name="vendor_type"
                options={vendorTypeOptions.map((type) => ({
                  value: type.value,
                  label: type.label,
                }))}
                value={
                  values.vendor_type
                    ? {
                        value: values.vendor_type,
                        label: capitalize(values.vendor_type),
                      }
                    : null
                }
                placeholder="Select Vendor Type"
                onChange={(options) => {
                  if (options) {
                    setFieldValue("vendor_type", options.value); // Set the selected value
                  } else {
                    setFieldValue("vendor_type", ""); // Reset if no option is selected
                  }
                }}
              />
            </FormItem>

            {/* PIC */}
            <FormItem
              label={
                <span>
                  PIC Name <span>*</span>
                </span>
              }
              invalid={errors.pic_name && touched.pic_name}
              errorMessage={errors.pic_name}
            >
              <Field
                type="text"
                name="pic_name"
                placeholder="Masukan nama PIC vendor"
                component={Input}
                uppercase={false}
              />
            </FormItem>

            {/* PIC Contact and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem
                label={
                  <span>
                    PIC Phone <span>*</span>
                  </span>
                }
                invalid={errors.pic_phone && touched.pic_phone}
                errorMessage={errors.pic_phone}
              >
                <Field
                  type="text"
                  name="pic_phone"
                  placeholder="Masukan nomor telepon vendor"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
              <FormItem
                label={
                  <span>
                    PIC Email <span>*</span>
                  </span>
                }
                invalid={errors.pic_email && touched.pic_email}
                errorMessage={errors.pic_email}
              >
                <Field
                  type="email"
                  name="pic_email"
                  placeholder="Masukan email vendor"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>
            </div>

            {/* Address */}
            <FormItem
              label={
                <span>
                  Address <span>*</span>
                </span>
              }
              invalid={errors.address && touched.address}
              errorMessage={errors.address}
            >
              <Field
                as="textarea"
                rows="4"
                name="address"
                placeholder="Alamat vendor"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </FormItem>

            {/* Document Upload */}
            <FormItem
              label="Documents (optional)"
              invalid={errors.documents && touched.documents}
              errorMessage={errors.documents}
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Anda hanya dapat menambahkan maksimal 5 dokumen pendukung
                </p>
                <Button
                  type="button"
                  onClick={addDocumentInput}
                  disabled={documentInputs.length >= 5}
                  icon={<FiPlus />}
                >
                  Add Document
                </Button>
              </div>

              {documentInputs.map((input, index) => (
                <div key={input.id} className="mb-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-28"
                      placeholder={input.existingFile || "document name"}
                      value={input.file?.name || ""}
                    />
                    <label className="absolute right-1 px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      Browse File
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeDocumentInput(index)}
                      className="absolute right-36 px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: PDF, JPG, PNG with maximum size 20 MB
                  </p>

                  <div className="py-2">
                    <textarea
                      placeholder="Description"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={input.description || ""}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});
export default FormVendor;

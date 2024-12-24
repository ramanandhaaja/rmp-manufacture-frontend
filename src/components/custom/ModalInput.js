import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const InputModal = forwardRef(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      icon,
      subtitle,
      isLoading = false,
      inputFields = [],
      defaultValues = {},
      dataGoodsCategory,
      dataMasterGoods,
      measurementUnits,
      onSave,
    },
    ref
  ) => {
    const [filteredGoods, setFilteredGoods] = useState([]);

    useEffect(() => {
      // Set initial filtered goods to all goods
      setFilteredGoods(dataMasterGoods);
    }, [dataMasterGoods]);

    const handleSubmit = (values, { resetForm }) => {
      onSave(values);
      resetForm();
    };

    // Dynamically generate validation schema based on inputFields
    const generateValidationSchema = () => {
      const schema = {};
      inputFields.forEach((field) => {
        if (field.type === "select") {
          schema[field.name] = Yup.object().nullable();
          if (field.required) {
            schema[field.name] = schema[field.name].required(
              field.errorMessage || "This field is required"
            );
          }
        } else if (field.type === "text") {
          // Start with nullable string schema
          schema[field.name] = Yup.string().nullable();
          if (field.required) {
            // If required, add required validation but keep it nullable
            if (field.name === "quantity") {
              schema[field.name] = schema[field.name]
                .required(field.errorMessage || "This field is required")
                .matches(/^[0-9]+$/, "Quantity must be a number");
            } else {
              schema[field.name] = schema[field.name].required(
                field.errorMessage || "This field is required"
              );
            }
          }
        }
      });
      return Yup.object().shape(schema);
    };

    // Generate initial values from inputFields and defaultValues
    const generateInitialValues = () => {
      const initialValues = {};
      inputFields.forEach((field) => {
        if (field.type === "text") {
          // Initialize text fields with empty string instead of null
          initialValues[field.name] = defaultValues[field.name] || "";
        } else if (field.type === "select") {
          // Keep select fields as null initially
          initialValues[field.name] = defaultValues[field.name] || null;
        }
      });
      return initialValues;
    };

    useImperativeHandle(ref, () => ({
      submit: (formikProps) => {
        if (formikProps) {
          formikProps.handleSubmit();
        }
      },
      getFormValues: (formikProps) => {
        if (formikProps) {
          return formikProps.values;
        }
        return {};
      },
    }));

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-[450px] max-h-[90vh] overflow-y-auto flex flex-col items-center p-8">
          <div className="mb-4">{icon}</div>
          <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-center mb-4">{subtitle}</p>

          <Formik
            initialValues={generateInitialValues()}
            validationSchema={generateValidationSchema()}
            onSubmit={handleSubmit || onConfirm}
          >
            {(formikProps) => (
              <Form className="w-full">
                {inputFields.map((field, index) => (
                  <div key={`${field.name}-${index}`} className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {field.type === "select" && (
                      <Select
                        options={
                          field.name === "goods_category"
                            ? dataGoodsCategory.map((category) => ({
                                value: category.id,
                                label: category.name,
                              }))
                            : field.name === "goods"
                            ? filteredGoods.map((goods) => ({
                                value: goods.id,
                                label: goods.name,
                              }))
                            : measurementUnits?.map((unit) => ({
                                value: unit.id,
                                label: unit.abbreviation,
                              }))
                        }
                        placeholder={field.placeholder}
                        className="w-full"
                        value={formikProps.values[field.name]}
                        onChange={(option) => {
                          formikProps.setFieldValue(field.name, option);
                          if (field.name === "goods_category") {
                            // Filter barang options based on selected goods_category_id
                            const filtered = dataMasterGoods.filter(
                              (goods) =>
                                goods.goods_category_id === option.value
                            );
                            setFilteredGoods(filtered);
                            formikProps.setFieldValue("barang", null); // Reset barang field
                          }
                        }}
                        onBlur={() =>
                          formikProps.setFieldTouched(field.name, true)
                        }
                        isDisabled={field.disabled}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => option.label}
                      />
                    )}

                    {field.type === "text" && (
                      <Field
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formikProps.values[field.name] || ""}
                        onChange={(e) => {
                          formikProps.setFieldValue(field.name, e.target.value);
                        }}
                      />
                    )}

                    {formikProps.touched[field.name] &&
                      formikProps.errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">
                          {formikProps.errors[field.name]}
                        </p>
                      )}
                  </div>
                ))}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-[186px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-[186px] py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                  >
                    {isLoading ? "Loading..." : "Konfirmasi"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
);

export default InputModal;

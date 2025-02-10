import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
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
      isEdit,
    },
    ref
  ) => {
    const [filteredGoods, setFilteredGoods] = useState([]);
    const formikRef = useRef(null);
    useEffect(() => {
      // Set initial filtered goods to all goods
      setFilteredGoods(dataMasterGoods);
    }, [dataMasterGoods]);

    const handleSubmit = (values, { resetForm }) => {
      onSave(values);
      resetForm();
    };

    const handleClose = () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
      onClose();
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

      // Early return with empty values if defaultValues is null
      if (!defaultValues) {
        inputFields.forEach((field) => {
          initialValues[field.name] = field.type === "select" ? null : "";
        });
        return initialValues;
      }

      inputFields.forEach((field) => {
        if (field.type === "text") {
          // Handle quantity field with null check
          if (field.name === "quantity") {
            initialValues[field.name] =
              defaultValues?.quantity?.toString() || "";
          } else {
            initialValues[field.name] = defaultValues[field.name] || "";
          }
        } else if (field.type === "select") {
          try {
            if (field.name === "goods_category") {
              // Set goods_category from goods_category_name with null check
              if (defaultValues?.goods_category_name) {
                const category = dataGoodsCategory?.find(
                  (cat) => cat.name === defaultValues.goods_category_name
                );
                initialValues[field.name] = category
                  ? {
                      value: category.id,
                      label: defaultValues.goods_category_name,
                    }
                  : null;
              } else {
                initialValues[field.name] = null;
              }
            } else if (field.name === "goods") {
              // Set goods from goods_name with null check
              if (defaultValues?.goods_name && defaultValues?.id) {
                initialValues[field.name] = {
                  value: defaultValues.id,
                  label: defaultValues.goods_name,
                };
              } else {
                initialValues[field.name] = null;
              }
            } else if (field.name === "measurement") {
              // Set measurement from measurement data with null check
              if (defaultValues?.measurement && defaultValues?.measurement_id) {
                initialValues[field.name] = {
                  value: defaultValues.measurement_id,
                  label: defaultValues.measurement,
                };
              } else {
                initialValues[field.name] = null;
              }
            } else {
              initialValues[field.name] = null;
            }
          } catch (error) {
            console.error(
              `Error setting initial value for ${field.name}:`,
              error
            );
            initialValues[field.name] = null;
          }
        }
      });

      return initialValues;
    };

    useEffect(() => {
      try {
        if (
          defaultValues?.goods_category_name &&
          dataGoodsCategory?.length > 0
        ) {
          const category = dataGoodsCategory.find(
            (cat) => cat.name === defaultValues.goods_category_name
          );
          if (category && dataMasterGoods) {
            const filtered = dataMasterGoods.filter(
              (goods) => goods.goods_category_id === category.id
            );
            setFilteredGoods(filtered);
          }
        } else {
          // If no category is selected, show all goods or empty array
          setFilteredGoods(dataMasterGoods || []);
        }
      } catch (error) {
        console.error("Error in filtering goods:", error);
        setFilteredGoods([]);
      }
    }, [
      defaultValues?.goods_category_name,
      dataGoodsCategory,
      dataMasterGoods,
    ]);

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
            enableReinitialize={true}
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
                            ? formikProps.values.goods_category // Check if goods_category is selected
                              ? filteredGoods.map((goods) => ({
                                  value: goods.id,
                                  label: goods.name,
                                }))
                              : [] // Return empty array if no category selected
                            : measurementUnits?.map((unit) => ({
                                value: unit.id,
                                label: unit.name,
                              }))
                        }
                        placeholder={
                          field.name === "goods" &&
                          !formikProps.values.goods_category
                            ? "Silakan pilih kategori barang terlebih dahulu"
                            : field.placeholder
                        }
                        className="w-full"
                        value={formikProps.values[field.name]}
                        onChange={(option) => {
                          formikProps.setFieldValue(field.name, option);
                          if (field.name === "goods_category") {
                            // Filter barang options based on selected goods_category_id
                            const filtered = dataMasterGoods?.filter(
                              (goods) =>
                                goods.goods_category_id === option.value
                            );
                            setFilteredGoods(filtered);
                            formikProps.setFieldValue("goods", null);
                          }
                        }}
                        onBlur={() =>
                          formikProps.setFieldTouched(field.name, true)
                        }
                        isDisabled={
                          field.name === "goods" &&
                          !formikProps.values.goods_category
                            ? true
                            : field.disabled
                        }
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
                    onClick={handleClose}
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

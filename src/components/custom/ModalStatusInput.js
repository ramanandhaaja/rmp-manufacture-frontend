import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import Select from "react-select";
import { RMPSTATUSLABEL } from "constants/status.constant";

const ModalStatusInput = forwardRef(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      icon,
      subtitle,
      isLoading = false,
      onSave,
    },
    ref
  ) => {
    const STATUS_OPTIONS = Object.entries(RMPSTATUSLABEL).map(
      ([value, label]) => ({
        value,
        label,
      })
    );

    const validationSchema = Yup.object().shape({
      status: Yup.object().nullable().required("Status is required"),
    });

    const initialValues = {
      status: null,
    };

    const handleSubmit = (values, { resetForm }) => {
      onSave(values);
      resetForm();
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
        <div className="bg-white rounded-lg w-[450px] h-[300px] overflow-y-auto flex flex-col items-center p-8">
          <div className="mb-4">{icon}</div>
          <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-center mb-4">{subtitle}</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit || onConfirm}
          >
            {(formikProps) => (
              <Form className="w-full ">
                <div className="w-full mb-10">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={STATUS_OPTIONS}
                    placeholder="Select status"
                    className="w-full"
                    value={formikProps.values.status}
                    onChange={(option) =>
                      formikProps.setFieldValue("status", option)
                    }
                    onBlur={() => formikProps.setFieldTouched("status", true)}
                  />
                  {formikProps.touched.status && formikProps.errors.status && (
                    <p className="mt-1 text-sm text-red-600">
                      {formikProps.errors.status}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-[186px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[186px] py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                  >
                    {isLoading ? "Loading..." : "Confirm"}
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

export default ModalStatusInput;

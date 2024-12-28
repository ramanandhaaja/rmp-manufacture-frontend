import React, { forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "components/ui";

import * as Yup from "yup";

const ModalNoteInput = forwardRef(
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
      status,
    },
    ref
  ) => {
    const validationSchema = Yup.object().shape({
      note: Yup.string().when([], {
        is: () => status === "revised",
        then: Yup.string().required("Note is required"),
        otherwise: Yup.string(),
      }),
    });

    const initialValues = {
      note: "",
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
        <div className="bg-white rounded-lg w-[450px] min-h-[360px] overflow-y-auto flex flex-col items-center p-8">
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
            {({ errors, touched, handleSubmit }) => (
              <Form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {status === "revised" ? "Catatan*" : "Catatan (opsional)"}
                  </label>
                  <Field
                    as="textarea"
                    rows="4"
                    name="note"
                    placeholder="Masukan catatan"
                    className={`w-full px-3 py-2 border ${
                      errors.note && touched.note
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  />
                  {errors.note && touched.note && (
                    <p className="mt-1 text-sm text-red-500">{errors.note}</p>
                  )}
                </div>
                <div className="flex gap-4 mt-auto">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="w-[186px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    type="submit"
                    className="w-[186px] py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Confirm"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
);

export default ModalNoteInput;

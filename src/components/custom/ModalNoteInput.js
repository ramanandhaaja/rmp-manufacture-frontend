import React, { forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Dialog } from "components/ui";
import * as Yup from "yup";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const ModalNoteInput = forwardRef(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title = "Note Input",
      icon = <QuestionMarkCircledIcon height={56} width={56} color="#037DC3" />,
      subtitle = "",
      isLoading = false,
      onSave,
      status,
      width = 500,
      contentClassName = "p-5 rounded-2xl",
      isNoteOpsional = false,
    },
    ref
  ) => {
    const validationSchema = Yup.object().shape({
      note: Yup.string().when([], {
        is: () => status === "revised" || status === "rejected",
        then: Yup.string().required("Catatan harus diisi"),
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
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        width={width}
        contentClassName={contentClassName}
      >
        <div className="flex flex-col justify-center items-center text-center py-4">
          {icon}
          <div className="mt-5 mb-3 text-main-100 text-xl font-bold">
            {title}
          </div>
          <div className="text-slate-500 text-base">{subtitle}</div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit || onConfirm}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form className="w-full" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isNoteOpsional ? "Catatan (opsional)" : "Catatan*"}
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
              <div className="flex justify-center items-center gap-5 mt-5">
                <Button
                  type="button"
                  variant="default"
                  onClick={onClose}
                  className="ltr:mr-2 rtl:ml-2 !bg-transparent !w-[120px] !h-10"
                >
                  Tutup
                </Button>
                <Button
                  loading={isLoading}
                  type="submit"
                  size="md"
                  variant="solid"
                  className="!w-[120px] !h-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Konfirmasi"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
);

export default ModalNoteInput;

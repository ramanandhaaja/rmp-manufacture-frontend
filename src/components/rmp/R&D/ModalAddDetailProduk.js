// src/components/rmp/R&D/ModalAddDetailProduk.js
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  FormItem,
  FormContainer,
  Input,
  Select,
  Notification,
  toast,
} from "components/ui";
import useCreateRndReq from "utils/hooks/Rnd/useCreateRndReq";

const validationSchema = Yup.object().shape({
  active_substance: Yup.string().required("Zat Aktif harus diisi"),
  strength: Yup.string().required("Kekuatan harus diisi"),
  dose: Yup.string().required("Dosis harus diisi"),
  form: Yup.string().required("Bentuk Sediaan harus diisi"),
  packaging: Yup.string().required("Kemasan harus diisi"),
  brand: Yup.string().required("Brand harus diisi"),
  hna_target: Yup.number()
    .required("Target HNA harus diisi")
    .typeError("Harus berupa angka")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
});

const bentukSediaanOptions = [
  { value: "Tablet", label: "Tablet" },
  { value: "Kapsul", label: "Kapsul" },
  { value: "Sirup", label: "Sirup" },
  { value: "Salep", label: "Salep" },
  { value: "Injeksi", label: "Injeksi" },
  { value: "Pil", label: "Pil" },
];

const kemasanOptions = [
  { value: "Box", label: "Box" },
  { value: "Botol", label: "Botol" },
  { value: "Ampule", label: "Ampule" },
  { value: "Vial", label: "Vial" },
  { value: "Tube", label: "Tube" },
  { value: "Pouch", label: "Pouch" },
];

const ModalAddDetailProduk = ({ isOpen, onClose, idRequestRnd, fetchData }) => {
  const { createRndProductSubstances } = useCreateRndReq();

  const initialValues = {
    active_substance: "",
    strength: "",
    dose: "",
    form: "",
    packaging: "",
    brand: "",
    hna_target: null,
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        rnd_request_id: idRequestRnd,
      };
      const resp = await createRndProductSubstances(payload);
      if (resp.status === "failed") {
        toast.push(
          <Notification
            type="danger"
            title="Gagal menambahkan detail produk, Pastikan data sudah benar"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        return;
      }

      if (resp.status === "network error") {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi masalah jaringan, gagal menambahkan detail produk"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        return;
      }

      toast.push(
        <Notification
          type="success"
          title="Berhasil menambahkan detail produk"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      setTimeout(() => {
        onClose();
        fetchData();
      }, 1000);
    } catch (error) {
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal menambahkan kompetitor"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      width={520}
    >
      <style>
        {`
          .close-btn {
            top: 20px !important;
          }
        `}
      </style>
      <div className="flex flex-col h-full justify-between p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Isi Detail Produk</h4>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting, setFieldValue }) => (
              <Form>
                <FormContainer>
                  <div className="space-y-4">
                    <FormItem
                      label="Zat Aktif"
                      invalid={
                        errors.active_substance && touched.active_substance
                      }
                      errorMessage={errors.active_substance}
                    >
                      <Field
                        type="text"
                        name="active_substance"
                        placeholder="Value"
                        component={Input}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </FormItem>

                    <div className="grid grid-cols-2 gap-4">
                      <FormItem
                        label="Kekuatan"
                        invalid={errors.strength && touched.strength}
                        errorMessage={errors.strength}
                      >
                        <Field
                          type="text"
                          name="strength"
                          placeholder="Value"
                          component={Input}
                          style={{ backgroundColor: "white" }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </FormItem>
                      <FormItem
                        label="Dosis"
                        invalid={errors.dose && touched.dose}
                        errorMessage={errors.dose}
                      >
                        <Field
                          type="text"
                          name="dose"
                          placeholder="Value"
                          component={Input}
                          style={{ backgroundColor: "white" }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </FormItem>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormItem
                        label="Bentuk Sediaan"
                        invalid={errors.form && touched.form}
                        errorMessage={errors.form}
                      >
                        <Select
                          name="form"
                          options={bentukSediaanOptions}
                          placeholder="Select"
                          style={{ backgroundColor: "white" }}
                          onChange={(options) => {
                            if (options) {
                              setFieldValue("form", options.value);
                            } else {
                              setFieldValue("form", "");
                            }
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="Kemasan"
                        invalid={errors.packaging && touched.packaging}
                        errorMessage={errors.packaging}
                      >
                        <Select
                          name="packaging"
                          options={kemasanOptions}
                          placeholder="Select"
                          style={{ backgroundColor: "white" }}
                          onChange={(options) => {
                            if (options) {
                              setFieldValue("packaging", options.value);
                            } else {
                              setFieldValue("packaging", "");
                            }
                          }}
                        />
                      </FormItem>
                    </div>

                    <FormItem
                      label="Brand"
                      invalid={errors.brand && touched.brand}
                      errorMessage={errors.brand}
                    >
                      <Field
                        type="text"
                        name="brand"
                        placeholder="Value"
                        component={Input}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </FormItem>

                    <FormItem
                      label="Target HNA"
                      invalid={errors.hna_target && touched.hna_target}
                      errorMessage={errors.hna_target}
                    >
                      <Field
                        type="number"
                        name="hna_target"
                        placeholder="Value"
                        component={Input}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </FormItem>
                  </div>

                  <div className="flex gap-2 grid grid-cols-2 mt-6">
                    <Button
                      size="sm"
                      variant="plain"
                      onClick={onClose}
                      type="button"
                      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Batal
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      type="submit"
                      loading={isSubmitting}
                      className="px-6 py-2 bg-gray-700 text-white hover:bg-gray-800"
                    >
                      Konfirmasi
                    </Button>
                  </div>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAddDetailProduk;

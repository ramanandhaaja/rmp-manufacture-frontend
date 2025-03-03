// src/components/rmp/R&D/ModalAddKompetitor.js
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
  name: Yup.string().required("Nama harus diisi"),
  strength: Yup.string().required("Kekuatan harus diisi"),
  dose: Yup.string().required("Dosis harus diisi"),
  form: Yup.string().required("Bentuk Sediaan harus diisi"),
  packaging: Yup.string().required("Kemasan harus diisi"),
  hna_target: Yup.number().nullable().required("Target HNA harus diisi"),
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

const ModalAddKompetitor = ({
  isOpen,
  onClose,
  onSubmit,
  idRequestRnd,
  fetchData,
}) => {
  const initialValues = {
    name: "",
    strength: "",
    dose: "",
    form: "",
    packaging: "",
    hna_target: null,
  };
  const { addCompetitorRnd, dataKompetitor } = useCreateRndReq();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);

    try {
      setSubmitting(true);
      const payload = {
        ...values,
        rnd_request_id: idRequestRnd,
      };
      const resp = await addCompetitorRnd(payload);
      if (resp.status === "failed") {
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
        return;
      }

      toast.push(
        <Notification
          type="success"
          title="Berhasil menambahkan kompetitor"
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
          <h4 className="text-lg font-semibold">Kompetitor</h4>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Value"
                        component={Input}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kekuatan
                        </label>
                        <Field
                          type="text"
                          name="strength"
                          placeholder="Value"
                          component={Input}
                          style={{ backgroundColor: "white" }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosis
                        </label>
                        <Field
                          type="text"
                          name="dose"
                          placeholder="Value"
                          component={Input}
                          style={{ backgroundColor: "white" }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bentuk Sediaan
                        </label>
                        <Select
                          name="form"
                          options={bentukSediaanOptions}
                          placeholder="Select"
                          style={{ backgroundColor: "white" }}
                          onChange={(option) => {
                            if (option) {
                              setFieldValue("form", option.value);
                            } else {
                              setFieldValue("form", "");
                            }
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kemasan
                        </label>
                        <Select
                          name="packaging"
                          options={kemasanOptions}
                          placeholder="Select"
                          style={{ backgroundColor: "white" }}
                          onChange={(option) => {
                            if (option) {
                              setFieldValue("packaging", option.value);
                            } else {
                              setFieldValue("packaging", "");
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target HNA
                      </label>
                      <Field
                        type="text"
                        name="hna_target"
                        placeholder="Value"
                        component={Input}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>
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

export default ModalAddKompetitor;

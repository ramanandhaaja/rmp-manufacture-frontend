import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormItem, FormContainer } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { FiTrash, FiPlus } from "react-icons/fi";
import Select from "react-select";
import Checkbox from "components/ui/Checkbox";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      po_item_id: Yup.string().required("Required"),
      offered_price: Yup.number()
        .required("Required")
        .nullable()
        .min(0, "Must be non-negative"),
    })
  ),
  metode_pembayaran: Yup.string().required("Required"),
  uang_muka: Yup.number().when("metode_pembayaran", {
    is: "Bayar Sebagian",
    then: Yup.number().required("Required").min(0, "Must be non-negative"),
    otherwise: Yup.number().nullable(),
  }),
  termin_1: Yup.object().when("metode_pembayaran", {
    is: "Bayar Sebagian",
    then: Yup.object().shape({
      jumlah_bayar: Yup.number()
        .required("Required")
        .min(0, "Must be non-negative"),
    }),
    otherwise: Yup.object().nullable(),
  }),
  termin_2: Yup.object().when("metode_pembayaran", {
    is: "Bayar Sebagian",
    then: Yup.object().shape({
      jumlah_bayar: Yup.number()
        .required("Required")
        .min(0, "Must be non-negative"),
    }),
    otherwise: Yup.object().nullable(),
  }),
  alamat_pengiriman: Yup.string().required("Required"),
  biaya_pengiriman: Yup.number()
    .required("Required")
    .min(0, "Must be non-negative"),
  biaya_lainnya: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Required"),
      value: Yup.number().required("Required").min(0, "Must be non-negative"),
    })
  ),
});

const FormVendorOffer = ({ initialData, onSubmit }) => {
  const [additionalCosts, setAdditionalCosts] = useState([
    { label: "", value: "" },
  ]);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUangMukaChecked, setIsUangMukaChecked] = useState(false);

  const initialValues = {
    items: initialData?.items || [
      {
        po_item_id: "",
        offered_price: null,
      },
    ],
    payment_method: initialData?.payment_method || "",
    advance_payment: initialData?.advance_payment || "",
    termins: initialData?.termins || [],
    delivery_address: initialData?.delivery_address || "",
    shipping_cost: initialData?.shipping_cost || "",
    additional_costs: initialData?.additional_costs || [],
  };

  const addAdditionalCost = () => {
    setAdditionalCosts([...additionalCosts, { label: "", value: "" }]);
  };

  const removeAdditionalCost = (index) => {
    const newCosts = additionalCosts.filter((_, i) => i !== index);
    setAdditionalCosts(newCosts);
  };

  const handleAddTermin = (values, setFieldValue) => {
    if (values.termins.length < 4) {
      setFieldValue("termins", [...values.termins, { jumlah_bayar: "" }]);
    }
  };

  const handleRemoveTermin = (index, values, setFieldValue) => {
    const newTermins = values.termins.filter((_, i) => i !== index);
    setFieldValue("termins", newTermins);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) {
      // 20MB limit
      setDocuments([...documents, file]);
    } else {
      alert("File size should not exceed 20MB");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Append form values
      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Append documents
      documents.forEach((doc, index) => {
        formData.append(`documents[${index}]`, doc);
      });

      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isValid }) => (
        <Form className="space-y-6">
          <FormContainer>
            {/* Items Table */}
            <div className="mb-6">
              <CustomTable
                data={values.items}
                columns={[
                  { Header: "ID Pembelian", accessor: "id_pembelian" },
                  { Header: "Kode", accessor: "kode" },
                  { Header: "Barang", accessor: "barang" },
                  { Header: "Departemen", accessor: "departemen" },
                  { Header: "QTY", accessor: "qty" },
                  { Header: "UOM", accessor: "uom" },
                  { Header: "Harga", accessor: {} },
                ]}
              />
            </div>

            {/* Payment Method */}
            <FormItem
              label="Metode Pembayaran"
              invalid={errors.metode_pembayaran && touched.metode_pembayaran}
              errorMessage={errors.metode_pembayaran}
            >
              <Select
                name="metode_pembayaran"
                options={[
                  { value: "Bayar Lunas Dimuka", label: "Bayar Lunas Dimuka" },
                  { value: "Bayar Sebagian", label: "Bayar Sebagian" },
                  {
                    value: "Bayar Lunas Diakhir",
                    label: "Bayar Lunas Diakhir",
                  },
                ]}
                value={
                  values.metode_pembayaran
                    ? {
                        value: values.metode_pembayaran,
                        label: values.metode_pembayaran,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFieldValue(
                    "metode_pembayaran",
                    selectedOption ? selectedOption.value : ""
                  );
                }}
                placeholder="Pilih "
              />
            </FormItem>

            <div className="space-y-4">
              <div className="flex gap-1">
                {values.metode_pembayaran !== "Bayar Lunas Dimuka" && (
                  <Checkbox
                    className="py-2 "
                    defaultChecked={false}
                    onChange={() => {
                      setIsUangMukaChecked(!isUangMukaChecked);
                    }}
                  >
                    Uang Muka
                  </Checkbox>
                )}
                {isUangMukaChecked && (
                  <FormItem
                    className="flex-1"
                    invalid={errors.uang_muka && touched.uang_muka}
                    errorMessage={errors.uang_muka}
                  >
                    <Field
                      type="number"
                      name="uang_muka"
                      placeholder="Nilai"
                      component={Input}
                      className="w-full"
                    />
                  </FormItem>
                )}
              </div>
              {values.metode_pembayaran === "Bayar Sebagian" && (
                <div className="space-y-4 ">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Termin Pembayaran</h3>
                    {values.termins.length < 4 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddTermin(values, setFieldValue)}
                        icon={<FiPlus />}
                      >
                        Tambah Termin
                      </Button>
                    )}
                  </div>

                  {values.termins.map((termin, index) => (
                    <div
                      key={index}
                      className="relative border rounded-lg p-4 "
                    >
                      <div className="flex justify-between items-center ">
                        <h4 className="font-medium">Termin {index + 1}</h4>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() =>
                            handleRemoveTermin(index, values, setFieldValue)
                          }
                          icon={<FiTrash />}
                          size="sm"
                        >
                          Hapus
                        </Button>
                      </div>
                      <FormItem
                        className="py-2"
                        label="Jumlah Bayar"
                        invalid={
                          errors.termins?.[index]?.jumlah_bayar &&
                          touched.termins?.[index]?.jumlah_bayar
                        }
                        errorMessage={errors.termins?.[index]?.jumlah_bayar}
                      >
                        <Field
                          type="number"
                          name={`termins.${index}.jumlah_bayar`}
                          placeholder="Nilai"
                          component={Input}
                        />
                      </FormItem>
                    </div>
                  ))}

                  {values.termins.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Belum ada termin pembayaran
                    </div>
                  )}

                  {values.termins.length === 4 && (
                    <div className="text-sm text-gray-500">
                      Maksimal 4 termin pembayaran
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <FormItem
              className="py-2 pt-2"
              label="Alamat Pengiriman"
              invalid={errors.alamat_pengiriman && touched.alamat_pengiriman}
              errorMessage={errors.alamat_pengiriman}
            >
              <Field
                as="textarea"
                name="alamat_pengiriman"
                rows="4"
                className="w-full px-3  border border-gray-300 rounded-md"
                placeholder="Masukkan alamat pengiriman"
              />
            </FormItem>

            {/* Shipping Cost */}
            <FormItem
              label="Biaya Pengiriman"
              invalid={errors.biaya_pengiriman && touched.biaya_pengiriman}
              errorMessage={errors.biaya_pengiriman}
            >
              <Field
                type="number"
                name="biaya_pengiriman"
                placeholder="Masukkan biaya pengiriman"
                component={Input}
              />
            </FormItem>

            {/* Additional Costs */}
            <div className="space-y-4 border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Biaya Lainnya</h3>
                <Button type="button" onClick={addAdditionalCost}>
                  Tambah Biaya Lainnya
                </Button>
              </div>

              {additionalCosts.map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Label
                    </label>
                    <Field
                      name={`biaya_lainnya.${index}.label`}
                      placeholder="Nilai"
                      component={Input}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Jumlah
                    </label>
                    <Field
                      name={`biaya_lainnya.${index}.value`}
                      placeholder="Nilai"
                      type="number"
                      component={Input}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAdditionalCost(index)}
                  >
                    <FiTrash size={24} color="red" />
                  </button>
                </div>
              ))}
            </div>

            {/* Document Upload */}
            <FormItem label="Upload Dokumen Penawaran" className="py-2 pt-2">
              <div className="space-y-2 ">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf"
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="inline-block px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  Upload
                </label>
                <p className="text-sm text-gray-500">
                  Supported format: PDF with maximum size 20 MB
                </p>
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newDocs = documents.filter((_, i) => i !== index);
                        setDocuments(newDocs);
                      }}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </FormItem>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                className="w-32"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default FormVendorOffer;

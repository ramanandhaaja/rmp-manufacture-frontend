import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormItem, FormContainer } from "components/ui";
import CustomTable from "components/custom/CustomTable";
import { FiTrash, FiPlus } from "react-icons/fi";
import Select from "react-select";
import Checkbox from "components/ui/Checkbox";
import useVendor from "utils/hooks/vendorManagement/useVendor";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useParams } from "react-router-dom";
import { toast, Notification } from "components/ui";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVendorSelections,
  updateVendorSubmitStatus,
} from "store/PurchaseOrder/purchaseOrderSlice";
import ConfirmationCustom from "components/custom/ConfirmationCustom";

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      offered_price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be non-negative"),
    })
  ),
  delivery_address: Yup.string().required("Delivery address is required"),
  delivery_cost: Yup.number()
    .required("Delivery cost is required")
    .min(0, "Delivery cost must be non-negative"),
  costs: Yup.array().of(
    Yup.object().shape({
      cost_name: Yup.string(),
      cost_value: Yup.number().min(0, "Cost must be non-negative").nullable(),
    })
  ),
  payment: Yup.object().shape({
    payment_method: Yup.string().required("Payment method is required"),
    amount: Yup.number().required("Total amount is required"),
    down_payment_amount: Yup.number().when("payment_method", {
      is: "Bayar Sebagian",
      then: Yup.number()
        .required("Down payment is required")
        .min(0, "Down payment must be non-negative"),
      otherwise: Yup.number().nullable(),
    }),
    records: Yup.array().of(
      Yup.object().shape({
        amount_paid: Yup.number().when("payment_method", {
          is: "Bayar Sebagian",
          then: Yup.number().required("Payment amount is required"),
          otherwise: Yup.number().nullable(),
        }),
        remarks: Yup.string(),
      })
    ),
  }),
});

const FormVendorOffer = ({ isEdit }) => {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUangMukaChecked, setIsUangMukaChecked] = useState(false);
  const { id: vendorId } = useParams();
  const { getVendorDetail, dataDetailVendor } = useVendor();

  const {
    getDetailVendorOffer,
    dataDetailPurchaseOrder,
    submitVendorOffer,
    dataOfferPoVendors,
    editVendorOffer,
  } = usePurchaseOrder();
  const navigate = useNavigate();
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const itemsTableData = dataDetailPurchaseOrder?.items.map((item, index) => ({
    ...item,
    index,
  }));
  const { vendorOfferId } = useSelector((state) => state.purchaseOrder);
  const idPo = dataDetailPurchaseOrder?.id || null;
  const detailVendor = dataOfferPoVendors?.vendor_detail;

  const PAYMENT_METHOD_MAPPING = {
    pay_in_part: "Bayar Sebagian",
    pay_in_full: "Bayar Lunas Dimuka",
    pay_in_full: "Bayar Lunas Diakhir",
  };

  const initialValues = useMemo(() => {
    if (isEdit && dataOfferPoVendors) {
      // Transform the fetched data to match form structure
      const paymentData = dataOfferPoVendors.payments[0];
      return {
        purchase_order_id: dataOfferPoVendors?.purchase_order_id,
        vendor_id: dataOfferPoVendors?.vendor_id,
        items: dataOfferPoVendors.items.map((item) => ({
          po_item_id: item.po_item_id,
          offered_price: item.offered_price || 0,
        })),
        delivery_address: dataOfferPoVendors.delivery_address,
        delivery_cost: dataOfferPoVendors.delivery_cost,
        costs: dataOfferPoVendors.costs || [
          { cost_name: "", cost_value: null },
        ],
        payment: {
          payment_method:
            PAYMENT_METHOD_MAPPING[paymentData.payment_method] || "",
          amount: paymentData.amount || 0,
          down_payment_amount: paymentData.down_payment_amount || 0,
          records: paymentData.payment_records.map((record) => ({
            amount_paid: record.amount_paid || 0,
            remarks: record.remarks || "",
          })),
        },
      };
    }

    return {
      purchase_order_id: idPo,
      vendor_id: vendorId,
      items:
        dataDetailPurchaseOrder?.items?.map((item) => ({
          po_item_id: item.id,
          offered_price: 0,
        })) || [],
      payment_method: "",
      delivery_address: "",
      delivery_cost: 0,
      costs: [{ cost_name: "", cost_value: null }],
      payment: {
        amount: 0,
        down_payment_amount: 0,
        records: [{ amount_paid: 0 }],
      },
    };
  }, [isEdit, dataOfferPoVendors, idPo, vendorId, dataDetailPurchaseOrder]);

  useEffect(() => {
    if (vendorOfferId) {
      getDetailVendorOffer(vendorOfferId);
    }
  }, [vendorOfferId]);

  useEffect(() => {
    if (vendorId) {
      getVendorDetail(vendorId);
    }
  }, [vendorId]);

  useEffect(() => {
    if (isEdit && dataOfferPoVendors?.offering_document) {
      setDocuments(dataOfferPoVendors.offering_document);
    }
  }, [isEdit, dataOfferPoVendors]);

  useEffect(() => {
    if (isEdit && dataOfferPoVendors?.payments?.[0]?.down_payment_amount > 0) {
      setIsUangMukaChecked(true);
    }
  }, [isEdit, dataOfferPoVendors]);

  const submitOffer = async (payload) => {
    console.log("Payload:", payload);
    try {
      let response;
      if (isEdit) {
        response = await editVendorOffer(vendorOfferId, payload);
      } else {
        response = await submitVendorOffer(payload);
      }

      if (response.status === "success") {
        toast.push(
          <Notification
            type="success"
            title={`Penawaran berhasil ${isEdit ? "diperbarui" : "dibuat"}`}
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        console.log("About to dispatch with vendorId:", vendorId);
        dispatch(updateVendorSubmitStatus(vendorId));
        if (isEdit) {
          setTimeout(() => {
            navigate("/purchase/pengadaan/detail-po/" + idPo);
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/purchase/pengadaan/proses-po/" + idPo);
          }, 2000);
        }
      } else {
        toast.push(
          <Notification
            type="danger"
            title={`Maaf terjadi kesalahan, Penawaran gagal ${
              isEdit ? "diperbarui" : "dibuat"
            }`}
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (err) {
      console.log(err);
      toast.push(
        <Notification
          type="danger"
          title={`Maaf terjadi kesalahan, Penawaran gagal ${
            isEdit ? "diperbarui" : "dibuat"
          }`}
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);

      const totalItemsAmount = values.items.reduce(
        (sum, item) => sum + (Number(item.offered_price) || 0),
        0
      );

      const payload = {
        purchase_order_id: values.purchase_order_id,
        vendor_id: values.vendor_id,
        items: values.items,
        payment_method:
          values.payment_method == "Bayar Lunas Dimuka" ||
          values.payment_method == "Bayar Lunas Diakhir"
            ? "Bayar Lunas"
            : "Bayar Sebagian",
        delivery_address: values.delivery_address,
        delivery_cost: values.delivery_cost,
        costs: values.costs.filter(
          (cost) => cost.cost_value !== 0 && cost.cost_value !== null
        ),
        payment: {
          amount: totalItemsAmount,
          down_payment_amount: values.payment.down_payment_amount,
          records: values.payment.records.map((record) => ({
            amount_paid: record.amount_paid || totalItemsAmount,
          })),
        },
        documents: documents,
      };

      dispatch(updateVendorSubmitStatus(Number(vendorId)));
      await submitOffer(payload);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
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

  return (
    <div className="space-y-4 px-4">
      <VendorDetails dataDetailVendor={dataDetailVendor} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, isValid, submitForm }) => (
          <Form className="space-y-6">
            <FormContainer>
              {/* Items Table */}
              <ItemsTable
                items={itemsTableData}
                errors={errors}
                touched={touched}
              />

              {/* Payment Method */}
              <FormItem
                label={
                  <span>
                    Metode Pembayaran <span>*</span>
                  </span>
                }
                invalid={
                  errors.payment?.payment_method &&
                  touched.payment?.payment_method
                }
                errorMessage={errors.payment?.payment_method}
              >
                <Select
                  name="payment.payment_method"
                  options={[
                    {
                      value: "Bayar Lunas Dimuka",
                      label: "Bayar Lunas Dimuka",
                    },
                    {
                      value: "Bayar Sebagian",
                      label: "Bayar Sebagian",
                    },
                    {
                      value: "Bayar Lunas Diakhir",
                      label: "Bayar Lunas Diakhir",
                    },
                  ]}
                  value={
                    values.payment?.payment_method
                      ? {
                          value: values.payment.payment_method,
                          label: values.payment.payment_method,
                        }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue(
                      "payment.payment_method",
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                  placeholder="Pilih "
                />
              </FormItem>

              <div className="space-y-4">
                <div className="flex gap-1">
                  {values.payment?.payment_method !== "Bayar Lunas Dimuka" && (
                    <Checkbox
                      className="py-2 "
                      defaultChecked={isUangMukaChecked}
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
                      invalid={
                        errors.payment?.down_payment_amount &&
                        touched.payment?.down_payment_amount
                      }
                      errorMessage={errors.payment?.down_payment_amount}
                    >
                      <Field
                        type="price"
                        name="payment.down_payment_amount"
                        placeholder="Nilai"
                        component={Input}
                        className="w-full"
                      />
                    </FormItem>
                  )}
                </div>
                {values.payment.payment_method === "Bayar Sebagian" && (
                  <div className="space-y-4 ">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Termin Pembayaran</h3>

                      <Button
                        type="button"
                        onClick={() =>
                          setFieldValue("payment.records", [
                            ...values.payment.records,
                            { amount_paid: "" },
                          ])
                        }
                        icon={<FiPlus />}
                      >
                        Tambah Termin
                      </Button>
                    </div>

                    {values.payment.records.map((termin, index) => (
                      <div
                        key={index}
                        className="relative border rounded-lg p-4 "
                      >
                        <div className="flex justify-between items-center ">
                          <h4 className="font-medium">Termin {index + 1}</h4>
                          <Button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "payment.records",
                                values.payment.records.filter(
                                  (_, i) => i !== index
                                )
                              )
                            }
                            icon={<FiTrash />}
                            size="sm"
                          >
                            Hapus
                          </Button>
                        </div>
                        <FormItem
                          className="py-2"
                          label={
                            <span>
                              Jumlah Bayar <span>*</span>
                            </span>
                          }
                          invalid={
                            errors.payment?.records?.[index]?.amount_paid &&
                            touched.payment?.records?.[index]?.amount_paid
                          }
                          errorMessage={
                            errors.payment?.records?.[index]?.amount_paid
                          }
                        >
                          <Field
                            type="price"
                            name={`payment.records.${index}.amount_paid`}
                            placeholder="Nilai"
                            component={Input}
                          />
                        </FormItem>
                      </div>
                    ))}

                    {values.payment.records.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        Belum ada termin pembayaran
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <FormItem
                className="py-2 pt-2"
                label={
                  <span>
                    Alamat Pengiriman <span>*</span>
                  </span>
                }
                invalid={errors.delivery_address && touched.delivery_address}
                errorMessage={errors.delivery_address}
              >
                <Select
                  name="delivery_address"
                  options={[
                    {
                      value: "Factory",
                      label: "Factory",
                    },
                    {
                      value: "Head Office",
                      label: "Head Office",
                    },
                    {
                      value: "Lab Jakarta",
                      label: "Lab Jakarta",
                    },
                  ]}
                  value={
                    values.delivery_address
                      ? {
                          value: values.delivery_address,
                          label: values.delivery_address,
                        }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue(
                      "delivery_address",
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                  placeholder="Pilih "
                />
              </FormItem>

              {/* Shipping Cost */}
              <FormItem
                label={
                  <span>
                    Biaya Pengiriman <span>*</span>
                  </span>
                }
                invalid={errors.delivery_cost && touched.delivery_cost}
                errorMessage={errors.delivery_cost}
              >
                <Field
                  type="price"
                  name="delivery_cost"
                  placeholder="Masukkan biaya pengiriman"
                  component={Input}
                />
              </FormItem>

              {/* Additional Costs */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Biaya Lainnya</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      setFieldValue("costs", [
                        ...values.costs,
                        { cost_name: "", cost_value: "" },
                      ])
                    }
                    icon={<FiPlus />}
                  >
                    Tambah Biaya Lainnya
                  </Button>
                </div>

                {values.costs.map((_, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1">
                      <FormItem
                        label="Label"
                        invalid={
                          errors.costs?.[index].cost_name &&
                          touched.costs?.[index].cost_name
                        }
                        errorMessage={errors.costs?.[index].cost_name}
                      >
                        <Field
                          name={`costs.${index}.cost_name`}
                          placeholder="Nilai"
                          component={Input}
                          uppercase={false}
                        />
                      </FormItem>
                    </div>
                    <div className="flex-1">
                      <FormItem
                        label="Jumlah"
                        invalid={
                          errors.costs?.[index].cost_value &&
                          touched.costs?.[index].cost_value
                        }
                        errorMessage={errors.costs?.[index].cost_value}
                      >
                        <Field
                          name={`costs.${index}.cost_value`}
                          placeholder="Nilai"
                          type="price"
                          component={Input}
                        />
                      </FormItem>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "costs",
                          values.costs.filter((_, i) => i !== index)
                        )
                      }
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
                      <input
                        type="text"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-28"
                        placeholder={doc.name || "document name"}
                        value={doc.file || ""}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newDocs = documents.filter(
                            (_, i) => i !== index
                          );
                          setDocuments(newDocs);
                        }}
                      >
                        <FiTrash size={24} color="red" />
                      </button>
                    </div>
                  ))}
                </div>
              </FormItem>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-32"
                  onClick={() => setIsOpen(true)}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </FormContainer>
            <ConfirmationCustom
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              showCancelBtn
              showSubmitBtn
              onConfirm={() => {
                submitForm();
                setIsOpen(false);
              }}
              confirmText="Konfirmasi"
              title={`${isEdit ? "Ubah" : "Tambah"} penawaran vendor?`}
              titleClass="mt-5 mb-3 text-main-100 text-xl font-bold"
              text="Pastikan data yang anda masukan sudah benar"
              textClass="text-slate-500 text-base"
              isLoading={isSubmitting}
              disableCancel={false}
              buttonType="button"
              width={500}
              contentClassName="p-5 rounded-2xl"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const VendorDetails = ({ dataDetailVendor }) => (
  <div className="flex justify-between mt-4">
    <div className="p-3 pt-6">
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-1 gap-2">
          <VendorDetailItem label="Vendor" value={dataDetailVendor?.name} />
          <VendorDetailItem label="PIC" value={dataDetailVendor?.pic_name} />
          <VendorDetailItem
            label="No Telp"
            value={dataDetailVendor?.pic_phone}
          />
          <VendorDetailItem label="Alamat" value={dataDetailVendor?.address} />
        </div>
      </div>
    </div>
  </div>
);

const VendorDetailItem = ({ label, value }) => (
  <div className="flex items-center gap-10">
    <p className="text-sm text-gray-500 w-32">{label}</p>
    <p className="text-sm text-gray-700">{value || "-"}</p>
  </div>
);

const ItemsTable = ({ items, errors, touched }) => (
  <div className="mb-6">
    <CustomTable
      data={items}
      columns={[
        { Header: "ID Pembelian", accessor: "purchase_request_id" },
        { Header: "Kode", accessor: "goods_id" },
        { Header: "Barang", accessor: "goods_name" },
        {
          Header: "Departemen",
          accessor: "department_name",
          Cell: ({ value }) => value || "-",
        },
        { Header: "QTY", accessor: "quantity" },
        { Header: "UOM", accessor: "measurement" },
        {
          Header: "Harga *",
          accessor: "offered_price",
          Cell: ({ row }) => (
            <FormItem
              invalid={
                errors?.items?.[row.original.index]?.offered_price &&
                touched?.items?.[row.original.index]?.offered_price
              }
              errorMessage={errors?.items?.[row.original.index]?.offered_price}
            >
              <Field
                type="price"
                name={`items.${row.original.index}.offered_price`}
                placeholder="Nilai"
                component={Input}
                className="w-full"
              />
            </FormItem>
          ),
        },
      ]}
    />
  </div>
);

export default FormVendorOffer;

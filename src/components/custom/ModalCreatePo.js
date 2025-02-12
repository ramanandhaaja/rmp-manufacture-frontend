import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  FormItem,
  FormContainer,
  toast,
  Notification,
} from "components/ui";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import usePurchaseOrder from "utils/hooks/PurchaseOrder/usePurchaseOrder";
import { useEffect } from "react";

const CreatePOModal = ({
  isOpen,
  onClose,
  setSubmitted = () => {},
  setSubmittedData = () => {},
  goodsCategory = "",
}) => {
  const validationSchema = Yup.object().shape({
    po_name: Yup.string().required("Nama PO harus diisi"),
    goods_category_id: Yup.number().nullable().required("Kategori harus diisi"),
    po_type: Yup.string().required("Tipe harus diisi"),
    note: Yup.string(),
  });
  const { getGoodsCategory, dataGoodsCategory } = useGoodsCategory();
  const { createPurchaseOrder, getListExistingPo } = usePurchaseOrder();
  const initialValues = {
    po_name: "",
    goods_category_id: goodsCategory.id ? goodsCategory.id : null,
    po_type: goodsCategory?.po_type || "",
    note: "",
  };

  useEffect(() => {
    getGoodsCategory({ all: true });
  }, []);

  const PO_TYPE_OPTIONS = [
    { value: "material", label: "Material" },
    { value: "non-material", label: "Non-Material" },
  ];

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      const resp = await createPurchaseOrder(values);
      if (resp.status === "success") {
        resetForm();
        onClose();
        setSubmitted(true);
        setSubmittedData(resp.data);
        await getListExistingPo();
      } else {
        toast.push(
          <Notification
            type="danger"
            title="Maaf terjadi kesalahan, gagal membuat PO"
            width={700}
          />,
          {
            placement: "top-center",
          }
        );
        setSubmitted(false);

        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.push(
        <Notification
          type="danger"
          title="Maaf terjadi kesalahan, gagal membuat PO"
          width={700}
        />,
        {
          placement: "top-center",
        }
      );
      setTimeout(() => {
        onClose();
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
      contentClassName="p-4"
    >
      <div className="mb-4">
        <h2 className="text-lg text-center font-semibold mb-4">Buat PO Baru</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isSubmitting, values }) => (
            <Form className="space-y-4">
              <FormContainer>
                <FormItem
                  label={
                    <span>
                      Nama PO <span>*</span>
                    </span>
                  }
                  invalid={errors.po_name && touched.po_name}
                  errorMessage={errors.po_name}
                >
                  <Field
                    type="text"
                    name="po_name"
                    component="input"
                    className={`w-full px-3 py-2 border ${
                      errors.po_name && touched.po_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  />
                </FormItem>
                {!goodsCategory && (
                  <FormItem
                    label={
                      <span>
                        Kategori Barang <span>*</span>
                      </span>
                    }
                    invalid={
                      errors.goods_category_id && touched.goods_category_id
                    }
                    errorMessage={errors.goods_category_id}
                  >
                    <Select
                      name="goods_category"
                      options={dataGoodsCategory.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                      value={values.goods_category?.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      placeholder="Pilih kategori barang"
                      onChange={(options) => {
                        const selectedCategory = dataGoodsCategory.find(
                          (category) => category.id === options?.value
                        );
                        setFieldValue("goods_category_id", options?.value);
                        if (selectedCategory) {
                          setFieldValue("po_type", selectedCategory.goods_type);
                        } else {
                          setFieldValue("po_type", "");
                        }
                      }}
                    />
                  </FormItem>
                )}
                {!goodsCategory ? (
                  <FormItem
                    label={
                      <span>
                        Tipe <span>*</span>
                      </span>
                    }
                  >
                    <Select
                      isDisabled={true}
                      name="po_type"
                      options={[
                        { value: "material", label: "Material" },
                        { value: "non-material", label: "Non-Material" },
                      ]}
                      value={[
                        { value: "material", label: "Material" },
                        { value: "non-material", label: "Non-Material" },
                      ].find((option) => option.value === values.po_type)}
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("po_type", option.value);
                        } else {
                          setFieldValue("po_type", "");
                        }
                      }}
                      placeholder="Pilih kategori barang dahulu"
                    />
                    {errors.po_type && touched.po_type && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.po_type}
                      </p>
                    )}
                  </FormItem>
                ) : (
                  <FormItem
                    label={
                      <span>
                        Tipe <span>*</span>
                      </span>
                    }
                  >
                    <Select
                      isDisabled={true}
                      name="po_type"
                      options={PO_TYPE_OPTIONS}
                      value={PO_TYPE_OPTIONS.find(
                        (option) => option.value === values.po_type
                      )}
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("po_type", option.value);
                        } else {
                          setFieldValue("po_type", "");
                        }
                      }}
                      placeholder="Pilih kategori barang dahulu"
                    />
                    {errors.po_type && touched.po_type && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.po_type}
                      </p>
                    )}
                  </FormItem>
                )}

                <FormItem>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catatan (Optional)
                  </label>
                  <Field
                    type="text"
                    name="catatan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </FormItem>

                <div className="flex justify-between space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="default"
                    onClick={onClose}
                    className="w-full !bg-gray-100"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Loading..." : "Buat PO"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default CreatePOModal;

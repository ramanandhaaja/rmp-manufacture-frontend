import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import useGoodsCategory from "utils/hooks/useGoodsCategory";
import capitalize from "components/ui/utils/capitalize";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useMasterGoods from "utils/hooks/useMasterGoods";

const FormMasterGoods = forwardRef(
  ({ setFormData, initialData, isEdit }, ref) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const formikRef = useRef(null);
    const { getGoodsCategory, dataGoodsCategory } = useGoodsCategory();

    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Please enter the goods name"),
      measurement: Yup.string().required("Please enter the measurement"),
      goods_category_id: Yup.number()
        .min(1, "Please select at least one category")
        .required("Please select at least one category"),
    });

    const INITIAL_VALUES = {
      name: "",
      measurement: "",
      goods_category_id: null,
      description: "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        // Append form values
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        setFormData(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    };
    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        if (formikRef.current) {
          formikRef.current.submitForm();
        }
      },
    }));

    useEffect(() => {
      getGoodsCategory({ all: true });
    }, []);

    return (
      <Formik
        innerRef={formikRef}
        initialValues={initialData ? initialData : INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ errors, touched, setFieldValue, isSubmitting, values }) => (
          <Form className="space-y-6">
            <FormContainer>
              {/* Vendor Name */}
              <FormItem
                label={
                  <span>
                    Nama Barang <span>*</span>
                  </span>
                }
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
              >
                <Field
                  type="text"
                  name="name"
                  placeholder="Masukan nama vendor"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>

              {/* Goods Category */}
              <FormItem
                label={
                  <span>
                    Kategori Barang <span>*</span>
                  </span>
                }
                invalid={errors.goods_category && touched.goods_category}
                errorMessage={errors.goods_category}
              >
                <Select
                  name="goods_category"
                  options={
                    dataGoodsCategory &&
                    dataGoodsCategory.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))
                  }
                  value={values.goods_category?.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  placeholder="Pilih kategori barang"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("goods_category_id", option.value);
                    } else {
                      setFieldValue("goods_category_id", null);
                    }
                  }}
                />
              </FormItem>

              <FormItem
                label={
                  <span>
                    Measurement<span>*</span>
                  </span>
                }
                invalid={errors.measurement && touched.measurement}
                errorMessage={errors.measurement}
              >
                <Field
                  type="text"
                  name="measurement"
                  placeholder="Masukan measurement barang"
                  component={Input}
                  uppercase={false}
                />
              </FormItem>

              {/* Address */}
              <FormItem
                label={"Deskripsi"}
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
              >
                <Field
                  as="textarea"
                  rows="4"
                  name="description"
                  placeholder="Masukan description barang"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    );
  }
);

export default FormMasterGoods;

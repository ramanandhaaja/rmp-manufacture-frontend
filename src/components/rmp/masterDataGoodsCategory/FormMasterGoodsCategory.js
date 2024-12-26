import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FormMasterGoodsCategory = forwardRef(
  ({ setFormData, initialData, isEdit }, ref) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const formikRef = useRef(null);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Please enter the goods name"),
      goods_type: Yup.string()
        .min(1, "Please select at least one type")
        .required("Please select at least one type"),
      //   status: Yup.string()
      //     .min(1, "Please select at least one type")
      //     .required("Please select at least one type"),
    });

    if (isEdit) {
      validationSchema.fields.status = Yup.string().required(
        "Status is required in edit mode"
      );
    }

    const INITIAL_VALUES = {
      name: "",
      goods_type: null,
      status: "",
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

    const goodsTypeOptions = [
      { value: "non-material", label: "Non-Material" },
      { value: "material", label: "Material" },
    ];

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

              {/* Goods Type */}
              <FormItem
                label={
                  <span>
                    Tipe Barang <span>*</span>
                  </span>
                }
                invalid={errors.goods_type && touched.goods_type}
                errorMessage={errors.goods_type}
              >
                <Select
                  name="goods_type"
                  options={goodsTypeOptions}
                  placeholder="Pilih tipe barang"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("goods_type", option.value);
                    } else {
                      setFieldValue("goods_type", null);
                    }
                  }}
                />
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    );
  }
);

export default FormMasterGoodsCategory;

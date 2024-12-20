import React from "react";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  toast,
  Notification,
  DatePicker,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PageConfig } from "./config";
import { apiStore, apiUpdate } from "./api";
import dayjs from "dayjs";

const validationBuilder = {};
for (let index = 0; index < PageConfig.formFields.length; index++) {
  const el = PageConfig.formFields[index];

  validationBuilder[el.key] = Yup.string().required("This field is required");
}
const validationSchema = Yup.object().shape(validationBuilder);

export const FormData = ({
  onDialogClose,
  title,
  item = null,
  getData,
  localState,
}) => {
  const formInit = {};

  for (let index = 0; index < PageConfig.formFields.length; index++) {
    const el = PageConfig.formFields[index];
    formInit[el.key] = item ? (item[el.key] ?? "") : "";
    if (el.type === "date" && formInit[el.key]) {
      formInit[el.key] = dayjs(formInit[el.key]).toDate();
    }
  }

  return (
    <div>
      <h5 className="mb-4 text-center">{title}</h5>

      <Formik
        initialValues={formInit}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          for (let index = 0; index < PageConfig.formFields.length; index++) {
            const el = PageConfig.formFields[index];
            if (el.type === "date") {
              values[el.key] = dayjs(values[el.key]).format("YYYY-MM-DD");
            }
          }

          try {
            let title;
            if (item && item[PageConfig.primaryKey]) {
              await apiUpdate(item[PageConfig.primaryKey], values);

              title = "Updated";
            } else {
              await apiStore(values);
              title = "Created";
            }

            onDialogClose();

            toast.push(
              <Notification
                title={"Successfuly " + title}
                type="success"
                duration={2500}
              >
                Data successfuly {title}
              </Notification>,
              {
                placement: "top-center",
              }
            );

            if (item && item[PageConfig.primaryKey]) {
              getData(localState.params);
            } else {
              getData({
                ...localState.params,
                page: 1,
                sort_by: "desc",
                order_by: "id",
              });
            }
          } catch (error) {
            if (error?.response?.data?.errors) {
              const beEr = error?.response?.data?.errors;
              let er = {};
              for (
                let index = 0;
                index < PageConfig.formFields.length;
                index++
              ) {
                const el = PageConfig.formFields[index];
                if (beEr[el.key]) {
                  er[el.key] = beEr[el.key].join(",");
                }
              }

              setErrors(er);
            }

            toast.push(
              <Notification title={"Error"} type="danger">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong"}
              </Notification>,
              {
                placement: "top-center",
              }
            );
          }

          setSubmitting(false);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div className="lg:grid grid-cols-1 gap-4">
                  {PageConfig.formFields.map((item) => {
                    let input = (
                      <Field
                        type="text"
                        name={item.key}
                        placeholder={item.label}
                        component={Input}
                        textArea={item.type === "textarea"}
                      />
                    );

                    if (item.type === "date") {
                      input = (
                        <Field name={item.key}>
                          {({ field, form }) => {
                            return (
                              <DatePicker
                                field={field}
                                placeholder={item.label}
                                form={form}
                                value={values ? values[item.key] : ""}
                                onChange={(date) => {
                                  form.setFieldValue(field.name, date);
                                }}
                              />
                            );
                          }}
                        </Field>
                      );
                    }

                    return (
                      <div key={item.key}>
                        <FormItem
                          label={item.label}
                          invalid={
                            errors &&
                            touched &&
                            errors[item.key] &&
                            touched[item.key]
                          }
                          errorMessage={errors ? errors[item.key] : ""}
                        >
                          {input}
                        </FormItem>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-6">
                  <Button
                    className="mr-2 min-w-[250px] "
                    
                    type="button"
                    onClick={onDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button variant="solid" className="min-w-[250px]" type="submit" loading={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Save"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

import React, { useState } from "react";
import { Button, FormItem, FormContainer, Alert } from "components/ui";
import { PasswordInput } from "components/shared";
import { apiResetPassword } from "services/AuthService";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useQuery from "utils/hooks/useQuery";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Please enter your new password"),
  password_confirmation: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password confirmation does not match"),
});

const ResetPasswordForm = (props) => {
  const { disableSubmit = false, className } = props;

  const [resetComplete, setResetComplete] = useState(false);

  const query = useQuery();

  const [message, setMessage] = useTimeOutMessage();

  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting) => {
    const { password, password_confirmation } = values;
    setSubmitting(true);
    try {
      const resp = await apiResetPassword({
        token: query.get("token"),
        password,
        password_confirmation,
      });
      if (resp.data) {
        setSubmitting(false);
        setResetComplete(true);
      }
    } catch (errors) {
      setMessage(errors?.response?.data?.message || errors.toString());
      setSubmitting(false);
    }
  };

  const onContinue = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <div className={className}>
        <div className="mb-[2rem]">
          {resetComplete ? (
            <>
              <div className="flex mb-[40px] justify-center">
                <img
                  style={{ height: 120, width: 120 }}
                  src="/img/others/gif-check.gif"
                  alt="logo"
                />
              </div>
              <div className="flex-col justify-center items-center gap-5 inline-flex">
                <div className="text-center text-zinc-800 text-2xl font-bold">
                  Password changed successfully
                </div>
                <div className="text-center text-zinc-800 text-lg font-normal">
                  The password has been successfully changed, please log in
                  using your new password
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[388px] h-[65px] py-3 flex-col justify-center items-start gap-1 mb-[40px]">
                <img src="/img/others/logo-auth.png" alt="pic" />
              </div>
              <div className="flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-zinc-800 text-[32px] font-bold">
                  Create New Password
                </div>
                <div className="w-[388px] text-zinc-800 text-sm font-normal leading-[21px]">
                  Your new password must be different from the password you
                  previously used.
                </div>
              </div>
            </>
          )}
        </div>
        {message && (
          <Alert className="mb-4" type="danger" showIcon>
            {message}
          </Alert>
        )}
        <Formik
          initialValues={{
            token: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!disableSubmit) {
              onSubmit(values, setSubmitting);
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                {!resetComplete ? (
                  <>
                    <FormItem
                      label="New Password"
                      invalid={errors.password && touched.password}
                      errorMessage={errors.password}
                      labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
                    >
                      <Field
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Write here..."
                        component={PasswordInput}
                      />
                    </FormItem>
                    <FormItem
                      label="Confirm Password"
                      invalid={
                        errors.password_confirmation &&
                        touched.password_confirmation
                      }
                      errorMessage={errors.password_confirmation}
                      labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
                    >
                      <Field
                        autoComplete="off"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="Write here..."
                        component={PasswordInput}
                      />
                    </FormItem>
                    <Button
                      id="btn-submit"
                      block
                      loading={isSubmitting}
                      variant="solid"
                      className="text-white"
                      type="submit"
                    >
                      {"Submit"}
                    </Button>
                  </>
                ) : (
                  <Button
                    id="btn-login"
                    block
                    variant="solid"
                    className="text-white"
                    type="button"
                    onClick={onContinue}
                  >
                    Login Now
                  </Button>
                )}
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ResetPasswordForm;

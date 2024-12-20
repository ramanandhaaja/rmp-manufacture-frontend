import React, { useState, useEffect } from 'react';
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui';
import { apiForgotPassword } from 'services/AuthService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('The entered email address is invalid').required('Please enter your email'),
});

const ForgotPasswordForm = (props) => {
  const { disableSubmit = false, className } = props;

  const [emailSent, setEmailSent] = useState(false);

  const [count, setCount] = useState(0);

  const [message, setMessage] = useTimeOutMessage();

  const onSendMail = async (values, setSubmitting) => {
    const { email, redirect_url } = values;
    setSubmitting(true);
    try {
      const resp = await apiForgotPassword({
        email,
        redirect_url,
      });
      if (resp.data) {
        setSubmitting(false);
        setEmailSent(true);
        setCount(30);
      }
    } catch (errors) {
      setMessage(errors?.response?.data?.message || errors.toString());
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (count > 0) {
      const timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [count]);

  return (
    <>
      <div className={className}>
        <div className="mb-[2rem]">
          {emailSent ? (
            <>
              <div className="flex justify-center mb-[40px]">
                <div className="justify-center">
                  <img
                    style={{ height: 120, width: 120 }}
                    src="/img/others/email-send.gif"
                    alt="email-send"
                  />
                </div>
              </div>
              <div className="flex-col justify-center items-center gap-5 inline-flex">
                <div className="text-center text-zinc-800 text-2xl font-bold">
                  We have sent password recovery instructions to your email
                </div>
                <div className="text-center text-zinc-800 text-lg font-normal">
                  Didn't receive the email? check your spam filter or resend
                </div>
              </div>
            </>
          ) : (
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="w-[388px] h-[65px] py-3 flex-col justify-center items-start gap-1 inline-flex mb-[40px]">
                <img src="/img/others/logo-auth.png" alt="pic" />
              </div>
              <div className="text-zinc-800 text-[32px] font-bold">
                Forgot Password?
              </div>
              <div className="w-[388px] text-zinc-800 text-sm font-normal leading-[21px]">
                Please type your email address to reset your password
              </div>
            </div>
          )}
        </div>
        {message && (
          <Alert className="my-2" type="danger" showIcon>
            {message}
          </Alert>
        )}
        <Formik
          initialValues={{
            email: "",
            redirect_url: `${window.location.origin}/reset-password`,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!disableSubmit) {
              onSendMail(values, setSubmitting);
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className={emailSent ? "hidden" : ""}>
                  <FormItem
                    label="Email"
                    invalid={errors.email && touched.email}
                    errorMessage={errors.email}
                    labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
                  >
                    <Field
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Write here..."
                      component={Input}
                    />
                  </FormItem>
                </div>
                <Button
                  id="btn-send"
                  disabled={count}
                  block
                  loading={isSubmitting}
                  variant={emailSent ? "plain" : "solid"}
                  className="text-white"
                  type="submit"
                >
                  {emailSent ? (
                    <div className="text-center text-sky-600 text-sm font-bold leading-[21px]">
                      Re-send Email
                    </div>
                  ) : (
                    "Sent Email"
                  )}
                </Button>
                {emailSent && count ? (
                  <p className="text-gray-800 text-center mt-[.5rem]">
                    in : {count} seconds
                  </p>
                ) : null}
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPasswordForm;

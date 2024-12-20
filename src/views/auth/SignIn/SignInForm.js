import React from 'react';
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui';
import { ActionLink, PasswordInput } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';
import { LoginSvg } from 'assets/svg';
// import { IoIosLogIn } from 'react-icons/io';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('The entered email address is invalid').required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

const SignInForm = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    // signUpUrl = '/sign-up'
  } = props;

  const [message, setMessage] = useTimeOutMessage();

  const { signIn } = useAuth();

  const onSignIn = async (values, setSubmitting) => {
    const { email, password } = values;
    setSubmitting(true);

    const result = await signIn({
      email,
      password,
      platform_id: 0,
    });

    if (result.status === 'failed' || result.status === 'error') {
      setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        // Remove this initial value
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
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
              <FormItem
                label="Password"
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
              <div className="flex justify-end mb-6">
                <ActionLink to={forgotPasswordUrl}>
                  <div className="text-center text-sky-600 text-sm font-bold leading-[21px]">Forgot Password</div>
                </ActionLink>
              </div>
              <Button
                id="btn-signin"
                block
                loading={isSubmitting}
                variant="solid"
                className="text-white"
                icon={<LoginSvg />}
                type="submit"
              >
                {isSubmitting ? 'Login...' : 'Login'}
              </Button>
              {/* <div className="mt-4 text-center">
								<span>Don't have an account yet? </span>
								<ActionLink to={signUpUrl}>
									Sign up
								</ActionLink>
							</div> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
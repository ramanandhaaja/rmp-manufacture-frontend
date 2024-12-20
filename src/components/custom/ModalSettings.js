import React from 'react';
import {
  FormContainer,
  FormItem,
  Dialog,
  Button,
  Notification,
  toast,
} from 'components/ui';
import { PasswordInput } from 'components/shared';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
  password_old: Yup.string().required('Current password is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SettingsModal = ({ isOpen, onClose }) => {
  const { changePassword } = useAuth();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await changePassword({
        password_old: values?.password_old,
        password: values?.password,
        password_confirmation: values?.password_confirmation,
      });

      if (result.status === 'success') {
        toast.push(
          <Notification title={'Success'} type="success">
            Password successfully changed!
          </Notification>,
          {
            placement: 'top-center',
          },
        );
        onClose();
      } else {
        toast.push(
          <Notification title={'Error'} type="danger">
            {result.message || 'Failed to change password'}
          </Notification>,
          {
            placement: 'top-center',
          },
        );
      }
    } catch (error) {
      toast.push(
        <Notification title={'Error'} type="danger">
          {error?.response?.data?.message ||
            error?.message ||
            'Something went wrong'}
        </Notification>,
        {
          placement: 'top-center',
        },
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      closable={false}
      onClose={onClose}
      contentClassName="p-6 bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <Formik
        initialValues={{
          password_old: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Current Password"
                invalid={errors.password_old && touched.password_old}
                errorMessage={errors.password_old}
                labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
              >
                <Field
                  autoComplete="off"
                  name="password_old"
                  placeholder="Write here..."
                  component={PasswordInput}
                />
              </FormItem>

              <FormItem
                label="New Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
                labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Write here..."
                  component={PasswordInput}
                />
              </FormItem>

              <FormItem
                label="Confirm New Password"
                invalid={
                  errors.password_confirmation && touched.password_confirmation
                }
                errorMessage={errors.password_confirmation}
                labelClass="text-zinc-800 text-sm font-normal leading-[21px]"
              >
                <Field
                  autoComplete="off"
                  name="password_confirmation"
                  placeholder="Write here..."
                  component={PasswordInput}
                />
              </FormItem>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="plain"
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SettingsModal;

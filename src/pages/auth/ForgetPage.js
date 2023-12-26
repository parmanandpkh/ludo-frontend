import { Link, useNavigate, useLocation } from 'react-router-dom';

// @mui
import { Link as MLink, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { toast } from "react-toastify";

// utils
import { MESSAGE } from '../../utils/validationMessage';




// components
import apiAuth from '../../api/authService';
import { NOSPACE_REGEX } from '../../utils/constants';
import { complexEmailRegex } from '../../utils/emailCheck';
import errorHandler from '../../utils/errorHandler';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(NOSPACE_REGEX, MESSAGE.NO_SPACE)
    .test("is-email", MESSAGE.EMAIL, (val) => complexEmailRegex(val))
    .max(255)
});



export default function Login() {
  const navigate = useNavigate();
  // const location = useLocation();
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      apiAuth.forgot(values)
        .then((res) => {
          console.log(window.location.pathname)
          if (window.location.pathname === "/forgot") {
            toast.success(res?.data?.message)
            navigate('/login')
            //  navigate('/reset-password/:otp', { state: { email: values?.email } });
          }
        })
        .catch((err) => {
          errorHandler(err)
          setSubmitting(false)
        });

    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Typography variant="h3" sx={{ mb: 2 }} align="center">Forgot Password</Typography>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" {...getFieldProps('email')} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
          Get Link
        </LoadingButton>
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <MLink variant="subtitle2" underline="hover" to='/login' as={Link} sx={{ color: "#5251a8" }}>
            Back to Login
          </MLink>
        </Stack>
      </Form>
    </FormikProvider>
  )
}

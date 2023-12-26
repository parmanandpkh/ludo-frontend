import { useState } from 'react';
// components
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// @mui
import { Link as MLink, Stack, IconButton, InputAdornment, TextField, Typography,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

// components
import Iconify from '../../components/iconify';

import apiAuth from '../../api/authService';
import { login } from '../../features/AuthSlice';
import errorHandler from '../../utils/errorHandler';
import { MESSAGE } from 'src/utils/validationMessage';
import { NOSPACE_REGEX } from 'src/utils/constants';
import { complexEmailRegex } from 'src/utils/emailCheck';
// import Button from 'src/theme/overrides/Button';


// ----------------------------------------------------------------------

const LoginSchema = Yup.object().shape({
  email: Yup.string()
  .required('Email is required')
  .matches(NOSPACE_REGEX, MESSAGE.NO_SPACE)
  .test("is-email", MESSAGE.EMAIL, (val) => complexEmailRegex(val))
  .max(255),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
 
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      apiAuth
        .login(values)
        .then((res) => {
          
          localStorage.setItem("email",res.data.data.result.email)
          localStorage.setItem("name",res.data.data.result.name)
          dispatch(login(res.data.data.token));
         
          navigate('/dashboard/app', { replace: true });
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
      <Typography variant="h3" sx={{ mb: 2 }} align="center">Sign In</Typography>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" {...getFieldProps('email')} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
          <MLink variant="subtitle2" underline="hover" to='/forgot' as={Link} sx={{ color: "#5251a8" }}>
            Forgot password?
          </MLink>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </Button>
      </Form>
    </FormikProvider>
  )
}

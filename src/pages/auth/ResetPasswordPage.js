import { useEffect } from 'react';
// components
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// @mui
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { toast } from "react-toastify";

// utils
import { MESSAGE } from '../../utils/validationMessage';




// components
import apiAuth from '../../api/authService';
import { PASSWORDS_REGEX } from '../../utils/constants';
import errorHandler from '../../utils/errorHandler';


const validationSchema = Yup.object().shape({
    password: Yup.string().required('New Password is required').matches(PASSWORDS_REGEX, MESSAGE.PASSWORD),
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm Passwords must match').required('Confirm Password is required'),
});


export default function ResetPassword() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const {otp} = useParams()
    console.log(otp)
    // useEffect(() => {
    //     if (!state?.email) {
    //         toast.error("Please enter a email")
    //         navigate("/login");
    //     }
    // }, [navigate, state?.email])

    const formik = useFormik({
        initialValues: { cpassword: '', password: '' ,otp:otp},
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            apiAuth
                .reset({body:{newPassword: values?.password, confirmPassword: values?.cpassword} ,token:otp })
                .then((res) => {
                    toast.success(res?.data?.message)
                    navigate('/login');
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
            <Typography variant="h3" sx={{ mb: 2 }} align="center">Reset Password</Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField name="password" type='password' label="New Password" {...getFieldProps('password')} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
                    <TextField name="cpassword" type='password' label="Confirm Password" {...getFieldProps('cpassword')} error={Boolean(touched.cpassword && errors.cpassword)} helperText={touched.cpassword && errors.cpassword} />
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
                    Change Password
                </LoadingButton>
            </Form>
        </FormikProvider>
    )
}

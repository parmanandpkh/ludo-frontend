import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MESSAGE } from "../../utils/validationMessage";
import apiAuth from "../../api/authService";
import {
  MOBILE_REGEX,
  NOSPACE_REGEX,
  NOSPACE_REGEX_EMAIL,
  PASSWORDS_REGEX,
} from "../../utils/constants";
import errorHandler from "../../utils/errorHandler";
import SimpleLayout from "src/layouts/simple/SimpleLayout";
import apiUsers from "src/api/usersService";
import { complexEmailRegex } from "src/utils/emailCheck";
import CardLayout from "src/layouts/CardLayout";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("FirstName is required")
    .trim()
    .min(2, "Please enter atleast 2 characters")
    .max(50, "First name must not be more than 50 characters "),
  lastName: Yup.string()
    .required("LastName is required")
    .trim()
    .min(2, "Please enter atleast 2 characters")
    .max(50, "Last name must not be more than 50 characters "),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(MOBILE_REGEX, MESSAGE.PHONE),
  email: Yup.string()
    .required("Email  is required")
    .matches(NOSPACE_REGEX, "Space not applied")
    .trim()
    .test("is-email", "Invalid email", (val) => complexEmailRegex(val)),
});

export default function EditUser() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const userData = async () => {
    const response = await apiUsers.getOneUser(state.id);
    setData(response.data.data);
    console.log(response.data.data.email);
  };
  useEffect(() => {
    userData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: data.firstName ? data.firstName : "",
      lastName: data.lastName ? data.lastName : "",
      phoneNumber: data.phoneNumber ? data.phoneNumber : "",
      email: data.email ? data.email : "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      apiUsers
        .editUser({
          id: state.id,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values?.phoneNumber,
          email: values?.email,
        })
        .then((res) => {
          navigate("/user-management");
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          errorHandler(err);
          setSubmitting(false);
        });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <CardLayout>
        <CardHeader title="Edit User" />
        <CardContent>
          <FormikProvider value={formik} style={{ padding: "34px 30px" }}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3} direction={"column"} xs={12} md={6}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>

              <Stack spacing={2} mt={3} direction="row" alignItems="center">
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Update
                </Button>
                <Button
                  size="large"
                  type="button"
                  variant="contained"
                  onClick={() => {
                    navigate("/user-management");
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </CardContent>
      </CardLayout>
    </>
  );
}

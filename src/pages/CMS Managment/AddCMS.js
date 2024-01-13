import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik, Form, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MESSAGE } from "../../utils/validationMessage";
import {
  EMAIL_REGEX,
  MOBILE_REGEX,
  NOSPACE_REGEX,
  NOSPACE_REGEX_EMAIL,
  PASSWORDS_REGEX,
} from "../../utils/constants";
import errorHandler from "../../utils/errorHandler";
import apiUsers from "src/api/usersService";
import JoditEditor from "jodit-react";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .matches(NOSPACE_REGEX, "Enter valid title")
    .min(2, "Please enter atleast 2 characters")
    .max(50, "Title must not be more than 50 characters "),
  description: Yup.string()
    .required("Description is required")
    .matches(NOSPACE_REGEX, "Enter valid description")
    .min(3, "Description must be at least 3 characters long"),
});

export default function AddCMS() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editor = useRef();

  const formik = useFormik({
    initialValues: { title: "", description: "" },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      apiUsers
        .addUser({ title: values.title, description: values.description })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/cms-management");
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
      <Card>
        <CardContent>
          <FormikProvider value={formik} style={{ padding: "34px 30px" }}>
            <Typography variant="h4" sx={{ mb: 2 }} align="start">
              Add CMS
            </Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="title"
                  label="Title"
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field required name="description">
                  {(data) => {
                    console.log(data);
                    return (
                      <>
                        <JoditEditor
                          ref={editor}
                          value={data?.form?.values?.description}
                          tabIndex={1} // tabIndex of textarea
                          onChange={(newContent) => {
                            console.log(newContent);
                            formik.setFieldValue("description", newContent);
                          }}
                        />
                      </>
                    );
                  }}
                </Field>
                <span style={{ color: "red" }}>
                  <ErrorMessage name="description" />
                </span>

                <TextField
                  //   value={value}
                  //   onChange={(e) => setValue(e.target.value)}
                  select // tell TextField to render select
                  label="Label"
                >
                  <MenuItem key={1} value="test">
                    Test 1
                  </MenuItem>
                  <MenuItem key={2} value="test2">
                    Test 2
                  </MenuItem>
                </TextField>
              </Stack>

              <Button
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ my: 2 }}
              >
                Add
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  navigate("/user-management");
                }}
                sx={{ my: 2, ml: 4 }}
              >
                Cancel
              </Button>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </>
  );
}

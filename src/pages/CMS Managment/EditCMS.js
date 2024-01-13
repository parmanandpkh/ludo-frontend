import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import cmsService from "src/api/cmsService";
import { Button, MenuItem, TextField, Card, Stack, CardContent, Typography } from "@mui/material";
import JoditEditor from "jodit-react";

function EditCms() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { state } = useLocation();
  const [value, setValue] = useState(state.data.status ? "Active" : "Deactive");
  console.log(state.data.status);

  const handleChnage = (e) => {
    console.log(e.target.value);

    setValue(e.target.value);
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .strict()
      .min(3, "Content must be at least 3 characters long")
      // .max(1000, "Content must be less than 1000 characters ")
      .required("Content is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { title: state.data?.title ? state.data?.title : "", description: state.data?.description ? state.data?.description : "", status: value },
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        _id: state.data?._id,
        description: values?.description,
        title: values?.title,
        status: value == "Active" ? true : false,
      };

      const response = await cmsService.updatecms(body);
      console.log(response);
      if (response.data.status) {
        toast.success(`${state.data?.title} updated`);

        navigate("/cms-management");
      } else {
        toast.error(response.data.message);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card>
      <CardContent>
        <FormikProvider value={formik}>
          <Typography variant="h4" sx={{ mb: 2 }} align="start">
            Edit CMS
          </Typography>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField name="title" label="Title" fullWidth {...getFieldProps("title")} error={Boolean(touched.title && errors.title)} helperText={touched.title && errors.title} />

              <Field required name="description">
                {(data) => {
                  console.log(data);
                  return (
                    <>
                      <JoditEditor
                        ref={editor}
                        value={data.form.values.description}
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
                fullWidth
                value={value}
                onChange={handleChnage}
                select // tell TextField to render select
                label="Status"
              >
                <MenuItem key={1} value="Active">
                  Active
                </MenuItem>
                <MenuItem key={2} value="Deactive">
                  Deactive
                </MenuItem>
              </TextField>
            </Stack>
            <Button size="large" type="submit" variant="contained" sx={{ my: 2, float: "right", ml: 3 }}>
              Update
            </Button>
            <Button
              size="large"
              type="button"
              variant="contained"
              sx={{ my: 2, float: "right" }}
              onClick={() => {
                navigate("/cms-management");
              }}
            >
              Back
            </Button>
          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}

export default EditCms;

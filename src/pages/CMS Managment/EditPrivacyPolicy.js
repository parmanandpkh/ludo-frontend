import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  FormikProvider,
} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import cmsService from "src/api/cmsService";
import { Button, CardHeader } from "@mui/material";
import CardLayout from "src/layouts/CardLayout";
// import JoditEditor from "jodit-react";
// import { uploadAdapterPlugin } from '../Template/Uploadadapter';
// import {tostE, tostS} from "../Toast"
function EditPrivacyPolicy() {
  const navigate = useNavigate();
  const editor = useRef();
  const [detail, setDetail] = useState("");
  const privacypolicyData = async () => {
    const value = { contentType: "privacy-policy" };
    const response = await cmsService.contenttype(value);
    setDetail(response.data.data);
    console.log(response.data.data.privacyText);
  };
  console.log(detail.privacyText);
  useEffect(() => {
    privacypolicyData();
  }, []);
  const initialValues = {
    privacyText: detail?.privacyText,
    contentType: "privacy-policy",
  };
  console.log(initialValues);
  const validationSchema = Yup.object().shape({
    privacyText: Yup.string()
      .strict()
      .min(3, "Content must be at least 3 characters long")
      // .max(1000, "Content must be less than 1000 characters ")
      .required("Content is required"),
  });

  const onSubmit = async (values) => {
    const body = {
      privacyText: values?.privacyText,
      contentType: "privacy-policy",
    };

    const response = await cmsService.updatecms(body);

    if (response.data.status) {
      toast.success(response.data.message);
      privacypolicyData();
      navigate("/cms-management/privacy-policy");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <CardLayout noBackButton={true}>
        <CardHeader title={"Asdf"} />
    </CardLayout>
  );
}

export default EditPrivacyPolicy;

import { Grid, CardContent, Button, TextField,Typography,Card as MCard } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cmsService from "src/api/cmsService";
import * as yup from "yup";

const validationSchema = yup.object({ PrivacyPolicyText: yup.string().required() });

const PrivacyPolicy = () => {
    const navigate = useNavigate()
    const[detail, setDetail] = useState('')
    const PrivacyPolicyData = async () => {
        const value = {contentType :"privacy-policy"}
        const response = await cmsService.contenttype(value)
        setDetail(response.data.data)
        
        
      };
      console.log(detail)
      useEffect(()=>{
        PrivacyPolicyData()
      },[])

  
  return (
  <MCard className="overflow-hidden text-wrap col-6">
    <CardContent>
        <Card className="overflow-hidden text-wrap col-6">
            <Card.Header>
            <Button  size="large" type="submit" variant="contained"  sx={{ my: 2,float:'right' }} onClick={()=>{navigate('/dashboard/edit-privacy-policy',{state:detail})} }>
                   Edit
                </Button>
            <Card.Title as="h2">Privacy Policy </Card.Title>
            
            </Card.Header>
            <Card.Body>
            {detail && (
            <div className="row">
                <div className="" >
                <Typography variant="h6" dangerouslySetInnerHTML={{__html:detail?.privacyText}}>
                </Typography>
                </div>
            </div>
            )}   
            </Card.Body>
    </Card>
   </CardContent>
  </MCard>
  );
};

export default PrivacyPolicy;

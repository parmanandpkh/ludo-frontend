import { Grid, CardContent, Button, TextField, Typography, Card as MCard } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cmsService from "src/api/cmsService";
import errorHandler from "src/utils/errorHandler";
import * as yup from "yup";

const validationSchema = yup.object({ ViewCmsText: yup.string().required() });

const FaqView = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const {id} = useParams()
    const [data ,setData]= useState([])
    console.log(state)



    useEffect(() =>{
        const getFaq = async() =>{
            try {
                const {data} = await cmsService.getOneFaq(id)
                setData(data?.data)
            } 
            catch (error) {
                console.log("error")
                errorHandler(error)
            }
        }

        if(id){
            getFaq()
        }
    },[id])


    const addTargetAttribute = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');
        links.forEach((link) => {
            link.setAttribute('target', '_blank');
            // You can add other attributes as needed
        });
        return doc.body.innerHTML;
    };

    const sanitizedHTML = addTargetAttribute(state?.data?.description);

    return (
        <MCard className="overflow-hidden text-wrap col-6">
            <CardContent>
                <Card className="overflow-hidden text-wrap col-6">
                    <Card.Header>
                        <Button size="large" type="submit" variant="contained" sx={{ my: 2, float: 'right' }} onClick={() => { navigate('/cms-management') }}>
                            Back
                        </Button>
                        <Card.Title as="h2">{data?.title} </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {state && (
                            <div className="row">
                                <div className="" >
                                    <Typography style={{ fontWeight: 100 }} dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
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

export default FaqView;

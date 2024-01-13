import { makeStyles } from '@material-ui/core';
import { Box, Button, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import cmsService from 'src/api/cmsService';
import CardLayout from 'src/layouts/CardLayout'
import errorHandler from 'src/utils/errorHandler';

const useStyle = makeStyles((theme) => ({
    h4: {
        fontSize: "16px",
    },
    h3: {
        fontSize: "24px",
        fontWeight: "bold",

        [theme.breakpoints.down("xs")]: {
            padding: "0px",
            fontSize: "20px",
        },
    },
}));

const CommonListPage = ({ slugname, title, btnName, btnRedirectUrl }) => {
    const classes = useStyle();
    const navigate = useNavigate()
    const [data, setData] = useState({})



    useEffect(() => {
        const getPrivacy = async () => {
            try {
                let data = { "slug": slugname }
                const response = await cmsService.getCMS(data)
                setData(response.data.data)
            } catch (error) {
                errorHandler(error)
            }
        }
        getPrivacy()
    }, [])


    return (
        <CardLayout noBackButton={true}>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3
                }}
            >
                <Typography className={classes.h3}>
                    {title}
                </Typography>
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ ml: 3, mr: 3 }}
                    onClick={() => navigate(btnRedirectUrl)}
                >
                    {btnName}
                </Button>
            </Box>
            <hr />

            <CardContent >

                <Typography variant='h4' className={classes.h4}>Title</Typography>
                <Typography>{data?.title}</Typography>
                <br />
                <Typography variant='h4' className={classes.h4}>Description</Typography>
                <Typography dangerouslySetInnerHTML={{ __html: data?.description }} />
            </CardContent>
        </CardLayout>
    )
}

export default CommonListPage
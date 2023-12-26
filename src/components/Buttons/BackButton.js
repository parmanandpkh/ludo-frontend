import { useNavigate } from "react-router-dom"

// @mui
import {
    IconButton,
    Box,
    Typography
} from "@mui/material"


import Iconify from "../iconify"

const BackButton = ({ text, variant, link }) => {
    const navigate = useNavigate()

    variant = variant ?? 'h5'

    return (
        <Typography variant={variant} gutterBottom>
            <Box sx={{
                display: 'flex',
                // justifyContent: "center",
                alignItems: "center"
            }}>
                <IconButton sx={{ mr: 1 }} onClick={() => navigate(link ?? -1)}>
                    <Iconify icon="ep:back" />
                </IconButton>
                {text}
            </Box>
        </Typography>
    )
}

export default BackButton
import { useState } from "react"
import PropTypes from 'prop-types';

// @mui
import {
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';


import Iconify from '../iconify';


const PasswordField = ({
    name,
    label,
    errors,
    touched,
    getFieldProps
}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <TextField
            fullWidth
            // InputLabelProps={{ shrink: true }}
            name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...getFieldProps(name)}
            error={Boolean(touched[name] && errors[name])}
            helperText={touched[name] && errors[name]}
        />
    )
}

PasswordField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    touched: PropTypes.arrayOf(PropTypes.object).isRequired,
    getFieldProps: PropTypes.func.isRequired,
}


export default PasswordField
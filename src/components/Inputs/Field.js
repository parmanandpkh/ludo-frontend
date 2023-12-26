import { TextField } from "@mui/material"

const Field = ({
    name, label, errors, touched, getFieldProps
}) => {
    return (
        <TextField
            // InputLabelProps={{ shrink: true }}
            // name={name}
            label={label}
            fullWidth {...getFieldProps(name)}
            error={Boolean(touched[name] && errors[name])}
            helperText={touched[name] && errors[name]}
        />
    )
}

export default Field
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from "@mui/material"
import { ErrorMessage } from "formik"

const SelectField = ({
    arr, valKey, name, label, getFieldProps, touched, errors
}) => {
    return (
        <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
            <InputLabel id="Role">{label}</InputLabel>
            <Select
                labelId={label}
                id={name}
                label={label}
                // onChange={handleChange}
                {...getFieldProps(name)}
            >
                {arr.map((el) => (
                    <MenuItem value={el._id}>{el[valKey]}</MenuItem>
                ))}
                {/* <MenuItem value={5}>Waiter</MenuItem>
                <MenuItem value={6}>Driver</MenuItem>
                <MenuItem value={7}>Kitchen</MenuItem>
                <MenuItem value={8}>Cashier</MenuItem> */}
            </Select>
            <FormHelperText> <ErrorMessage name={name} /></FormHelperText>
        </FormControl>
    )
}


export default SelectField
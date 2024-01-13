import {
    TableRow,
    TableCell
} from "@mui/material"

function EmptyRows({ emptyRows }) {
    return (
        <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
        </TableRow>
    )
}

export default EmptyRows
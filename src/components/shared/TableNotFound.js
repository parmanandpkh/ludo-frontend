import { Typography, Paper, TableRow, TableCell } from '@mui/material'


function TableNotFound() {
    return (
        <TableRow>
            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                <Paper
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Typography color="textSecondary" paragraph>
                        Not found
                    </Typography>
                </Paper>
            </TableCell>
        </TableRow>
    )
}

export default TableNotFound
import React from 'react'
import {
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Typography,
} from '@mui/material'

function NoSearchFound({ filterName = "" }) {
    return (
        <TableBody>
            <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" paragraph>
                            Not found
                        </Typography>

                        <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                        </Typography>
                    </Paper>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default NoSearchFound
import React from 'react'
import {
    MenuItem,
    Popover as MPopover
} from '@mui/material'
import Iconify from '../iconify'

function Popover({
    options,
    setOpen,
    open
}) {
    const handleCloseMenu = () => {
        setOpen(null);
    }
    return (
        <MPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    p: 1,
                    width: 140,
                    '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                },
            }}
        >
            {
                options.map((opt, i) => (
                    <MenuItem onClick={opt.func} key={opt.id} >
                        <Iconify icon={opt.icon} sx={{ mr: 2 }} />
                        {opt.text}
                    </MenuItem>
                ))
            }
        </MPopover >
    )
}

export default Popover
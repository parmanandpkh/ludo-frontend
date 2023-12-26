import { Button } from '@mui/material'
import { useState } from 'react'
import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'

const DateField = ({
    selectedDates,
    setSelectedDates,
    setOpen,
    open
}) => {
    return (
        <div>
            <MultipleDatesPicker
                open={open}
                // disabledDates={[new Date()]}
                minDate={new Date()}
                selectedDates={selectedDates}
                onCancel={() => setOpen(false)}
                onSubmit={dates => {
                    // const arrISODates = dates.map(d => new Date(d).toISOString())
                    setSelectedDates(dates);
                    setOpen(false)
                }}
            />
        </div>
    )
}
export default DateField
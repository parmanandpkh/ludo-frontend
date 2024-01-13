const Verified = ({ isVerified, id, statusHandler }) => {
    if (isVerified === 1) return <Typography color="green">Accepted</Typography>

    if (isVerified === 2) return <Typography color="error">Rejected</Typography>

    return (
        <>
            <Button color="success" variant="contained" sx={{ mr: 2, color: "#fff" }} onClick={() => {
                statusHandler({
                    id,
                    status: 1
                })
            }}>Accept</Button>
            <Button color="error" variant="contained" onClick={() => {
                statusHandler({
                    id,
                    status: 2
                })
            }}>Reject</Button>
        </>
    )
}
import { Grid, Stack, Avatar } from "@mui/material"
import Button from "src/theme/overrides/Button";

const AvatarInput = ({
    setImg
}) => {
    const handleChangeImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
        }
    }
    return (
        <Grid item sm={12} md={12} >
            <Stack mb={2} spacing={3} alignItems="center" justifyContent="center">
                {img ? <Avatar alt="Super Admin Profile Picture" src={img} sx={{ width: 150, height: 150 }} /> : null}
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<Icon icon="uil:image-upload" />}
                >
                    Change Image
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            handleChangeImg(e);
                            formik.setFieldValue("profilepic", e.target.files[0]);
                        }}
                    />
                </Button>
            </Stack>
        </Grid>
    )
}

export default AvatarInput
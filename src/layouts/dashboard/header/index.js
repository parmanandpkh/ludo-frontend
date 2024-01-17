import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import { useEffect, useState } from "react";
import AxiosInterceptor from "src/utils/AxiosInterceptor";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  backgroundColor: "#393976",
  [theme.breakpoints.up("lg")]: { width: `calc(100% - ${NAV_WIDTH + 1}px)` },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log("asdfa");
        let res = await AxiosInterceptor().get("/access/getAdminDetails");
        console.log("res", res);
        setAdminDetails(res?.data?.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getDetails();
  }, []);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.white",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          {/* <NotificationsPopover /> */}
          <AccountPopover adminDetails={adminDetails} />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

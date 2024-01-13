import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
// @mui
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import React, { useState } from "react";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import palette from "src/theme/palette";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "src/features/AuthSlice";
import { makeStyles } from "@material-ui/core";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const useStyle = makeStyles((theme) => ({
  content: {
    background: `${palette.primary.darkest} !important`,
  },
}));

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1, color: palette.text.white }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.error.contrastText,
  },
  nested: {
    paddingTop: theme.spacing(1),
  },
}));
function NavItem({ item }) {
  const { title, path, icon, info, children,noClass } = item;
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been successfully logged out");
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  console.log("opem", open);
  const classes = useStyle();

  return (
    <>
      <StyledNavItem
        component={RouterLink}
        to={path}
        onClick={() => item.title == "Logout" && handleLogout()}
        sx={{
          color: palette.error.contrastText,
          "&.active": {
            color: palette.error.contrastText,
            bgcolor: "action.navSelected",
            fontWeight: "fontWeightBold",
          },
        }}
        className={noClass ? classes.content : ""}
      >
        <StyledNavItemIcon sx={{ color: palette.error.contrastText }}>
          {icon && icon}
        </StyledNavItemIcon>
        <ListItem onClick={handleClick}>
          <ListItemText disableTypography primary={title} />
          {title == "CMS Management" ? (
            open ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : (
            ""
          )}
        </ListItem>
        {info && info}
      </StyledNavItem>
      <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
        {title == "CMS Management"
          ? children?.map((item, key) => {
              return (
                <React.Fragment key={key}>
                  <StyledNavItem
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      marginLeft: "20px",
                      color: "error.contrastText",
                      "&.active": {
                        color: "error.contrastText",
                        bgcolor: "action.navSelected",
                        fontWeight: "fontWeightBold",
                      },
                    }}
                  >
                    <StyledNavItemIcon sx={{ color: "error.contrastText" }}>
                      {item.icon && item.icon}
                    </StyledNavItemIcon>
                    <ListItemText disableTypography primary={item.title} />
                  </StyledNavItem>
                </React.Fragment>
              );
            })
          : ""}
      </Collapse>
    </>
  );
}

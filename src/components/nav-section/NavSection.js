import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
//
import { makeStyles } from '@mui/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useState } from 'react';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item}  />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingTop: theme.spacing(1),
  },
}));
function NavItem({ item }) {
  const { title, path, icon, info,children } = item;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color:'#5251a8',
           bgcolor: title == 'CMS Management'?'':'action.selected',
          fontWeight:  'fontWeightBold',
        },
      }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItem button onClick={handleClick}>
        <ListItemText disableTypography primary={title}  />
        {title == 'CMS Management'? open ? <ExpandLess /> : <ExpandMore />:''}
        </ListItem>
      {info && info}
    </StyledNavItem>
      <Collapse in={open} timeout="auto" unmountOnExit orientation='vertical'>
        {title == 'CMS Management'? children.map((item)=>{
          {console.log(item)}
          return(
            <>
             <StyledNavItem
              component={RouterLink}
              to={item.path}
              sx={{
                marginLeft:"20px",
                '&.active': {
                  color: '#5251a8',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                },
              }}
              >
              <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>
                        <ListItemText disableTypography primary={item.title} />
              </StyledNavItem>
           
            </>
          
       
          )
         
         
        }
        ):''}
     
      </Collapse>
    </>
  );
}

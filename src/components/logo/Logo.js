import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

const Logo = ({ disabledLink = false, sx }) => {
  const logo = <Box component="img" src="/assets/ludoicon.png" sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }


  return (
    <Box sx={{ display: 'flex', width: "100%", justifyContent: "center" }} >
      <Link to="/" component={RouterLink}>
        {logo}
      </Link>
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;

import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// import from 'src/theme/overrides/Typography';




const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: { display: 'flex' },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      {/* <StyledHeader>
        <Logo />
      </StyledHeader> */}
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <Box component="img" src="/assets/ludoicon.png" sx={{ width: 100, height: 100, cursor: 'pointer' }} />
            </Box>
            <Outlet />
          </StyledContent>
        </Container>
      </StyledRoot>

    </>
  );
}

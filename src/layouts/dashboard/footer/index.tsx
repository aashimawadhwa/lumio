import { Typography, Box, styled } from '@mui/material';

//svgs
import Logo from 'src/assets/svg/icon_logo_dark';

const FooterWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));
export default function footer() {
  return (
    <FooterWrapper>
      <Typography mb={5} color="grey.500" align="left" variant="h6">
        Version #123
      </Typography>
      <Box>
        <Logo />
      </Box>
    </FooterWrapper>
  );
}

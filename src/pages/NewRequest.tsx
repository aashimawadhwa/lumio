import { useNavigate } from 'react-router';

// @mui
import { Box, Typography, styled, Grid, IconButton } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import AddPaymentSVGIcon from 'src/assets/svg/icon_addPaymentSVG';
import AddVisitorSVGIcon from 'src/assets/svg/icon_addVisitorSVG';
import AmenitiesSVGIcon from 'src/assets/svg/icon_amenitiesSVG';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CardChecklistSVGIcon from 'src/assets/svg/icon_cardChecklistSVG';
import ChangePaymentSVGIcon from 'src/assets/svg/icon_changePaymentSVG';
import KeySVGIcon from 'src/assets/svg/icon_keySVG';
import MoveInSVGIcon from 'src/assets/svg/icon_moveInSVG';
import MoveOutSVGIcon from 'src/assets/svg/icon_moveOut';
import NewParkingSVGIcon from 'src/assets/svg/icon_newParkingSVG';
import NocSVGIcon from 'src/assets/svg/icon_nocSVG';
import RequestBG from 'src/assets/images/ForgotPasswordBG.png';
import ShippingSVGIcon from 'src/assets/svg/icon_shippingSVG';

// components
import { PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';

// ----------------------------------------------------------------------

const request = [
  { title: 'Courier', icon: <ShippingSVGIcon />, link: PATH_MAIN.courier_request },
  { title: 'PDC Deferment', icon: <AddPaymentSVGIcon />, link: '' },
  { title: 'Amenities', icon: <AmenitiesSVGIcon />, link: PATH_MAIN.amenities },
  { title: 'NOC', icon: <NocSVGIcon />, link: PATH_MAIN.noc_request },
  { title: 'Move In', icon: <MoveInSVGIcon />, link: PATH_MAIN.move_in },
  { title: 'Move Out', icon: <MoveOutSVGIcon />, link: PATH_MAIN.move_out },
  { title: 'Key Handover', icon: <KeySVGIcon />, link: PATH_MAIN.key_handover },
  { title: 'Change Payment Method', icon: <ChangePaymentSVGIcon />, link: '' },
  { title: 'New Parking', icon: <NewParkingSVGIcon />, link: PATH_MAIN.parking },
  { title: 'New Access Cards', icon: <CardChecklistSVGIcon />, link: '' },
  { title: 'Add New Visitor', icon: <AddVisitorSVGIcon />, link: PATH_MAIN.add_visitor },
];

const CustomWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  maxWidth: '768px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2),
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    height: '100vh',
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 7,
  left: 16,
}));

const CustomBox = styled(Box)(({ theme }) => ({
  overflow: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[600],
  padding: theme.spacing(3, 0),
  borderRadius: '8px',
  cursor: 'pointer',
}));

export default function NewRequest() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  return (
    <Page img={isDesktop ? RequestBG : ''} title="New Request">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper sx={{ p: { xs: 0, sm: 3, md: 4.5 } }}>
          <Box
            sx={{ mb: { xs: 2.5, sm: 4.5 }, pt: { xs: 1.25, sm: 0 }, pb: { xs: 1.25, sm: 0 } }}
            textAlign="center"
          >
            {!isDesktop && (
              <CustomIconButton onClick={() => navigate(-1)}>
                <ArrowBackIos sx={{ fontSize: 'medium' }} />
              </CustomIconButton>
            )}
            <Typography
              variant={isDesktop ? 'h3' : 'subtitle1'}
              color={isDesktop ? '' : 'grey.400'}
            >
              New Request
            </Typography>
          </Box>
          <CustomBox sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
            <Grid container spacing={1.5}>
              {request.map((item, i) => (
                <Grid item xs={6} sm={4} md={3} lg={3} key={i}>
                  <Card textAlign="center" onClick={() => navigate(item.link)}>
                    {item.icon}
                    <Typography variant="body1" color="grey.400">
                      {item.title}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CustomBox>
        </CustomWrapper>
      </Wrapper>
    </Page>
  );
}

// @mui
import { Box, styled, Typography, Grid } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import { ArrowForwardIos } from '@mui/icons-material';
import AccssSVGIcon from 'src/assets/svg/icon_access_card';
import AddPaymentSVGIcon from 'src/assets/svg/icon_addPaymentSVG';
import AmenitiesSVGIcon from 'src/assets/svg/icon_amenitiesSVG';
import ChangePaymentSVGIcon from 'src/assets/svg/icon_changePaymentSVG';
import MoveInSVGIcon from 'src/assets/svg/icon_moveInSVG';
import MoveOutSVGIcon from 'src/assets/svg/icon_moveOut';
import NocSVGIcon from 'src/assets/svg/icon_nocSVG';
import ShippingSVGIcon from 'src/assets/svg/icon_shippingSVG';

//components
import { PATH_MAIN } from 'src/routes/paths';

const services = [
  { title: 'Courier Services', icon: <ShippingSVGIcon large={false} />, link: '' },
  { title: 'Payments', icon: <ChangePaymentSVGIcon />, link: '' },
  { title: 'PDC Deferment', icon: <AddPaymentSVGIcon large={false} />, link: '' },
  { title: 'Book Amenities', icon: <AmenitiesSVGIcon large={false} />, link: PATH_MAIN.amenities },
  { title: 'Access Card', icon: <AccssSVGIcon />, link: '' },
  { title: 'NOC', icon: <NocSVGIcon />, link: PATH_MAIN.noc_request },
  { title: 'Move In', icon: <MoveInSVGIcon />, link: PATH_MAIN.move_in },
  { title: 'Move Out', icon: <MoveOutSVGIcon />, link: PATH_MAIN.move_out },
];

const ServiceCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.grey[100],
  borderRadius: '8px',
  padding: theme.spacing(2.5, 1.875),
  [theme.breakpoints.down('sm')]: {
    background: 'transparent',
    padding: theme.spacing(2.5, 0),
    borderTop: `0.5px solid ${theme.palette.grey[400]}`,
    borderRadius: 0,
  },
}));

export default function ServiceContainer() {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Grid container spacing={{ xs: 0, sm: 1.5 }}>
      {services.map((item, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <ServiceCard>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {item.icon}
              <Typography color={isDesktop ? 'grey.0' : 'grey.400'} variant="subtitle1" ml={1.5}>
                {item.title}
              </Typography>
            </Box>
            <ArrowForwardIos fontSize="small" />
          </ServiceCard>
        </Grid>
      ))}
    </Grid>
  );
}

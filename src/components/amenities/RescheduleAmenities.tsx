import { useNavigate } from 'react-router-dom';

// @mui
import { IconButton, styled, Typography, Box } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//images and icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InboxBG from 'src/assets/images/InboxBG.png';

//components
import AmenitiesForm from 'src/components/amenities/AmenitiesForm';
import Page from 'src/components/Page';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

const CustomBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  minWidth: '415px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    padding: 0,
  },
}));

interface Props {
  icon: React.ReactElement | undefined;
  title: string;
}

export default function RescheduleAmenities({ icon, title }: Props) {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Reschedule Amenities">
      <Wrapper sx={{ mb: 5 }}>
        <CustomBox>
          {!isDesktop ? (
            <MobileHeader
              leftNav={
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                </IconButton>
              }
              title="Reschedule Amenity Booking"
            />
          ) : (
            <Typography align="center" variant="h3" mb={3}>
              Reschedule Amenity Booking
            </Typography>
          )}
          <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
            <AmenitiesForm icon={icon} title={title} reschedule={true} />
          </Box>
        </CustomBox>
      </Wrapper>
    </Page>
  );
}

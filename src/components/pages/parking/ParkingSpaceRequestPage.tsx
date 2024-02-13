//react
import { useNavigate } from 'react-router-dom';

//mui
import { Box, Grid, styled, Button, Typography, IconButton, Divider } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ParkingBG from 'src/assets/images/ParkingBG.png';

//components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import ViewProperty from './ViewProperty';

//data
import { AddNewParkingSpaceData } from 'src/utils/constant';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

const PropertiesWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[900],
  maxWidth: '808px',
  borderRadius: '1rem',
  padding: theme.spacing(4.5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: '100%',
  },
}));

const ItemWrapper = styled('div')(() => ({
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));
const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
}));

const DetailsWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  borderRadius: '8px',
  padding: theme.spacing(2, 2.5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 1.5),
  },
  [theme.breakpoints.down(700)]: {
    padding: theme.spacing(1.5, 1),
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '16px',
  },
}));

const NavIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 8,
  top: 16,
}));

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(0, 1),
}));

export default function ContracrRenew() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  return (
    <Page title="Parking Space Request" img={isDesktop ? ParkingBG : ''}>
      <Wrapper sx={{ marginBottom: 5 }}>
        <PropertiesWrapper>
          {isDesktop ? (
            <Typography pt={1.5} pb={4} color="grey.0" variant="h2" align="center">
              Parking Space Request
            </Typography>
          ) : (
            <>
              <MobileHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                  </IconButton>
                }
                title="Parking Space Request"
              />
              <Typography
                variant="subtitle2"
                color="grey.500"
                sx={{
                  px: { xs: 2, sm: 0 },
                  mb: 3,
                  mt: 3,
                }}
              >
                Reserve parking spaces for you & your guests to enjoy seamless care.
              </Typography>
            </>
          )}

          <Grid sx={{ px: { xs: 2, sm: 0 } }} container columnSpacing={0}>
            <Grid item xs={12} sm={5.2}>
              <ViewProperty />
            </Grid>
            {isDesktop ? <Divider orientation="vertical" flexItem sx={{ m: 2 }} /> : ''}
            <Grid item sx={{ flex: 1 }}>
              <Box>
                {isDesktop ? (
                  <Typography variant="subtitle2" color="grey.500" sx={{ mb: { md: 3, sm: 2 } }}>
                    Reserve parking spaces for you & your guests to enjoy seamless care.
                  </Typography>
                ) : (
                  ''
                )}

                <DetailsWrapper sx={{ mb: 1 }}>
                  <Typography variant="body2" color="grey.500">
                    New Parking Permit
                  </Typography>
                  <Typography variant="subtitle1" color="grey.0" mb={1}>
                    Valid till the current lease contract
                  </Typography>
                  {AddNewParkingSpaceData.map((item: any, i: any) => (
                    <ItemWrapper key={i}>
                      <Typography variant="subtitle2" color="grey.500">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="grey.400">
                        {item.idNo}
                      </Typography>
                    </ItemWrapper>
                  ))}
                </DetailsWrapper>
                <DetailsWrapper>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" color="grey.500">
                      Amount for new Parking Permit:
                    </Typography>
                    <Typography variant="h5" color="grey.400">
                      800 AED
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="start" marginBottom={2}>
                    <InfoOutlinedIcon fontSize="small" />
                    <Typography variant="body2" color="grey.500" ml={0.4}>
                      You will be asked to pay the amount once the request is approved.
                    </Typography>
                  </Box>
                </DetailsWrapper>
                <SubmitButton variant="outlined" sx={{ mb: 1.5, mt: 2 }}>
                  Submit Request
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </PropertiesWrapper>
      </Wrapper>
    </Page>
  );
}

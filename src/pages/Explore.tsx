// @mui
import {
  CardContent,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Box,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

//hooks
import useResponsive from 'src/hooks/useResponsive';


//images
import { explore } from 'src/utils/constant';
import { PATH_MAIN } from 'src/routes/paths';
import { Visibility, ArrowBackIos } from '@mui/icons-material';
import BG from 'src/assets/images/MenuMobileBG.png';
import InboxBG from 'src/assets/images/InboxBG.png';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

//components
import { HorizontalScrollBox, InnerWrapper } from 'src/pages/MyProperties';

import Page from 'src/components/Page';

//............................................................................

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 40,
  [theme.breakpoints.down('lg')]: {
    paddingTop: 30,
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: 20,
  },
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    paddingTop: 5,
    background: 'rgba(0,0,0,0.5)',
  },
}));

export default function Explore() {
  const isDesktop = useResponsive('up', 'sm');

  const navigate = useNavigate();
  return (
    <Page img={isDesktop ? InboxBG : BG} title="Explore">
      <Wrapper>
        <InnerWrapper
          sx={{
            background: !isDesktop ? 'transparent' : '#1d1d1d',
          }}
        >
          <Grid mb={3.5} display="flex" alignItems="center" container>
            <Grid item xs={2}>
              {!isDesktop && (
                <MobileHeader
                  leftNav={
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIos sx={{ fontSize: 'medium' }} />
                    </IconButton>
                  }
                />
              )}
            </Grid>
            <Grid item xs={8}>
              <Typography
                textAlign="center"
                variant="h3"
                sx={{ color: { xs: 'grey.400', sm: 'grey.0' } }}
              >
                Explore
              </Typography>
            </Grid>
          </Grid>
          <Typography align="left" variant="h3" mb={2} color="grey.400">
            Available Properties
          </Typography>
          <HorizontalScrollBox>
            {explore.map((property, i) => (
              <Card
                key={i}
                sx={{
                  minWidth: 284,
                  marginRight: 1.5,
                  borderRadius: '8px',
                  background: isDesktop ? '#272727' : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(PATH_MAIN.explore_property)}
              >
                <CardMedia component="img" height="284" image={property.image} alt="green iguana" />
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography mb={1} textAlign="left" variant="h4">
                    {property.propertyName}
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'end' }}>
                    <Typography variant="body2" color="grey.500">
                      Starts at
                    </Typography>{' '}
                    <Typography mx={0.3} variant="h5" color="grey.0">
                      {property.price}
                    </Typography>{' '}
                    <Typography variant="body2" color="grey.500">
                      /year
                    </Typography>
                  </div>

                  {isDesktop && (
                    <Box mt={1.5} display="flex" justifyContent="center" alignItems="center">
                      <Visibility sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">View this Property</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </HorizontalScrollBox>
        </InnerWrapper>
      </Wrapper>{' '}
    </Page>
  );
}

// @mui
import { Box, Grid, IconButton, styled, Typography } from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MyPropertiesBG from 'src/assets/images/MyPropertiesBG.png';

// components
import Page from 'src/components/Page';
import PropertyCard from 'src/components/pages/properties/PropertyCard';

// data
import { Properties } from 'src/utils/constant';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';

//...............................................
export const InnerWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '948px',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '880px',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '600px',
    padding: theme.spacing(4.5, 3),
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));

export const HorizontalScrollBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingBottom: theme.spacing(1),
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    height: '6px',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '15px',
    background: theme.palette.grey[400],
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.grey[500],
  },
}));

export default function MyProperties() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  return (
    <Page img={isDesktop ? MyPropertiesBG : ''} title="My Properties">
      <Wrapper>
        <InnerWrapper>
          <Grid mb={3.5} display="flex" alignItems="center" container>
            <Grid item xs={2}>
              {!isDesktop && (
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={8}>
              <Typography
                textAlign="center"
                variant="h3"
                sx={{ color: { xs: 'grey.400', sm: 'grey.0' } }}
              >
                My Properties
              </Typography>
            </Grid>
          </Grid>
          <HorizontalScrollBox>
            {Properties.map((property) => (
              <PropertyCard
                key={property.id}
                propertyName={property.propertyName}
                unitName={property.unitName}
                image={property.image}
                onClick={() => navigate('/dashboard/profile/property')}
              />
            ))}
          </HorizontalScrollBox>
        </InnerWrapper>
      </Wrapper>
    </Page>
  );
}

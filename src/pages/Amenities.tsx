import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid, IconButton, styled, Typography, Box } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//images and icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Conference from 'src/assets/svg/Conference';
import EventRoom from 'src/assets/svg/EventRoom';
import GymUnisex from 'src/assets/svg/GymUnisex';
import GymWomen from 'src/assets/svg/GymWomen';
import InboxBG from 'src/assets/images/InboxBG.png';
import Jacuzzi from 'src/assets/svg/Jacuzzi';
import Pool from 'src/assets/svg/Pool';
import Tennis from 'src/assets/svg/Tennis';
import Yoga from 'src/assets/svg/Yoga';

//components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import AmenitiesForm from 'src/components/amenities/AmenitiesForm';
import Page from 'src/components/Page';

const data = [
  { id: '1', icon: <Yoga />, title: 'Dance / Yoga Studio' },
  { id: '2', icon: <Conference />, title: 'Conference Room' },
  { id: '3', icon: <Pool />, title: 'Pool' },
  { id: '4', icon: <EventRoom />, title: 'Event Room' },
  { id: '5', icon: <GymWomen />, title: 'Women Only Gym' },
  { id: '6', icon: <GymUnisex />, title: 'Unisex Gym' },
  { id: '7', icon: <Jacuzzi />, title: 'Jacuzzi' },
  { id: '8', icon: <Tennis />, title: 'Tennis Court' },
];

const AmenitiesContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 4.5),
  display: 'flex',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  margin: theme.spacing(0, 2, 3.75, 2),
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'transparent',
    display: 'block',
    width: '100%',
    padding: theme.spacing(2.5),
    margin: 0,
  },
  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(0.5),
  },
}));

const CustomGrid = styled(Grid)(({ theme }) => ({
  '& .active': {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[400],
  },
}));

const Card = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  background: theme.palette.grey[600],
  borderRadius: '8px',
  height: '104px',
  width: '100%',
}));

export default function Amenities() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'sm');
  const isSmall = useResponsive('down', 300);
  const [prevIndex, setPrevIndex] = useState('');
  const [booking, setBooking] = useState(false);
  const [icon, setIcon] = useState<React.ReactElement>();
  const [title, setTitle] = useState('');

  const handleToggle = (ind: any, icon: any, title: string) => {
    if (!isDesktop) {
      setBooking(!booking);
    } else {
      if (ind === prevIndex || !booking) {
        setBooking(!booking);
      }
    }
    setIcon(icon);
    setTitle(title);
    setPrevIndex(ind);
  };

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Amenities">
      <Wrapper>
        <AmenitiesContainer>
          <Box
            sx={{
              maxWidth: { xs: '100%', sm: '272px', md: '342px' },
            }}
          >
            {!isDesktop ? (
              <>
                <Grid mb={2} sx={{ display: 'flex', alignItems: 'center' }} container>
                  <Grid sx={{ textAlign: 'start' }} item xs={2} sm={2} md={2} lg={2}>
                    <IconButton onClick={() => booking ? setBooking(false) : navigate(-1)}>
                      <ArrowBackIosIcon sx={{ fontSize: 'small' }} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography align="center" variant="subtitle1" color="grey.400">
                      Book Amenities
                    </Typography>
                  </Grid>
                  <Grid sx={{ textAlign: 'start' }} item xs={2} sm={2} md={2} lg={2} />
                </Grid>
                {!booking && (
                  <Typography my={1} align="left" color="grey.500" variant="subtitle1">
                    Amenity
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Typography align="center" variant="h3">
                  Amenity Booking
                </Typography>
                <Typography my={1.5} align="left" color="grey.400" variant="h3">
                  Amenity
                </Typography>
              </>
            )}
            {(!booking || (booking && isDesktop)) && (
              <CustomGrid container spacing={isSmall ? 0.5 : 2}>
                {data.map((item, i) => (
                  <Grid key={i} item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Card
                      className={`${item.id === prevIndex && booking && isDesktop ? 'active' : ''}`}
                      onClick={() => handleToggle(item.id, item.icon, item.title)}
                    >
                      <div>
                        <div>{item.icon}</div>
                        <div>
                          <Typography
                            color="grey.400"
                            fontWeight={isDesktop ? 600 : 400}
                            variant="body2"
                          >
                            {item.title}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </CustomGrid>
            )}
          </Box>
          {booking && <AmenitiesForm icon={icon} title={title} reschedule={false} />}
        </AmenitiesContainer>
      </Wrapper>
    </Page>
  );
}

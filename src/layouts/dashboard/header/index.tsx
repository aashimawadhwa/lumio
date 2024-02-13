import { useNavigate, useLocation } from 'react-router-dom';

// @mui
import { Stack, AppBar, Toolbar, Grid, Box, styled } from '@mui/material';
// utils

//hooks
import useResponsive from 'src/hooks/useResponsive';

// config
import { HEADER } from '../../../config';
import { navConfig } from '../navbar/NavConfig';

// components
import { IconButtonAnimate } from 'src/components/animate';
import { NavSectionHorizontal } from 'src/components/nav-section';

import Account from './Account';
import Inbox from './Inbox';
import LogoutButton from './Logout';

//images
import Logo from 'src/assets/svg/icon_logo';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//paths
import { PATH_MAIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  backgroundColor: theme.palette.grey[900],
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
  },
  [theme.breakpoints.down('sm')]: {
    background: 'transparent',
  },
}));

const NavContent = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function DashboardHeader() {
  const isDesktop = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = pathname.includes('/menu');

  return (
    <RootStyle>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          py: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        <Grid container>
          <NavContent item xs={12} sm={6} md={6.8} lg={6.3}>
            {menu ? (
              <NavSectionHorizontal navConfig={navConfig} />
            ) : (
              <Box>
                <IconButtonAnimate
                  onClick={() => navigate(-1)}
                  sx={{
                    width: { xs: 35, sm: 40, lg: 48 },
                    height: { xs: 35, sm: 40, lg: 48 },
                    background: { xs: 'transparent', sm: '#383838' },
                  }}
                >
                  <ArrowBackIosIcon sx={{ pl: 0.6 }} fontSize="medium" />
                </IconButtonAnimate>
              </Box>
            )}

            {isDesktop ? (
              <div style={{ cursor: 'pointer' }} onClick={() => navigate(PATH_MAIN.dashboard)}>
                <Logo />
              </div>
            ) : null}
          </NavContent>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            item
            xs={12}
            sm={6}
            md={5.2}
            lg={5.7}
          >
            <Stack
              sx={{
                display: { xs: 'flex', sm: 'block' },
                justifyContent: { xs: 'space-between', sm: 'center' },
                width: { xs: '100%', sm: 'inherit' },
              }}
              direction="row"
              alignItems="center"
              spacing={{ xs: 0.5, sm: 1.5 }}
            >
              <Inbox />
              {menu ? <Account /> : <LogoutButton />}
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </RootStyle>
  );
}

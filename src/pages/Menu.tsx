// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Grid, styled, SwipeableDrawer, Typography } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//SVG and Images
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';
import IconChat from 'src/assets/svg/icon_chat';
import IconDevice from 'src/assets/svg/icon_device';
import MenuBG from 'src/assets/images/MenuBG.png';
import MenuMobileBG from 'src/assets/images/MenuMobileBG.png';
import MenuSVGIcon from 'src/assets/svg/icon_menuIconSVG';

// components
import { menuItems } from 'src/layouts/dashboard/navbar/NavConfig';
import { Wrapper } from 'src/components/auth/styledComponents/styles';

import Page from 'src/components/Page';
import Search from 'src/components/search/Search';

//paths
import { PATH_MAIN } from 'src/routes/paths';

//redux
// ----------------------------------------------------------------------

const MainWrapper = styled('div')(({ theme }) => ({
  maxWidth: '500px',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(18),
  },
  [theme.breakpoints.down(400)]: {
    marginTop: theme.spacing(20),
  },
  [theme.breakpoints.down(380)]: {
    marginTop: theme.spacing(13),
  },
}));

const MainIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 'auto',
  borderRadius: '100%',
  cursor: 'pointer',
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.grey[900],
  height: '118px',
  width: '118px',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '96px',
    width: '96px',
  },
  [theme.breakpoints.down(300)]: {
    height: '80px',
    width: '80px',
  },
}));

const MenuIconWrapper = styled('div')(({ theme }) => ({
  margin: 'auto',
  marginTop: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  height: '96px',
  width: '96px',
  border: '2.45833px solid #59595980',
  cursor: 'pointer',
  backgroundColor: theme.palette.grey[900],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  [theme.breakpoints.down(300)]: {
    height: '80px',
    width: '80px',
  },
}));

const MenuGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 8),
  },
  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(0, 4),
  },
}));

export default function Menu() {
  const [openSearch, setOpenSearch] = useState(false);
  const [showConceirgeDrawer, setShowConceirgeDrawer] = useState(false);
  const navigate = useNavigate();

  const isMobile = useResponsive('down', 'sm');

  const handleClickMenuItem = (id: number) => {
    console.log(id);

    switch (id) {
      case 1:
        navigate(PATH_MAIN.amenities);
        break;
      case 2:
        navigate(PATH_MAIN.payment);
        break;
      case 3:
        navigate(PATH_MAIN.request);
        break;
      case 4:
        console.log(id);
        break;
      case 5:
        setOpenSearch(true);
        break;
      case 6:
        if (isMobile) {
          setShowConceirgeDrawer(true);
        }
        break;
    }
  };
  return (
    <Page title="Menu" img={isMobile ? MenuMobileBG : MenuBG}>
      {openSearch ? (
        <Search setOpenSearch={setOpenSearch} />
      ) : (
        <>
          {!showConceirgeDrawer && (
            <Wrapper>
              <MainWrapper>
                <MenuGrid container>
                  {menuItems.map((item: any, i: any) => (
                    <Grid key={i} item xs={6} sm={4}>
                      <MainIconWrapper onClick={() => handleClickMenuItem(item.id)} key={item}>
                        {item.icon}
                        <Typography variant="h6" color="grey.400">
                          {item.title}
                        </Typography>
                      </MainIconWrapper>
                    </Grid>
                  ))}
                </MenuGrid>

                <MenuIconWrapper onClick={() => navigate(PATH_MAIN.explore)}>
                  <MenuSVGIcon />
                </MenuIconWrapper>
              </MainWrapper>
            </Wrapper>
          )}
        </>
      )}
      <SwipeableDrawer
        PaperProps={{
          style: {
            backgroundColor: 'common.black',
            opacity: 0.6,
          },
        }}
        anchor="bottom"
        hideBackdrop={true}
        open={showConceirgeDrawer && !!isMobile}
        onOpen={() => setShowConceirgeDrawer(true)}
        onClose={() => setShowConceirgeDrawer(false)}
      >
        <Box textAlign="center" p="12px 24px 36px 24px">
          <DrawerSVGIcon />
          <Typography mt={1.5} mb={2} textAlign="left" variant="h1" color="grey.300">
            Get help
          </Typography>
          <Grid container columnSpacing={1.5}>
            <Grid item xs={6}>
              <Box p="24px 0" bgcolor="common.black" borderRadius={1} sx={{ opacity: 0.8 }}>
                <IconDevice large={true} />
                <Typography variant="body1">Call concierge</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                onClick={() => navigate('/dashboard/chat_to_conceirge')}
                p="24px 0"
                bgcolor="common.black"
                borderRadius={1}
                sx={{ opacity: 0.8 }}
              >
                <IconChat />
                <Typography variant="body1">Chat to concierge</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>
    </Page>
  );
}

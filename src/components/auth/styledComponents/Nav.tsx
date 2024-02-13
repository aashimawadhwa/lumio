import { useNavigate, useLocation } from 'react-router-dom';

//@mui
import { IconButton, styled, AppBar } from '@mui/material';

// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Logo from 'src/assets/svg/icon_logo';

// constants
import { HEADER } from 'src/config';

export const Head = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
    marginTop: theme.spacing(10),
  },
}));

const BackIcon = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[200],
  position: 'absolute',
  left: 70,
  top: 23,
}));

export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const back = pathname.includes('/login');

  return (
    <Head>
      {!back && (
        <BackIcon
          sx={{
            width: { xs: 35, sm: 40, lg: 48 },
            height: { xs: 35, sm: 40, lg: 48 },
            background: { xs: 'transparent', sm: '#383838' },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon sx={{ pl: 0.6 }} fontSize="medium" />
        </BackIcon>
      )}
      <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Logo />
      </div>
    </Head>
  );
}

// react
import { useState } from 'react';

// @mui
import {
  IconButton,
  Avatar,
  Box,
  Grid,
  styled,
  Typography,
  Badge,
  BadgeProps,
} from '@mui/material';

// hooks
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';

// components
import AddBankAccount from 'src/components/pages/profile/dialog/AddBankAccount';
import BankDetailDilog from 'src/components/pages/profile/dialog/BankDetailDialog';
import Footer from 'src/layouts/dashboard/footer';
import LogoutDialog from 'src/assets/elements/LogoutDialog';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import NotificationPreference from 'src/components/pages/profile/dialog/NotificationPreference';
import Page from 'src/components/Page';

// images
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import IconHome from 'src/assets/svg/icon_home';
import IconRequest from 'src/assets/svg/icon_request';
import IconDocument from 'src/assets/svg/icon_document';
import IconPayment from 'src/assets/svg/icon_payment';
import IconWallet from 'src/assets/svg/icon_wallet';
import IconNotification from 'src/assets/svg/notification_icon';
import IconLock from 'src/assets/svg/icon_lock';
import IconDevice from 'src/assets/svg/icon_device';
import Logout from 'src/assets/svg/icon_logout';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import OccupantDetailIcon from 'src/assets/svg/occupant_details_icon';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import User from 'src/assets/images/User.png';
import UserIcon from 'src/assets/svg/user_icon';
import VehicleIcon from 'src/assets/svg/vehicle_icon';

// styles
import { PATH_AUTH, PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutType } from 'src/redux/slices/logout';

//..............................................................

const ProfileBox = styled('div')(({ theme }) => ({
  maxWidth: '794px',
  background: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
  },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  margin: 'auto',
  width: 72,
  height: 72,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(0.5),
  },
}));

const BoxWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(4, 4.2, 5.3, 4.2),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0),
    padding: theme.spacing(2, 2, 3, 2),
  },
}));

const BoxItemStyle = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2.8, 0),
  backgroundColor: theme.palette.grey[600],
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2.2, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.8, 0),
  },
}));

const TabStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5, 0),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: `0.5px solid #97979733}`,
  cursor: 'pointer',
}));

const BadgeWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '0.75rem',
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  marginLeft: '0.75rem',
  '& .MuiBadge-badge': {
    color: theme.palette.grey[900],
    fontWeight: 400,
    fontSize: '0.625rem',
    height: '16px',
    minWidth: '2px',
    background: theme.palette.grey[400],
  },
}));

interface ItemProp {
  icon: JSX.Element;
  title: string;
  badgeCount?: number;
  id: number;
}
interface TabProp {
  icon: JSX.Element;
  title: string;
  style?: any;
  onClick?: () => void;
}

export function BoxItem({ id, icon, title, badgeCount }: ItemProp): React.ReactElement {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (id) {
      case 1:
        navigate(PATH_MAIN.properties);
        break;
      case 2:
        navigate(PATH_MAIN.all_request);
        break;
      case 3:
        navigate(PATH_MAIN.documents);
        break;
      case 4:
        navigate(PATH_MAIN.all_payment);
        break;
      default:
        return;
    }
  };
  return (
    <BoxItemStyle onClick={handleClick}>
      {icon}
      <BadgeWrapper>
        <Typography color="grey.400" variant="body1">
          {title}
        </Typography>
        {!!badgeCount && <StyledBadge badgeContent={2} />}
      </BadgeWrapper>
    </BoxItemStyle>
  );
}
export function TabItem({ icon, title, onClick, style }: TabProp): React.ReactElement {
  return (
    <TabStyle onClick={onClick} sx={style}>
      <Box display="flex">
        {icon}
        <Typography variant="h6" marginLeft={2} color="grey.400">
          {title}
        </Typography>
      </Box>
      <NavigateNextOutlinedIcon sx={{ color: 'grey.400' }} />
    </TabStyle>
  );
}

const BoxData = [
  {
    id: 1,
    name: 'My Properties',
    icon: <IconHome />,
    badgeCount: 2,
  },
  {
    id: 2,
    name: 'Requests',
    icon: <IconRequest />,
    badgeCount: 2,
  },
  {
    id: 3,
    name: 'Documents',
    icon: <IconDocument />,
  },
  {
    id: 4,
    name: 'Payments',
    icon: <IconPayment />,
  },
];

export default function Profilepage(): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [bankExist, setBankExist] = useState(false);
  const dispatch = useDispatch();

  const { logout } = useSelector((state: any) => state.logout.value);

  const handleCancel = () => {
    dispatch(logoutType({ logout: false }));
  };

  const showLogout = logout && !!isDesktop;

  return (
    <Page title="Profile Page" img={isDesktop ? ProfileBG : ''}>
      {!showBankDialog && !showNotification && !showLogout && (
        <Wrapper sx={{ marginBottom: 5 }}>
          <ProfileBox>
            {isDesktop ? (
              <Typography sx={{ mb: { xs: 2, sm: 4 } }} variant="h4" color="grey.400">
                Profile
              </Typography>
            ) : (
              <MobileHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIos sx={{ fontSize: 20 }} />
                  </IconButton>
                }
                title="Profile"
                rightNav={
                  <IconButton onClick={() => dispatch(logoutType({ logout: true }))}>
                    <Logout />
                  </IconButton>
                }
              />
            )}

            <CustomAvatar src={String(User)} alt="" />
            <Typography color="grey.400" sx={{ mb: { xs: 1, sm: 0 } }} variant="h2">
              Zayd Rafiq
            </Typography>
            <BoxWrapper>
              <Grid container spacing={1.5}>
                {BoxData.map((data) => (
                  <Grid item key={data.name} xs={6} sm={4} md={3}>
                    <BoxItem
                      id={data.id}
                      title={data.name}
                      icon={data.icon}
                      badgeCount={data.badgeCount}
                    />
                  </Grid>
                ))}
              </Grid>
            </BoxWrapper>
            <Grid px={{ xs: 2, sm: 0 }} container columnSpacing={6}>
              <Grid item xs={12} sm={6}>
                <TabItem
                  title="Edit Profile"
                  icon={<UserIcon />}
                  onClick={() => navigate(PATH_MAIN.edit_profile)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem
                  title="Notification preferences"
                  icon={<IconNotification />}
                  onClick={() => setShowNotification(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem
                  title="Bank Account Details"
                  icon={<IconWallet />}
                  onClick={() => setShowBankDialog(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem
                  title="Change Password"
                  onClick={() => navigate(PATH_AUTH.change_password)}
                  icon={<IconLock />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem title="Vehicle Details" icon={<VehicleIcon />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem title="Concierge" icon={<IconDevice large={false} />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TabItem title="Occupant Details" icon={<OccupantDetailIcon />} />
              </Grid>
            </Grid>
            {!isDesktop && <Footer />}
          </ProfileBox>
        </Wrapper>
      )}
      <LogoutDialog open={logout} onClose={handleCancel} />

      {bankExist ? (
        <BankDetailDilog open={showBankDialog} onClose={() => setShowBankDialog(false)} />
      ) : (
        <AddBankAccount open={showBankDialog} onClose={() => setShowBankDialog(false)} />
      )}
      <NotificationPreference open={showNotification} onClose={() => setShowNotification(false)} />
    </Page>
  );
}

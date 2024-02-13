//react
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// @mui
import { Button, styled, Typography, Box, Tabs, Tab, IconButton, Divider } from '@mui/material';

//icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ErrorIcon from 'src/assets/svg/error_icon';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import { SideDrawer } from './drawers/SideDrawerParkingSpace';
import { SideDrawerVehicles } from './drawers/SideDrawerVehicles';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import { SideDrawerRenew } from './drawers/SideDrawerParkingRenew';

import MobileDrawer from './drawers/MobileDrawerParkingSpace';
import MobileDrawerVehicles from './drawers/MobileDrawerVehicles';
import MobileDrawerRenew from './drawers/MobileDrawerRenew';
import Page from 'src/components/Page';

//imgs
import ParkingBG from 'src/assets/images/ParkingBG.png';

//data
import { ParkingSpaceData, VehiclesData, VehiclesRenewData } from 'src/utils/constant';

//paths
import { PATH_MAIN } from 'src/routes/paths';
// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const ParkingRenewData = [
  {
    id: '1',
    name: 'Space #303-3',
    status: 'Expiring in 30 Days',
    icon: <ErrorIcon />,
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MainContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0),
    padding: theme.spacing(2, 1.8),
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    padding: theme.spacing(0),
  },
}));
const LeftWrapper = styled(Box)(({ theme }) => ({
  width: '450px',
  [theme.breakpoints.down('lg')]: {
    width: '400px',
  },
  [theme.breakpoints.down('md')]: {
    width: '320px',
  },
  [theme.breakpoints.down(700)]: {
    width: '290px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  padding: theme.spacing(1),
}));

const Card = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2, 1.5),
  borderRadius: '8px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: '0px',
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  width: '36px',
  height: '36px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
    ':hover': {
      background: theme.palette.grey[600],
    },
  },
}));
const BoxStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .active': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[700],
  },
  '& .activeRenew': {
    backgroundColor: theme.palette.grey[700],
    //color: theme.palette.grey[700],
  },
}));
const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));
const RenewButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  backgroundColor: theme.palette.grey[600],
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[600],
  },
}));

export default function ParkingPermits(): React.ReactElement {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'sm');

  //space
  const [isWrapperOpen, setWrapperOpen] = useState(false);
  const [prevIndex, setPrevIndex] = useState('');
  const [wrapperTitle, setWrapperTitle] = useState('');

  const [open, setOpen] = useState(false);

  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    if (isWrapperOpen) setWrapperOpen(false);
    if (open) setOpen(false);
  }, [isDesktop]);

  const handleToggle = (ind: any, title: any) => {
    if (!isDesktop) {
      setWrapperOpen(!isWrapperOpen);
      setOpen(true);
    } else {
      if (ind === prevIndex || !isWrapperOpen) {
        setWrapperOpen(!isWrapperOpen);
      }
    }
    setPrevIndex(ind);
    setWrapperTitle(title);
  };

  //Renew
  const [isRenewWrapperOpen, setRenewWrapperOpen] = useState(false);
  const [prevRenewIndex, setRenewPrevIndex] = useState('');
  const [wrapperRenewTitle, seRenewWrapperTitle] = useState('');

  const [openRenew, setOpenRenew] = useState(false);

  const [openRenewView, setOpenRenewView] = useState(false);

  useEffect(() => {
    if (isRenewWrapperOpen) setRenewWrapperOpen(false);
    if (openRenew) setOpenRenew(false);
  }, [isDesktop]);

  const handleToggleRenew = (ind: any, title: any) => {
    if (!isDesktop) {
      setRenewWrapperOpen(!isRenewWrapperOpen);
      setOpenRenew(true);
    } else {
      if (ind === prevRenewIndex || !isRenewWrapperOpen) {
        setRenewWrapperOpen(!isRenewWrapperOpen);
      }
    }
    setRenewPrevIndex(ind);
    seRenewWrapperTitle(title);
  };

  //vehicles
  const [isVehiclesWrapperOpen, setVehiclesWrapperOpen] = useState(false);
  const [prevVehiclesIndex, setVehiclesPrevIndex] = useState('');
  const [wrapperVehiclesTitle, seVehiclestWrapperTitle] = useState('');

  const [openVehicles, setOpenVehicles] = useState(false);

  const [openVehiclesView, setOpenVehiclesView] = useState(false);

  useEffect(() => {
    if (isVehiclesWrapperOpen) setVehiclesWrapperOpen(false);
    if (openVehicles) setOpenVehicles(false);
  }, [isDesktop]);

  const handleTogglevehicles = (ind: any, title: any) => {
    if (!isDesktop) {
      setVehiclesWrapperOpen(!isVehiclesWrapperOpen);
      setOpenVehicles(true);
    } else {
      if (ind === prevVehiclesIndex || !isVehiclesWrapperOpen) {
        setVehiclesWrapperOpen(!isVehiclesWrapperOpen);
      }
    }
    setVehiclesPrevIndex(ind);
    seVehiclestWrapperTitle(title);
  };

  return (
    <>
      <Page title="Parking Permits" img={isDesktop ? ParkingBG : ''}>
        <Wrapper sx={{ marginBottom: 5 }}>
          <MainContainer>
            <Box sx={{ display: 'flex' }}>
              <LeftWrapper>
                {isDesktop ? (
                  <Typography pt={1.5} pb={4} color="grey.0" variant="h2">
                    Parking
                  </Typography>
                ) : (
                  <TextBox>
                    <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ fontSize: 'small' }} />
                    <Typography color="grey.0" variant="h2">
                      {' '}
                      Parking
                    </Typography>{' '}
                    <AddOutlinedIcon onClick={() => navigate(PATH_MAIN.add_parking_space)} />
                  </TextBox>
                )}

                <Box>
                  <Tabs
                    value={value}
                    variant="fullWidth"
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: {
                        height: '5px',
                        borderRadius: '16px',
                        alignItems: 'center',
                        backgroundColor: 'white',
                      },
                    }}
                  >
                    <Tab
                      label="Parking Spaces"
                      {...a11yProps(0)}
                      onClick={() => setVehiclesWrapperOpen(false)}
                    />
                    <Tab
                      label="Vehicles"
                      {...a11yProps(1)}
                      onClick={() => {
                        setWrapperOpen(false);
                        setRenewWrapperOpen(false);
                      }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <BoxStyle>
                    {ParkingSpaceData.map((item, i) => (
                      <Card
                        key={i}
                        className={`${
                          item.id === prevIndex && isWrapperOpen && isDesktop ? 'active' : ''
                        }`}
                        onClick={() => {
                          handleToggle(item.id, item.name);
                          setRenewWrapperOpen(false);
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" align="left">
                            {' '}
                            {item.name}
                          </Typography>
                          <Typography variant="body1" color="grey.500" align="left">
                            {' '}
                            {item.status} - {item.included}
                          </Typography>
                        </Box>
                        <Box>
                          <CustomIconButton>
                            <RemoveRedEyeOutlinedIcon fontSize="small" />
                          </CustomIconButton>
                        </Box>
                      </Card>
                    ))}
                    {ParkingRenewData.map((item: any, i: any) => (
                      <Card
                        key={i}
                        className={`${
                          item.id === prevRenewIndex && isRenewWrapperOpen && isDesktop
                            ? 'activeRenew'
                            : ''
                        }`}
                        onClick={() => {
                          handleToggleRenew(item.id, item.name);
                          setWrapperOpen(false);
                        }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          {item.icon}

                          <Box sx={{ ml: 1 }}>
                            <Typography variant="subtitle2" align="left">
                              {' '}
                              {item.name}
                            </Typography>
                            <Typography variant="body1" align="left" color="grey.500">
                              {item.status}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <RenewButton sx={{ mr: 1 }}>
                            <Typography variant="h5" color="grey.0">
                              Renew
                            </Typography>
                          </RenewButton>
                          <CustomIconButton>
                            <RemoveRedEyeOutlinedIcon fontSize="small" />
                          </CustomIconButton>
                        </Box>
                      </Card>
                    ))}
                  </BoxStyle>
                  {isDesktop ? (
                    <AddButton startIcon={<AddIcon />}>
                      <Typography
                        variant="subtitle1"
                        mt={0.3}
                        onClick={() => navigate(PATH_MAIN.add_parking_space)}
                      >
                        Add New
                      </Typography>
                    </AddButton>
                  ) : (
                    ''
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BoxStyle>
                    {VehiclesData.map((item, i) => (
                      <Card
                        key={i}
                        className={`${
                          item.id === prevVehiclesIndex && isVehiclesWrapperOpen && isDesktop
                            ? 'active'
                            : ''
                        }`}
                      >
                        <Box>
                          <Typography variant="subtitle2" align="left">
                            {' '}
                            {item.name}
                          </Typography>
                          <Typography variant="body1" color="grey.500" align="left">
                            {item.address} - {item.latestTimestamp}
                          </Typography>
                        </Box>
                        <Box>
                          <CustomIconButton sx={{ mr: 1 }}>
                            <RemoveRedEyeOutlinedIcon fontSize="small" />
                          </CustomIconButton>
                          <CustomIconButton
                            sx={{ mr: 1 }}
                            onClick={() => handleTogglevehicles(item.id, item.name)}
                          >
                            <DeleteSVGIcon />
                          </CustomIconButton>
                        </Box>
                      </Card>
                    ))}
                    {VehiclesRenewData.map((item: any, i: any) => (
                      <Card key={i}>
                        <Box>
                          <Typography variant="subtitle2" align="left" color="grey.500">
                            {' '}
                            {item.name}
                          </Typography>
                          <Typography variant="body1" align="left" color="grey.600">
                            {item.address} - {item.latestTimestamp}
                          </Typography>
                        </Box>
                        <Box>
                          <RenewButton>
                            <Typography variant="h5" color="grey.0">
                              Renew
                            </Typography>
                          </RenewButton>
                        </Box>
                      </Card>
                    ))}
                  </BoxStyle>
                  {isDesktop ? (
                    <AddButton
                      startIcon={<AddIcon />}
                      onClick={() => navigate(PATH_MAIN.add_vehicle)}
                    >
                      <Typography variant="subtitle1" mt={0.3}>
                        Add New
                      </Typography>
                    </AddButton>
                  ) : (
                    ''
                  )}
                </TabPanel>
              </LeftWrapper>
              <Box sx={{ mt: 1 }}>
                {isVehiclesWrapperOpen && isDesktop ? (
                  <Box sx={{ display: 'flex' }}>
                    {' '}
                    <SideDrawerVehicles title={wrapperVehiclesTitle} />
                  </Box>
                ) : (
                  <>
                    <MobileDrawerVehicles
                      openDrawer={openVehicles}
                      close={setOpenVehicles}
                      setOpenView={setOpenVehiclesView}
                      title={wrapperVehiclesTitle}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                {isWrapperOpen && isDesktop ? (
                  <Box sx={{ display: 'flex' }}>
                    {' '}
                    <Divider orientation="vertical" flexItem sx={{ m: 2 }} />
                    <SideDrawer title={wrapperTitle} />
                  </Box>
                ) : (
                  <>
                    <MobileDrawer
                      openDrawer={open}
                      close={setOpen}
                      setOpenView={setOpenView}
                      title={wrapperTitle}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                {isRenewWrapperOpen && isDesktop ? (
                  <Box sx={{ display: 'flex' }}>
                    {' '}
                    <Divider orientation="vertical" flexItem sx={{ m: 2 }} />
                    <SideDrawerRenew title={wrapperRenewTitle} />
                  </Box>
                ) : (
                  <>
                    <MobileDrawerRenew
                      openDrawer={openRenew}
                      close={setOpenRenew}
                      setOpenView={setOpenRenewView}
                      title={wrapperRenewTitle}
                    />
                  </>
                )}
              </Box>
            </Box>
          </MainContainer>
        </Wrapper>
      </Page>
    </>
  );
}

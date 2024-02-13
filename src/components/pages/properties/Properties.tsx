//react
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//@mui
import {
  Box,
  Grid,
  styled,
  Typography,
  Badge,
  BadgeProps,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

//hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconAccess from 'src/assets/svg/icon_access_card';
import IconContact from 'src/assets/svg/icon_contact_details';
import IconDocument from 'src/assets/svg/icon_documents';
import IconOccupants from 'src/assets/svg/icon_occupants';
import IconParking from 'src/assets/svg/icon_parking_space';
import IconVehicles from 'src/assets/svg/icon_vehicles';
import IconVisitors from 'src/assets/svg/icon_visitors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PropertiesBG from 'src/assets/images/PropertiesBG.png';
import Property1 from 'src/assets/images/Property1.png';

//components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import AccessCard from './ExpandDropdowns/AccessCard';
import ContractDetails from './ExpandDropdowns/ContractDetails';
import Documents from './ExpandDropdowns/Documents';
import Page from 'src/components/Page';

//drawers
import ContractDetailsDrawer from './Drawer/ContractDetailsDrawer';
import DocumentsDrawer from './Drawer/DocumentsDrawer';
import AccessCardDialog from './Drawer/AccessCardDialog';

const ItemWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5, 2.38),
  margin: theme.spacing(0, 0, 1.5, 4.5),
  display: 'flex',
  background: theme.palette.grey[600],
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    margin: theme.spacing(1),
    padding: theme.spacing(1.5, 0.9),
  },
}));
const BadgeWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.grey[0],
  margin: theme.spacing(0.5),
  borderRadius: '100%',
  padding: theme.spacing(0, 0.5),
  color: 'black',
}));

const PropertiesWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[900],
  maxWidth: '976px',
  borderRadius: '1rem',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    width: '100%',
  },
}));

const TextWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 4, 0, 2),
    marginBottom: theme.spacing(3),
  },
}));

const ImageCarousel = styled(Carousel)(() => ({
  width: '100%',
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    color: theme.palette.grey[900],
    fontWeight: 400,
    fontSize: '0.625rem',
    height: '16px',
    minWidth: '2px',
    background: theme.palette.grey[400],
  },
}));
const CustomText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  color: theme.palette.grey[500],

  '& span': {
    fontWeight: 500,
    color: theme.palette.grey[0],
    cursor: 'pointer',
  },
}));

const Back = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 20,
  top: 20,
  zIndex: 43535435435,
}));

const AccordionWrapper = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(0, 0, 1.5, 4.5),

  background: theme.palette.grey[600],

  cursor: 'pointer',
  borderRadius: '8px',

  boxShadow: 'none',

  '&.MuiPaper-root': {
    '&.MuiAccordion-root': {
      '&.Mui-expanded': {
        boxShadow: 'unset',

        //backgroundColor: theme.palette.error.main,
        margin: theme.spacing(0, 0, 1.5, 4.5),
      },
      '&:before': {
        //backgroundColor:  theme.palette.grey[900],
      },
    },
  },
  '&$expanded': {
    margin: '0 !important',
  },
}));

const images = [{ img: Property1 }, { img: Property1 }, { img: Property1 }, { img: Property1 }];

interface Props {
  children?: ReactNode;
  text: string;
}

export const ReadMore = ({ children, text }: Props) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <CustomText align="left" variant="subtitle2">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore}>{isReadMore ? '...Read more' : 'Read less'}</span>
    </CustomText>
  );
};

export default function Properties() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  const [openContractDetailsDrawer, setOpenContractDetailsDrawer] = useState<boolean>(false);
  const [openDocumentsDrawer, setOpenDocumentsDrawer] = useState<boolean>(false);
  const [openAccessCardDialog, setOpenAccessCardDialog] = useState<boolean>(false);

  //Drawer
  const handleCloseContractDetailsDrawer = () => {
    setOpenContractDetailsDrawer(false);
  };
  const handleOpenContractDetailsDrawer = () => {
    setOpenContractDetailsDrawer(true);
  };
  const handleCloseDocumentsDrawer = () => {
    setOpenDocumentsDrawer(false);
  };
  const handleOpenDocumentsDrawer = () => {
    setOpenDocumentsDrawer(true);
  };
  const handleCloseAccessCardDialog = () => {
    setOpenAccessCardDialog(false);
  };
  const handleOpenAccessCardDialog = () => {
    setOpenAccessCardDialog(true);
  };

  const PropertiesData = [
    {
      name: 'Contract Details',
      icon: <IconContact />,
      expand: <ContractDetails />,
      drawer: handleOpenContractDetailsDrawer,
    },
    {
      name: 'Documents',
      icon: <IconDocument />,
      badgeCount: 2,
      expand: <Documents />,
      drawer: handleOpenDocumentsDrawer,
    },
    {
      name: 'Access Cards',
      icon: <IconAccess />,
      badgeCount: 2,
      expand: <AccessCard />,
      drawer: handleOpenAccessCardDialog,
    },
    {
      name: 'Vehicles',
      icon: <IconVehicles />,
      badgeCount: 2,
    },
    {
      name: 'Occupants',
      icon: <IconOccupants />,
      badgeCount: 2,
      // drawer: navigate(PATH_MAIN.edit_occupants),
    },
    {
      name: 'Visitors',
      icon: <IconVisitors />,
      badgeCount: 2,
    },
    {
      name: 'Parking Space',
      icon: <IconParking />,
      badgeCount: 2,
    },
  ];

  return (
    <Page title="My Properties" img={isDesktop ? PropertiesBG : ''}>
      <Wrapper sx={{ marginBottom: 5 }}>
        <PropertiesWrapper>
          {isDesktop && (
            <Typography variant="h3" mb={4}>
              Property Details
            </Typography>
          )}
          <Grid container>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              {!isDesktop && (
                <Back onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon sx={{ color: '#fff', fontSize: 'medium' }} />
                </Back>
              )}
              <ImageCarousel
                sx={{ borderRadius: 0 }}
                navButtonsProps={{
                  style: {
                    margin: 0,
                    padding: 5,
                  },
                }}
                navButtonsWrapperProps={{
                  style: {},
                }}
                indicatorContainerProps={{
                  style: {
                    position: 'relative',
                    bottom: 45,
                  },
                }}
                indicators={true}
                navButtonsAlwaysVisible={isDesktop ? true : false}
                stopAutoPlayOnHover
                autoPlay={false}
                NextIcon={<KeyboardArrowRightIcon fontSize="medium" />}
                PrevIcon={<KeyboardArrowLeftIcon fontSize="medium" />}
              >
                {images.map((im, i) => (
                  <img
                    style={{ borderRadius: 0 }}
                    height="100%"
                    width="100%"
                    key={i}
                    src={im.img}
                    alt="pics"
                  />
                ))}
              </ImageCarousel>
              <TextWrapper>
                <Typography variant="h1" align="left" mt={4}>
                  H Residence
                </Typography>
                <Typography variant="subtitle1" align="left" mt={0.5} color="grey.500">
                  Appartment 303
                </Typography>
                <ReadMore
                  text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis quasi nesciunt
                  voluptas nihil in, temporibus fuga doloribus maiores dignissimos repellendus
                  natus, magni, optio ducimus accusantium aliquid non excepturi exercitationem
                  fugiat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam placeat
                  voluptates, saepe obcaecati facilis doloribus dolorum eaque, eveniet deserunt
                  excepturi exercitationem non ut laboriosam expedita et cum tempora sequi error."
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ color: 'grey.400', mr: 1, cursor: 'pointer' }}
                  />
                  <Typography
                    variant="subtitle1"
                    align="left"
                    color="grey.500"
                    sx={{ cursor: 'pointer' }}
                  >
                    Location
                  </Typography>
                </Box>
              </TextWrapper>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Grid container columnSpacing={0}>
                {PropertiesData.map((item: any, i: any) => (
                  <Grid key={i} item xs={6} sm={6} md={12} columnSpacing={1}>
                    {isDesktop ? (
                      <AccordionWrapper>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                            {item.icon}

                            <Typography ml={1.5} mr={1} variant="subtitle1">
                              {item.name}
                            </Typography>
                            <BadgeWrapper>
                              <StyledBadge badgeContent={item.badgeCount} />
                            </BadgeWrapper>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: '#1D1D1D', padding: '8px 0' }}>
                          {item.expand}
                        </AccordionDetails>
                      </AccordionWrapper>
                    ) : (
                      <ItemWrapper>
                        <Box onClick={item.drawer}>
                          {item.icon}
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                          >
                            <Typography variant="h6" mr={0.5}>
                              {item.name}
                            </Typography>

                            <BadgeWrapper>
                              <StyledBadge badgeContent={item.badgeCount} />
                            </BadgeWrapper>
                          </Box>
                        </Box>
                      </ItemWrapper>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </PropertiesWrapper>
      </Wrapper>
      <ContractDetailsDrawer
        onClose={handleCloseContractDetailsDrawer}
        openState={openContractDetailsDrawer}
      />
      <DocumentsDrawer onClose={handleCloseDocumentsDrawer} openState={openDocumentsDrawer} />
      <AccessCardDialog onClose={handleCloseAccessCardDialog} openState={openAccessCardDialog} />
    </Page>
  );
}

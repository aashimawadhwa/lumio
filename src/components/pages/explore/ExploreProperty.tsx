//react
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//@mui
import { Box, Grid, styled, Typography, IconButton, Button, Select, MenuItem } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
//images
import BlackAndWhiteBG from 'src/assets/images/BlackAndWhiteBG.png';
import Property1 from 'src/assets/images/Property1.png';
import Map from 'src/assets/images/Map.png';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AcUnitIcon from '@mui/icons-material/AcUnit'; // central Ac
import CheckroomIcon from '@mui/icons-material/Checkroom'; // wardrobe
import PoolIcon from '@mui/icons-material/Pool'; // pool
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; //gym
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; //beach
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'; //garden
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'; //virtual tour
import SouthIcon from '@mui/icons-material/South'; // arrow down
import MaintenanceIcon from 'src/assets/svg/Maintenance_icon';
import IosShareIcon from '@mui/icons-material/IosShare';

//hooks
import useResponsive from 'src/hooks/useResponsive';

// data
import { FilterTypesRoom, PlaceData } from 'src/utils/constant';

//components

import Page from 'src/components/Page';
import { Wrapper } from 'src/components/auth/styledComponents/styles';

const FacilityData = [
  {
    name: '24h Maintenance',
    icon: <MaintenanceIcon />,
  },
  {
    name: 'Beach Access',
    icon: <BeachAccessIcon />,
  },
  {
    name: 'Central A/C',
    icon: <AcUnitIcon />,
  },
  {
    name: 'Full Gym',
    icon: <FitnessCenterIcon />,
  },
  {
    name: 'Swimming Pool',
    icon: <PoolIcon />,
  },
  {
    name: 'Built In Wardrobes',
    icon: <CheckroomIcon />,
  },
  {
    name: 'Garden',
    icon: <NaturePeopleIcon />,
  },
];

const PropertiesWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[900],
  maxWidth: '970px',
  borderRadius: '1rem',
  padding: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    width: '100%',
  },
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2.5),
  fontSize: '1rem',
  backgroundColor: theme.palette.success.main,
  color: theme.palette.grey[0],
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '0px',
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  alignItms: 'flex-start',
  margin: theme.spacing(3, 0),
  padding: theme.spacing(2.25, 0),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(2),
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginRight: theme.spacing(1),
  padding: theme.spacing(1, 2.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const LeftWrap = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));
const ButtonWrap = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'left',
}));

const ImageWrapper = styled('img')(() => ({
  width: '100%',
}));

const TextWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 4, 0, 2),
    marginBottom: theme.spacing(3),
  },
}));
const BoxWrapper = styled(Box)(({ theme }) => ({
  margin: 0,
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2),
  },
}));

const ImageCarousel = styled(Carousel)(() => ({
  width: '100%',
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

const Back = styled(IconButton)(() => ({
  position: 'absolute',
  left: 20,
  top: 20,
  zIndex: 43535435435,
}));

const images = [{ img: Property1 }, { img: Property1 }, { img: Property1 }, { img: Property1 }];

interface Props {
  children?: ReactNode;
  text: string;
}

export const SelectBox = styled(Select)(({ theme }) => ({
  borderRadius: '2rem',
  width: '50%',
  padding: theme.spacing(0, 2),
  backgroundColor: theme.palette.grey[900],
  marginBottom: theme.spacing(2),
  border: '1px solid white',
  fontWeight: 400,
  '& .MuiSvgIcon-root ': {
    fill: '#CAC9C0 !important',
    fontSize: 24,
  },
  boxShadow: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: theme.palette.grey[0],
    outline: theme.palette.grey[0],
  },
}));
export const ReadMore = ({ text }: Props) => {
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

export default function ExploreProperty() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  const [filterValues, setFilterValues] = useState(FilterTypesRoom);

  const handleFilterSelect = (type: 'type', id: number) => {
    setFilterValues({
      ...filterValues,
      type: { ...filterValues.type, currId: id },
    });
  };

  return (
    <Page title="Explore Properties" img={isDesktop ? BlackAndWhiteBG : ''}>
      <Wrapper sx={{ marginBottom: 5 }}>
        <PropertiesWrapper>
          {isDesktop && (
            <Typography variant="h3" mb={4}>
              H Residence
            </Typography>
          )}
          <Grid container columnSpacing={1}>
            <Grid item xs={12} sm={12} md={7} lg={7} columnSpacing={1}>
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
                <ButtonWrap sx={{ justifyContent: 'left' }}>
                  <BrowseButton> Newly Added </BrowseButton>
                </ButtonWrap>
                {isDesktop ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h2">H-Residence/2BHK</Typography>

                      <Box sx={{ display: 'flex' }}>
                        <LocalOfferIcon fontSize="small" />
                        <Typography variant="subtitle1" sx={{ cursor: 'pointer' }}>
                          150,000 AED/year
                        </Typography>
                      </Box>
                    </Box>

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
                        H Residence, Gaomi City, Box No. 672, Dubai,Emirates - 40934
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h2" align="left" color="grey.0" mt={2}>
                      The Fold
                    </Typography>
                    <Typography variant="subtitle2" align="left" color="grey.400" mt={2}>
                      Starts at 150,000 AED/year
                    </Typography>
                    <Typography variant="subtitle2" align="left" color="grey.400" mt={2}>
                      Location/Area Address
                    </Typography>
                  </>
                )}

                <ReadMore
                  text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis quasi nesciunt
                  voluptas nihil in, temporibus fuga doloribus maiores dignissimos repellendus
                  natus, magni, optio ducimus accusantium aliquid non excepturi exercitationem
                  fugiat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam placeat
                  voluptates, saepe obcaecati facilis doloribus dolorum eaque, eveniet deserunt
                  excepturi exercitationem non ut laboriosam expedita et cum tempora sequi error."
                />
              </TextWrapper>
              <BoxWrapper>
                <SaveButton type="submit">Submit Inquiry</SaveButton>
              </BoxWrapper>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} columnSpacing={1}>
              <LeftWrap>
                <Typography variant="h2" align="left" mb={1}>
                  Amenities & Facilities
                </Typography>
                <Grid container>
                  {FacilityData.map((item: any, i: any) => (
                    <Grid key={i} item xs={6} columnSpacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}>
                        {item.icon}
                        <Typography mx={1} align="left" color="grey.500" variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography color="grey.400" variant="subtitle1" align="left" mt={3} mb={1.5}>
                  More Details
                </Typography>
                <Box sx={{ display: 'flex', alignItms: 'flex-start' }}>
                  <SelectBox value={filterValues.type.currId}>
                    {filterValues.type.values.map((value) => (
                      <MenuItem
                        key={value.id}
                        value={value.id}
                        onClick={() => handleFilterSelect('type', value.id)}
                      >
                        {value.name}
                      </MenuItem>
                    ))}
                  </SelectBox>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomButton startIcon={<SouthIcon fontSize="small" />}>
                    {' '}
                    Floor plans{' '}
                  </CustomButton>
                  <CustomButton startIcon={<ThreeSixtyIcon fontSize="small" />}>
                    {' '}
                    Virtual Tour{' '}
                  </CustomButton>
                </Box>

                <Typography variant="h2" align="left" mt={3} mb={1.5}>
                  Location
                </Typography>
                <ImageWrapper src={Map} />
                <Typography variant="h2" align="left" mt={3} mb={1.5}>
                  Places Nearby
                </Typography>

                <Grid container>
                  {PlaceData.map((item: any, i: any) => (
                    <Grid key={i} item xs={12} sm={12} md={6} columnSpacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}>
                        <Typography align="left" color="grey.500" variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </LeftWrap>
            </Grid>
          </Grid>
        </PropertiesWrapper>
      </Wrapper>
    </Page>
  );
}

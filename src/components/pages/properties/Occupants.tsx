//react
import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Button, Grid, styled, Typography, Box } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive'; 

//icons and images
import AddIcon from '@mui/icons-material/Add';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import profile_1 from 'src/assets/images/profile_1.png';
import profile_2 from 'src/assets/images/profile_2.png';

// components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import DeleteDialog from 'src/assets/elements/DeleteDialog';
import DeleteDrawer from 'src/assets/elements/DeleteDrawer';
import Page from 'src/components/Page';

//paths
import { PATH_MAIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

const MainContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '847px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 4),
  },
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: theme.spacing(0),
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1.8),
  border: `1px solid ${theme.palette.grey[400]}`,
  color: theme.palette.grey[400],
  fontWeight: 'normal',
  borderRadius: '8px',
  margin: theme.spacing(3.5, 0, 1.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
  },
}));

const ProfileContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'start',
  borderRadius: '8px',
  margin: theme.spacing(1),
  padding: theme.spacing(2, 1.5),
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: '0px',
    margin: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[900],
  height: '40px',
  width: '40px',
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
  padding: theme.spacing(2, 0),
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const ImageStyle = styled('img')(({ theme }) => ({
  height: '47px',
  width: '47px',
  cursor: 'pointer',
}));
const OccupantsData = [
  {
    name: 'Zayd Rafiq',
    icon: profile_1,
    description: 'Primary Tenant, Billing',
  },
  {
    name: 'Steve Leoni',
    icon: profile_2,
    description: 'Occupant',
  },
  {
    name: 'Lisa Armstrong',
    icon: profile_1,
    description: 'Occupant',
  },
];

export default function Occupants() {
  const isMobile = useResponsive('down', 'sm');
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  //Dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  //Drawer
  const handleCloseDeleteDrawer = () => {
    setOpenDeleteDrawer(false);
  };
  const handleOpenDeleteDrawer = () => {
    setOpenDeleteDrawer(true);
  };

  return (
    <>
      <Page title="Occupants" img={isMobile ? '' : ProfileBG}>
        {!openDeleteDialog && (
          <Wrapper>
            <MainContainer>
              {isMobile ? (
                <TextBox>
                  <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ fontSize: 'small' }} />
                  <Typography color="grey.0" variant="h2">
                    {' '}
                    Occupants
                  </Typography>{' '}
                  <AddOutlinedIcon />
                </TextBox>
              ) : (
                <Typography pt={1.5} pb={4} color="grey.0" variant="h2">
                  Occupants
                </Typography>
              )}

              <Grid container columnSpacing={0}>
                {OccupantsData.map((data) => (
                  <Grid key={data.name} item xs={12} sm={12} md={6} columnSpacing={1}>
                    <ProfileContainer>
                      <FlexBox>
                        <ImageStyle src={`${data.icon}`} alt="" />
                        <Box sx={{ mx: 2 }}>
                          <Typography variant="subtitle1">{data.name}</Typography>
                          <Typography color="grey.400">{data.description}</Typography>{' '}
                        </Box>
                      </FlexBox>

                      <FlexBox>
                        <IconContainer onClick={() => navigate(PATH_MAIN.edit_occupants)}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconContainer>
                        {isMobile ? (
                          <IconContainer onClick={handleOpenDeleteDrawer}>
                            <DeleteSVGIcon />
                          </IconContainer>
                        ) : (
                          <IconContainer onClick={handleOpenDeleteDialog}>
                            <DeleteSVGIcon />
                          </IconContainer>
                        )}
                      </FlexBox>
                    </ProfileContainer>
                  </Grid>
                ))}
              </Grid>
              {isMobile ? (
                ''
              ) : (
                <AddButton startIcon={<AddIcon sx={{ color: 'grey.0' }} />}>Add New</AddButton>
              )}
            </MainContainer>
          </Wrapper>
        )}
      </Page>
      <DeleteDialog onClose={handleCloseDeleteDialog} openState={openDeleteDialog} />

      <DeleteDrawer onClose={handleCloseDeleteDrawer} openState={openDeleteDrawer} />
    </>
  );
}

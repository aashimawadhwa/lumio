//react
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Dialog, Grid, styled, Typography, Box, IconButton } from '@mui/material';

//icons and images
import { PATH_MAIN } from 'src/routes/paths';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import profile_1 from 'src/assets/images/profile_1.png';
import profile_2 from 'src/assets/images/profile_2.png';
import useResponsive from 'src/hooks/useResponsive';


// components
import DeleteDrawer from 'src/assets/elements/DeleteDrawer';

//.........................................................................................

type PropsType = {
  openState: boolean;
  onClose: () => void;
};

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  '& .MuiDialog-container': {
    alignItems: 'flex-start',
    height: '100%',
    paddingTop: 0,
    margin: 0,
  },
  '& .MuiPaper-root': {
    background: theme.palette.grey[900],
    margin: 0,
    borderRadius: 0,
  },
  zIndex: 12345678910,
}));

const ProfileContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'start',
  padding: theme.spacing(2, 1.5),

  borderBottom: `1px solid ${theme.palette.grey[600]}`,
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[800],
  height: '40px',
  width: '40px',
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
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
  height: '41px',
  width: '41px',
  cursor: 'pointer',
}));

const Back = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 20,
  top: 13,
  zIndex: 43535435435,
}));

const AccessCardData = [
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
  {
    name: 'Steve Leoni',
    icon: profile_2,
    description: 'Occupant',
  },
];

export default function AccessCardDialog(props: PropsType): React.ReactElement {
  const handleClose = () => {
    props.onClose();
  };
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'sm');

  //Drawer
  const handleCloseDeleteDrawer = () => {
    setOpenDeleteDrawer(false);
  };
  const handleOpenDeleteDrawer = () => {
    setOpenDeleteDrawer(true);
  };

  return (
    <DialogWrapper hideBackdrop={true} open={props.openState} onClose={handleClose}>
      {!isDesktop && (
        <Back onClick={() => navigate(-1)}>
          <ArrowBackIosIcon sx={{ color: '#979797', fontSize: 'medium' }} />
        </Back>
      )}
      <TextBox>
        <Typography color="grey.400" variant="subtitle1">
          Access Card
        </Typography>{' '}
      </TextBox>
      <Grid container>
        {AccessCardData.map((data, i) => (
          <Grid key={i} item xs={12}>
            <ProfileContainer>
              <FlexBox>
                <ImageStyle src={`${data.icon}`} alt="" />
                <Box sx={{ mx: 2 }}>
                  <Typography variant="subtitle1">{data.name}</Typography>
                  <Typography color="grey.500">{data.description}</Typography>{' '}
                </Box>
              </FlexBox>

              <FlexBox>
                <IconContainer onClick={() => navigate(PATH_MAIN.edit_occupants)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconContainer>

                <IconContainer onClick={handleOpenDeleteDrawer}>
                  <DeleteSVGIcon />
                </IconContainer>
              </FlexBox>
            </ProfileContainer>
          </Grid>
        ))}
      </Grid>

      <DeleteDrawer onClose={handleCloseDeleteDrawer} openState={openDeleteDrawer} />
    </DialogWrapper>
  );
}

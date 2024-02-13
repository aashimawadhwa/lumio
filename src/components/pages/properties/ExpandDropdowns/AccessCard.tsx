import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, styled, Typography } from '@mui/material';

//icons and images
import { PATH_MAIN } from 'src/routes/paths';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import profile_1 from 'src/assets/images/profile_1.png';
import profile_2 from 'src/assets/images/profile_2.png';

// components
import DeleteDialog from 'src/assets/elements/DeleteDialog';
import DeleteDrawer from 'src/assets/elements/DeleteDrawer';

// ----------------------------------------------------------------------

const ProfileContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'start',
  borderRadius: '8px',
  padding: theme.spacing(2),
  margin: theme.spacing(1.5, 0),
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[900],
  height: '36px',
  width: '36px',
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
  },
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
  {
    name: 'Steve Leoni',
    icon: profile_2,
    description: 'Occupant',
  },
];

export default function AccessCard() {
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
      {OccupantsData.map((data) => (
        <div key={data.name}>
          <ProfileContainer>
            <FlexBox>
              <ImageStyle src={`${data.icon}`} alt="" />
              <Box sx={{ mx: 2 }}>
                <Typography variant="subtitle1">{data.name}</Typography>
                <Typography color="grey.400">{data.description}</Typography>{' '}
              </Box>
            </FlexBox>

            <FlexBox>
              <IconContainer onClick={handleOpenDeleteDialog}>
                <DeleteSVGIcon />
              </IconContainer>
              <IconContainer onClick={() => navigate(PATH_MAIN.edit_occupants)}>
                <EditOutlinedIcon fontSize="small" />
              </IconContainer>
            </FlexBox>
          </ProfileContainer>
        </div>
      ))}
      <DeleteDialog onClose={handleCloseDeleteDialog} openState={openDeleteDialog} />

      <DeleteDrawer onClose={handleCloseDeleteDrawer} openState={openDeleteDrawer} />
    </>
  );
}

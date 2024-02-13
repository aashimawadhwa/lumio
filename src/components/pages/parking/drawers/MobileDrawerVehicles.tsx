import { Dispatch, SetStateAction } from 'react';

// @mui
import { styled, Typography, Drawer, Box, IconButton, Button } from '@mui/material';

// icons
import CloseIcon from '@mui/icons-material/Close';
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(2, 3, 5, 3),
    alignItems: 'center',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

interface DrawerProps {
  title: string;
  openDrawer: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  setOpenView: Dispatch<SetStateAction<boolean>>;
}

const CancelButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2),
  width: '100%',
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));

export default function MobileDrawer({
  title,
  openDrawer,
  close,
}: DrawerProps): React.ReactElement {
  return (
    <CustomDrawer sx={{ zIndex: 432432 }} anchor="bottom" open={openDrawer}>
      <DrawerSVGIcon />
      <Box sx={{ width: '100%' }}>
        <DrawerHeader>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Delete Vehicle
          </Typography>
          <IconButton onClick={() => close(false)} sx={{ backgroundColor: 'grey.900' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <Box>
          <Typography variant="subtitle2" color="grey.500" mb={4} sx={{ textAlign: 'left' }}>
            Are you sure you want to delete the {title} as Vehicle?
          </Typography>
          <CancelButton variant="outlined" sx={{ mb: 1.5 }}>
            {' '}
            Cancel
          </CancelButton>
          <ConfirmButton variant="outlined">Yes, Delete Vehicle</ConfirmButton>
        </Box>
      </Box>
    </CustomDrawer>
  );
}

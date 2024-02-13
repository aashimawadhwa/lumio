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
    padding: theme.spacing(1.5, 2, 4.5, 2),
    alignItems: 'center',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CancelButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(2.25),

  '&:hover': {
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.grey[0],
  padding: theme.spacing(2.25),
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[800],
  },
}));

interface DeleteDrawerProps {
  title: string;
  handleDelete: () => void;
  handleCancel: () => void;
}

export default function DeleteDrawer({
  title,
  handleDelete,
  handleCancel,
}: DeleteDrawerProps): React.ReactElement {
  return (
    <CustomDrawer anchor="bottom" open={true}>
      <DrawerSVGIcon />
      <Box mt={2.5} width="100%">
        <DrawerHeader mb={1.5}>
          <Typography variant="h3">Delete document</Typography>
          <IconButton sx={{ backgroundColor: 'grey.900' }} onClick={handleCancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <Box pr={6.5} mb={1.5}>
          <Typography variant="subtitle2" color="grey.500">
            Are you sure you want to delete the {title}. Please we aware you won’t be able to
            recover deleted documents.
          </Typography>
        </Box>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        <DeleteButton variant="outlined" onClick={handleDelete}>
          Yes, Delete Document
        </DeleteButton>
      </Box>
    </CustomDrawer>
  );
}

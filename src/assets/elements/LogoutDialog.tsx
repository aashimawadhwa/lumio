// @mui
import {
  Box,
  Button,
  IconButton,
  styled,
  SwipeableDrawer,
  Typography,
  Dialog,
} from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';
// images
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';

import HandleSVG from 'src/assets/svg/icon_handle';

const Wrapper = styled('div')(({ theme }) => ({
  maxWidth: '400px',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2, 2, 2),
    maxWidth: '100%',
  },
}));
const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const CancelButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2.4),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2.4),
  width: '100%',
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));
const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1),
  margin: theme.spacing(0, 0, 1, 0),
  cursor: 'pointer',
}));

interface BankDetailDialogProp {
  open: boolean;
  onClose: () => void;
}

export default function LogoutDialog({ open, onClose }: BankDetailDialogProp) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <>
      {isDesktop ? (
        <Dialog hideBackdrop={true} open={open}>
          <Wrapper>
            <IconButton
              onClick={() => {
                onClose();
              }}
              sx={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
            >
              <ClearIcon sx={{ color: 'grey.0' }} />
            </IconButton>
            <Typography variant="h4" color="grey.0" mb={1}>
              Log out{' '}
            </Typography>
            <Typography variant="subtitle2" mb={4.5} color="grey.500">
              Are you sure you wish to log out of your account?
            </Typography>
            <CancelButton
              variant="outlined"
              sx={{ mb: 1.5 }}
              onClick={() => {
                onClose();
              }}
            >
              <Typography variant="h5" color="grey.900">
                Cancel
              </Typography>
            </CancelButton>
            <ConfirmButton variant="outlined" onClick={() => onClose()}>
              <Typography variant="h5" color="grey.0">
                Yes, Log out
              </Typography>
            </ConfirmButton>
          </Wrapper>
        </Dialog>
      ) : (
        <SwipeableDrawer
          sx={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          hideBackdrop={true}
          anchor="bottom"
          open={open}
          onClose={() => onClose()}
          onOpen={() => {}}
        >
          <Box sx={{ margin: 'auto' }}>
            <HandleSVG />
          </Box>
          <Wrapper>
            <Header>
              <Typography variant="h4" pb={1}>
                Log out
              </Typography>
              <IconContainer onClick={() => onClose()}>
                <CloseIcon fontSize="small" />
              </IconContainer>
            </Header>

            <Typography align="left" variant="subtitle2" color="grey.500" mb={3}>
              Are you sure you wish to log out of your account?
            </Typography>
            <CancelButton variant="outlined" sx={{ mb: 1.5 }} onClick={() => onClose()}>
              <Typography variant="h5" color="grey.900">
                Cancel
              </Typography>
            </CancelButton>
            <ConfirmButton variant="outlined" onClick={() => onClose()}>
              <Typography variant="h5" color="grey.0">
                Yes, Log out
              </Typography>{' '}
            </ConfirmButton>
          </Wrapper>
        </SwipeableDrawer>
      )}
    </>
  );
}

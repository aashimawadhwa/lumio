// @mui
import { Alert, Box, styled, Typography, IconButton } from '@mui/material';

// @icons
import ClearIcon from '@mui/icons-material/Clear';

const AlertWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.success.main,
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  margin: theme.spacing(0.875, 0.875, 1.125, 0.875),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5, 1.5, 3, 1.5),
  },
  '& .MuiAlert-root': {
    background: theme.palette.success.main,
    margin: 0,
  },
}));

const AlertBox = styled(Alert)(({ theme }) => ({
  color: theme.palette.grey[0],
  '& .MuiAlert-icon': {
    color: theme.palette.grey[0],
  },
}));

interface Props {
  message: string;
  handleClose: () => void;
}

export default function AlertContainer({ message, handleClose }: Props): React.ReactElement {
  return (
    <AlertWrapper>
      <AlertBox severity="success">
        <Typography variant="h5">{message}</Typography>
      </AlertBox>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 0, cursor: 'pointer' }}
        onClick={handleClose}
      >
        <ClearIcon sx={{ color: 'grey.0' }} fontSize="small" />
      </IconButton>
    </AlertWrapper>
  );
}

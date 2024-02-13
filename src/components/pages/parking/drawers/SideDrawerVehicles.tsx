// @mui
import { styled, Typography, Box, Button } from '@mui/material';

interface SideDrawerProps {
  title: string;
}
const BoxStyle = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1.5),
  marginLeft: theme.spacing(3.5),
  maxWidth: '350px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '280px',
  },
  [theme.breakpoints.down(700)]: {
    maxWidth: '245px',
  },
}));
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

export function SideDrawerVehicles({ title }: SideDrawerProps): React.ReactElement {
  return (
    <>
      <BoxStyle>
        <Typography variant="h3" pb={3} sx={{ textAlign: 'center' }}>
          Delete Vehicle
        </Typography>
        <Typography variant="subtitle2" color="grey.500" mb={4} sx={{ textAlign: 'left' }}>
          Are you sure you want to delete the {title} as Vehicle?
        </Typography>
        <CancelButton variant="outlined" sx={{ mb: 1.5 }}>
          {' '}
          Cancel
        </CancelButton>
        <ConfirmButton variant="outlined">Yes, Delete Vehicle</ConfirmButton>
      </BoxStyle>
    </>
  );
}

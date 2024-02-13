import { useNavigate } from 'react-router';

// @mui
import { styled, Typography, Dialog, Box, Button } from '@mui/material';

// icons
import IconSuccess from 'src/assets/svg/IconSuccess';

// components
import { PATH_MAIN } from 'src/routes/paths';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      marginTop: '20%',
    },
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(4.5),
    maxWidth: '509px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2),
      margin: 0,
      maxWidth: '100%',
      width: '100%',
    },
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.grey[0],
  borderColor: theme.palette.grey[0],
  padding: theme.spacing(2.25, 0),
  width: '70%',
  ':hover': {
    backgroundColor: 'inherit',
    color: theme.palette.grey[0],
    borderColor: theme.palette.grey[0],
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export default function DocumentSuccess() {
  const navigate = useNavigate();
  return (
    <CustomDialog open={true} hideBackdrop={true}>
      <Box sx={{ textAlign: 'center' }}>
        <IconSuccess />
        <Typography variant="h1" sx={{ mb: { xs: 3, sm: 4.5 }, mt: { xs: 3, sm: 4.5 } }}>
          Document Uploaded Successfully
        </Typography>
        <BackButton variant="outlined" onClick={() => navigate(PATH_MAIN.documents)}>
          Back to My Documents
        </BackButton>
      </Box>
    </CustomDialog>
  );
}

import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

// @mui
import { Button, Dialog, styled, Typography } from '@mui/material';

//icons and svgs
import IconSuccess from 'src/assets/svg/IconSuccess';

//paths
import { PATH_AUTH } from 'src/routes/paths';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    marginTop: '7.5%',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10%',
    },
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.grey[900],
    maxWidth: '538px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: theme.spacing(5, 2),
    },
  },
}));

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4.5),
  '& img': {
    margin: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: '73%',
  padding: theme.spacing(2.3),
  borderRadius: '100px',
  borderColor: theme.palette.grey[400],
  background: theme.palette.grey[900],
  marginTop: theme.spacing(4.5),
  '&:focus, :hover': {
    borderColor: theme.palette.grey[400],
    backgroundColor: 'inherit',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
}));

interface Props {
  open: boolean;
  email?: string;
  title: string;
  details: ReactNode;
}

export default function SuccessDialog({ title, details, email, open }: Props): React.ReactElement {
  const navigate = useNavigate();
  return (
    <CustomDialog open={open} hideBackdrop={true}>
      <RootStyle>
        <IconSuccess />
        <Typography
          variant="h1"
          color="grey.400"
          sx={{ mb: { xs: 1.5, sm: 1 }, mt: { xs: 3.5, sm: 4.8 } }}
        >
          {title}
        </Typography>
        {details}
        <CustomButton variant="outlined" onClick={() => navigate(PATH_AUTH.login)}>
          <Typography variant="h5" color="grey.0">
            Return to Log In
          </Typography>
        </CustomButton>
      </RootStyle>{' '}
    </CustomDialog>
  );
}

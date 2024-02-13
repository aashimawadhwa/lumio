import { styled, Typography } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 40,
  [theme.breakpoints.down('lg')]: {
    paddingTop: 30,
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: 20,
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
  },
}));
export const FormWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4.5),
  textAlign: 'center',
  maxWidth: '415px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'transparent',
    width: '100%',
    padding: theme.spacing(0, 2),
    textAlign: 'left',
  },
}));
export const Text = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 300,
  color: theme.palette.grey[500],
  '& span': {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.grey[400],
  },
}));

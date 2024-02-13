// @mui
import { styled, Dialog, DialogProps } from '@mui/material';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-start',
    height: '100%',
    paddingTop: '5.8rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  '& .MuiPaper-root': {
    background: theme.palette.grey[900],
    '::-webkit-scrollbar': {
      width: '7px',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: theme.palette.grey[500],
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));

interface DialogWrapperProp {
  open: boolean;
  children: JSX.Element;
  fullScreen?: boolean;
}

export default function DialogWrapper({
  open,
  children,
  fullScreen,
  ...other
}: DialogWrapperProp & DialogProps) {
  return (
    <CustomDialog {...other} fullScreen={fullScreen} open={open} hideBackdrop={true}>
      {children}
    </CustomDialog>
  );
}

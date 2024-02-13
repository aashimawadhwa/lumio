import React from 'react';

//mui
import { Dialog, DialogContent, Grid, styled, Typography, Button } from '@mui/material';

type PropsType = {
  openState: boolean;
  onClose: () => void;
};

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.3)',
  ' .MuiDialog-container .MuiPaper-root': {
    boxShadow: 'none',
    outline: 'none',
  },
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      width: '100%',
      maxWidth: '415px',
    },
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  padding: '10px',
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

export default function ShareDialog(props: PropsType): React.ReactElement {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <DialogWrapper hideBackdrop={true} open={props.openState} onClose={handleClose}>
      <Grid container>
        <DialogContent sx={{ backgroundColor: 'grey.900', height: 'auto' }}>
          <Wrapper>
            <Typography variant="h3" pb={1} sx={{ textAlign: 'center' }}>
              Delete Occupant
            </Typography>
            <Typography variant="subtitle2" color="grey.500" mb={4} sx={{ textAlign: 'center' }}>
              Are you sure you want to delete occupant. Please be aware you won’t be able to recover
              the deleted occupant.
            </Typography>
            <CancelButton variant="outlined" sx={{ mb: 1.5 }} onClick={handleClose}>
              {' '}
              Cancel
            </CancelButton>
            <ConfirmButton variant="outlined" onClick={handleClose}>
              Yes, Delete Occupant
            </ConfirmButton>
          </Wrapper>
        </DialogContent>
      </Grid>
    </DialogWrapper>
  );
}

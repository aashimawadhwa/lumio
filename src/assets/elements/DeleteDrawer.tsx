import { useState } from 'react';
import { Button, styled, Typography, SwipeableDrawer } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

type PropsType = {
  openState: boolean;
  onClose: () => void;
};

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2, 4, 2),
}));

const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const CancelButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
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
const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1),
  margin: theme.spacing(0, 0, 1, 0),
  cursor: 'pointer',
}));

export default function DeleteDrawer(props: PropsType): React.ReactElement {
  const [, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    props.onClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.openState}
      onClose={() => setOpen(false)}
      onOpen={() => {}}
    >
      <RemoveRoundedIcon sx={{ margin: 'auto', fontSize: '70px' }} />
      <Wrapper>
        <Header>
          <Typography variant="h2" pb={1}>
            Delete Occupant
          </Typography>
          <IconContainer onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconContainer>
        </Header>

        <Typography variant="subtitle2" color="grey.500" mb={1.5}>
          Are you sure you want to delete occupant. Please be aware you won’t be able to recover the
          deleted occupant.
        </Typography>
        <CancelButton variant="outlined" sx={{ mb: 1.5 }} onClick={handleClose}>
          {' '}
          Cancel
        </CancelButton>
        <ConfirmButton variant="outlined" onClick={handleClose}>
          Yes, Delete Occupant
        </ConfirmButton>
      </Wrapper>
    </SwipeableDrawer>
  );
}

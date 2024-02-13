//react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//mui
import { Button, styled, Typography, SwipeableDrawer, Alert, AlertTitle, Box } from '@mui/material';

//icons
import { ContractData } from 'src/utils/constant';
import CloseIcon from '@mui/icons-material/Close';
import PullDownIcon from 'src/assets/svg/icon_drawer_pullDown';

//paths
import { PATH_MAIN } from 'src/routes/paths';

//.......................................................

type PropsType = {
  openState: boolean;
  onClose: () => void;
};

const CancelRenewButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1.5),
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
const ItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));

const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const RenewButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
}));

const PullDownWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '16px',
}));

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2, 4, 2),
}));

export default function ContractDetailsDrawer(props: PropsType): React.ReactElement {
  const [, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClose = () => {
    props.onClose();
  };

  return (
    <SwipeableDrawer
      sx={{
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      hideBackdrop={true}
      anchor="bottom"
      open={props.openState}
      onClose={() => setOpen(false)}
      onOpen={() => {}}
    >
      <Wrapper>
        <PullDownWrapper>
          <PullDownIcon />
        </PullDownWrapper>

        <Header>
          <Typography variant="subtitle1" pb={1}>
            Contract Details
          </Typography>
          <IconContainer onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconContainer>
        </Header>
        <Alert
          variant="filled"
          severity="error"
          sx={{
            color: 'white',
            textAlign: 'left',
            backgroundColor: 'error.main',
            mt: 2,
            mb: 2.5,
            borderRadius: 0,
          }}
        >
          <AlertTitle>Note</AlertTitle>
          Contract expiring in 90 days. Click below to Renew or Extend your contract to continue
          your hassle free stay.
        </Alert>

        {ContractData.map((item: any, i: any) => (
          <ItemWrapper key={i}>
            <Typography variant="subtitle2" color="grey.500">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="grey.400">
              {item.idNo}
            </Typography>
          </ItemWrapper>
        ))}
        <RenewButton
          variant="outlined"
          sx={{ mb: 1.5, mt: 2 }}
          onClick={() => navigate(PATH_MAIN.contract_renew)}
        >
          {' '}
          Renew Contract
        </RenewButton>
        <CancelRenewButton variant="outlined">I will not renew Contract</CancelRenewButton>
      </Wrapper>
    </SwipeableDrawer>
  );
}

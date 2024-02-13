import { Dispatch, SetStateAction } from 'react';

// @mui
import { styled, Typography, Drawer, Box, IconButton, Button } from '@mui/material';

// icons
import CloseIcon from '@mui/icons-material/Close';
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';

//data
import { ContractData, LeaseContractData } from 'src/utils/constant';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(1.5, 2, 4.5, 2),
    alignItems: 'center',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

interface DrawerProps {
  title: string;
  openDrawer: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  setOpenView: Dispatch<SetStateAction<boolean>>;
}

const HelpButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  padding: theme.spacing(1.5),
  width: '100%',
  marginTop: theme.spacing(1.5),
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));
const ItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
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

export default function MobileDrawerRenew({
  title,
  openDrawer,
  close,
}: DrawerProps): React.ReactElement {
  return (
    <CustomDrawer sx={{ zIndex: 432432 }} anchor="bottom" open={openDrawer}>
      <DrawerSVGIcon />
      <Box sx={{ width: '100%', mt: 3 }}>
        <DrawerHeader>
          <Typography variant="h3"> {title}</Typography>
          <IconButton onClick={() => close(false)} sx={{ backgroundColor: 'grey.900' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <Box>
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
          <Typography variant="subtitle2" align="left" my={1}>
            {' '}
            For Lease Contract:
          </Typography>
          {LeaseContractData.map((item: any, i: any) => (
            <ItemWrapper key={i}>
              <Typography variant="subtitle2" color="grey.500">
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="grey.400">
                {item.idNo}
              </Typography>
            </ItemWrapper>
          ))}
          <ItemWrapper>
            <Typography variant="subtitle2" color="grey.500">
              Status:
            </Typography>
            <Typography variant="subtitle1" color="error.main">
              Expiring in 30 days
            </Typography>
          </ItemWrapper>
          <RenewButton variant="outlined" sx={{ mt: 2 }}>
            {' '}
            Renew Parking Permit
          </RenewButton>
          <HelpButton variant="outlined">Get Help</HelpButton>
        </Box>
      </Box>
    </CustomDrawer>
  );
}

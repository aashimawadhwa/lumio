import { Dispatch, SetStateAction } from 'react';

// @mui
import { styled, Drawer, Box, IconButton } from '@mui/material';

// icons
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';
import { RequestDetail } from 'src/pages/RequestList';
import { DisplayRequest } from 'src/components/pages/requestList/SideDrawer';


const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(1, 0, 4.5, 0),
    alignItems: 'center',
    maxHeight: '529px'
  },
}));

interface Props {
  data: RequestDetail;
  openDrawer: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

export default function MobileDrawer({ data, openDrawer, close }: Props): React.ReactElement {
  return (
    <CustomDrawer anchor="bottom" open={openDrawer}>
      <IconButton onClick={() => close(false)} />
      <DrawerSVGIcon />
      <Box sx={{ width: '100%', mt: 3 }}>
        {DisplayRequest(data)}
      </Box>
    </CustomDrawer>
  );
}

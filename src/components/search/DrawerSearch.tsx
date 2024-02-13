import { Dispatch, SetStateAction } from 'react';

// @mui
import { styled, Typography, Drawer, Box, IconButton, TextField } from '@mui/material';

// icons
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';
import SearchIcon from 'src/assets/svg/icon_search';

//components
import ScrollContainer from 'src/components/search/ScrollContainer';
import ServiceContainer from 'src/components/search/ServiceContainer';

interface Props {
  openDrawer: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
}

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(2, 0),
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Input = styled(TextField)(({ theme }) => ({
  background: '#4d4d4d',
  width: '100%',
  borderRadius: '20px',
  height: '36px',
  '& fieldset': {
    border: 'none',
  },
  '& input::placeholder': {
    color: '#757575',
  },
}));

const ServiceBox = styled(Box)(({ theme }) => ({
  overflow: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

export default function DrawerSearch({ openDrawer, setOpenSearch }: Props): React.ReactElement {
  return (
    <CustomDrawer hideBackdrop={openDrawer} anchor="bottom" open={openDrawer}>
      <IconButton onClick={() => setOpenSearch(false)} sx={{ textAlign: 'center', p: 0 }}>
        <DrawerSVGIcon />
      </IconButton>
      <Box sx={{ width: '100%', mt: 2.125, pl: 3, pr: 3 }}>
        <Input
          inputProps={{
            style: {
              padding: '8px 8px 4px 8px',
              fontSize: '16px',
              fontWeight: 400,
            },
          }}
          placeholder="Search for anything"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box sx={{ maxWidth: '100%' }} mt={7.5} pl={3}>
        <Typography variant="subtitle1" color="grey.500" mb={1.5}>
          Recently Used
        </Typography>
        <ScrollContainer />
      </Box>
      <Typography variant="subtitle1" color="grey.500" mt={6} pl={3} pr={3}>
        Services
      </Typography>
      <ServiceBox pl={3} pr={3} mt={2.5}>
        <ServiceContainer />
      </ServiceBox>
    </CustomDrawer>
  );
}

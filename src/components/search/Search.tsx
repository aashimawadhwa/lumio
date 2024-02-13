import { SetStateAction, Dispatch } from 'react';

// @mui
import { Box, IconButton, styled, TextField, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from 'src/assets/svg/icon_search';

//components
import { SearchInput } from 'src/components/pages/payment/styledComponents/styles';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import DrawerSearch from 'src/components/search/DrawerSearch';
import ScrollContainer from 'src/components/search/ScrollContainer';
import ServiceContainer from 'src/components/search/ServiceContainer';

interface Props {
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  maxWidth: '901px',
  background: theme.palette.grey[900],
  borderRadius: '16px',
  padding: theme.spacing(4.5),
  margin: theme.spacing(0, 2),
  [theme.breakpoints.down(941)]: {
    maxWidth: '581px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const SearchContainer = styled('div')(({ theme }) => ({
  width: '100%',
}));

export const Input = styled(TextField)(({ theme }) => ({
  background: theme.palette.grey[100],
  borderRadius: '31px',
  width: '100%',
  height: '44px',
  '& fieldset': {
    border: 'none',
  },
  '& input::placeholder': {
    color: theme.palette.grey[500],
  },
}));

export default function Search({ setOpenSearch }: Props) {
  const isDesktop = useResponsive('up', 'sm');
  return isDesktop ? (
    <Wrapper sx={{ mb: 5 }}>
      <SearchWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography mb={3} align="left" variant="h1">
              Search
            </Typography>
          </div>
          <div>
            <IconButton onClick={() => setOpenSearch(false)} sx={{ backgroundColor: 'grey.900' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </Box>

        <SearchContainer>
          <SearchInput
            inputProps={{
              style: {
                padding: '12px',
                fontSize: '14px',
                fontWeight: 300,
              },
            }}
            placeholder="Search for Services"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            variant="outlined"
            fullWidth
          />
        </SearchContainer>
        <Box mt={4.5}>
          {/* 20, 600 */}
          <Typography variant="h2" mb={3}>
            Recently Used
          </Typography>
          <ScrollContainer />
        </Box>
        <Box mt={4.5}>
          {/* 20, 600 */}
          <Typography variant="h2" mb={3}>
            Services
          </Typography>
          <ServiceContainer />
        </Box>
      </SearchWrapper>
    </Wrapper>
  ) : (
    <DrawerSearch openDrawer={true} setOpenSearch={setOpenSearch} />
  );
}

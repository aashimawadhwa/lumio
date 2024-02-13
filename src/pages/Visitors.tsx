import { useNavigate } from 'react-router';

// @mui
import { Box, Typography, IconButton, Grid, styled, Button } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import { ArrowBackIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import InboxBG from 'src/assets/images/InboxBG.png';

// components
import { PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import VisitorCard from 'src/components/pages/visitor/VisitorCard';

type VisitorDetails = {
  name: string;
  residence: string;
  date?: string;
};
interface Visitor {
  title: string;
  details: VisitorDetails[];
}

const visitors: Visitor[] = [
  {
    title: 'Active visitors',
    details: [
      { name: 'Robert Hinshaw', date: 'April 23', residence: 'Al Safa Villa #303' },
      { name: 'Nancy Hinshaw', date: 'April 23', residence: 'Al Safa Villa #303' },
    ],
  },
  {
    title: 'Past visitors',
    details: [
      { name: 'Helena Volochov ', residence: 'Bellview Heights R2 #5501' },
      { name: 'Kelsey Mannor ', residence: 'Al Safa Villa #303' },
    ],
  },
];

const CustomWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  width: '846px',
  margin: theme.spacing(0, 2),
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(2.5, 2, 1.25, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  height: '276px',
  maxHeight: '276px',
  overflow: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '100%',
    height: '100%',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  padding: theme.spacing(1.25, 1.75),
}));

export default function Visitors() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Visitors">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper>
          {isDesktop ? (
            <Box mb={4.5} textAlign="center">
              <Typography variant="h3">Visitors</Typography>
            </Box>
          ) : (
            <Header mb={2.5}>
              <IconButton sx={{ p: 0 }} onClick={() => navigate(-1)}>
                <ArrowBackIos fontSize="small" />
              </IconButton>
              <Typography variant="subtitle1" color="grey.400">
                Visitors
              </Typography>
              <IconButton sx={{ p: 0 }} onClick={() => navigate(PATH_MAIN.add_visitor)}>
                <AddIcon />
              </IconButton>
            </Header>
          )}
          <BoxWrapper>
            {visitors.length > 0 ? (
              <Grid container spacing={4}>
                {visitors.map((item, i) => (
                  <VisitorCard
                    key={i}
                    title={item.title}
                    visitor={item.details}
                    active={item.title === 'Active visitors' ? true : false}
                  />
                ))}
              </Grid>
            ) : (
              <Box py={12.5} textAlign="center">
                <Typography variant="h5" color="grey.500">
                  No Visitors Found
                </Typography>
              </Box>
            )}
          </BoxWrapper>
          {isDesktop && (
            <Box textAlign="center" pt={4.5}>
              <AddButton onClick={() => navigate(PATH_MAIN.add_visitor)} startIcon={<AddIcon />}>
                <Typography variant="subtitle2">Add New</Typography>
              </AddButton>
            </Box>
          )}
        </CustomWrapper>
      </Wrapper>
    </Page>
  );
}

//react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, Typography, IconButton, Grid, styled, MenuItem, Select, Link } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import FilterSVGIcon from 'src/assets/svg/icon_filterSVG';
import InboxBG from 'src/assets/images/InboxBG.png';

// components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import InboxCard from 'src/components/pages/inbox/InboxCard';
import Page from 'src/components/Page';

// data
import { CustomChip, StyledBadge } from 'src/components/pages/payment/UpcomingPayment';
import { FilterTypes } from 'src/utils/constant';
import FilterDrawer from 'src/components/pages/payment/drawer/FilterDrawer';

//.................................................

const inboxArr: any[] = [
  {
    title: 'Submit a Keys Handover Request',
    date: '22 Jun 2022',
    message:
      'Your contract process is completed successfully! Kindly submit a Keys Handover Request to start the handover process',
    url: true,
    isRead: false,
    sender: 'H Residence - 303',
    type: 'Payment',
  },
  {
    title: 'Rent payment (3/4) has been completed.',
    date: '01 Apr 2021',
    message: 'Your check #404 has been cashed successfully.',
    url: false,
    isRead: false,
    sender: 'H Residence - 303',
    type: 'Payment',
  },
  {
    title: 'Parking Permit #3320 has expired',
    date: '25 Mar 2022',
    message: 'Kindly renew the permit to enjoy the services.',
    url: false,
    isRead: true,
    sender: 'Bohemian Residence #13',
    type: 'Parking',
  },
  {
    title: 'New Units Available in Jumeriah Beach',
    date: '13 Jul 2020',
    message: '01 Mar 2022',
    url: false,
    isRead: true,
    sender: 'Promotions',
    type: 'Promotions',
  },
];

const CustomWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  width: '542px',
  height: '756px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
    width: '100%',
    height: '100vh',
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 16,
  width: '24px',
  height: '24px',
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 2),
  },
}));

const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  height: '40px',
  '& .active': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  borderRadius: '100px',
  padding: theme.spacing(1, 1.725),
}));

const SelectBox = styled(Select)(({ theme }) => ({
  borderRadius: '31px',
  fontSize: '14px',
  '& fieldset': { border: 'none' },
  '& .MuiSelect-select': {
    padding: theme.spacing(1.25, 2),
  },
}));

const Item = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected.Mui-focusVisible': {
    background: theme.palette.grey[600],
  },
}));

const MessageWrapper = styled(Box)(({ theme }) => ({
  overflow: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

export default function Inbox() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [inboxData, setInboxData] = useState(inboxArr);
  const [type, setType] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState(FilterTypes);

  const handleInboxType = (e: any) => {
    setType(e.target.innerText);
  };

  const handleFilterSelect = (type: 'properties' | 'type' | 'time', id: number) => {
    switch (type) {
      case 'properties':
        const prop_new_arr = filterValues.properties.values.map((value) => {
          if (value.id === id) {
            return { ...value, selected: !value.selected };
          }
          return value;
        });
        setFilterValues({
          ...filterValues,
          properties: { ...filterValues.properties, values: prop_new_arr },
        });
        break;
      case 'type':
        const type_new_arr = filterValues.type.values.map((value) => {
          if (value.id === id) {
            return { ...value, selected: !value.selected };
          }
          return value;
        });
        setFilterValues({
          ...filterValues,
          type: { ...filterValues.type, values: type_new_arr },
        });
        break;
      case 'time':
        setFilterValues({
          ...filterValues,
          time: { ...filterValues.time, currId: id },
        });
        break;
      default:
        break;
    }
  };

  const ClearAllFilter = () => {
    const properties_new_arr = filterValues.properties.values.map((value) => ({
      ...value,
      selected: false,
    }));
    const type_new_arr = filterValues.type.values.map((value) => ({
      ...value,
      selected: false,
    }));
    const time_new_arr = filterValues.time.values.map((value) => ({
      ...value,
      selected: false,
    }));

    setFilterValues({
      ...filterValues,
      properties: { ...filterValues.properties, values: properties_new_arr },
      type: { ...filterValues.type, values: type_new_arr },
      time: { ...filterValues.time, values: time_new_arr },
    });
  };

  useEffect(() => {
    if (type !== 'All') {
      setInboxData(inboxArr.filter((item) => item.type === type));
    } else {
      setInboxData(inboxArr);
    }
  }, [type]);

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Inbox">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper>
          <Box
            sx={{ mb: { xs: 1.5, sm: 3 }, pt: { xs: 1.25, sm: 0 }, pb: { xs: 1.25, sm: 0 } }}
            textAlign="center"
          >
            {!isDesktop && (
              <CustomIconButton onClick={() => navigate(-1)}>
                <ArrowBackIos fontSize="small" />
              </CustomIconButton>
            )}
            <Typography
              variant={isDesktop ? 'h3' : 'subtitle1'}
              color={isDesktop ? '' : 'grey.400'}
            >
              Inbox
            </Typography>
          </Box>
          <CustomBox>
            <FilterBox>
              <TextBox
                className={`${type === 'All' ? 'active' : ''}`}
                onClick={(e) => handleInboxType(e)}
                sx={{ mr: 1 }}
              >
                <Typography variant="body2">All</Typography>
              </TextBox>
              <TextBox
                className={`${type === 'Promotions' ? 'active' : ''}`}
                onClick={(e) => handleInboxType(e)}
              >
                <Typography variant="body2">Promotions</Typography>
              </TextBox>
            </FilterBox>
            <Box>
              {isDesktop && (
                <SelectBox
                  sx={{ backgroundColor: 'grey.600', mr: 1 }}
                  value={filterValues.time.currId}
                >
                  {filterValues.time.values.map((value) => (
                    <Item
                      key={value.id}
                      value={value.id}
                      onClick={() => handleFilterSelect('time', value.id)}
                    >
                      {value.name}
                    </Item>
                  ))}
                </SelectBox>
              )}
              <StyledBadge
                badgeContent={
                  [...filterValues.properties.values, ...filterValues.type.values].filter(
                    (value) => value.selected === true
                  ).length
                }
              >
                <IconButton
                  onClick={() => setShowFilter(!showFilter)}
                  sx={{ backgroundColor: 'grey.600' }}
                >
                  <FilterSVGIcon />
                </IconButton>
              </StyledBadge>
            </Box>
          </CustomBox>
          {showFilter && isDesktop && (
            <Box mt={2} display="flex" flexWrap="wrap" textAlign="left">
              {filterValues.type.values.map((value) => (
                <CustomChip
                  key={value.id}
                  label={value.name}
                  onClick={() => handleFilterSelect('type', value.id)}
                  sx={{
                    backgroundColor: value.selected ? 'grey.0' : 'grey.100',
                    color: value.selected ? 'grey.900' : 'grey.0',
                  }}
                />
              ))}
              {filterValues.properties.values.map((value) => (
                <CustomChip
                  key={value.id}
                  label={value.name}
                  onClick={() => handleFilterSelect('properties', value.id)}
                  sx={{
                    backgroundColor: value.selected ? 'grey.0' : 'grey.100',
                    color: value.selected ? 'grey.900' : 'grey.0',
                  }}
                />
              ))}
              <Link
                href="#"
                variant="subtitle1"
                underline="always"
                marginLeft="auto"
                color="grey.0"
                onClick={ClearAllFilter}
              >
                Clear All
              </Link>
            </Box>
          )}
          <MessageWrapper sx={{ mt: 3, ml: { xs: 2, sm: 0 }, mr: { xs: 2, sm: 0 } }}>
            {inboxData.length !== 0 ? (
              <Grid container spacing={1.5}>
                {inboxData?.map((item: any, i) => (
                  <InboxCard data={item} iconType={item.type} key={i} />
                ))}
              </Grid>
            ) : (
              <Box py={10} textAlign="center">
                <Typography variant="h5" color="grey.500">
                  No messages found
                </Typography>
              </Box>
            )}
          </MessageWrapper>
        </CustomWrapper>
        {showFilter && !isDesktop && (
          <FilterDrawer
            filterValues={filterValues}
            onClose={() => setShowFilter(!showFilter)}
            handleFilterSelect={handleFilterSelect}
            clearAllFilter={ClearAllFilter}
          />
        )}
      </Wrapper>
    </Page>
  );
}

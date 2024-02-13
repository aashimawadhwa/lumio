import { useState } from 'react';

// @mui
import {
  Badge,
  BadgeProps,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  styled,
  Link,
} from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import FilterIcon from 'src/assets/svg/filter_icon';
import SearchIcon from 'src/assets/svg/icon_search';

// components
import FilterDrawer from 'src/components/pages/payment/drawer/FilterDrawer';
import PaymentCard from 'src/components/pages/payment/PaymentCard';

// data
import { FilterTypes, UpcomingPaymentsData } from 'src/utils/constant';

// styles
import { SearchInput } from 'src/components/pages/payment/styledComponents/styles';

//............................................

export const Demo = styled('div')(({ theme }) => ({
  flex: 1,
  height: '44px',
  backgroundColor: theme.palette.grey[0],
  borderRadius: '31px',
  marginRight: theme.spacing(2.5),
}));

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    color: theme.palette.grey[900],
    right: 3,
    top: 3,
    background: theme.palette.grey[0],
  },
}));

export const SelectBox = styled(Select)(({ theme }) => ({
  borderRadius: '2rem',
  width: 153,
  height: 44,
  backgroundColor: theme.palette.grey[600],
  fontSize: 14,
  fontWeight: 400,
  marginLeft: theme.spacing(2.5),
  '& .MuiSvgIcon-root ': {
    fill: '#CAC9C0 !important',
    fontSize: 24,
  },
  boxShadow: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    outline: 'none',
  },
}));

export const CustomChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.75),
  marginBottom: theme.spacing(0.75),
  fontSize: 14,
  fontWeight: 300,
  ':hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

interface UpcomingPaymentProp {
  selectedTransactionId: number | null;
  togglePaymentDetail: (id: number) => void;
}

const PAGE_COUNT = 4;

export default function UpcomingPayment({
  togglePaymentDetail,
  selectedTransactionId,
}: UpcomingPaymentProp) {
  const isDesktop = useResponsive('up', 'md');
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState(FilterTypes);
  const [page, setPage] = useState(1);

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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" sx={{ margin: { xs: '0px 16px', md: 0 } }}>
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
        {isDesktop && (
          <SelectBox value={filterValues.time.currId}>
            {filterValues.time.values.map((value) => (
              <MenuItem
                key={value.id}
                value={value.id}
                onClick={() => handleFilterSelect('time', value.id)}
              >
                {value.name}
              </MenuItem>
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
            sx={{ backgroundColor: 'grey.600', padding: '8px 12px', ml: 2.5 }}
          >
            <FilterIcon />
          </IconButton>
        </StyledBadge>
      </Box>
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
      <Box mt={2.5}>
        {UpcomingPaymentsData.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT).map((data) => (
          <PaymentCard
            key={data.id}
            title={data.title}
            subtitle={data.subtitle}
            paymentAmount={data.paymentAmount}
            dueDate={data.dueDate}
            overdueDate={data.overdueDate}
            status={data.status}
            onClick={() => {
              togglePaymentDetail(data.id);
            }}
            selected={data.id === selectedTransactionId}
          />
        ))}
      </Box>
      <Box
        sx={{ mt: { xs: 3, sm: 4 }, mb: { xs: 3, sm: 0 } }}
        display="flex"
        justifyContent="center"
      >
        <Pagination
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '4px',
              fontWeight: 400,
            },
          }}
          count={Math.ceil(UpcomingPaymentsData.length / PAGE_COUNT)}
          size="large"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
      {showFilter && !isDesktop && (
        <FilterDrawer
          filterValues={filterValues}
          onClose={() => setShowFilter(!showFilter)}
          handleFilterSelect={handleFilterSelect}
          clearAllFilter={ClearAllFilter}
        />
      )}
    </>
  );
}

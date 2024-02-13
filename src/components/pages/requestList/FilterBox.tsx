import { useState } from 'react';

// @mui
import { Box, styled, IconButton, Select, MenuItem, Link } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

//images and icons
import FilterSVGIcon from 'src/assets/svg/icon_filterSVG';
import SearchIcon from 'src/assets/svg/icon_search';

// components
import { CustomChip, StyledBadge } from 'src/components/pages/payment/UpcomingPayment';
import { SearchInput } from 'src/components/pages/payment/styledComponents/styles';
import FilterDrawer from 'src/components/pages/payment/drawer/FilterDrawer';

//data
import { FilterTypes } from 'src/utils/constant';

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
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

export default function FilterBox(): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState(FilterTypes);

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
  return (
    <>
      <CustomBox>
        <SearchInput
          inputProps={{
            style: {
              padding: '12px',
              fontSize: '14px',
              fontWeight: 300,
            },
          }}
          placeholder="Any Request"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          variant="outlined"
          fullWidth
        />
        {isDesktop && (
          <SelectBox sx={{ backgroundColor: 'grey.600', ml: 1 }} value={filterValues.time.currId}>
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
            sx={{ backgroundColor: 'grey.600', ml: 1 }}
          >
            <FilterSVGIcon />
          </IconButton>
        </StyledBadge>
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

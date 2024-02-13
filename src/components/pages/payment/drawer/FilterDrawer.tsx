// @mui
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  IconButton,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from '@mui/material';

// styles
import { ContainedButton } from 'src/components/pages/payment/styledComponents/styles';

// icons
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';

const FilterTypeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.25rem 1rem',
  borderBottom: '1px solid #979797',
}));

const ClearFilter = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  backgroundColor: 'transparent',
  color: theme.palette.grey[0],
  border: `1px solid ${theme.palette.grey[400]}`,
}));

interface FilterDrawerProp {
  onClose: () => void;
  filterValues: any;
  handleFilterSelect: (type: 'properties' | 'type' | 'time', id: number) => void;
  clearAllFilter: () => void;
}

export default function FilterDrawer({
  onClose,
  filterValues,
  handleFilterSelect,
  clearAllFilter,
}: FilterDrawerProp) {
  return (
    <Drawer
      PaperProps={{ style: { maxHeight: '80%' } }}
      anchor="bottom"
      hideBackdrop={true}
      open={true}
    >
      <Box>
        <Box textAlign="center" mt={1.2} mb={1}>
          <IconButton onClick={onClose} sx={{ p: 0 }}>
            <DrawerSVGIcon />
          </IconButton>
        </Box>
        <Box p="0 1rem" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Filters</Typography>
        </Box>
        <Box>
          <Typography p="0.75rem 1rem" variant="h3" borderBottom="1px solid #979797">
            Properties
          </Typography>
          {filterValues.properties.values.map((type: any) => (
            <FilterTypeBox key={type.id}>
              <Typography variant="subtitle1" color="grey.500">
                {type.name}
              </Typography>
              <Checkbox
                checked={type.selected}
                value={type.name}
                checkedIcon={<CheckBoxOutlinedIcon sx={{ color: 'grey.0' }} />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFilterSelect('properties', type.id);
                }}
              />
            </FilterTypeBox>
          ))}
          <Typography p="0.75rem 1rem" variant="h3" borderBottom="1px solid #979797">
            Type
          </Typography>
          {filterValues.type.values.map((type: any) => (
            <FilterTypeBox key={type.id}>
              <Typography variant="subtitle1" color="grey.500">
                {type.name}
              </Typography>
              <Checkbox
                value={type.name}
                checked={type.selected}
                checkedIcon={<CheckBoxOutlinedIcon sx={{ color: 'grey.0' }} />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterSelect('type', type.id)
                }
              />
            </FilterTypeBox>
          ))}
          <Typography p="0.75rem 1rem" variant="h3" borderBottom="1px solid #979797">
            Time
          </Typography>
          <FormControl fullWidth>
            <RadioGroup value={filterValues.time.currId}>
              {filterValues.time.values.map((type: any) => (
                <FilterTypeBox key={type.id}>
                  <Typography variant="subtitle1" color="grey.500">
                    {type.name}
                  </Typography>
                  <Radio
                    sx={{
                      color: 'grey.0',
                      '&.Mui-checked': {
                        color: 'grey.0',
                      },
                    }}
                    value={type.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFilterSelect('time', type.id)
                    }
                  />
                </FilterTypeBox>
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box p="24px 16px">
          <ContainedButton sx={{ mb: 1.5 }}>Apply Filter</ContainedButton>
          <ClearFilter onClick={clearAllFilter}>Clear Filters</ClearFilter>
        </Box>
      </Box>
    </Drawer>
  );
}

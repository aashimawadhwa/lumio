import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// type
import { NavListProps } from '../type';
//
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type NavListRootProps = {
  list: NavListProps;
};

export function NavListRoot({ list }: NavListRootProps) {
  const [value, setValue] = useState('H Residence, Apartment 303');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleNav = (path: string) => {
    navigate(path);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            inputProps={{
              sx: {
                '&.MuiOutlinedInput-input:hover': {
                  border: 'none',
                },
              },
            }}
            sx={{
              width: { xs: 'inherit', sm: 170 },
              '.MuiSvgIcon-root ': {
                fill: 'white !important',
                fontSize: { xs: 20, sm: 30 },
              },
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 'none', outline: 'none' },
            }}
            value={value}
            onChange={handleChange}
          >
            {list.children?.map((l: any, i: number) => (
              <MenuItem
                onClick={() => handleNav(l.path)}
                key={i}
                value={`${list.title}, ${l.subtitle}`}
              >
                <div>
                  <div>
                    <Typography color="grey.0" variant="subtitle1">
                      {l.title}
                    </Typography>
                  </div>
                  <div>
                    <Typography color="grey.500" variant="body1">
                      {l.subtitle}
                    </Typography>
                  </div>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

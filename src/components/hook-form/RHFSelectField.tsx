import { useFormContext, Controller } from 'react-hook-form';
import {
  FormControl,
  styled,
  TextFieldProps,
  InputAdornment,
  MenuItem,
  Checkbox,
  InputLabel,
  Select,
} from '@mui/material';

//icons
import Check from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';

import ErrorIcon from '@mui/icons-material/Error';

//components
import { ErrorSpace } from './RHFTextField';

// ----------------------------------------------------------------------

interface SProps {
  name: string;
  placeholder: string;
  options: string[];
  visibility?: string | React.ReactElement;
}

const InfoIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function RHFSelectField({
  name,
  placeholder,
  options,
  visibility,
  ...other
}: SProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }: any) => (
        <FormControl variant="filled" fullWidth>
          <InputLabel
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: '#979797',
              marginLeft: 1.2,
              '&.Mui-focused': {
                color: '#979797',
                marginTop: 0.3,
              },
            }}
          >
            {placeholder}
          </InputLabel>

          <Select
            autoComplete="off"
            {...field}
            error={!!error}
            {...other}
            style={{ height: 56 }}
            endAdornment={
              error && (
                <InputAdornment position="end">
                  <InfoIcon fontSize="large" />
                </InputAdornment>
              )
            }
            disableUnderline
            inputProps={{
              sx: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '30px',
                marginLeft: 1.3,
                '&:focus': {
                  backgroundColor: 'transparent',
                  borderRadius: '30px',
                },
              },
            }}
            sx={{
              border: error ? ` 2px solid #CC5F47` : 'none',
              background: '#393939',
              borderRadius: '30px',
              '.MuiSvgIcon-root ': {
                fontSize: error ? 0 : '1.3rem',
                mr: error ? 0 : 1,
              },
            }}
            value={field.value}
            onChange={field.onChange}
            renderValue={(selected: any) => field.value}
          >
            {options.map((option) => (
              <MenuItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                key={option}
                value={option}
              >
                {option}
                <Checkbox
                  sx={{
                    height: '15px',
                  }}
                  checkedIcon={
                    <DoneIcon
                      fontSize="small"
                      sx={{
                        color: '#fff',
                      }}
                    />
                  }
                  checked={field.value.indexOf(option) > -1}
                  icon={<Check sx={{ display: 'none' }} />}
                />
              </MenuItem>
            ))}
          </Select>
          <ErrorSpace sx={{ marginBottom: error ? '0.7rem' : 0 }} error>
            {error && <>{error?.message}</>}
          </ErrorSpace>
        </FormControl>
      )}
    />
  );
}

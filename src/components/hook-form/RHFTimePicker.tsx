import React from 'react';

import { useFormContext, Controller } from 'react-hook-form';
import { styled, TextField, FormHelperText, inputLabelClasses } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type TimePickerProps = {
  placeholder: string;
  name: string;
  visibility?: string | React.ReactElement;
};

const InputWrapper = styled('div')(({ theme }) => ({
  width: '100%',
}));

const InfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  fontSize: '1rem',
}));

const ErrorSpace = styled(FormHelperText)(({ theme }) => ({
  height: '1.2rem',
  marginLeft: 0,
  marginTop: theme.spacing(0.2),
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.8rem',
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '100px',
  background: theme.palette.grey[600],
  '& fieldset': { border: 'none' },

  '& .MuiInputBase-input': {
    paddingTop: 27,
    paddingBottom: 12,
  },
  '& label': {
    '&.Mui-focused': {
      paddingTop: '20px',
      fontSize: '12px',
    },

    [`&.${inputLabelClasses.shrink}`]: {
      paddingTop: '20px',
      fontSize: '12px',
    },
  },
}));

export default function RHFDatePicker({
  placeholder,
  name,
  visibility,
}: TimePickerProps): React.ReactElement {
  const { control } = useFormContext();
  return (
    <>
      <InputWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TimePicker
                label={placeholder}
                value={value}
                onChange={onChange}
                components={{
                  OpenPickerIcon: KeyboardArrowDownIcon,
                }}
                renderInput={(params) => (
                  <>
                    <CustomTextField
                      {...params}
                      label={placeholder}
                      autoComplete="off"
                      InputLabelProps={{
                        style: { fontSize: 16, color: '#979797', marginTop: '1px' },
                      }}
                      fullWidth
                      error={!!error}
                    />
                    <ErrorSpace error>
                      {error && (
                        <>
                          <InfoIcon />
                          {error?.message}
                        </>
                      )}
                    </ErrorSpace>
                  </>
                )}
              />
            )}
          />
        </LocalizationProvider>
      </InputWrapper>
    </>
  );
}

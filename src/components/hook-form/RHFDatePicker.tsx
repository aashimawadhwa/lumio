import React from 'react';

import { useFormContext, Controller } from 'react-hook-form';
import { styled, TextField, FormHelperText, inputLabelClasses } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DesktopDatePicker } from '@mui/x-date-pickers';

type TDatePickerProps = {
  placeholder: string;
  name: string;
  visibility?: string | React.ReactElement;
};

const InputWrapper = styled('div')(({ theme }) => ({
  width: '100%',
}));

const InfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: '1rem',
}));

const ErrorSpace = styled(FormHelperText)(({ theme }) => ({
  height: '1rem',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.7rem',
  marginTop: '4px',
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
}: TDatePickerProps): React.ReactElement {
  const { control } = useFormContext();
  return (
    <>
      <InputWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DesktopDatePicker
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
                          <InfoIcon sx={{ mr: 0.5 }} />
                          Field is required
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

import { Dispatch, SetStateAction } from 'react';

import { useFormContext, Controller } from 'react-hook-form';
import {
  FormControl,
  styled,
  FormHelperText,
  TextField,
  TextFieldProps,
  InputAdornment,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
// ----------------------------------------------------------------------

interface IProps {
  name: string;
  placeholder: string;
  visibility?: string | React.ReactElement;
  setActive?: Dispatch<SetStateAction<boolean>>;
}

const Input = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    fontFamily: theme.typography.fontFamily,
    borderRadius: '30px',
    background: theme.palette.grey[600],
  },
}));

const InfoIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const ErrorSpace = styled(FormHelperText)(({ theme }) => ({
  height: '1rem',
  margin: 0,
  display: 'flex',
  alignItems: 'start',
  fontSize: '12px',
  fontWeight: 400,
  marginLeft: 24,
}));

export default function RHFTextField({
  name,
  placeholder,
  visibility,
  setActive,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }: any) => (
        <>
          <FormControl
            onFocus={() => setActive && setActive(true)}
            onBlur={() => setActive && setActive(false)}
            fullWidth
          >
            <Input
              variant="filled"
              sx={{
                margin: error ? '10px 0px 0px 0px' : '8px 0px',
                '& label.Mui-focused': {
                  marginTop: 0.3,
                },
                '& .MuiFilledInput-input': {
                  padding: '25px 0px 8px 12px',
                },
                '& .MuiFilledInput-root': {
                  border: error ? ` 2px solid #CC5F47` : 'none',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#979797',
                  paddingLeft: '12px',
                  paddingTop: 0,
                },
              }}
              InputProps={{
                style: {
                  fontSize: 16,
                  fontWeight: 400,
                  paddingLeft: 10,
                  color: '#F5F5F5',
                },
                disableUnderline: true,
                endAdornment: error ? (
                  <InputAdornment position="end">
                    <InfoIcon fontSize="large" />
                  </InputAdornment>
                ) : (
                  <InputAdornment sx={{ pr: 1 }} position="end">
                    {visibility}
                  </InputAdornment>
                ),
              }}
              label={placeholder}
              autoComplete="off"
              {...field}
              fullWidth
              error={!!error}
              {...other}
            />
            {error && <ErrorSpace error>{error?.message}</ErrorSpace>}
          </FormControl>
        </>
      )}
    />
  );
}

// @mui
import { styled, Button, Box, TextField } from '@mui/material';

export const SearchInput = styled(TextField)(({ theme }) => ({
  background: theme.palette.grey[100],
  borderRadius: '31px',
  width: '100%',
  height: '44px',
  '& fieldset': {
    border: 'none',
  },
  '& input::placeholder': {
    color: theme.palette.grey[500],
  },
}));


export const ContainedButton = styled(Button)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2.2),
    '&:disabled':{
        background: theme.palette.grey[500],
        color: theme.palette.grey[600],
    },
    '&:hover':{
        background: theme.palette.grey[0],
        color: theme.palette.grey[900],
    }
}))

export const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  padding: theme.spacing(2.5),
  borderRadius: '0.5rem',
  textAlign: 'left',
  marginBottom: theme.spacing(1.5),
}));

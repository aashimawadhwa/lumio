import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontSize: '16px',
          fontWeight: 600,

          '&:hover': {
            background: theme.palette.grey[0],
            color: theme.palette.grey[900],
          },
          '&.MuiButton-text': {
            fontWeight: 'bold',
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  };
}

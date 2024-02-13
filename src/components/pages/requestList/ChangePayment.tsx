// @mui
import { Typography, Box } from '@mui/material';

// icons
import ErrorIcon from '@mui/icons-material/Error';

// components
import { RequestDetail } from 'src/pages/RequestList';
import { FilledButton, OutlinedButton } from 'src/components/pages/requestList/NOC';

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Failed':
      return (
        <Box>
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
              textAlign: 'center',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <ErrorIcon
              sx={{
                color: 'error.main',
                fontSize: '34px',
                mr: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Typography variant="h3" textAlign="left">
              Error Processing Payment
            </Typography>
            <ErrorIcon
              sx={{ color: 'error.main', fontSize: '53px', display: { sm: 'none' }, mt: 2.25 }}
            />
          </Box>

          <Typography mb={3} variant="subtitle1" color="grey.500">
            We were unable to process your credit/debit card payment. Please check your details and
            try your payment again.
            <br />
            <br />
            If you are still experiencing issues, contact us.
          </Typography>
          <FilledButton sx={{ mb: 1.5 }}>Contact Us</FilledButton>

          <OutlinedButton variant="outlined">Cancel</OutlinedButton>
        </Box>
      );

    default:
      return <></>;
  }
}

export function ChangePayment(data: RequestDetail) {
  return <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>{Details(data)}</Box>;
}

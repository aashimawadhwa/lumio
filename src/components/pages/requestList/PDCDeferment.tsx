// @mui
import { Typography, Box } from '@mui/material';

// components
import { RequestDetail, textColor } from 'src/pages/RequestList';
import { 
  findValue,
  info,
  FilledButton,
  OutlinedButton,
} from 'src/components/pages/requestList/NOC';

const arr = ['Contract', 'Amount', 'Cheque Date', 'Cheque #'];

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Approved':
      return (
        <Box sx={{ mt: 3 }}>
          <FilledButton sx={{ mb: 1.5 }}>Download Invoice</FilledButton>

          <OutlinedButton variant="outlined">Download Receipt</OutlinedButton>
        </Box>
      );
    case 'Awaiting Receipt':
      return (
        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle2" color="grey.500" />
            <Typography variant="body2" color="grey.400">
              PDC Deferment requests are not available within 5 days of payment occurance. Contact
              us for help. Requests/changes are subjected to added fees*
            </Typography>
          </Box>
          <FilledButton>Submit Reciept</FilledButton>
          <OutlinedButton variant="outlined">Cancel</OutlinedButton>
        </Box>
      );
    case 'Processing':
      return (
        <OutlinedButton variant="outlined" sx={{ mt: 3 }}>
          Contact Consierge
        </OutlinedButton>
      );
    case 'Denied':
      const reason = findValue(data, 'Reason');
      return (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="grey.500" mb={0.5}>
              Reason:
            </Typography>
            <Typography variant="body2" color="grey.400">
              Your PDC Deferment Request has been denied due to {reason}. Please Contact Help desk
              for further assistance.
            </Typography>
          </Box>
          <FilledButton sx={{ mb: 1.5 }}>Download Invoice</FilledButton>
          <OutlinedButton variant="outlined" sx={{ mb: 1.5 }}>
            Download Receipt
          </OutlinedButton>
          <OutlinedButton variant="outlined">Contact Consierge</OutlinedButton>
        </Box>
      );
    default:
      return <></>;
  }
}

export function PDCDeferment (data: RequestDetail) {

    return (<Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
      <Typography
        sx={{
          textAlign: { xs: 'left', sm: 'center' },
          mb: { xs: 2.25, sm: 3 },
        }}
        variant="h3"
      >
        {data.title}
      </Typography>

      {arr.map((item) => (
        <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
      ))}
      {info('Status', data.status, textColor(data.status))}

      {Details(data)}
    </Box>)
};

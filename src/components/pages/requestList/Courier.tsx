// @mui
import { Typography, Box } from '@mui/material';

// components
import { RequestDetail } from 'src/pages/RequestList';
import {
  FilledButton,
  OutlinedButton,
  findValue,
  info,
} from 'src/components/pages/requestList/NOC';

const arr = ['Pickup Date', 'Time'];

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Scheduled':
      return (
        <Box sx={{ mt: { xs: 3.75, sm: 3 } }}>
          <Typography variant="subtitle1" mb={1.5}>
            Pick up scheduled for signed document collection{' '}
          </Typography>
          <Typography variant="body2" color="grey.500" mb={1.5}>
            Instructions:
            <br />
            Your Courier Request has been scheduled please find below the date and time of the
            pickup{' '}
          </Typography>
          <Box>
            {arr.map((item) => (
              <Box key={item} mt={1}>
                {info(item, findValue(data, item), 'grey.400')}
              </Box>
            ))}
          </Box>
        </Box>
      );
    case 'Completed':
      return (
        <Box sx={{ mt: { xs: 3.75, sm: 3 } }}>
          <Typography variant="subtitle1" mb={1.5}>
            Pick up Completed Successfully
          </Typography>
          <Typography variant="body2" color="grey.500" mb={1.5}>
            The signed documents were successfully picked up by courier services.{' '}
          </Typography>
          <Box mt={1}>
            {info('Pickup Completed on', findValue(data, 'Pickup Completed on'), 'grey.400')}
          </Box>
        </Box>
      );
    default:
      return <></>;
  }
}

export const Courier = (data: RequestDetail) => (
  <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
    <Typography
      sx={{
        textAlign: { xs: 'left', sm: 'center' },
        mb: { xs: 2.75, sm: 3 },
      }}
      variant="h3"
    >
      {data.title}
    </Typography>

    {Details(data)}

    <FilledButton sx={{ mt: 3, mb: 1.5 }}>Get Help</FilledButton>

    <OutlinedButton variant="outlined">Close</OutlinedButton>
  </Box>
);

// @mui
import { Typography, Box } from '@mui/material';

// components
import { findValue, info, OutlinedButton } from 'src/components/pages/requestList/NOC';
import { RequestDetail, textColor } from 'src/pages/RequestList';

const arr = ['Requested On', 'Contract', 'Property', 'Rent (yearly)', 'Starting On'];

function Details(data: RequestDetail, isDesktop: any) {
  switch (data.status) {
    case 'Completed':
      return (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            {!isDesktop && (
              <Typography variant="body2" color="grey.500" mb={0.125}>
                Reason:
              </Typography>
            )}

            <Typography variant="body2" color="grey.400">
              Your Contract has been successfully renewed
            </Typography>
          </Box>
          <OutlinedButton variant="outlined">Get Help</OutlinedButton>
        </Box>
      );
    case 'Denied':
      return (
        <Box sx={{ mt: { xs: 0.75, sm: 2 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="grey.500" mb={0.125}>
              Reason:
            </Typography>
            <Typography variant="subtitle2" color="grey.400">
              Your contract has gone past due on 2 of the 4 cheques on your previous contract. We
              suggest you to contact our leasing team to discuss more options for this new contract.
            </Typography>
          </Box>
          <OutlinedButton variant="outlined">Get Help</OutlinedButton>
        </Box>
      );
    default:
      return <></>;
  }
}

export function ContractRenewal(data: RequestDetail, isDesktop: any) {
  return (
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

      {arr.map((item) => (
        <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
      ))}
      {info('Status', data.status, textColor(data.status))}

      {Details(data, isDesktop)}
    </Box>
  );
}

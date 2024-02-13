// @mui
import { styled, Typography, Box, IconButton } from '@mui/material';

// icons
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';

// components
import {
  findValue,
  info,
  FilledButton,
  OutlinedButton,
} from 'src/components/pages/requestList/NOC';
import { RequestDetail, textColor } from 'src/pages/RequestList';

const scheduled = ['Name', 'Number', 'No. of Occupants', 'Contract', 'Property'];
const completed = ['Date', 'Contract', 'Property'];

export const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: '8px',
  padding: theme.spacing(1.5, 1.875),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')] : {
    background: theme.palette.grey[700],
  }
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[900],
  padding: theme.spacing(1.25),
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down('sm')] : {
    background: theme.palette.grey[600]
  }
}));

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Scheduled':
      return (
        <Box sx={{ mt: { xs: 3.75, sm: 3 } }}>
          <Box sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
            <Typography variant='h6' color='grey.500' mb={0.75}>YOUR MOVE IN DAY:</Typography>
            <Typography variant='subtitle1' color='grey.400'>{findValue(data, 'Info')}</Typography>
          </Box>
          {scheduled.map((item) => (
            <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
          ))}

          <FilledButton sx={{ mt: 3, mb: 1.5 }}>Reschedule Move In</FilledButton>

          <OutlinedButton variant="outlined">Close</OutlinedButton>
        </Box>
      );
    case 'Completed':
      return (
        <Box sx={{ mt: 3.75 }}>
          {completed.map((item) => (
            <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
          ))}
          {info('Status', data.status, textColor(data.status))}

          <Box mt={1.5}>
            {/* 12, 300 */}
            <Typography variant='body1' color='grey.500' mb={0.75}>YOUR MOVE IN DAY:</Typography>
            <Typography variant='subtitle1' color='grey.400'>{findValue(data, 'Info')}</Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="grey.500">
              Documents Attached:
            </Typography>
            <Card>
              <Box>
                <Typography variant="body1">
                  177kb
                </Typography>
                <Typography variant="subtitle1" color='grey.400'>{findValue(data, 'File')}</Typography>
              </Box>
              <CustomIconButton>
                <DownloadSVGIcon />
              </CustomIconButton>
            </Card>
          </Box>
        </Box>
      );
    default:
      return <></>;
  }
}

export const MoveIn = (data: RequestDetail) => (
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
    </Box>
  );

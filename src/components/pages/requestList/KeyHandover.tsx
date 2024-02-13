// @mui
import { styled, Typography, Box, IconButton } from '@mui/material';

// icons
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';

// components
import { Card } from 'src/components/pages/requestList/MoveIn';
import {
  info,
  findValue,
  BoxStyle,
  OutlinedButton,
} from 'src/components/pages/requestList/NOC';
import { RequestDetail, textColor } from 'src/pages/RequestList';


const arr = ['Date', 'Contract', 'Property'];

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Scheduled':
      return (
        <Box sx={{ mt: { xs: 3.75, sm: 3 } }}>
          <Box sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
            <Typography variant="h6" color="grey.500" mb={0.75}>
              Your Key handover has been scheduled
            </Typography>
            <Typography variant="subtitle1" color="grey.400">
              {findValue(data, 'Info')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="grey.500">
              {' '}
              Instructions:{' '}
            </Typography>
            <Typography variant="subtitle1" color="grey.400">
              A lumio team member will contact you and meet you at your property for final inspection
              and handover at the time mentioned above.
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography sx={{ pl: { xs: 2, sm: 0 } }} variant="subtitle2" color="grey.500">
              Your Move Out NOC
            </Typography>
            <BoxStyle mt={1}>
              <Box>
                <Typography variant="subtitle1">{findValue(data, 'File')}</Typography>
                <Typography variant="body1" color="grey.400">
                  146KB
                </Typography>
              </Box>
              <IconButton sx={{ backgroundColor: { xs: 'grey.900', sm: 'grey.600' }, p: 1.25 }}>
                <DownloadSVGIcon />
              </IconButton>
            </BoxStyle>
          </Box>

          <OutlinedButton variant="outlined">Close</OutlinedButton>
        </Box>
      );
    case 'Completed':
      return (
        <Box sx={{ mt: 3.75 }}>
          {arr.map((item) => (
            <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
          ))}
          {info('Status', data.status, textColor(data.status))}

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="grey.500">
              Documents Attached:
            </Typography>
            <Card>
              <Box>
                <Typography variant="body1">177kb</Typography>
                <Typography variant="subtitle1" color="grey.400">
                  {findValue(data, 'File')}
                </Typography>
              </Box>
              <IconButton>
                <DownloadSVGIcon />
              </IconButton>
            </Card>
          </Box>
        </Box>
      );
    default:
      return <></>;
  }
}

export const KeyHandover = (data: RequestDetail) => (
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

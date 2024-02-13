// @mui
import { styled, Typography, Box, IconButton } from '@mui/material';

// icons
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import { Visibility } from '@mui/icons-material';

// components
import { RequestDetail, textColor } from 'src/pages/RequestList';
import {
  findValue,
  info,
  FilledButton,
  OutlinedButton,
} from 'src/components/pages/requestList/NOC';


const arr = ['Contract', 'For Property', 'Issue Type', 'Description'];
const completed = ['Contract', 'For Property', 'Issue Type', 'Description', 'Completed On'];

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[700],
  borderRadius: '8px',
  padding: theme.spacing(1.5, 1.875),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[600],
  padding: theme.spacing(1.25),
  marginLeft: theme.spacing(1),
}));

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Completed':
      return (
        <Box sx={{ mt: 1.5 }}>
          <FilledButton sx={{ mb: 1.5 }}>Download Job Report</FilledButton>

          <OutlinedButton variant="outlined">Close</OutlinedButton>
        </Box>
      );
    case 'Pending':
      return (
        <Box sx={{ mt: 1.5 }}>
          <FilledButton sx={{ mb: 1.5 }}>Cancel Request</FilledButton>

          <OutlinedButton variant="outlined">Close</OutlinedButton>
        </Box>
      );
    default:
      return <></>;
  }
}

export function Maintenance (data: RequestDetail) {
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

      {data.status === 'Completed'
        ? completed.map((item) => (
            <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
          ))
        : arr.map((item) => <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>)}
      {info('Status', data.status, textColor(data.status))}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="grey.500">
          Documents Attached:
        </Typography>
        <Card>
          <Box>
            <Typography variant="body1" color="grey.400">
              177kb
            </Typography>
            <Typography variant="subtitle1">{findValue(data, 'Document')}</Typography>
          </Box>
          <Box>
            <CustomIconButton>
              <Visibility sx={{ fontSize: '16px' }} />
            </CustomIconButton>
            <CustomIconButton>
              <DeleteSVGIcon />
            </CustomIconButton>
          </Box>
        </Card>
      </Box>

      {Details(data)}
    </Box>
  );
};

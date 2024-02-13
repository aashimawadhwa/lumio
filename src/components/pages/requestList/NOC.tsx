// @mui
import { styled, Typography, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// icons
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';

// components
import { RequestDetail, textColor } from 'src/pages/RequestList';

const InfoBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.75),
  display: 'flex',
  justifyContent: 'space-between',
}));

export const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2.5, 0),
  marginTop: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.grey[600]}`,
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 3),
    marginTop: theme.spacing(1.5),
  },
}));

export const FilledButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.25, 0),
}));

export const OutlinedButton = styled(FilledButton)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.grey[0],
  borderColor: theme.palette.grey[0],
  ':hover': {
    background: 'transparent',
    color: theme.palette.grey[0],
    borderColor: theme.palette.grey[0],
  },
}));

export const findValue = (data: RequestDetail, type: string) => data.data.find((item) => item.type === type && item)?.value;

export const info = (type: any, value: any, color: string) => (
  <InfoBox>
    <Typography variant="subtitle2" color="grey.500">
      {type}
    </Typography>
    <Typography variant="subtitle1" color={color} ml={0.5}>
      {value}
    </Typography>
  </InfoBox>
);

const DetailBox = (data: RequestDetail) => {
  switch (data.status) {
    case 'Approved':
      return (
        <Box mt={3}>
          <Typography sx={{ pl: { xs: 2, sm: 0 } }} variant="subtitle2" color="grey.500">
            Your Approved NOC:
          </Typography>
          <BoxStyle mt={1}>
            <Box>
              <Typography variant="subtitle1">
                {data.data.find((it) => it.type === 'File' && it)?.value}
              </Typography>
              <Typography variant="body1" color="grey.400">
                146KB
              </Typography>
            </Box>
            <IconButton sx={{ backgroundColor: { xs: 'grey.900', sm: 'grey.600' }, p: 1.5 }}>
              <DownloadSVGIcon />
            </IconButton>
          </BoxStyle>
        </Box>
      );
    case 'Processing':
      return (
        <Box sx={{ mt: { xs: 0, sm: 2 } }}>
            <Typography
            variant="subtitle2"
            color="grey.500"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Your NOC Request is under Process and is subject to approval
          </Typography>
         
          <OutlinedButton variant="outlined" sx={{ mt: 3 }}>
            <Typography variant="h5">Get Help</Typography>
          </OutlinedButton>
        </Box>
      );
    case 'Denied':
      return <></>;
  }
};

export const NOC = (data: RequestDetail) => {
  const arr = ['Contract', 'Property', 'Requested On'];
  return (
    <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
    
      <Typography sx={{ textAlign: { xs: 'left', sm: 'center' } }} variant="h3">
        {' '}
        {data.title}
      </Typography>
      <Box mt={3} mb={2}>
        {arr.map((item) => (
          <Box key={item}>
            {info(item, data.data.find((it) => it.type === item && item)?.value, 'grey.400')}
          </Box>
        ))}
      </Box>
      {info('Status', data.status, textColor(data.status))}
      {DetailBox(data)}
    </Box>
  );
};

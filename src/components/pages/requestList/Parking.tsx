// @mui
import { Typography, Box } from '@mui/material';

// components
import { RequestDetail } from 'src/pages/RequestList';


function Details(
  data: RequestDetail,
 
) {
  switch (data.status) {
    case 'Scheduled':
      return (
        <></>
      )
    case 'Completed':
      return <></>;
    default: 
        return <></>
  }
}

export const Parking = (data: RequestDetail) => {
  
  return (
    <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
      <Typography
        sx={{
          textAlign: { xs: 'left', sm: 'center' },
          mb: { xs: 2.25, sm: 3 },
        }}
        variant="h3"
      >
        {data.title}
      </Typography>
      {Details(data)}
    </Box>
  );
};

// @mui
import { Typography, Box } from '@mui/material';

// components
import { RequestDetail } from 'src/pages/RequestList';

function Details(data: RequestDetail) {
  switch (data.status) {
    case 'Completed':
      return <></>
    case 'Denied':
      return <></>
    default:
      return <></>;
  }
}

export const Visitor = (data: RequestDetail) => {
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

      {Details(data)}
    </Box>
  );
};

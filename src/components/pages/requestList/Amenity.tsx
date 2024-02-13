import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router';

// @mui
import { Typography, Box } from '@mui/material';

// components
import {
  findValue,
  info,
  FilledButton,
  OutlinedButton,
} from 'src/components/pages/requestList/NOC';
import { PATH_MAIN } from 'src/routes/paths';
import { RequestDetail, textColor } from 'src/pages/RequestList';

interface Props {
  data: RequestDetail;
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
  isDesktop: any;
  navigate: NavigateFunction;
}

const arr = ['Amenity', 'Guest', 'Duration', 'Date', 'Time'];

function Details({ data, cancel, setCancel, isDesktop, navigate }: Props) {
  switch (data.status) {
    case 'Scheduled':
      return (
        <Box mt={3}>
          <FilledButton
            sx={{ mb: 1.5 }}
            onClick={() => (cancel ? {} : navigate(PATH_MAIN.reschedule_amenities))}
          >
            {cancel ? (isDesktop ? 'Confirm Cancellation' : 'Confirm') : 'Reschedule'}
          </FilledButton>
          <OutlinedButton variant="outlined" onClick={() => setCancel(!cancel)}>
            {cancel ? (isDesktop ? 'No, Thanks' : 'Go Back') : 'Cancel Booking'}
          </OutlinedButton>
        </Box>
      );
    case 'Completed':
      return <></>;
    case 'Awaiting Payment':
      return (
        <Box mt={3}>
          <FilledButton sx={{ mb: 1.5 }}>Pay {findValue(data, 'amount')}</FilledButton>
          <OutlinedButton variant="outlined">Cancel Request</OutlinedButton>
        </Box>
      );
    case 'Cancelled':
      return <></>;
  }
}

export const Amenity = ({ data, cancel, setCancel, isDesktop, navigate }: Props) => (
  <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
    <Typography
      sx={{
        textAlign: { xs: 'left', sm: cancel ? 'left' : 'center' },
        mb: { xs: 2.25, sm: 3 },
      }}
      variant="h3"
    >
      {cancel ? 'Confirmation' : data.title}
    </Typography>
    {cancel && (
      <Typography variant="subtitle1" mb={3.5}>
        Are you sure you want to cancel the following amenity booking?
      </Typography>
    )}
    {arr.map((item) => (
      <Box key={item}>{info(item, findValue(data, item), 'grey.400')}</Box>
    ))}
    {info('Status', data.status, textColor(data.status))}

    {Details({ data, setCancel, cancel, isDesktop, navigate })}
  </Box>
);

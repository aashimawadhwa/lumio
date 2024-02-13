import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

// @mui
import { Box, Typography, styled, CircularProgress } from '@mui/material';

// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Yoga from 'src/assets/svg/Yoga';

// components
import { FormProvider } from 'src/components/hook-form';
import { SubmitButton , VerticalDivider } from 'src/components/pages/request/MoveIn';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';

type FormValueProps = {
  count: string;
  duration: string;
  date: string;
  time: string;
  message?: string;
  afterSubmit?: string;
};

interface Props {
  icon: React.ReactElement | undefined;
  title: string;
  reschedule: boolean;
}

const InfoBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[600],
  padding: theme.spacing(2.25, 2),
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
}));

const CustomBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[700],
  padding: theme.spacing(2, 2.375),
  borderRadius: '8px',
}));

export default function AmenitiesForm({ icon, title, reschedule }: Props) {
  const isDesktop = useResponsive('up', 'sm');
  const isMountedRef = useIsMountedRef();
  const [submitting, setSubmitting] = useState(false);
  const count = ['1', '2', '3', '4', '5'];
  const hours = ['1 Hour', '2 Hours', '3 Hours', '4 Hours', '5 Hours', '6 Hours'];
  const time = ['10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  const AmenitiesFormSchema = Yup.object().shape({
    count: Yup.string().required('Guest is required'),
    duration: Yup.string().required('Duration is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
  });

  const defaultValues = reschedule
    ? {
        count: '3',
        duration: '3 Hours',
        date: '12/22/2022',
        time: '10 AM',
        message: '',
      }
    : {
        count: '',
        duration: '',
        date: '',
        time: '',
        message: '',
      };
  const methods = useForm<FormValueProps>({
    resolver: yupResolver(AmenitiesFormSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValueProps) => {
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    } catch (error) {
      reset();
      console.log(error);
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <>
      {isDesktop && !reschedule && <VerticalDivider />}
      <Box sx={{ maxWidth: { xs: '100%', sm: '343px' } }}>
        {(reschedule || !isDesktop) && (
          <InfoBox mb={3}>
            <Typography variant="body2" color="grey.500">
              Amenity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: reschedule ? '' : 'grey.400' }}>
              {reschedule ? <Yoga /> : icon}
              <Typography variant="body2" ml={1.5} >
                {reschedule ? 'Dance / Yoga Studio' : title}
              </Typography>
            </Box>
          </InfoBox>
        )}
        {isDesktop ? (
          <>
            {!reschedule && (
              <Typography variant="h3" align="center" pb={3}>
                Choose Slot
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography variant="subtitle1" color='grey.500' pb={1.5}>
              Slot
            </Typography>
          </>
        )}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFSelectField placeholder="Guest" options={count} name="count" />
          <RHFSelectField placeholder="Duration" options={hours} name="duration" />
          <RHFDatePicker placeholder="Date" name="date" />
          <RHFSelectField
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    '.MuiList-root': {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                    },
                    '.MuiMenuItem-root': {
                      justifyContent: 'center',
                      margin: '0px 30px 0px 30px',
                      padding: '6px 5px',
                      borderRadius: '8px',
                      '&:focus-visible': {
                        background: 'transparent',
                      },
                    },
                    '.MuiMenuItem-root.Mui-selected': {
                      background: '#fff',
                      color: '#000',
                    },
                  },
                },
              },
            }}
            placeholder="Time"
            options={time}
            name="time"
          />
          {reschedule ? (
            <RHFMessageField name="message" placeholder="Reason for Rescheduling" minRows={7} />
          ) : (
            <CustomBox>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="grey.500">
                  Booking Fee:
                  {/* 14, 300 */}
                </Typography>
                {/* 14, 600 */}
                <Typography variant="subtitle1">149 AED</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <InfoOutlinedIcon
                  sx={{ color: 'grey.500', fontSize: '16px', mr: 0.75, mt: 0.1875 }}
                />
                <Typography color="grey.500">
                  You will be asked to pay the amount once the request is approved.
                </Typography>
              </Box>
            </CustomBox>
          )}

          <SubmitButton
            type="submit"
            sx={{ mt: 3, mb: { xs: 1, sm: 0 } }}
            loadingIndicator={
              <CircularProgress sx={{ color: '#000', height: '100%', width: '100%' }} size={16} />
            }
            loading={isSubmitting || submitting}
          >
            {reschedule ? 'Confirm' : 'Submit'}
          </SubmitButton>
        </FormProvider>
      </Box>
    </>
  );
}

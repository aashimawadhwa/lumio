import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

// @mui
import { Box, Typography, Grid, styled, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// images
import { ArrowBackIos } from '@mui/icons-material';
import InboxBG from 'src/assets/images/InboxBG.png';

// components
import { details } from 'src/utils/constant';
import { FormProvider } from 'src/components/hook-form';
import { PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import ContractCard from 'src/components/pages/visitor/ContractCard';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Page from 'src/components/Page';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';
import RHFTimePicker from 'src/components/hook-form/RHFTimePicker';

type FormValueProps = {
  date: string;
  time: string;
  details: string;
  afterSubmit?: string;
};

export const formatDate = (date: string) => {
  console.log(date);
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
export const formatTime = (time: string) =>
  new Date(time)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    .toLowerCase()
    .split(' ')
    .join('');

export const CustomWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  borderRadius: '16px',
  padding: theme.spacing(4.5),
  width: '807px',
  margin: theme.spacing(0, 2),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: 0,
    margin: 0,
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2.5, 2, 0.625, 2),
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.grey[500],
  margin: theme.spacing(0, 4.5),
  opacity: 0.2,
  [theme.breakpoints.down('lg')]: {
    margin: theme.spacing(0, 2.5),
  },
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 1.5),
  },
}));

export const MessageWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  borderRadius: '8px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.25),
  },
}));

export const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.25, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const MoveInText = () => (
  <Box sx={{ mb: { xs: 1.5, md: 2.5 } }}>
    <Typography variant="subtitle1" mb={0.875}>
      Set Your Date
    </Typography>
    <Typography variant="subtitle2" color="grey.500">
      Your documents process is completed. Select a date and to move in your furniture.
    </Typography>
  </Box>
);

export default function MoveIn(): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const [showMessage, setShowMessage] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const MoveInFormSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    details: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    date: '',
    time: '',
    details: '',
  };
  const methods = useForm<FormValueProps>({
    resolver: yupResolver(MoveInFormSchema),
    defaultValues,
  });
  const { reset, setError, handleSubmit } = methods;
  const onContinue = async (data: FormValueProps) => {
    try {
      setShowMessage(!showMessage);
      setDate(formatDate(data.date));
      setTime(formatTime(data.time));
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Move In">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper>
          {isDesktop ? (
            <Box textAlign="center" sx={{ mb: { sm: 2, md: 3, lg: 4 } }}>
              <Typography variant="h3">Move In Request</Typography>
            </Box>
          ) : (
            <MobileHeader
              leftNav={
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackIos sx={{ fontSize: 'medium' }} />
                </IconButton>
              }
              title="Move In Request"
            />
          )}
          <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
            {!isDesktop && !showMessage && <MoveInText />}
            <Grid container>
              <Grid item xs={12} sm={5.2}>
                <ContractCard />
              </Grid>
              {isDesktop && <VerticalDivider />}
              <Grid item sx={{ flex: 1 }}>
                {isDesktop && !showMessage && <MoveInText />}
                {!showMessage ? (
                  <FormProvider methods={methods} onSubmit={handleSubmit(onContinue)}>
                    <Grid container spacing={1} sx={{ mt: { xs: 1.5, sm: 0 } }}>
                      <Grid item xs={6}>
                        <RHFDatePicker placeholder="Date" name="date" />
                      </Grid>
                      <Grid item xs={6}>
                        <RHFTimePicker placeholder="Time" name="time" />
                      </Grid>
                    </Grid>
                    <RHFMessageField
                      name="details"
                      placeholder="Enter more details here"
                      minRows={7}
                      style={{ maxHeight: '147px' }}
                    />
                    <SubmitButton sx={{ mb: { xs: 1, sm: 0 } }} type="submit">
                      Continue
                    </SubmitButton>
                  </FormProvider>
                ) : (
                  <Box sx={{ mt: { xs: 3, sm: 0 } }}>
                    {isDesktop && (
                      <Typography variant="h3" sx={{ mb: { xs: 1.5, md: 3 } }} textAlign="center">
                        Move In Summary
                      </Typography>
                    )}
                    <MessageWrapper>
                      <Typography variant="body1" color="grey.400">
                        YOUR MOVE IN DAY
                      </Typography>
                      <Typography variant="subtitle1" mt={0.5}>
                        {date} at {time}
                      </Typography>
                      <Box mt={1.5}>
                        {details.map((item, i) => (
                          <Box
                            key={i}
                            sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}
                          >
                            {/* 14, 300 */}
                            <Typography variant="subtitle2" color="grey.500">
                              {item.type}
                            </Typography>
                            <Typography variant="body2">{item.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </MessageWrapper>
                    <SubmitButton
                      sx={{ mt: 3, mb: { xs: 1, sm: 0 } }}
                      onClick={() => navigate(PATH_MAIN.request)}
                    >
                      Continue
                    </SubmitButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </CustomWrapper>
      </Wrapper>
    </Page>
  );
}

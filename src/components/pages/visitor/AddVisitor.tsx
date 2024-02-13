import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, Typography, Grid, styled, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import * as Yup from 'yup';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import { ArrowBackIos } from '@mui/icons-material';
import InboxBG from 'src/assets/images/InboxBG.png';

// components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import ContractCard from 'src/components/pages/visitor/ContractCard';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Page from 'src/components/Page';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import VisitorDetails from 'src/components/pages/visitor/VisitorDetails';

//....................................................................................

type FormValueProps = {
  dateFrom: string;
  dateTo: string;
  afterSubmit?: string;
};

const CustomWrapper = styled(Box)(({ theme }) => ({
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

const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2.5, 2, 0.625, 2),
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
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

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.25, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

export default function AddVisitor(): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const [show, setShow] = useState(false);

  const VisitorFormSchema = Yup.object().shape({
    dateFrom: Yup.string().required('Date is required'),
    dateTo: Yup.string().required('Date is required'),
  });

  const defaultValues = {
    dateFrom: '',
    dateTo: '',
  };

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(VisitorFormSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onContinue = async (data: FormValueProps) => {
    try {
      setShow(!show);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <Page img={isDesktop ? InboxBG : ''} title="Add Visitors">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        {!show ? (
          <CustomWrapper>
            {isDesktop ? (
              <Box textAlign="center" sx={{ mb: { sm: 2, md: 3, lg: 4.5 } }}>
                <Typography variant="h3">Add a New Visitor</Typography>
              </Box>
            ) : (
              <MobileHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIos sx={{ fontSize: 'medium' }} />
                  </IconButton>
                }
                title="Add a New Visitor"
              />
            )}
            <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
              <Grid container>
                <Grid item xs={12} sm={5.2}>
                  <ContractCard />
                </Grid>
                {isDesktop && <VerticalDivider />}
                <Grid item sx={{ flex: 1, mt: { xs: 3, sm: 0 } }}>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onContinue)}>
                    <RHFDatePicker placeholder="Visiting From" name="dateFrom" />
                    <RHFDatePicker placeholder="Visiting Until" name="dateTo" />
                    <SubmitButton type="submit">Continue</SubmitButton>
                  </FormProvider>
                </Grid>
              </Grid>
            </Box>
          </CustomWrapper>
        ) : (
          <VisitorDetails open={show} handleClose={setShow} />
        )}
      </Wrapper>
    </Page>
  );
}

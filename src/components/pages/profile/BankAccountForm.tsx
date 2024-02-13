//React
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState } from 'react';

// @mui
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

//library
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// hooks
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

//images and icons
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CheckedIcon from 'src/assets/svg/checked_icon';
import ClearIcon from '@mui/icons-material/Clear';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import UncheckedIcon from 'src/assets/svg/unchecked_icon';

// components
import BankSuccessDialog from './dialog/BankSuccessDialog';
import Page from 'src/components/Page';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

//...........................................................................

const OuterWrapper = styled('div')(({ theme }) => ({
  maxWidth: '415px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    borderRadius: 0,
  },
}));

const InnerWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4.5, 4.5, 3, 4.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
  },
}));
const InnerWrapper2 = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 4.5, 4.5, 4.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const SaveButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.6, 0),
  '&:disabled': {
    background: theme.palette.grey[500],
  },
}));

type FormValuesProps = {
  account_holder_name: string;
  select_bank: string;
  account_number: string;
  iban_number: string;
  afterSubmit?: string;
};

export default function BankAccountForm() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showSuccessDialog, setSuccessDialog] = useState(false);
  const isMountedRef = useIsMountedRef();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const AccountFormSchema = Yup.object().shape({
    account_holder_name: Yup.string().required('Name is required'),
    select_bank: Yup.string().required('Select a Bank'),
    account_number: Yup.string().required('Account Number is required'),
    iban_number: Yup.string().required('IBAN number is required'),
  });

  const defaultValues = {
    account_holder_name: '',
    select_bank: '',
    account_number: '',
    iban_number: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(AccountFormSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitting(false);
        console.log('Submitted');
        setSuccessDialog(true);
        // navigate(PATH_AUTH.login);
      }, 2000);
    } catch (error) {
      console.log('error');
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <Page title="Bank Account Form" img={isDesktop ? ProfileBG : ''}>
      {!showSuccessDialog && (
        <Wrapper sx={{ marginBottom: 5 }}>
          <OuterWrapper>
            <InnerWrapper>
              {isDesktop && (
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }}
                >
                  <ClearIcon sx={{ color: 'grey.400' }} />
                </IconButton>
              )}
              {!isDesktop && (
                <MobileHeader
                  leftNav={
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIos
                        sx={{
                          color: 'grey.400',
                          fontSize: 20,
                        }}
                      />
                    </IconButton>
                  }
                  title="Bank Account Details"
                />
              )}

              {isDesktop && (
                <>
                  <Typography variant="h4" color="grey.400" textAlign="center" marginBottom={1.5}>
                    Bank Account Details
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="grey.500"
                    sx={{ textAlign: { xs: 'left', sm: 'center' } }}
                  >
                    Add a Bank Account detail for any refunds or reversal of payments to your
                    account.
                  </Typography>
                </>
              )}
            </InnerWrapper>
            {isDesktop && (
              <Divider
                sx={{
                  bgcolor: '#97979733',
                }}
              />
            )}
            <InnerWrapper2>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField name="account_holder_name" placeholder="Account Holder’s Name" />
                <RHFTextField name="select_bank" placeholder="Select Bank*" />
                <RHFTextField type="number" name="account_number" placeholder="Account Number" />
                <RHFTextField name="iban_number" placeholder="IBAN Number" />
                <Box display="flex" alignItems="start" marginBottom={2.2}>
                  <Checkbox
                    icon={<UncheckedIcon />}
                    checkedIcon={<CheckedIcon />}
                    onChange={handleChange}
                  />
                  <Typography pl={0.5} pt={1} variant="body2" color="grey.500">
                    I hereby authorize lumio (Company name) to charge my account in accordance with
                    the terms in my contract lease agreement
                  </Typography>
                </Box>
                <SaveButton
                  loadingIndicator={
                    <CircularProgress
                      sx={{ color: 'grey.900', height: '100%', width: '100%' }}
                      size={16}
                    />
                  }
                  loading={isSubmitting || submitting}
                  disabled={!checked}
                  type="submit"
                >
                  <Typography variant="h5" color="grey.900">
                    Save Account Details
                  </Typography>
                </SaveButton>
              </FormProvider>
            </InnerWrapper2>
          </OuterWrapper>
        </Wrapper>
      )}
      <BankSuccessDialog open={showSuccessDialog} onClose={() => setSuccessDialog(false)} />
    </Page>
  );
}

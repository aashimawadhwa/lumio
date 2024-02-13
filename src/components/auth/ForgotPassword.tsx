import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

// @mui
import { CircularProgress, IconButton, styled, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useResponsive from 'src/hooks/useResponsive';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// image
import ForgotPasswordBG from 'src/assets/images/ForgotPasswordBG.png';

// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { Wrapper, FormWrapper, Text } from 'src/components/auth/styledComponents/styles';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Nav from 'src/components/auth/styledComponents/Nav';
import Page from 'src/components/Page';
import SuccessDialog from 'src/assets/elements/SuccessDialog';

import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

type FormValuesProps = {
  email: string;
  afterSubmit?: string;
};

const ResetButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(2.4, 0),
  width: '100%',
}));

export default function ForgotPassword() {
  const isDesktop = useResponsive('up', 'sm');
  const [submitting, setSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
      .trim(),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),

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
        setShowDialog(true);
      }, 2000);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };
  return (
    <>
      <Page img={isDesktop ? ForgotPasswordBG : ''} title="Forgot Password">
        {isDesktop && <Nav />}
        {showDialog ? (
          <SuccessDialog
            title="E-mail Sent Successfully"
            open={showDialog}
            details={
              <Text>
                Check your email <span>zaydrafiq@email.com</span> for a link to reset the password.
              </Text>
            }
          />
        ) : (
          <>
            <div>
              {!isDesktop && (
                <MobileHeader
                  leftNav={
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIos sx={{ fontSize: 20 }} />
                    </IconButton>
                  }
                  title="Forgot Password"
                />
              )}
              <Wrapper>
                <FormWrapper>
                  {isDesktop ? (
                    <Typography variant="h3" color="grey.400" pb={1} sx={{ textAlign: 'center' }}>
                      Forgot Password
                    </Typography>
                  ) : null}
                  <Typography variant="subtitle2" color="grey.500" mb={1.5}>
                    Forgot your Password ? No problem, Enter the Email address associated with your
                    account and we'll send a recovery mail.
                  </Typography>

                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <RHFTextField name="email" placeholder="Email Address" />
                    <ResetButton
                      loadingIndicator={
                        <CircularProgress
                          sx={{ color: '#000', height: '100%', width: '100%' }}
                          size={16}
                        />
                      }
                      loading={isSubmitting || submitting}
                      type="submit"
                    >
                      <Typography variant="h5">Get Reset Link</Typography>
                    </ResetButton>
                  </FormProvider>
                </FormWrapper>
              </Wrapper>
            </div>
          </>
        )}
      </Page>
    </>
  );
}

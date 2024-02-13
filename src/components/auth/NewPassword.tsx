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

// images and icons
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import EyeClose from 'src/assets/svg/Eye';
import ForgotPasswordBG from 'src/assets/images/ForgotPasswordBG.png';
import Visibility from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { Wrapper, FormWrapper, Text } from 'src/components/auth/styledComponents/styles';
import MobiledHeader from 'src/layouts/dashboard/mobilenav';
import Nav from 'src/components/auth/styledComponents/Nav';
import Page from 'src/components/Page';
import SuccessDialog from 'src/assets/elements/SuccessDialog';
import { useNavigate } from 'react-router-dom';

type FormValuesProps = {
  new_password: string;
  confirm_password: string;
  afterSubmit?: string;
};

const NewPasswordButton = styled(LoadingButton)(({ theme }) => ({
  padding: theme.spacing(2.2),
  width: '100%',
}));

export default function NewPassword() {
  const isDesktop = useResponsive('up', 'sm');
  const [submitting, setSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [activeConfirm, setActiveConfirm] = useState(false);
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();

  const NewPasswordSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, 'Password must be at 8 char long')
      .required('New Password Field is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password')], 'Passwords does not match')
      .required('Confirm Password Field is required'),
  });

  const defaultValues = {
    new_password: '',
    confirm_password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewPasswordSchema),
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Page img={isDesktop ? ForgotPasswordBG : ''} title="Forgot Password">
      {isDesktop && <Nav />}
      {showDialog ? (
        <SuccessDialog
          open={showDialog}
          title="New Password Created Succesfully"
          details={<Text variant="subtitle2">You can now login with your new credentials</Text>}
        />
      ) : (
        <>
          <div>
            {!isDesktop && (
              <MobiledHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIos sx={{ fontSize: 20 }} />
                  </IconButton>
                }
                title="Create New Password"
              />
            )}
            <Wrapper>
              <FormWrapper>
                {isDesktop ? (
                  <Typography variant="h4" color="grey.400" sx={{ textAlign: 'center' }}>
                    Create New Password
                  </Typography>
                ) : null}
                <Typography variant="subtitle2" color="grey.500" mb={{ xs: 3, sm: 4 }}>
                  Create new password for your account so you can login and access all the features.
                </Typography>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <RHFTextField
                    setActive={setActivePassword}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    name="new_password"
                    visibility={
                      <>
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? (
                            <EyeClose />
                          ) : (
                            <Visibility sx={{ color: activePassword ? '#fff' : '#CAC9C0' }} />
                          )}
                        </IconButton>
                      </>
                    }
                  />
                  <RHFTextField
                    setActive={setActiveConfirm}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    name="confirm_password"
                    visibility={
                      <>
                        <IconButton onClick={handleShowConfirmPassword} edge="end">
                          {showConfirmPassword ? (
                            <EyeClose />
                          ) : (
                            <Visibility sx={{ color: activeConfirm ? '#fff' : '#CAC9C0' }} />
                          )}
                        </IconButton>
                      </>
                    }
                  />
                  <Typography variant="body2" color="grey.500" mb={{ xs: 3, sm: 4.5 }} mt={0.5}>
                    Your password must be 8 characters long, include a lower case letter, a number
                    and a special character.
                  </Typography>

                  <NewPasswordButton
                    loadingIndicator={
                      <CircularProgress
                        sx={{ color: '#000', height: '100%', width: '100%' }}
                        size={16}
                      />
                    }
                    loading={isSubmitting || submitting}
                    type="submit"
                  >
                    <Typography variant="h5">Create New Password</Typography>
                  </NewPasswordButton>
                </FormProvider>
              </FormWrapper>
            </Wrapper>
          </div>
        </>
      )}
    </Page>
  );
}

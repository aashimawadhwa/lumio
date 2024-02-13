import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

// @mui
import { styled, Typography, IconButton, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import EyeClose from 'src/assets/svg/Eye';
import LoginBG from 'src/assets/images/LoginBG.png';
import LoginMobileBG from 'src/assets/images/MenuMobileBG.png';
import Visibility from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { PATH_AUTH, PATH_MAIN } from 'src/routes/paths';
import Nav from 'src/components/auth/styledComponents/Nav';
import Page from 'src/components/Page';
import Welcome from 'src/pages/Welcome';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '4%',
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
  },
}));

const LoginFormWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4.5),
  textAlign: 'center',
  maxWidth: '415px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'transparent',
    width: '100%',
    padding: theme.spacing(4.5, 2),
  },
}));

const LoginForm = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 0, 1, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.6, 0, 1, 0),
  },
}));

const LoginButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
}));

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function Menu() {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useResponsive('down', 'sm');
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(false);

  const [loading, setLoading] = useState(true);
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
      .trim(),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
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
        navigate(PATH_MAIN.dashboard);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <Welcome />
      ) : (
        <Page title="Login" img={isMobile ? LoginMobileBG : LoginBG}>
          <Nav />
          <Wrapper>
            <LoginFormWrapper>
              <Typography color="grey.400" variant="h1">
                Log In
              </Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoginForm>
                  <RHFTextField placeholder="Email Address" name="email" />
                  <RHFTextField
                    setActive={setActive}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    visibility={
                      <>
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? (
                            <EyeClose />
                          ) : (
                            <Visibility sx={{ color: active ? '#fff' : '#CAC9C0' }} />
                          )}
                        </IconButton>
                      </>
                    }
                  />
                </LoginForm>
                <LoginButton
                  loadingIndicator={
                    <CircularProgress
                      sx={{ color: '#000', height: '100%', width: '100%' }}
                      size={16}
                    />
                  }
                  loading={isSubmitting || submitting}
                  type="submit"
                >
                  <Typography variant="h5">Log In</Typography>
                </LoginButton>
              </FormProvider>
              <Typography
                onClick={() => navigate(PATH_AUTH.forgot)}
                variant="subtitle1"
                sx={{ textDecoration: 'underline', cursor: 'pointer', pt: 1.5 }}
              >
                Forgot Password
              </Typography>
            </LoginFormWrapper>
          </Wrapper>
        </Page>
      )}
    </>
  );
}

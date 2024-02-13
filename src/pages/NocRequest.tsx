import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, Button, CircularProgress, Grid, styled, Typography, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// libraries
import { useDropzone } from 'react-dropzone';

// hooks
import * as Yup from 'yup';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import InboxBG from 'src/assets/images/InboxBG.png';

// components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';

// ----------------------------------------------------------------------

const CustomWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  textAlign: 'center',
  padding: theme.spacing(4),
  maxWidth: '415px',
  borderRadius: '16px',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: 0,
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 7,
  left: 16,
}));

const UploadButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.75, 2),
  width: '100%',
  ':hover': {
    background: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.25, 0),
}));

type FormValuesProps = {
  type: string;
  details: string;
  afterSubmit?: string;
};

export default function NocRequest() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isMountedRef = useIsMountedRef();

  const NocFormSchema = Yup.object().shape({
    type: Yup.string().required('NOC type is required'),
    details: Yup.string().required('Message is required'),
  });
  const defaultValues = {
    type: '',
    details: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NocFormSchema),
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
      }, 2000);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { open, fileRejections } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });
  const rejectedFiles = fileRejections.map(({ file, errors }) => (
    <div key={file.name}>
      {errors.map((e) => (
        <div key={e.code}>
          <Typography mt={3} align="center" color="error" variant="h6">
            Invalid File Type !!
          </Typography>
          <Typography mt={1} align="center" color="error" variant="h6">
            {e.message}
          </Typography>
        </div>
      ))}
    </div>
  ));

  return (
    <Page img={isDesktop ? InboxBG : ''} title="NOC Request">
      <Wrapper sx={{ mb: 5, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper>
          <Box
            sx={{ mb: { xs: 2.5, sm: 3 }, pt: { xs: 1.25, sm: 0 }, pb: { xs: 1.25, sm: 0 } }}
            textAlign="center"
          >
            {!isDesktop && (
              <CustomIconButton onClick={() => navigate(-1)}>
                <ArrowBackIos sx={{ fontSize: 'medium' }} />
              </CustomIconButton>
            )}
            <Typography variant={'h3'} color={isDesktop ? '' : 'grey.400'}>
              NOC Request
            </Typography>
          </Box>
          <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
            <Typography mb={2} variant="subtitle2" color="grey.500" textAlign="left">
              After approving your contract, we will send you documents by courier for signing and
              return. Please enter or confirm your details below:
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFSelectField
                name="type"
                placeholder="Select Type of NOC"
                options={['Retail', 'WholeSale', 'Corporate']}
              />
              <RHFMessageField
                style={{ maxHeight: '147px' }}
                name="details"
                placeholder="Enter more details here"
                minRows={7}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }} mb={3}>
                <Box sx={{ flex: '1 0 30%', minWidth: '133px' }} mb={{ xs: 1, sm: 0 }}>
                  <UploadButton onClick={open}>Upload a file</UploadButton>
                </Box>
                <Box sx={{ flex: '1 0 50%', ml: 1 }}>
                  <Typography sx={{ textAlign: 'left' }} variant="body1" color="grey.500">
                    Optional (PDF, PNG, JPG, max size 1MB)
                  </Typography>
                </Box>
              </Box>

              <SubmitButton
                loadingIndicator={
                  <CircularProgress
                    sx={{ color: '#000', height: '100%', width: '100%' }}
                    size={16}
                  />
                }
                loading={isSubmitting || submitting}
                type="submit"
              >
                Submit Request
              </SubmitButton>
              {fileRejections.length > 0 && rejectedFiles}
            </FormProvider>
          </Box>
        </CustomWrapper>
      </Wrapper>
    </Page>
  );
}

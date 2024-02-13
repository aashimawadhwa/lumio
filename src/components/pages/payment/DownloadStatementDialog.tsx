import React from 'react';

// @mui
import { Box, DialogProps, Grid, Typography, styled, IconButton } from '@mui/material';

//library
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'src/components/hook-form';
import * as Yup from 'yup';

// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// styles
import { ContainedButton } from 'src/components/pages/payment/styledComponents/styles';

// components
import DialogWrapper from 'src/components/pages/profile/dialog/DialogWrapper';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';

// icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from 'src/assets/svg/close_icon';

//.....................................................................

interface StatementFormProp {
  contract: string;
  range: string;
  afterSubmit?: string;
}

const InnerWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '415px',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    borderRadius: 0,
  },
}));

export default function DownloadStatementDialog({
  onClose,
  ...others
}: { onClose: () => void } & DialogProps) {
  const isDesktop = useResponsive('up', 'sm');
  const isMountedRef = useIsMountedRef();
  const StatementFormSchema = Yup.object().shape({
    contract: Yup.string().required('Select a contract'),
    range: Yup.string().required('Select a range'),
  });

  const defaultValues = {
    contract: '',
    range: '',
  };

  const methods = useForm<StatementFormProp>({
    resolver: yupResolver(StatementFormSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setError } = methods;

  const onSubmit = async (data: StatementFormProp) => {
    try {
      console.log('Downloaded');
    } catch (error) {
      console.log('error');
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <DialogWrapper {...others}>
      <InnerWrapper>
        <Grid mb={3} display="flex" alignItems="center" container>
          <Grid item xs={2}>
            {!isDesktop && (
              <IconButton onClick={onClose}>
                <ArrowBackIosIcon sx={{ fontSize: 'small' }} />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography textAlign="center" variant="h3">
              Statement of Account
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {isDesktop && (
              <IconButton sx={{ p: 0 }} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Typography mb={1.5} color="grey.500" variant="subtitle2">
          Use this form to download an statement of account for your property’s contract.
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFSelectField
            name="contract"
            placeholder="Select contract"
            options={[
              'A10ZBB2 (Al Safa Villa #303)',
              'A10ZBB2 (Al Safa Villa #303)',
              'A10ZBB2 (Al Safa Villa #303)',
            ]}
          />
          <RHFSelectField
            name="range"
            placeholder="Range"
            options={['The last 3 months', 'The last 3 months', 'The last 3 months']}
          />
          <ContainedButton type="submit">Download</ContainedButton>
        </FormProvider>
      </InnerWrapper>
    </DialogWrapper>
  );
}

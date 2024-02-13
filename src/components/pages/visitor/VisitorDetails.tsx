import { Dispatch, SetStateAction, useState } from 'react';

// @mui
import { styled, Typography, Dialog, Box, CircularProgress, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';
import * as Yup from 'yup';


// icons
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';


//.......................................................................

interface Props {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}
type FormValueProps = {
  firstName: string;
  lastName: string;
  mobile: string;
  afterSubmit?: string;
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      marginTop: 0,
    },
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(4.5),
    maxWidth: '415px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      margin: 0,
      maxWidth: '100%',
      width: '100%',
      minHeight: '100vh',
    },
  },
}));

const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2.5, 2, 0.625, 2),
}));

const SubmitBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: theme.spacing(0, 2, 1, 2),
    width: '100%',
  },
}));
const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.25, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

export default function VisitorDetails({ open, handleClose }: Props): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  const isMountedRef = useIsMountedRef();
  const [submitting, setSubmitting] = useState(false);

  const VisitorFormSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    mobile: Yup.string().required('Mobile Number is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    mobile: '',
  };

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(VisitorFormSchema),
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
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };
  return (
    <CustomDialog hideBackdrop={open} open={open} onClose={handleClose}>
      {isDesktop ? (
        <Box textAlign="center" sx={{ mb: { sm: 2, md: 3, lg: 4.5 } }}>
          <Typography variant="h3">Add a New Visitor</Typography>
          <IconButton
            onClick={() => handleClose(false)}
            sx={{ position: 'absolute', right: 5, top: 5 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Header mb={2.5}>
          <IconButton
            sx={{ position: 'absolute', top: 20, left: 16, p: 0 }}
            onClick={() => handleClose(false)}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography align="center" variant="subtitle1" color="grey.400">
            Add a New Visitor
          </Typography>{' '}
        </Header>
      )}
      <Box sx={{ pl: { xs: 2, sm: 0 }, pr: { xs: 2, sm: 0 } }}>
        <Typography variant="subtitle1" mb={1.5}>
          Personal Details
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="firstName" placeholder="First Name" />
          <RHFTextField name="lastName" placeholder="Last Name" />
          <RHFTextField name="mobile" placeholder="Mobile Number" />
          <SubmitBox>
            <SubmitButton
              loadingIndicator={
                <CircularProgress sx={{ color: '#000', height: '100%', width: '100%' }} size={16} />
              }
              loading={isSubmitting || submitting}
              type="submit"
            >
              Submit Visitor Request
            </SubmitButton>
          </SubmitBox>
        </FormProvider>
      </Box>
    </CustomDialog>
  );
}

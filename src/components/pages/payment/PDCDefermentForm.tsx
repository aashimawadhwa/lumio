import { useState } from 'react';

// @mui
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  styled,
  Typography,
} from '@mui/material';

//library
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

// icons
import AppleCircleIcon from 'src/assets/svg/apple_circle_icon';
import BankCircleIcon from 'src/assets/svg/bank_circle_icon';
import CardCircleIcon from 'src/assets/svg/card_circle_icon';
import CheckCircleIcon from 'src/assets/svg/check_circle_icon';
import CloseIcon from 'src/assets/svg/close_icon';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconDownArrow from 'src/assets/svg/icon_down_arrow';
import IconUpload from 'src/assets/svg/icon_upload';

// components
import ByCheckForm from 'src/components/pages/payment/ByCheckForm';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';

// styles
import { ContainedButton, DarkBox } from 'src/components/pages/payment/styledComponents/styles';

//...........................................................................

const DetailBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const AccordionWrapper = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  '& .Mui-disabled': {
    color: theme.palette.grey[400],
  },
  '&:before': {
    display: 'none',
  },
  '&.MuiPaper-root': {
    '&.MuiAccordion-root': {
      '&.Mui-expanded': {
        boxShadow: 'none',
      },
    },
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
  },
}));

interface PDCDefermentFormProp {
  contract: string;
  chequeNumber: number;
  amount: number;
  chequeDate: string;
  onClose: () => void;
  onCancel: () => void;
}

interface FormValueProps {
  deferment_date: string;
  reason_for_deferment: string;
  afterSubmit?: string;
}

export default function PDCDefermentForm({
  chequeNumber,
  chequeDate,
  amount,
  onClose,
  onCancel,
}: PDCDefermentFormProp) {
  const isMobile = useResponsive('down', 'sm');
  const [formTitle, setFormTitle] = useState('PDC Deferment');
  const isMountedRef = useIsMountedRef();
  const [showPayFee, setShowPayFee] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [defermentDate, setDefermentDate] = useState<Date>();

  const DefermentFormSchema = Yup.object().shape({
    deferment_date: Yup.date().required('Date is required'),
    reason_for_deferment: Yup.string().required('Reason For Deferment is missing'),
  });

  const defaultValues = {
    deferment_date: 'Select a date',
    reason_for_deferment: '',
  };

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(DefermentFormSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = async (data: FormValueProps) => {
    try {
      setShowPayFee(true);
      console.log(data);
      setDefermentDate(new Date(data.deferment_date));
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const onPayFee = () => {
    setFormTitle('Select Payment Method');
    setShowPayFee(false);
    setShowPaymentMethods(true);
  };

  return (
    <Box position="relative" sx={{ p: { xs: 2, md: 0 } }}>
      {!isMobile ? (
        <>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: -6, right: -3, p: 0 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" mb={3}>
            {formTitle}
          </Typography>
        </>
      ) : (
        <Box display="flex" p="6px 0" mb={2.5} alignItems="center" justifyContent="space-between">
          <NavigateBeforeIcon sx={{ color: 'grey.400' }} onClick={onClose} />
          <Typography variant="h3" color="grey.400">
            {formTitle}
          </Typography>
          <Button
            onClick={onCancel}
            sx={{
              backgroundColor: 'grey.600',
              borderRadius: '8px !important',
              color: 'grey.0',
              fontWeight: 400,
              p: '8px 10px',
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
      {!showPayFee && !showPaymentMethods && (
        <>
          <Typography textAlign="left" color="grey.500" variant="subtitle2" mb={3}>
            Request a delay in processing your upcoming Post-Dated Cheque (PDC) by submitting this
            form.
          </Typography>
          <DarkBox>
            <Typography variant="body2">Please note</Typography>
            <Typography color="grey.500" variant="body2">
              PDC Deferment requests will incur processing fees of AED500.
            </Typography>
          </DarkBox>
          <DarkBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Contract
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                A10ZBB2 (Al Safa Villa #303)
              </Typography>
            </DetailBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Cheque to defer
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                {chequeNumber}({amount} AED)
              </Typography>
            </DetailBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Cheque Date
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                {chequeDate}
              </Typography>
            </DetailBox>
          </DarkBox>
          <Typography textAlign="left" color="grey.500" variant="body2" mb={3}>
            This cheque can be changed until 23 February 2022. Requests/changes are subjected to
            added fees*
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFDatePicker name="deferment_date" placeholder="Deferment date" />
            <RHFMessageField
              name="reason_for_deferment"
              placeholder="Reason for deferment"
              minRows={3}
            />
            <Box display="flex" mb={3}>
              <Button variant="contained" sx={{ fontWeight: 400 }} component="label">
                Upload a file
                <input hidden accept="image/*" multiple type="file" />
              </Button>
              <Typography flex={1} textAlign="left" ml={2} color="grey.500" variant="body1">
                Optional (PDF, PNG, JPG, max size 1MB)
              </Typography>
            </Box>
            <ContainedButton type="submit">Continue</ContainedButton>
          </FormProvider>
        </>
      )}
      {showPayFee && (
        <>
          <DarkBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Contract
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                A10ZBB2 (Al Safa Villa #303)
              </Typography>
            </DetailBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Cheque to defer
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                {chequeNumber}({amount} AED)
              </Typography>
            </DetailBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                Cheque Date
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                {chequeDate}
              </Typography>
            </DetailBox>
            <DetailBox>
              <Typography color="grey.500" variant="subtitle2">
                New Cheque Date
              </Typography>
              <Typography color="grey.400" variant="subtitle1">
                {defermentDate?.toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
            </DetailBox>
          </DarkBox>
          <DetailBox>
            <Typography color="grey.400" variant="subtitle1">
              Request Fee
            </Typography>
            <Typography color="success.main" variant="subtitle1">
              500 AED
            </Typography>
          </DetailBox>
          <ContainedButton onClick={onPayFee} sx={{ mt: 2 }} type="submit">
            Pay Fee
          </ContainedButton>
        </>
      )}
      {showPaymentMethods && (
        <div>
          <AccordionWrapper>
            <AccordionSummary disabled expandIcon={<IconDownArrow />}>
              <Box display="flex" alignItems="center">
                <CardCircleIcon />
                <Typography ml={1.5} color="grey.400" variant="subtitle1">
                  Debit / credit card
                </Typography>
              </Box>
            </AccordionSummary>
          </AccordionWrapper>
          <AccordionWrapper>
            <AccordionSummary expandIcon={<IconDownArrow />}>
              <Box display="flex" alignItems="center">
                <BankCircleIcon />
                <Typography ml={1.5} color="grey.400" variant="subtitle1">
                  By account transfer
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Typography textAlign="left" mb={1.5} color="grey.500" variant="subtitle2">
                To complete your request, please upload the payment receipt of the amount below:
              </Typography>
              <DarkBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    Contract
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    A10ZBB2 (Al Safa Villa #303)
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    Cheque to defer
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    {chequeNumber}({amount} AED)
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    Cheque Date
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    {chequeDate}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    Cheque Date
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    {chequeDate}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    New Cheque Date
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    {defermentDate?.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    A/C Holder’s Name
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    lumio pvt. ltd.
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Typography color="grey.500" variant="subtitle2">
                    A/C Number
                  </Typography>
                  <Typography color="grey.400" variant="subtitle1">
                    1234567890123456
                  </Typography>
                </DetailBox>
              </DarkBox>
              <Box
                mb={3}
                sx={{ backgroundColor: 'grey.600', padding: '20px 15px', borderRadius: '8px' }}
              >
                <Typography textAlign="center" variant="subtitle1" mb={1.5}>
                  Add your receipt
                </Typography>
                <Box
                  sx={{
                    p: { sm: 3 },
                    border: { sm: '1px dashed #CAC9C0' },
                    borderRadius: { sm: '9px' },
                  }}
                >
                  {!isMobile && (
                    <>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <IconUpload />
                        <Typography ml={1} variant="body2" color="grey.500">
                          Drag & Drop Here
                        </Typography>
                      </Box>
                      <Typography mb={1.5} variant="body2" color="grey.500">
                        OR
                      </Typography>
                    </>
                  )}
                  <Box display="flex" justifyContent="center">
                    <Button sx={{ p: '6px 20px', fontWeight: 400, mr: 1 }}>Browse files</Button>
                    <Button sx={{ p: '6px 20px', fontWeight: 400 }}>Capture</Button>
                  </Box>
                </Box>
                <Typography mt={1.5} color="grey.500" variant="body2">
                  The accepted format is .png, .jpg and maximum size limit for the pdf to be
                  uploaded is 10MB.
                </Typography>
              </Box>
              <ContainedButton disabled>Submit Reciept</ContainedButton>
              <Button
                sx={{
                  background: 'transparent',
                  color: '#f5f5f5',
                  border: '1px solid #f5f5f5',
                  width: '100%',
                  p: 2,
                  mt: 1.5,
                }}
              >
                I’ll Submit the reciept later
              </Button>
            </AccordionDetails>
          </AccordionWrapper>
          <AccordionWrapper>
            <AccordionSummary expandIcon={<IconDownArrow />}>
              <Box display="flex" alignItems="center">
                <CheckCircleIcon />
                <Typography ml={1.5} color="grey.400" variant="subtitle1">
                  By cheque
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ByCheckForm />
            </AccordionDetails>
          </AccordionWrapper>
          <AccordionWrapper>
            <AccordionSummary disabled expandIcon={<IconDownArrow />}>
              <Box display="flex" alignItems="center">
                <AppleCircleIcon />
                <Typography ml={1.5} color="grey.400" variant="subtitle1">
                  By Apple Pay
                </Typography>
              </Box>
            </AccordionSummary>
          </AccordionWrapper>
        </div>
      )}
    </Box>
  );
}

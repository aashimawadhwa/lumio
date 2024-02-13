// @mui
import { Box, Button, styled, Typography } from '@mui/material';

// styles
import { ContainedButton } from 'src/components/pages/payment/styledComponents/styles';

const DetailBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

interface PaymentDetailProp {
  contract: string;
  amount: number;
  chequeDate: string;
  chequeNumber: number;
  status: string;
  togglePDCForm: () => void;
}

export default function PaymentDetail({
  contract,
  amount,
  chequeDate,
  chequeNumber,
  status,
  togglePDCForm,
}: PaymentDetailProp) {
  return (
    <>
      <Typography variant="h3" sx={{ mb: { xs: 2.5, sm: 5 } }}>
        Rent Payment
      </Typography>
      <DetailBox>
        <Typography color="grey.500" variant="subtitle2">
          Contract
        </Typography>
        <Typography color="grey.400" variant="subtitle1">
          {contract}
        </Typography>
      </DetailBox>
      <DetailBox>
        <Typography color="grey.500" variant="subtitle2">
          Amount
        </Typography>
        <Typography color="grey.400" variant="subtitle1">
          {amount} AED
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
          Cheque #
        </Typography>
        <Typography color="grey.400" variant="subtitle1">
          {chequeNumber}
        </Typography>
      </DetailBox>
      <DetailBox>
        <Typography color="grey.500" variant="subtitle2">
          Status
        </Typography>
        <Typography color="success.main" variant="h5">
          {status}
        </Typography>
      </DetailBox>

      {status !== 'success' && (
        <>
          <Typography mb={0.5} mt={2} textAlign="left" color="grey.500" variant="subtitle2">
            Note:
          </Typography>
          <Typography mb={3} textAlign="left" color="grey.400" variant="body2">
            PDC Deferment requests are not available within 5 days of payment occurance. Contact us
            for help.
          </Typography>
          <Typography textAlign="left" color="grey.400" variant="body2">
            Requests/changes are subjected to added fees*
          </Typography>
          <ContainedButton sx={{ mb: 1.5, mt: 3 }}>Change Payment Method</ContainedButton>
          <Button
            sx={{
              background: 'transparent',
              color: '#f5f5f5',
              border: '1px solid #f5f5f5',
              width: '100%',
              p: 2,
            }}
            onClick={togglePDCForm}
          >
            Request PDC Deferment
          </Button>
        </>
      )}
      {status === 'success' && (
        <>
          <ContainedButton sx={{ mb: 1.5, mt: 3 }}>Download Invoice</ContainedButton>
          <Button
            sx={{
              background: 'transparent',
              color: '#f5f5f5',
              border: '1px solid #f5f5f5',
              width: '100%',
              p: 2,
            }}
          >
            Download Receipt
          </Button>
        </>
      )}
    </>
  );
}

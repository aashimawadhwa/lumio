// @mui
import { Button, styled, Typography } from '@mui/material';

// hooks
import { useNavigate } from 'react-router';
import useResponsive from 'src/hooks/useResponsive';

// images
import IconSuccess from 'src/assets/svg/IconSuccess';

// components
import DialogWrapper from './DialogWrapper';

//................................................................

interface BankSuccessDialogProp {
  open: boolean;
  onClose: () => void;
}

const Wrapper = styled('div')(({ theme }) => ({
  maxWidth: '450px',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(0, 2),
  },
}));

export default function BankSuccessDialog({ open, onClose }: BankSuccessDialogProp) {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  return (
    <DialogWrapper fullScreen={!isDesktop} open={open}>
      <Wrapper>
        <IconSuccess />
        <Typography
          variant="h1"
          color="grey.400"
          sx={{
            lineHeight: '40px',
            mb: 1.5,
            mt: 3,
          }}
        >
          Bank Account Added Succesfully
        </Typography>
        <>
          <Typography variant="subtitle2" mb={3} color="grey.500">
            You can now make payments with your newly added bank account.
          </Typography>
          <Button
            sx={{
              background: '#1D1D1D',
              color: '#f5f5f5',
              border: '1px solid #f5f5f5',
              width: '100%',
              p: 2.4,
            }}
            onClick={() => navigate(-1)}
          >
            Return to Payment Details
          </Button>
        </>
      </Wrapper>
    </DialogWrapper>
  );
}

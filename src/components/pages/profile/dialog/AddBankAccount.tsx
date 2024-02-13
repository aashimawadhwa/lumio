// @mui
import { Box, Button, IconButton, styled, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useNavigate } from 'react-router';

// images
import { PATH_MAIN } from 'src/routes/paths';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ClearIcon from '@mui/icons-material/Clear';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

// components
import DialogWrapper from './DialogWrapper';

//.................................................................

const OuterWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  maxWidth: '420px',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    maxWidth: '100%',
  },
}));

interface BankDetailDialogProp {
  open: boolean;
  onClose?: () => void;
}

export default function AddBankAccount({ open, onClose }: BankDetailDialogProp) {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  return (
    <DialogWrapper fullScreen={!isDesktop} open={open}>
      <OuterWrapper>
        {!isDesktop && (
          <MobileHeader
            leftNav={
              <IconButton onClick={onClose}>
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
            <IconButton
              onClick={onClose}
              sx={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }}
            >
              <ClearIcon sx={{ color: 'grey.0' }} />
            </IconButton>
            <Typography variant="h4" color="grey.400" align="center" sx={{ mb: 1.5 }}>
              Bank Account Details
            </Typography>
          </>
        )}
        <Box px={2}>
          <Typography
            variant="subtitle2"
            color="grey.500"
            marginBottom={3}
            sx={{ textAlign: { xs: 'left', sm: 'center' } }}
          >
            Add a Bank Account detail for any refunds or reversal of payments to your account.
          </Typography>
          <Button
            sx={{
              backgroundColor: 'grey.900',
              border: '1px solid #f5f5f5',
              width: '100%',
              p: 2.4,
            }}
            onClick={() => navigate(PATH_MAIN.bank_account_form)}
          >
            <Typography variant="h5" color="grey.0">
              Add Bank Account Details
            </Typography>
          </Button>
        </Box>
      </OuterWrapper>
    </DialogWrapper>
  );
}

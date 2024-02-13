// @mui
import { IconButton, styled, Typography } from '@mui/material';

// components
import DialogWrapper from './DialogWrapper';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// images
import ClearIcon from '@mui/icons-material/Clear';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteSVG';
import EditSVGIcon from 'src/assets/svg/icon_editSVG';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Wrapper = styled('div')(({ theme }) => ({
  maxWidth: '450px',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '100%',
  },
}));

const AccountDetailBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[600],
  borderRadius: '0.75rem',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 0,
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1.25),
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
  },
}));

interface BankDetailDialogProp {
  open: boolean;
  onClose?: () => void;
}

export default function BankDetailDilog({ open, onClose }: BankDetailDialogProp) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <DialogWrapper fullScreen={!isDesktop} open={open}>
      <Wrapper>
        {!isDesktop && (
          <NavigateBeforeIcon
            sx={{ color: 'grey.400', position: 'absolute', top: 17, left: 16 }}
            onClick={onClose}
          />
        )}
        {isDesktop && (
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 16, right: 16, cursor: 'pointer' }}
          >
            <ClearIcon sx={{ color: 'grey.0' }} />
          </IconButton>
        )}
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 3.5, sm: 1.5 },
            color: { xs: 'grey.400', sm: 'grey.0' },
          }}
        >
          Bank Account Details
        </Typography>
        {isDesktop && (
          <Typography variant="subtitle2" mb={3} color="grey.500">
            Find and manage your saved bank account details in case for any refunds or reversal of
            payment to your account.
          </Typography>
        )}
        <AccountDetailBox>
          <div style={{ textAlign: 'left' }}>
            <Typography variant="body1" color="grey.400">
              IBAN Number
            </Typography>
            <Typography variant="subtitle1" color="grey.0">
              AE60 0353 2338 2789 7447
            </Typography>
          </div>
          <div>
            <CustomIconButton>
              <EditSVGIcon />
            </CustomIconButton>
            <CustomIconButton>
              <DeleteSVGIcon />
            </CustomIconButton>
          </div>
        </AccountDetailBox>
      </Wrapper>
    </DialogWrapper>
  );
}

// @mui
import { styled, Switch, Typography, SwitchProps, IconButton } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ClearIcon from '@mui/icons-material/Clear';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

// components
import DialogWrapper from './DialogWrapper';

//...................................................

const InnerWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '420px',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(0),
    margin: 0,
    borderRadius: 0,
  },
}));

const FlexRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const GreenSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.main : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#595959',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
interface NotificationProp {
  open: boolean;
  onClose?: () => void;
}

export default function NotificationPreference({ open, onClose }: NotificationProp) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <DialogWrapper fullScreen={!isDesktop} open={open}>
      <InnerWrapper>
        {isDesktop && (
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }}
          >
            <ClearIcon sx={{ color: 'grey.400' }} />
          </IconButton>
        )}
        {!isDesktop && (
          <MobileHeader
            title="Notification Preferences"
            leftNav={
              <IconButton onClick={onClose}>
                <ArrowBackIos sx={{ fontSize: 'medium' }} />
              </IconButton>
            }
          />
        )}
        {isDesktop && (
          <Typography variant="h4" color="grey.400" textAlign="center" mb={4.5}>
            Notification Preferences
          </Typography>
        )}
        <FlexRow>
          <Typography variant="subtitle2" color="grey.400">
            Important Communications
          </Typography>
          <GreenSwitch />
        </FlexRow>
        <FlexRow>
          <Typography my={3} variant="subtitle2" color="grey.400">
            Recommended Properties
          </Typography>
          <GreenSwitch />
        </FlexRow>
        <FlexRow>
          <Typography variant="subtitle2" color="grey.400">
            Marketing Communications
          </Typography>
          <GreenSwitch />
        </FlexRow>
      </InnerWrapper>
    </DialogWrapper>
  );
}

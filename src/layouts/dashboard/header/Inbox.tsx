import { useNavigate } from 'react-router';

// @mui
import { Badge } from '@mui/material';

// components
import { IconButtonAnimate } from 'src/components/animate';

//icon
import MessageIcon from 'src/assets/svg/icon_message';

//paths
import { PATH_MAIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const navigate = useNavigate();
  return (
    <>
      <IconButtonAnimate
        sx={{
          width: { xs: 35, sm: 40, lg: 48 },
          height: { xs: 35, sm: 40, lg: 48 },
          background: { xs: 'transparent', sm: '#383838' },
        }}
        onClick={() => navigate(PATH_MAIN.inbox)}
      >
        <Badge
          badgeContent={4}
          sx={{
            ' .MuiBadge-badge': {
              width: 15,
              height: 20,
              background: '#CAC9C0',
              color: '#000',
            },
          }}
        >
          <MessageIcon />
        </Badge>
      </IconButtonAnimate>
    </>
  );
}

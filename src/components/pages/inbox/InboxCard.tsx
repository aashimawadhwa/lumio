// @mui
import { Grid, Box, Button, styled, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import CircleIcon from '@mui/icons-material/Circle';
import ParkingSVGIcon from 'src/assets/svg/icon_parkingSVG';
import PaymentSVGIcon from 'src/assets/svg/icon_paymentSVG';
import PromotionSVGIcon from 'src/assets/svg/icon_promotionSVG';

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[800],
  padding: theme.spacing(2.75, 2),
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    background: theme.palette.grey[700],
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StartButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: '100px',
  ':hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

type InboxData = {
  title: string;
  date: string;
  isRead: boolean;
  sender: string;
  message: string;
  url: boolean;
};

interface Props {
  data: InboxData;
  iconType: string;
}

const icons = (type: string) => {
  switch (type) {
    case 'Payment':
      return <PaymentSVGIcon />;
    case 'Parking':
      return <ParkingSVGIcon />;
    case 'Promotions':
      return <PromotionSVGIcon />;
  }
};

export default function InboxCard({ data, iconType }: Props): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Grid item xs={12}>
      <Card sx={{ opacity: data.isRead ? 0.5 : 1 }}>
        <CardHeader mb={0.625}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icons(iconType)}
            <Typography ml={0.75} variant="body1" color="grey.400">
              {data.sender}
            </Typography>
          </Box>
          <Typography variant="body1" color="grey.500">
            {data.date}
          </Typography>
        </CardHeader>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!data.isRead && (
              <CircleIcon sx={{ color: 'success.main', fontSize: '8px', mr: 0.75 }} />
            )}
            <Typography variant={isDesktop ? 'h5' : 'subtitle1'}> {data.title}</Typography>
          </Box>
          <Typography variant="body2" color="grey.500">
            {data.message}
          </Typography>
        </Box>
        {data.url && (
          <StartButton sx={{ mt: 1.5 }} onClick={() => {}}>
            Start
          </StartButton>
        )}
      </Card>
    </Grid>
  );
}

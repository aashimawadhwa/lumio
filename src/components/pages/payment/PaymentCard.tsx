// @mui
import { Box, styled, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import AlertIcon from 'src/assets/svg/alert_icon';
import PaymentIcon from 'src/assets/svg/payment_icon';

const PaymentCardWrapper = styled('div')(({ theme }) => ({
  borderRadius: '0.5rem',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: {
    marginBottom: 0,
    borderRadius: 0,
  },
}));

const OverdueWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  borderTopLeftRadius: '0.5rem',
  borderTopRightRadius: '0.5rem',
  [theme.breakpoints.down('md')]: {
    borderRadius: 0,
    flexDirection: 'column',
    paddingBottom: 0,
    alignItems: 'start',
  },
}));

const OverdueTag = styled('div')(({ theme }) => ({
  fontSize: '0.9rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.7rem',
    borderRadius: '0.5rem',
    padding: theme.spacing(1, 1.2),
    backgroundColor: '#D87762',
    marginBottom: theme.spacing(1),
  },
}));

const CardInnerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
}));

const RoundIcon = styled('div')(({ theme }) => ({
  width: 48,
  height: 47,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface PaymentCardProp {
  overdueDate: string;
  dueDate: string;
  subtitle: string;
  title: string;
  paymentAmount: number;
  status: 'pending' | 'success' | 'due' | 'overdue';
  onClick?: () => void;
  selected?: boolean;
}

export default function PaymentCard({
  overdueDate,
  dueDate,
  subtitle,
  title,
  paymentAmount,
  status,
  selected,
  onClick,
}: PaymentCardProp) {
  const isDesktop = useResponsive('up', 'md');

  const COLORS = {
    overdue: {
      background: isDesktop ? '#272727' : '#CC5F47',
      subHeadColor: isDesktop ? '#979797' : '#F5F5F5',
      mainHeadColor: '#F5F5F5',
      amountColor: isDesktop ? '#CC5F47' : '#F5F5F5',
      icon: {
        color: isDesktop ? '#F5F5F5' : '#ED6355',
        background: isDesktop ? '#CC5F47' : '#F5F5F5',
      },
      active: {
        background: '#F5F5F5',
        subHeadColor: '#393939',
        mainHeadColor: '#1D1D1D',
        amountColor: '#CC5F47',
      },
    },
    due: {
      background: isDesktop ? '#272727' : 'transparent',
      subHeadColor: '#979797',
      mainHeadColor: isDesktop ? '#F5F5F5' : '#CC5F47',
      amountColor: '#CC5F47',
      icon: {
        color: '#F5F5F5',
        background: '#CC5F47',
      },
      active: {
        background: '#F5F5F5',
        subHeadColor: '#393939',
        mainHeadColor: '#1D1D1D',
        amountColor: '#CC5F47',
      },
    },
    pending: {
      background: isDesktop ? '#272727' : 'transparent',
      subHeadColor: '#979797',
      mainHeadColor: '#F5F5F5',
      amountColor: '#CAC9C0',
      icon: {
        color: '#F5F5F5',
        background: isDesktop ? '#1D1D1D' : '#393939',
      },
      active: {
        background: '#F5F5F5',
        subHeadColor: '#393939',
        mainHeadColor: '#1D1D1D',
        amountColor: '#1D1D1D',
      },
    },
    success: {
      background: isDesktop ? '#272727' : 'transparent',
      subHeadColor: '#979797',
      mainHeadColor: '#F5F5F5',
      amountColor: '#369975',
      icon: {
        color: '#F5F5F5',
        background: isDesktop ? '#1D1D1D' : '#393939',
      },
      active: {
        background: '#F5F5F5',
        subHeadColor: '#393939',
        mainHeadColor: '#1D1D1D',
        amountColor: '#369975',
      },
    },
  };

  return (
    <PaymentCardWrapper
      className="active"
      onClick={onClick}
      sx={{
        backgroundColor:
          isDesktop && selected ? COLORS[status].active.background : COLORS[status].background,
      }}
    >
      {status === 'overdue' && (
        <OverdueWrapper>
          <OverdueTag>Payment Overdue</OverdueTag>
          <Typography variant="body2">Please Complete payment by {overdueDate}.</Typography>
        </OverdueWrapper>
      )}
      <CardInnerWrapper>
        <Box display="flex">
          <RoundIcon
            sx={{
              backgroundColor: COLORS[status].icon.background,
            }}
          >
            {status === 'due' || status === 'overdue' ? (
              <AlertIcon color={COLORS[status].icon.color} />
            ) : (
              <PaymentIcon />
            )}
          </RoundIcon>
          <Box textAlign="left" ml={1.5}>
            <Typography
              variant="body2"
              color={
                isDesktop && selected
                  ? COLORS[status].active.subHeadColor
                  : COLORS[status].subHeadColor
              }
            >
              {subtitle}
            </Typography>
            <Typography
              variant="subtitle1"
              color={
                isDesktop && selected
                  ? COLORS[status].active.mainHeadColor
                  : COLORS[status].mainHeadColor
              }
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="right">
          <Typography
            variant="body2"
            color={
              isDesktop && selected
                ? COLORS[status].active.subHeadColor
                : COLORS[status].subHeadColor
            }
          >
            {dueDate}
          </Typography>
          <Typography
            variant="subtitle1"
            color={
              isDesktop && selected ? COLORS[status].active.amountColor : COLORS[status].amountColor
            }
          >
            {paymentAmount} AED
          </Typography>
        </Box>
      </CardInnerWrapper>
    </PaymentCardWrapper>
  );
}

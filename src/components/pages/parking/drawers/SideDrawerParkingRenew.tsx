// @mui
import { styled, Typography, Box, Button } from '@mui/material';

//data
import { ContractData, LeaseContractData } from 'src/utils/constant';

const HelpButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1.5),
  width: '100%',
  marginTop: theme.spacing(1.5),
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));
const ItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));

interface SideDrawerProps {
  title: string;
}
const BoxStyle = styled(Box)(({ theme }) => ({
  minWidth: '350px',
  [theme.breakpoints.down('md')]: {
    minWidth: '280px',
  },
  [theme.breakpoints.down(700)]: {
    minWidth: '245px',
  },
}));

const RenewButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    width: '100%',
    borderColor: theme.palette.grey[0],
    '&:hover': {
      borderColor: theme.palette.grey[0],
      color: theme.palette.grey[900],
      backgroundColor: theme.palette.grey[0],
    },
  }));
  

export function SideDrawerRenew({ title }: SideDrawerProps): React.ReactElement {
  return (
    <>
      <BoxStyle>
        <Typography variant="h3" pb={4}>
          {title} 
        </Typography>
        {ContractData.map((item: any, i: any) => (
          <ItemWrapper key={i}>
            <Typography variant="subtitle2" color="grey.500">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="grey.400">
              {item.idNo}
            </Typography>
          </ItemWrapper>
        ))}
        <Typography variant="subtitle2" align="left" my={1}>
          {' '}
          For Lease Contract:
        </Typography>
        {LeaseContractData.map((item: any, i: any) => (
          <ItemWrapper key={i}>
            <Typography variant="subtitle2" color="grey.500">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="grey.400">
              {item.idNo}
            </Typography>
          </ItemWrapper>
        ))}
        <ItemWrapper>
          <Typography variant="subtitle2" color="grey.500">
            Status:
          </Typography>
          <Typography variant="subtitle1" color="error.main">
          Expiring in 30 days
          </Typography>
        </ItemWrapper>
        <RenewButton variant="outlined" sx={{ mt: 2 }}>
          {' '}
          Renew Parking Permit
        </RenewButton>
        <HelpButton variant="outlined">Get Help</HelpButton>
      </BoxStyle>
    </>
  );
}

//react
import { useNavigate } from 'react-router-dom';
import { PATH_MAIN } from 'src/routes/paths';

//mui
import { Button, styled, Typography, Alert, AlertTitle } from '@mui/material';


const ContractData = [
  {
    name: 'Contract Number',
    idNo: 'A9488HD39001',
  },
  {
    name: 'Contact Amount',
    idNo: 'AED 340,000',
  },
  {
    name: 'Lease Term',
    idNo: '12 Months',
  },
  {
    name: 'Start Date',
    idNo: '24 January 2021',
  },
  {
    name: 'End Date',
    idNo: '24 January 2022',
  },
  {
    name: 'Contract Status',
    idNo: 'Active',
  },
];

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

const CancelRenewButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1.5),
  width: '100%',
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

export default function ContractDetails() {
  const navigate = useNavigate();
  return (
    <>
      <Alert
        variant="outlined"
        severity="error"
        sx={{ color: 'white', textAlign: 'left', backgroundColor: 'grey.800', mt: 2, mb: 2.5 }}
      >
        <AlertTitle>Note</AlertTitle>
        Contract expiring in 90 days. Click below to Renew or Extend your contract to continue your
        hassle free stay.
      </Alert>
      {ContractData.map((item: any, i: any) => (
        <ItemWrapper key={item}>
          <Typography variant="subtitle2" color="grey.500">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="grey.400">
            {item.idNo}
          </Typography>
        </ItemWrapper>
      ))}

      <RenewButton
        variant="outlined"
        sx={{ mb: 1.5, mt: 2 }}
        onClick={() => navigate(PATH_MAIN.contract_renew)}
      >
        {' '}
        Renew Contract
      </RenewButton>
      <CancelRenewButton variant="outlined">I will not renew Contract</CancelRenewButton>
    </>
  );
}

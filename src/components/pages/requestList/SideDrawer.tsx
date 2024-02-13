import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { styled, Box } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import { Amenity } from 'src/components/pages/requestList/Amenity';
import { ChangePayment } from 'src/components/pages/requestList/ChangePayment';
import { ContractRenewal } from 'src/components/pages/requestList/ContractRenewal';
import { Courier } from 'src/components/pages/requestList/Courier';
import { KeyHandover } from 'src/components/pages/requestList/KeyHandover';
import { Maintenance } from 'src/components/pages/requestList/Maintenance';
import { MoveIn } from 'src/components/pages/requestList/MoveIn';
import { MoveOut } from 'src/components/pages/requestList/MoveOut';
import { NOC } from 'src/components/pages/requestList/NOC';
import { PDCDeferment } from 'src/components/pages/requestList/PDCDeferment';
import { RequestDetail } from 'src/pages/RequestList';

export const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.grey[500],
  margin: theme.spacing(0, 4.5),
  opacity: 0.2,
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2),
  },
}));

export function DisplayRequest ( data: RequestDetail) {
  const [cancel, setCancel] = useState(false);
  const navigate = useNavigate()
  const isDesktop = useResponsive('up', 'sm')
  switch (data.type) {
   
    case 'Amenity':
      return Amenity({ data, cancel, setCancel, isDesktop, navigate });
    case 'Change Payment':
      return ChangePayment(data);
    case 'Contract Renewal':
      return ContractRenewal(data, isDesktop);
    case 'Courier': 
      return Courier(data)
    case 'Key Handover': 
      return KeyHandover(data)
    case 'Maintenance':
      return Maintenance(data);
    case 'Move In': 
      return MoveIn(data)
    case 'Move Out': 
      return MoveOut(data)
    case 'NOC':
      return NOC(data);
    case 'PDC Deferment':
      return PDCDeferment(data);
    default:
      return <></>;
  }
};

export default function SideDrawer({ data }: { data: RequestDetail }): React.ReactElement {
  return (
    <>
      <VerticalDivider />
      <Box sx={{ width: { sm: '200px', md: '265px', lg: '343px' } }}>
        {DisplayRequest(data)}
      </Box>
    </>
  );
}

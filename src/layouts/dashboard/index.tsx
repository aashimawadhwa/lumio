import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//
import DashboardHeader from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const isDesktop = useResponsive('up', 'sm');

  const { pathname } = useLocation();

  const menu = pathname.includes('/menu');
  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      {isDesktop || menu ? <DashboardHeader /> : null}
      <div>
        <Outlet />
      </div>
    </Box>
  );
}

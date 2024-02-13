// react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Typography, Box, styled, IconButton, Pagination } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import { ArrowBackIos, Add, Close } from '@mui/icons-material';
import InboxBg from 'src/assets/images/InboxBG.png';

// components
import { PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterBox from 'src/components/pages/requestList/FilterBox';
import MobileDrawer from 'src/components/pages/requestList/MobileDrawer';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Page from 'src/components/Page';
import RequestCard from 'src/components/pages/requestList/RequestCard';
import SideDrawer from 'src/components/pages/requestList/SideDrawer';

//data
import { residenceData } from 'src/utils/constant';

const CustomWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  margin: theme.spacing(0, 2),
  borderRadius: '16px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    margin: 0,
    height: '100vh',
    width: '100%',
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[600],
  padding: theme.spacing(1.25),
  [theme.breakpoints.down('sm')]: {
    background: 'none',
    padding: 0,
  },
}));

const AlertBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  padding: theme.spacing(2, 1.25),
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    borderRadius: '16px',
    padding: theme.spacing(2, 2.25),
  },
}));

const PageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    position: 'absolute',
    bottom: 0,
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.grey[600],
    borderRadius: '4px',
  },
}));

type Data = {
  type: string;
  value: string;
};
export type RequestDetail = {
  id: string;
  title: string;
  status: string;
  date: string;
  type: string;
  data: Data[];
};

export const textColor = (status: string) => {
  switch (status) {
    case 'Awaiting Payment' :
      return 'warning.main'
    case 'Processing':
      return 'warning.main';
    case 'Pickup Scheduled': 
      return 'warning.main'
    case 'Pending': 
      return 'warning.main'
    case 'Scheduled':
      return 'warning.main';
    case 'Approved':
      return 'success.main'
    case 'Submitted': 
      return 'success.main';
    case 'Completed': 
      return 'success.main'
    case 'Denied':
      return 'error.main';
    case 'Failed': 
      return 'error.main';
    case 'Cancelled':
      return 'error.main';
  }
  return '';
};

export default function RequestList({ propertyTitle }: { propertyTitle: string }) {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();

  const pageSize = 4;
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState<RequestDetail[]>(residenceData.array.slice(0, pageSize));
  const [isWrapperOpen, setWrapperOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RequestDetail>(request[0]);
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    if (isWrapperOpen) setWrapperOpen(false);
    if (open) setOpen(false);
  }, [isDesktop]);

  const handleAlert = () => {
    setAlert(!alert);
  };

  const handlePage = (e: any, value: any) => {
    setPage(value);
    setRequest(residenceData.array.slice(pageSize * (value - 1), pageSize * value));
  };

  return (
    <Page img={isDesktop ? InboxBg : ''} title="Request">
      <Wrapper sx={{ mb: { xs: 0, sm: 5 }, pt: { xs: 0, sm: 5 } }}>
        <CustomWrapper sx={{ p: { xs: 0, sm: 2, md: 3, lg: 4.5 } }}>
                    <Box sx={{ width: { xs: '100%', sm: '303px', md: '483px', lg: '583px' } }}>
                {isDesktop ? (
                  <Box mb={2.5} position="relative" textAlign="center">
                    <Box>
                      <Typography variant="h3">Requests</Typography>
                      <Typography variant="body2" color="grey.500">
                        {propertyTitle}
                      </Typography>
                    </Box>
                    <CustomIconButton
                      onClick={() => navigate(PATH_MAIN.new_request)}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <Add />
                    </CustomIconButton>
                  </Box>
                ) : (
                  <MobileHeader
                    leftNav={
                      <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIos sx={{ fontSize: 'medium' }} />
                      </IconButton>
                    }
                    title="Requests"
                    subtitle={propertyTitle}
                    rightNav={
                      <IconButton onClick={() => navigate(PATH_MAIN.new_request)}>
                        <Add />
                      </IconButton>
                    }
                  />
                )}

                <FilterBox />

                {alert && (
                  <AlertBox sx={{ ml: { xs: 2, sm: 0 }, mr: { xs: 2, sm: 0 }, mt: 2 }}>
                    <CheckCircleIcon sx={{ fontSize: { sm: '34px' } }} />
                    <Box ml={isDesktop ? 1.5 : 1.25}>
                      {isDesktop ? (
                        <>
                          <Typography variant="h5">Request Submitted</Typography>
                          {/* 12, 300 */}
                          <Typography variant="body1">
                            You will be notified once the request is processed
                          </Typography>
                        </>
                      ) : (
                        <>
                          {/* 16, 600 */}
                          <Typography variant="h5">Your request was submitted</Typography>
                        </>
                      )}
                    </Box>
                    <IconButton
                      onClick={handleAlert}
                      sx={{
                        position: 'absolute',
                        p: 0,
                        top: 16,
                        right: { xs: 18, sm: 10 },
                        color: 'grey.0',
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </AlertBox>
                )}
                <RequestCard
                  isWrapperOpen={isWrapperOpen}
                  request={request}
                  setData={setData}
                  setWrapperOpen={setWrapperOpen}
                  setOpen={setOpen}
                />
                <PageBox>
                  <Pagination
                    count={Math.ceil(residenceData.array.length / pageSize)}
                    page={page}
                    onChange={handlePage}
                    shape="rounded"
                  />
                </PageBox>
              </Box>
              {isWrapperOpen && isDesktop ? (
                <SideDrawer data={data} />
              ) : (
                <MobileDrawer data={data} openDrawer={open} close={setOpen} />
              )}
        </CustomWrapper>
      </Wrapper>
    </Page>
  );
}

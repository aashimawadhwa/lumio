import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import {
  styled,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  Drawer,
  IconButton,
  Grid,
  Button,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import AllTransactions from 'src/components/pages/payment/AllTransactions';
import DialogWrapper from 'src/components/pages/profile/dialog/DialogWrapper';
import DownloadStatementDialog from 'src/components/pages/payment/DownloadStatementDialog';
import Page from 'src/components/Page';
import PaymentDetail from 'src/components/pages/payment/PaymentDetail';
import PDCDefermentForm from 'src/components/pages/payment/PDCDefermentForm';
import UpcomingPayment from 'src/components/pages/payment/UpcomingPayment';

// images and icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from 'src/assets/svg/close_icon';
import DownloadStatementIcon from 'src/assets/svg/download_statement_icon';
import PaymentBG from 'src/assets/images/PaymentBG.png';

// data
import { AllTransactionsData, UpcomingPaymentsData } from 'src/utils/constant';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';

//...................................................................

const InnerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  textAlign: 'center',
  padding: theme.spacing(4.5),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(3.5, 2.5),
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    width: '100%',
  },
}));

const LeftWrapper = styled(Box)(({ theme }) => ({
  width: '595px',
  [theme.breakpoints.down('lg')]: {
    width: '480px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const PaymentTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.grey[0],
    height: 5,
    borderRadius: 20,
  },
}));

export default function PaymentPage({ propertyTitle }: { propertyTitle: string }) {
  const isMobile = useResponsive('down', 'sm');
  const isDesktop = useResponsive('up', 'md');
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<'upcoming' | 'all'>('upcoming');
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [showPaymentDeatil, setShowPaymentDeatil] = useState(false);
  const [showPDCForm, setShowPDCForm] = useState(false);
  const [showDownloadStatement, setShowDownloadStatement] = useState(false);

  const togglePaymentDetail = (id: number) => {
    if (id === selectedTransactionId) {
      if (showPaymentDeatil) {
        setSelectedTransactionId(null);
      } else {
        setSelectedTransactionId(id);
      }
      setShowPaymentDeatil(!showPaymentDeatil);
    } else {
      setSelectedTransactionId(id);
      setShowPDCForm(false);
      setShowPaymentDeatil(true);
    }
  };

  const togglePDCForm = () => {
    setShowPDCForm(!showPDCForm);
  };

  const onPDCCancel = () => {
    setShowPDCForm(false);
    setShowPaymentDeatil(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: 'upcoming' | 'all') => {
    setSelectedTransactionId(null);
    setTransactionType(newValue);
  };

  return (
    <Page title="Payment Page" img={isDesktop || showDownloadStatement ? PaymentBG : ''}>
      {!showDownloadStatement && (
        <Wrapper>
          <InnerWrapper>
            <LeftWrapper>
              <Grid
                sx={{ display: 'flex', alignItems: 'center', p: { xs: 2, md: '0 0 10px 0' } }}
                container
              >
                <Grid sx={{ textAlign: 'start' }} item xs={2} sm={4} lg={3.5}>
                  {isMobile && (
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={8} sm={4} lg={5}>
                  <Typography variant="h3">Payments</Typography>
                  <Typography variant="subtitle2" color="grey.500">
                    {propertyTitle}
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: 'end' }} item xs={2} sm={4} lg={3.5}>
                  {transactionType === 'all' && isMobile && (
                    <IconButton onClick={() => setShowDownloadStatement(true)}>
                      <DownloadStatementIcon large />
                    </IconButton>
                  )}
                  {transactionType === 'all' && !isMobile && (
                    <Button
                      sx={{
                        backgroundColor: 'grey.600',
                        color: 'grey.0',
                        p: 1.6,

                        fontSize: 12,
                        fontWeight: 400,
                      }}
                      endIcon={<DownloadStatementIcon />}
                      onClick={() => setShowDownloadStatement(true)}
                    >
                      Download Statement
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Box>
                <TabContext value={transactionType}>
                  <Box mb={3}>
                    <PaymentTabs
                      value={transactionType}
                      onChange={handleChange}
                      variant="fullWidth"
                    >
                      <Tab value="upcoming" label="Upcoming Payments" />
                      <Tab value="all" label="All Transactions" />
                    </PaymentTabs>
                  </Box>
                  <TabPanel value="upcoming">
                    <UpcomingPayment
                      selectedTransactionId={selectedTransactionId}
                      togglePaymentDetail={togglePaymentDetail}
                    />
                  </TabPanel>
                  <TabPanel value="all">
                    <AllTransactions
                      togglePaymentDetail={togglePaymentDetail}
                      selectedTransactionId={selectedTransactionId}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </LeftWrapper>
            {selectedTransactionId && isDesktop && (
              <>
                <Divider
                  sx={{ margin: { xs: '0px 20px', lg: '0px 36px' } }}
                  orientation="vertical"
                  flexItem
                />
                <Box sx={{ width: '350px' }}>
                  {showPaymentDeatil && !showPDCForm && (
                    <PaymentDetail
                      togglePDCForm={togglePDCForm}
                      contract={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].contractName
                          : AllTransactionsData[selectedTransactionId - 1].contractName
                      }
                      amount={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].paymentAmount
                          : AllTransactionsData[selectedTransactionId - 1].paymentAmount
                      }
                      chequeDate={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].dueDate
                          : AllTransactionsData[selectedTransactionId - 1].dueDate
                      }
                      chequeNumber={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].chequeNumber
                          : AllTransactionsData[selectedTransactionId - 1].chequeNumber
                      }
                      status={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].status
                          : AllTransactionsData[selectedTransactionId - 1].status
                      }
                    />
                  )}
                  {showPDCForm && (
                    <PDCDefermentForm
                      onClose={() => setShowPDCForm(!showPDCForm)}
                      onCancel={onPDCCancel}
                      contract={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].contractName
                          : AllTransactionsData[selectedTransactionId - 1].contractName
                      }
                      amount={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].paymentAmount
                          : AllTransactionsData[selectedTransactionId - 1].paymentAmount
                      }
                      chequeDate={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].dueDate
                          : AllTransactionsData[selectedTransactionId - 1].dueDate
                      }
                      chequeNumber={
                        transactionType === 'upcoming'
                          ? UpcomingPaymentsData[selectedTransactionId - 1].chequeNumber
                          : AllTransactionsData[selectedTransactionId - 1].chequeNumber
                      }
                    />
                  )}
                </Box>
              </>
            )}
            <Drawer
              hideBackdrop={true}
              anchor="bottom"
              open={!isDesktop && !!selectedTransactionId && showPaymentDeatil && !showPDCForm}
            >
              <Box p="36px 16px">
                <IconButton
                  onClick={() => {
                    setSelectedTransactionId(null);
                    setShowPaymentDeatil(false);
                  }}
                  sx={{ position: 'absolute', top: 16, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                {!!selectedTransactionId && (
                  <PaymentDetail
                    togglePDCForm={togglePDCForm}
                    contract={
                      transactionType === 'upcoming'
                        ? UpcomingPaymentsData[selectedTransactionId - 1].contractName
                        : AllTransactionsData[selectedTransactionId - 1].contractName
                    }
                    amount={
                      transactionType === 'upcoming'
                        ? UpcomingPaymentsData[selectedTransactionId - 1].paymentAmount
                        : AllTransactionsData[selectedTransactionId - 1].paymentAmount
                    }
                    chequeDate={
                      transactionType === 'upcoming'
                        ? UpcomingPaymentsData[selectedTransactionId - 1].dueDate
                        : AllTransactionsData[selectedTransactionId - 1].dueDate
                    }
                    chequeNumber={
                      transactionType === 'upcoming'
                        ? UpcomingPaymentsData[selectedTransactionId - 1].chequeNumber
                        : AllTransactionsData[selectedTransactionId - 1].chequeNumber
                    }
                    status={
                      transactionType === 'upcoming'
                        ? UpcomingPaymentsData[selectedTransactionId - 1].status
                        : AllTransactionsData[selectedTransactionId - 1].status
                    }
                  />
                )}
              </Box>
            </Drawer>
            {!!selectedTransactionId && (
              <DialogWrapper fullScreen={!isDesktop} open={!isDesktop && showPDCForm}>
                <PDCDefermentForm
                  onClose={() => setShowPDCForm(!showPDCForm)}
                  onCancel={onPDCCancel}
                  contract={
                    transactionType === 'upcoming'
                      ? UpcomingPaymentsData[selectedTransactionId - 1].contractName
                      : AllTransactionsData[selectedTransactionId - 1].contractName
                  }
                  amount={
                    transactionType === 'upcoming'
                      ? UpcomingPaymentsData[selectedTransactionId - 1].paymentAmount
                      : AllTransactionsData[selectedTransactionId - 1].paymentAmount
                  }
                  chequeDate={
                    transactionType === 'upcoming'
                      ? UpcomingPaymentsData[selectedTransactionId - 1].dueDate
                      : AllTransactionsData[selectedTransactionId - 1].dueDate
                  }
                  chequeNumber={
                    transactionType === 'upcoming'
                      ? UpcomingPaymentsData[selectedTransactionId - 1].chequeNumber
                      : AllTransactionsData[selectedTransactionId - 1].chequeNumber
                  }
                />
              </DialogWrapper>
            )}
          </InnerWrapper>
        </Wrapper>
      )}
      <DownloadStatementDialog
        fullScreen={isMobile}
        open={showDownloadStatement}
        onClose={() => setShowDownloadStatement(false)}
      />
    </Page>
  );
}
